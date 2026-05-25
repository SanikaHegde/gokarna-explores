import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import Razorpay from 'razorpay';
import { prisma } from '../../../lib/prisma';

export async function POST(request) {
  try {
    const { packageId, guests } = await request.json();

    if (!packageId || !guests) {
      return NextResponse.json({ error: 'Missing packageId or guests' }, { status: 400 });
    }

    let price = 4000;
    if (packageId && packageId.startsWith('stay_')) {
      if (packageId === 'stay_1_room_1') price = 4500;
      else if (packageId === 'stay_1_room_2') price = 6500;
      else if (packageId === 'stay_2_room_1') price = 3800;
      else if (packageId === 'stay_2_room_2') price = 5000;
      else if (packageId === 'stay_3_room_1') price = 5200;
      else if (packageId === 'stay_3_room_2') price = 7500;
    } else {
      let pkg = await prisma.package.findUnique({ where: { id: packageId } });
      if (!pkg) {
        // Fallback to mock data for pkg_
        const { mockPackages } = require('../../../lib/data');
        const mockPkg = mockPackages.find(p => p.id === packageId);
        if (mockPkg) {
          price = mockPkg.price;
        } else {
          return NextResponse.json({ error: 'Package not found' }, { status: 404 });
        }
      } else {
        price = pkg.price;
      }
    }

    // TEMPORARY: Hardcoded to 1 Rupee (100 paise) for testing purposes
    const amount = 100;

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      // Mock mode if no keys
      return NextResponse.json({
        id: 'order_mock_' + Math.random().toString(36).substring(7),
        amount,
        currency: 'INR',
        mock: true
      }, { status: 200 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount,
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Razorpay Error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
