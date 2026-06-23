export const metadata = {
  title: 'Terms & Conditions | Gokarna Explores',
  description: 'Terms and conditions for bookings and services at Gokarna Explores.',
};

export default function TermsPage() {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '16px' }}>Terms & Conditions</h1>
          <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: '18px' }}>
            <li>All bookings are subject to availability and confirmation.</li>
            <li>Travelers must provide accurate booking and contact details.</li>
            <li>Cancellation and reschedule policies vary by package and partner.</li>
            <li>Activity schedules can change due to weather and local safety advisories.</li>
            <li>Payment gateway terms apply when online payments are used.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
