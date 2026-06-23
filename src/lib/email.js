import { Resend } from 'resend';

export async function sendEmail({ to, subject, html }) {
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
      return { success: false, error: data.error?.message || 'Resend API rejected email' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
