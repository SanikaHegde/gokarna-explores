'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Script from 'next/script';

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packageId = searchParams.get('packageId');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const finalizeBooking = async (paymentId = null) => {
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, packageId, paymentId }),
      });
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/packages');
        }, 3000);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during final booking.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create order on server
      const orderRes = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId, guests: formData.guests }),
      });
      
      const orderData = await orderRes.json();
      
      if (!orderRes.ok) {
        alert('Could not initialize payment. ' + (orderData.error || ''));
        setLoading(false);
        return;
      }

      // If missing keys, it returns mock: true
      if (orderData.mock) {
        console.warn('Razorpay keys not found in .env, simulating payment.');
        await finalizeBooking(orderData.id);
        return;
      }

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'dummy_key', // Handled if real key exists
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Gokarna Explores',
        description: 'Package Booking',
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Verify Payment Signature
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            // 4. Save the actual Booking in DB
            await finalizeBooking(response.razorpay_payment_id);
          } else {
            alert('Payment verification failed!');
            setLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#046BD2',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert('Payment Failed: ' + response.error.description);
        setLoading(false);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert('An error occurred initializing payment.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '3rem', marginBottom: '20px' }}>✓</h1>
        <h2>Booking Confirmed!</h2>
        <p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>Thank you for your booking. We will contact you shortly with the details.</p>
        <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Redirecting to packages...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '30px' }}>Complete Your Booking</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Full Name</label>
          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
        </div>
        
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
        </div>

        <div>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Phone Number</label>
          <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="date" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Travel Date</label>
            <input type="date" id="date" name="date" required value={formData.date} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="guests" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Number of Guests</label>
            <input type="number" id="guests" name="guests" min="1" required value={formData.guests} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', fontSize: '1.2rem', padding: '16px' }}>
            {loading ? 'Processing...' : 'Confirm & Pay'}
          </button>
        </div>
      </form>
    </>
  );
}

export default function BookPage() {
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container">
          <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px' }}>
            <Suspense fallback={<div>Loading booking details...</div>}>
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
