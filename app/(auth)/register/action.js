'use server';

import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// 1. Configure the Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 2. Generate and Send OTP
export async function sendRegistrationOtp(email) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return { error: 'An account with this email address already exists.' };
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify your email - PILBF Registration',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E2265;">
          <h2>Verify Your Email</h2>
          <p>Thank you for registering with the Para Indian Lawn Bowls Federation.</p>
          <p>Your one-time password (OTP) for registration is:</p>
          <h1 style="color: #EF7D20; letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });

    // Create a temporary JWT containing the OTP (expires in 10 mins)
    const token = jwt.sign({ email: email.toLowerCase(), otp }, process.env.JWT_SECRET, {
      expiresIn: '10m',
    });

    return { success: true, token };
  } catch (error) {
    console.error('OTP Send Error:', error);
    return { error: 'Failed to send OTP email. Please try again.' };
  }
}

// 3. Final Registration (Requires Valid OTP)
export async function registerUser(activeTab, formData, userOtp, token) {
  try {
    // A. Verify the OTP Token
    if (!token || !userOtp) {
      return { error: 'OTP is required.' };
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return { error: 'OTP has expired or is invalid. Please request a new one.' };
    }

    if (decoded.email !== formData.email.toLowerCase() || decoded.otp !== userOtp) {
      return { error: 'Incorrect OTP. Please try again.' };
    }

    // B. Proceed with standard registration
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    const isWheelchair = formData.wheelchair === 'Yes' ? true : formData.wheelchair === 'No' ? false : null;
    const dobValue = formData.dob ? new Date(formData.dob) : null;
    const actualOtherImpairment = formData.impairmentType === 'Other' ? formData.otherImpairment : null;

    await prisma.user.create({
      data: {
        role: activeTab,
        name: formData.name,
        email: formData.email.toLowerCase(),
        passwordHash: hashedPassword,
        phone: formData.phone,
        state: formData.state,
        dob: dobValue,
        gender: formData.gender || null,
        impairmentType: formData.impairmentType || null,
        otherImpairment: actualOtherImpairment,
        wheelchairUser: isWheelchair,
        roleType: formData.roleType || null,
        certificationLevel: formData.certification || null,
        orgName: formData.orgName || null,
        orgType: formData.orgType || null,
      }
    });

    return { success: 'Registration successful! You can now log in.' };

  } catch (error) {
    console.error('Registration Error:', error);
    return { error: 'Something went wrong on the server. Please try again later.' };
  }
}