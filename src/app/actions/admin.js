'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { sendEmail } from '@/lib/email';

export async function updateBookingStatus(id, status) {
  try {
    await prisma.booking.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error updating booking status:', error);
    return { success: false, error: 'Failed to update booking status.' };
  }
}

export async function updateContactQueryStatus(id, status) {
  try {
    await prisma.contactQuery.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error updating contact query status:', error);
    return { success: false, error: 'Failed to update contact query status.' };
  }
}

export async function replyToContactQuery(id, replyMessage) {
  try {
    if (!replyMessage || !replyMessage.trim()) {
      return { success: false, error: 'Reply message is required.' };
    }

    const query = await prisma.contactQuery.findUnique({
      where: { id }
    });

    if (!query) {
      return { success: false, error: 'Contact query not found.' };
    }

    await sendEmail({
      to: query.email,
      subject: 'Reply from Gokarna Explores',
      html: `
        <p>Hi ${query.name},</p>
        <p>Thanks for contacting Gokarna Explores.</p>
        <p>${replyMessage.trim().replace(/\n/g, '<br/>')}</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Gokarna Explores Team</strong></p>
      `
    });

    await prisma.contactQuery.update({
      where: { id },
      data: { status: 'REPLIED' }
    });

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error replying to contact query:', error);
    return { success: false, error: 'Failed to send reply.' };
  }
}
