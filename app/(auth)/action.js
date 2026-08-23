'use server';

import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// 1. Configure the Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail(email) {
  try {
    if (!email) return { error: 'Email is required.' };

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Security best practice: Always return success even if the email isn't in the DB.
      // This prevents bad actors from "fishing" to see which emails are registered.
      return { success: 'If an account exists, a reset link has been sent to the email.' };
    }

    // 2. Generate a JWT reset token valid for 15 minutes
    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    // 3. Create the reset link
    // Ensure you add NEXT_PUBLIC_APP_URL=http://localhost:3000 (or your live domain) to your .env file
    // const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL 
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;

    // 4. Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Reset your password - PILBF',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E2265;">
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password for your PILBF official account.</p>
          <p>Click the secure button below to set a new password. This link expires in 15 minutes.</p>
          <a href="${resetLink}" style="display: inline-block; padding: 14px 28px; background-color: #EF7D20; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 15px;">Reset Password</a>
          <p style="margin-top: 25px; font-size: 12px; color: #666;">If you didn't request this, you can safely ignore this email. Your password will remain unchanged.</p>
        </div>
      `,
    });

    return { success: 'If an account exists, a reset link has been sent to the email.' };
  } catch (error) {
    console.error('Reset Email Error:', error);
    return { error: 'Failed to send reset email. Please try again.' };
  }
}

export async function resetPassword(token, newPassword) {
  try {
    if (!token || !newPassword) return { error: 'Missing token or password.' };

    // 1. Verify and decode the JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return { error: 'This reset link has expired or is invalid. Please request a new one.' };
    }

    // 2. Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 3. Update the user in the database
    await prisma.user.update({
      where: { email: decoded.email },
      data: { passwordHash: hashedPassword },
    });

    return { success: 'Password has been reset successfully! You can now log in.' };
  } catch (error) {
    console.error('Password Reset Error:', error);
    return { error: 'Failed to reset password. Please try again later.' };
  }
}