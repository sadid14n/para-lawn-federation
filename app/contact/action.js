'use server';

import nodemailer from 'nodemailer';

// Configure the Email Transporter using your existing SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function submitContactForm(formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!name || !email || !subject || !message) {
      return { error: 'All fields are required.' };
    }

    // Send the email to the federation
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'rajabowls79@gmail.com', // Federation's receiving email
      replyTo: email, // If you click "reply" in your inbox, it goes to the user
      subject: `PILBF Website Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #F8F9FA; color: #1E2265;">
          <div style="max-w: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #eee;">
            <h2 style="color: #EF7D20; margin-top: 0;">New Contact Submission</h2>
            <p style="font-size: 14px; color: #666;">You have received a new message from the PILBF website contact form.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${email}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Subject:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${subject}</td></tr>
            </table>
            
            <h3 style="margin-bottom: 10px; font-size: 16px;">Message:</h3>
            <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
        </div>
      `,
    });

    return { success: 'Your message has been sent successfully. We will get back to you soon!' };
  } catch (error) {
    console.error('Contact Form Error:', error);
    return { error: 'Failed to send message. Please try again later.' };
  }
}