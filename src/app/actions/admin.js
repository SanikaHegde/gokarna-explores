'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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
