import { prisma } from '@/lib/prisma';
import { updateBookingStatus, updateContactQueryStatus } from '../actions/admin';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const bookings = await prisma.booking.findMany({
    include: {
      user: true,
      package: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  const contactQueries = await prisma.contactQuery.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="admin-dashboard-wrapper">
      <div className="container">
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link href="/" className="btn-primary btn-small">Back to Site</Link>
            <form action={async () => {
              'use server';
              const { logoutAdmin } = await import('../actions/auth');
              await logoutAdmin();
            }}>
              <button type="submit" className="btn-primary btn-small" style={{ background: '#e74c3c' }}>Logout</button>
            </form>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Bookings Table */}
          <div className="admin-panel">
            <h2 className="admin-panel-title">Recent Bookings</h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Package</th>
                    <th>Details</th>
                    <th>Payment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 && (
                    <tr><td colSpan="5" style={{textAlign: 'center', padding: '30px', color: '#888'}}>No bookings yet.</td></tr>
                  )}
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <div style={{fontWeight: 600}}>{booking.user.name}</div>
                        <div style={{fontSize: '0.8rem', color: '#666'}}>{booking.user.email}</div>
                      </td>
                      <td style={{fontWeight: 600}}>{booking.package.title}</td>
                      <td>
                        <div style={{fontSize: '0.9rem', fontWeight: 500}}>Date: {new Date(booking.bookingDate).toLocaleDateString()}</div>
                        <div style={{fontSize: '0.8rem', color: '#666', marginTop: '2px'}}>Duration: {booking.package.duration}</div>
                        <div style={{fontSize: '0.8rem', color: '#666', marginTop: '2px'}}>Guests: {booking.guests} {booking.guests === 1 ? 'Person' : 'People'}</div>
                        {booking.package.id.startsWith('stay_') && (
                          <div style={{fontSize: '0.8rem', color: 'var(--primary-color)', marginTop: '2px', fontWeight: 500}}>Check-in: 12:00 PM</div>
                        )}
                        {!booking.package.id.startsWith('stay_') && (
                          <div style={{fontSize: '0.8rem', color: 'var(--primary-color)', marginTop: '2px', fontWeight: 500}}>Reporting Time: 09:00 AM</div>
                        )}
                      </td>
                      <td>
                        <div style={{fontWeight: 700, color: 'var(--text-dark)'}}>₹{booking.totalPrice.toLocaleString()}</div>
                        <span className={`admin-status-badge ${
                          booking.status === 'CONFIRMED' ? 'status-confirmed' :
                          booking.status === 'CANCELLED' ? 'status-cancelled' :
                          'status-pending'
                        }`} style={{ marginTop: '5px' }}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <form action={async (formData) => {
                          'use server';
                          await updateBookingStatus(booking.id, formData.get('status'));
                        }} className="admin-action-form">
                          <select name="status" defaultValue={booking.status} className="admin-select">
                            <option value="PENDING">PENDING</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                          <button type="submit" className="admin-btn-update">Update</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Queries Table */}
          <div className="admin-panel">
            <h2 className="admin-panel-title">Contact Queries</h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name/Email</th>
                    <th>Message Details</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contactQueries.length === 0 && (
                    <tr><td colSpan="4" style={{textAlign: 'center', padding: '30px', color: '#888'}}>No contact queries yet.</td></tr>
                  )}
                  {contactQueries.map((query) => (
                    <tr key={query.id}>
                      <td>
                        <div style={{fontWeight: 600}}>{query.name}</div>
                        <div style={{fontSize: '0.8rem', color: '#666'}}>{query.email}</div>
                      </td>
                      <td>
                        <div style={{whiteSpace: 'pre-wrap', fontSize: '0.85rem', lineHeight: 1.5, color: '#444'}}>
                          {query.message}
                        </div>
                      </td>
                      <td>
                        <span className={`admin-status-badge ${
                          query.status === 'NEW' ? 'status-new' :
                          query.status === 'READ' ? 'status-read' :
                          'status-replied'
                        }`}>
                          {query.status}
                        </span>
                      </td>
                      <td>
                        <form action={async (formData) => {
                          'use server';
                          await updateContactQueryStatus(query.id, formData.get('status'));
                        }} className="admin-action-form">
                          <select name="status" defaultValue={query.status} className="admin-select">
                            <option value="NEW">NEW</option>
                            <option value="READ">READ</option>
                            <option value="REPLIED">REPLIED</option>
                          </select>
                          <button type="submit" className="admin-btn-update">Update</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
