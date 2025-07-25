import nodemailer from 'nodemailer';

const USER_EMAIL = process.env.USER_EMAIL
const USER_PASSWORD = process.env.USER_PASSWORD;

export const sendOtpEmail = async (
    name: string,
    email: string,
    otp: string
): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: USER_EMAIL,
            pass: USER_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
console.log(name, email, otp)
    const mailOptions = {
        from: USER_EMAIL,
        to: email,
        subject: '🌟 Welcome to TaskFlow - Verify Your Email 🌟',
        text: `Hello ${name},\n\nYour verification code is: ${otp}\n\nThanks,\nThe TaskFlow Team`,
        html: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <div style="background: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h2 style="color: #4CAF50;">Hey ${name}, welcome to TaskFlow! 🎉</h2>
        <p>Here's your one-time verification code:</p>
        <h1 style="color: #333;">${otp}</h1>
        <p style="color: #777;">Use this to verify your email. If you didn't request this, just ignore it.</p>
      </div>
    </div>
  `,
    };


    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${email}: ${info.response}`);
    } catch (err) {
        console.error('❌ Email sending failed:', err);
        throw new Error('Failed to send verification email');
    }
};
