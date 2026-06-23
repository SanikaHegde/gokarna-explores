import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, html }) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM_EMAIL;

  if (smtpHost && smtpPort && smtpUser && smtpPass && smtpFrom) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to,
        subject,
        html,
      });

      return { success: true, provider: 'smtp' };
    } catch (error) {
      console.error('SMTP email send failed:', error);
      return { success: false, error: 'SMTP email send failed' };
    }
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Skipping email send.', { to, subject });
    return { success: true, message: 'Simulated email sent' };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM_EMAIL || 'Gokarna Explores <onboarding@resend.dev>';
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html
    });

    if (data?.error) {
      console.error('Resend API error:', data.error);
      const resendError = data.error?.message || 'Resend API rejected email';
      if (resendError.toLowerCase().includes('you can only send testing emails')) {
        return {
          success: false,
          error: 'Resend sandbox restriction: verify a domain and set RESEND_FROM_EMAIL, or configure SMTP_* variables in Vercel to send guest emails.'
        };
      }
      return { success: false, error: resendError };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
