import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Explore Gokarna | Premium Travel & Adventure',
  description: 'Discover the perfect blend of adventure and spiritual beach vibes in Gokarna. Book your serene beach packages today.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="glass-panel main-header">
          <div className="container header-content">
            <Link href="/" className="logo">
              Gokarna<span>explore</span>
            </Link>
            <nav className="main-nav">
              <Link href="/">Home</Link>
              <Link href="/packages">
                <span className="desktop-nav-text">All Packages</span>
                <span className="mobile-nav-text">Packages</span>
              </Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <div className="header-actions">
              <Link href="/packages" className="btn-primary">Book Now</Link>
            </div>
          </div>
        </header>
        
        <main>{children}</main>

        <footer className="main-footer">
          <div className="container footer-content">
            <div className="footer-col">
              <h3>Gokarna Explore</h3>
              <p>Your premier adventure partner in Gokarna.</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/packages">Packages</Link></li>
                <li><Link href="/terms">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <p>Email: explore@gokarna.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Gokarna Explore. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
