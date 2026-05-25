import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockPackages } from '../../../lib/data';

export function generateStaticParams() {
  return mockPackages.map((pkg) => ({
    id: pkg.id,
  }));
}

export default async function PackageDetails({ params }) {
  const { id } = await params;
  
  const pkg = mockPackages.find(p => p.id === id);

  if (!pkg) {
    notFound();
  }

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start' }}>
          {/* Image Section */}
          <div>
            <img 
              src={pkg.imageUrl} 
              alt={pkg.title} 
              style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--glass-shadow)' }}
            />
          </div>

          {/* Details Section */}
          <div className="glass-panel" style={{ padding: '40px' }}>
            <span className="package-location" style={{ fontSize: '1rem', padding: '6px 16px' }}>{pkg.location}</span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '20px', marginBottom: '20px', color: 'var(--secondary-color)', lineHeight: 1.2 }}>{pkg.title}</h1>
            
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '20px' }}>
              ₹{pkg.price.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ person</span>
            </div>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '30px' }}>
              {pkg.description}
            </p>

            <ul style={{ marginBottom: '40px' }}>
              <li style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                <strong>Duration:</strong> {pkg.duration}
              </li>
              <li style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                <strong>Availability:</strong> All year round
              </li>
              <li style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                <strong>Cancellation:</strong> 48 hours prior
              </li>
            </ul>

            <Link href={`/book?packageId=${pkg.id}`} className="btn-primary" style={{ width: '100%', textAlign: 'center', fontSize: '1.2rem', padding: '16px' }}>
              Book This Package
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
