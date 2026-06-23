export const metadata = {
  title: 'About Us | Gokarna Explores',
  description: 'Learn about Gokarna Explores and our local travel experiences.',
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '16px' }}>About Gokarna Explores</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Gokarna Explores is a local travel brand focused on curated coastal stays,
            adventure activities, and spiritual experiences around Gokarna. We partner
            with trusted hosts and guides to offer safe, memorable, and flexible itineraries.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '12px' }}>
            For custom plans, group bookings, and private requests, please use the Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
