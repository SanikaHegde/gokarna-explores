import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, date, guests, packageId, paymentId } = data;

    // Basic validation
    if (!name || !email || !packageId || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Dynamic stays handling: create stay as a Package in the DB if it is a stay
    if (packageId && packageId.startsWith('stay_')) {
      let stayTitle = 'Oceanfront Room';
      let stayPrice = 4000;
      
      if (packageId === 'stay_1_room_1') {
        stayTitle = 'Standard Beach Cottage (The Beachwalk Stay)';
        stayPrice = 4500;
      } else if (packageId === 'stay_1_room_2') {
        stayTitle = 'Luxury Ocean Villa (The Beachwalk Stay)';
        stayPrice = 6500;
      } else if (packageId === 'stay_2_room_1') {
        stayTitle = 'Beachfront Bamboo Cabin (The Beach Melody)';
        stayPrice = 3800;
      } else if (packageId === 'stay_2_room_2') {
        stayTitle = 'Premium Wooden Cottage (The Beach Melody)';
        stayPrice = 5000;
      } else if (packageId === 'stay_3_room_1') {
        stayTitle = 'Garden Villa Suite (Elmar - Beach Village)';
        stayPrice = 5200;
      } else if (packageId === 'stay_3_room_2') {
        stayTitle = 'Royal Palm Suite (Elmar - Beach Village)';
        stayPrice = 7500;
      }
      
      await prisma.package.upsert({
        where: { id: packageId },
        update: {
          title: stayTitle,
          price: stayPrice,
          location: 'Gokarna',
          duration: '1 Night',
        },
        create: {
          id: packageId,
          title: stayTitle,
          description: `Luxurious room category at ${stayTitle} in Gokarna.`,
          location: 'Gokarna',
          price: stayPrice,
          imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800',
          duration: '1 Night',
        }
      });
    }

    // In a real app, calculate totalPrice from the package price
    let pkg = await prisma.package.findUnique({ where: { id: packageId } });
    if (!pkg) {
      // Fallback to mock data for pkg_
      const { mockPackages } = require('../../../lib/data');
      const mockPkg = mockPackages.find(p => p.id === packageId);
      if (mockPkg) {
        // Upsert it so it exists in DB for foreign key relations
        pkg = await prisma.package.upsert({
          where: { id: packageId },
          update: {},
          create: {
            id: mockPkg.id,
            title: mockPkg.title,
            description: mockPkg.description,
            location: mockPkg.location,
            price: mockPkg.price,
            imageUrl: mockPkg.imageUrl,
            duration: mockPkg.duration,
          }
        });
      } else {
        return NextResponse.json({ error: 'Package not found' }, { status: 404 });
      }
    }

    const totalPrice = pkg.price * Number(guests);

    // Create user if not exists or update
    let user = { id: 'mock_user_' + Math.random().toString(36).substring(2, 9) };
    try {
      user = await prisma.user.upsert({
        where: { email },
        update: { name, phone },
        create: { name, email, phone }
      });
    } catch (dbError) {
      console.error('Failed to save user to Vercel SQLite:', dbError);
    }

    const finalPaymentId = paymentId || ('mock_pay_' + Math.random().toString(36).substring(2, 9));

    // Create the booking record
    let bookingId = 'mock_booking_' + Math.random().toString(36).substring(2, 9);
    try {
      const booking = await prisma.booking.create({
        data: {
          userId: user.id,
          packageId,
          bookingDate: new Date(date),
          guests: Number(guests),
          totalPrice,
          status: 'CONFIRMED',
          paymentId: finalPaymentId,
        }
      });
      bookingId = booking.id;
    } catch (dbError) {
      console.error('Failed to save booking to Vercel SQLite:', dbError);
    }

    // Send confirmation email
    const { sendEmail } = require('../../../lib/email');
    await sendEmail({
      to: email,
      subject: 'Booking Confirmed - Gokarna Explores',
      html: `
        <h2>Hi ${name},</h2>
        <p>Your booking for <strong>${pkg.title}</strong> is confirmed!</p>
        <p><strong>Travel Date:</strong> ${date}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Payment ID:</strong> ${finalPaymentId}</p>
        <p>We look forward to hosting you!</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>Gokarna Explores Team</strong></p>
      `
    });

    // Send admin notification
    await sendEmail({
      to: 'sanisanika10@gmail.com',
      subject: 'NEW BOOKING: Gokarna Explores',
      html: `
        <h2>New Booking Received!</h2>
        <p><strong>Name:</strong> ${name} (${email})</p>
        <p><strong>Package:</strong> ${pkg.title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Total Price:</strong> ₹${totalPrice}</p>
      `
    });

    return NextResponse.json({ success: true, bookingId }, { status: 200 });
  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
