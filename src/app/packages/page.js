import Link from 'next/link';
import { mockPackages } from '../../lib/data';

export const metadata = {
  title: 'All Packages | Explore Gokarna',
  description: 'Browse our curated selection of adventure, spiritual, and relaxation packages for Gokarna. Book your dream beach escape today.',
};

const packageIcons = {
  pkg_2: '🏕️',
  pkg_4: '🤿',
  pkg_5: '🌅',
};

const packageBadges = {
  pkg_2: 'Most Popular',
  pkg_4: 'Premium',
  pkg_5: 'Best Value',
};

const packageHighlights = {
  pkg_2: ['Beach Trek (5 beaches)', 'Bonfire Night Camp', 'Certified Trek Guide', 'Vegetarian Meals'],
  pkg_4: ['Mahabaleshwar Temple Tour', 'Netrani Island Scuba Dive', 'PADI Certified Instructor', 'Underwater Photos'],
  pkg_5: ['Oceanfront Suite', 'Morning Yoga Sessions', 'Spa & Wellness Treatment', 'Direct Beach Access'],
};

export default async function PackagesPage() {
  const packages = mockPackages;

  return (
    <div className="pkg-page-wrapper">

      {/* Hero Banner */}
      <div className="pkg-hero-banner">
        <div className="pkg-hero-bg" />
        <div className="container pkg-hero-content">
          <span className="pkg-hero-eyebrow">Curated Experiences</span>
          <h1 className="pkg-hero-title">Adventure Packages</h1>
          <p className="pkg-hero-subtitle">
            Hand-crafted journeys across Gokarna's pristine coastline — from sacred temple trails to deep-sea dives.
          </p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="pkg-grid-section">
        <div className="container">
          <div className="pkg-grid">
            {packages.map((pkg, index) => (
              <article key={pkg.id} className={`pkg-card pkg-card-${index + 1}`}>
                
                {/* Image Block */}
                <div className="pkg-card-img-wrapper">
                  <img src={pkg.imageUrl} alt={pkg.title} className="pkg-card-img" />
                  <div className="pkg-card-img-overlay" />
                  
                  {packageBadges[pkg.id] && (
                    <span className="pkg-badge">{packageBadges[pkg.id]}</span>
                  )}

                  <div className="pkg-card-meta-overlay">
                    <span className="pkg-duration-chip">
                      🗓 {pkg.duration}
                    </span>
                  </div>
                </div>

                {/* Content Block */}
                <div className="pkg-card-body">
                  <div className="pkg-card-top">
                    <span className="pkg-card-icon">{packageIcons[pkg.id] || '🌊'}</span>
                    <span className="pkg-card-location">📍 {pkg.location}</span>
                  </div>

                  <h2 className="pkg-card-title">{pkg.title}</h2>
                  <p className="pkg-card-desc">{pkg.description}</p>

                  {/* Highlights */}
                  <ul className="pkg-highlights">
                    {(packageHighlights[pkg.id] || []).map((h, i) => (
                      <li key={i}>
                        <span className="pkg-highlight-tick">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="pkg-card-footer">
                    <div className="pkg-price-block">
                      <span className="pkg-price-label">Starting from</span>
                      <span className="pkg-price">₹{pkg.price.toLocaleString()}</span>
                      <span className="pkg-price-per">/ person</span>
                    </div>
                    <Link href={`/packages/${pkg.id}`} className="pkg-view-btn">
                      View Details
                    </Link>
                  </div>
                </div>

              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="pkg-bottom-cta">
            <div className="pkg-cta-card">
              <div className="pkg-cta-icon">✉️</div>
              <h3>Can't find what you're looking for?</h3>
              <p>Tell us your dream trip. Our local guides will craft a custom itinerary just for you.</p>
              <Link href="/contact" className="btn-primary">
                Request Custom Package
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
