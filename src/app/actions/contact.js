'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { sendEmail } from '@/lib/email';

export async function submitContactQuery(data) {
  try {
    const { name, email, phone, date, guests, message } = data;
    
    // Convert string guests to number
    const guestsInt = parseInt(guests) || 1;

    const fullMessage = `Phone: ${phone}\nDate: ${date}\nGuests: ${guestsInt}\n\nRequest: ${message}`;

    const query = await prisma.contactQuery.create({
      data: {
        name,
        email,
        message: fullMessage,
        status: 'NEW'
      }
    });

    // Send confirmation email to the user
    await sendEmail({
      to: email,
      subject: 'Your Gokarna Explores Query Received!',
      html: `
        <h2>Hi ${name},</h2>
        <p>We have received your custom itinerary query for Gokarna/Dandeli.</p>
        <p><strong>Proposed Date:</strong> ${date}</p>
        <p><strong>Guests:</strong> ${guestsInt}</p>
        <p>Our lead travel planner will reach out to you within 4 hours.</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>Gokarna Explores Team</strong></p>
      `
    });

    // Send notification email to the admin
    await sendEmail({
      to: 'sanisanika10@gmail.com',
      subject: 'NEW LEAD: Gokarna Explores Query',
      html: `
        <h2>New Contact Query Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Guests:</strong> ${guestsInt}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    revalidatePath('/admin'); // Revalidate admin page if we have one
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact query:', error);
    return { success: false, error: 'Failed to submit query.' };
  }
}
