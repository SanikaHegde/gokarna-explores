'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, Sun, Waves, ShieldCheck, UtensilsCrossed, Phone, Award, ChevronDown } from 'lucide-react';
import { mockPackages } from '../lib/data';

const foods = [
  { id: 1, title: 'Authentic Seafood Thali', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800', desc: 'Fresh catch of the day served with traditional coastal spices and rice.' },
  { id: 2, title: 'Beachside Cafes', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800', desc: 'Enjoy continental breakfasts, wood-fired pizzas, and cold beverages.' },
  { id: 3, title: 'Local South Indian', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800', desc: 'Crispy dosas, fluffy idlis, and filter coffee to start your mornings.' }
];

const rooms = [
  {
    id: 1,
    name: 'The Beachwalk Stay',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800',
    location: 'Belehittal Road, Dandebagh',
    coords: '14.5453° N, 74.3164° E',
    checkInStart: 8,
    checkInEnd: 22,
    hoursLabel: '8 AM - 10 PM check-in',
    features: ['Direct Beachwalk Path', 'Private Seaside Garden', 'Premium Villa Rooms', 'Sunset Viewing Deck'],
    mapUrl: 'https://maps.app.goo.gl/Kgcq98HbEAKo3Mqs9?g_st=ai',
    price: '₹4,500',
    description: 'Tucked away in a tranquil garden canopy, enjoy your private gateway to Belehittal Beach. Perfect for couples and families seeking quiet coastal luxury.',
    roomTypes: [
      {
        id: 'stay_1_room_1',
        name: 'Standard Beach Cottage',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600',
        price: 4500,
        features: ['AC Cooling', 'King Sized Bed', 'Private Balcony Area', 'Serene Side-Sea View']
      },
      {
        id: 'stay_1_room_2',
        name: 'Luxury Ocean Villa',
        image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600',
        price: 6500,
        features: ['Ultra Climate Control', 'Premium Emperor Bed', 'Private Beach Lounge Access', 'Open-air Jacuzzi Tub']
      }
    ]
  },
  {
    id: 2,
    name: 'The Beach Melody Stay',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800',
    location: 'Middle Beach, Gokarna',
    coords: '14.5361° N, 74.3129° E',
    checkInStart: 9,
    checkInEnd: 18,
    hoursLabel: '9 AM - 6 PM check-in',
    features: ['Steps to Shoreline', 'Rustic Wooden Balconies', 'Seaside Hammock Decks', 'Traditional Dining'],
    mapUrl: 'https://maps.app.goo.gl/bgKdzSgZo5nZKkyy8?g_st=ai',
    price: '₹3,800',
    description: 'Listen to the soothing rhythm of the waves crashing onto Middle Beach. A rustic yet luxury retreat designed to rejuvenate your spirit.',
    roomTypes: [
      {
        id: 'stay_2_room_1',
        name: 'Beachfront Bamboo Cabin',
        image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=600',
        price: 3800,
        features: ['Premium Fan cooling', 'Queen Size Bed', 'Hammock Stand Access', 'Sandy Front Porch Deck']
      },
      {
        id: 'stay_2_room_2',
        name: 'Premium Wooden Cottage',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600',
        price: 5000,
        features: ['AC Cooling', 'King Size Bed', 'Elevated Veranda', 'Full Ocean Facing Windows']
      }
    ]
  },
  {
    id: 3,
    name: 'Elmar - Beach Village Stay',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800',
    location: 'Belehittal Road, Dandebagh',
    coords: '14.5458° N, 74.3168° E',
    checkInStart: 0,
    checkInEnd: 24,
    hoursLabel: '24/7 Front Desk check-in',
    features: ['Artistic Village Vibe', 'Palm-fringed Villa Stays', 'Eco-friendly Luxury', 'Yoga Pavilion Access'],
    mapUrl: 'https://maps.app.goo.gl/kV9spnDdqXCtVbgn7?g_st=ac',
    price: '₹5,200',
    description: 'Immerse yourself in a luxurious palm grove settlement that marries traditional coastal village layouts with high-end sustainable hospitality.',
    roomTypes: [
      {
        id: 'stay_3_room_1',
        name: 'Garden Villa Suite',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600',
        price: 5200,
        features: ['AC Climate Control', 'King Size Bed', 'Private Garden Veranda', 'Tropical Open-air Bath']
      },
      {
        id: 'stay_3_room_2',
        name: 'Royal Palm Suite',
        image: 'https://images.unsplash.com/photo-1614088924151-50e59a6078e9?q=80&w=600',
        price: 7500,
        features: ['AC Cooling System', 'Super King Bed', 'Private Lagoon Access', 'Sunset Ocean View Deck']
      }
    ]
  }
];

const nearbyAttractions = [
  {
    id: 1,
    name: 'Mahabaleshwar Temple',
    distance: '0.8 km from stay',
    image: 'https://images.unsplash.com/photo-1600100397608-f010e42edaba?q=80&w=800',
    tag: 'Spiritual Soul',
    desc: 'The historic 4th-century temple housing the sacred Atmalinga of Lord Shiva. Celebrated for its towering Dravidian granite architecture and deep spiritual energy.'
  },
  {
    id: 2,
    name: 'Om Beach',
    distance: '2.5 km from stay',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800',
    tag: 'Active Shoreline',
    desc: 'Famous for its natural shape resembling the sacred OM symbol. The main hub for lively beachside cafes, jet skiing, parasailing, and speed boat tours.'
  },
  {
    id: 3,
    name: 'Mirjan Fort',
    distance: '21 km from stay',
    image: 'https://images.unsplash.com/photo-1599837565318-67429bde7162?q=80&w=800',
    tag: 'Historic Legend',
    desc: 'A majestic 16th-century fortress crafted with laterite stones. Famous for its high double-moated walls, circular bastions, and lush green moss cover.'
  },
  {
    id: 4,
    name: 'Paradise Beach',
    distance: 'Trek access only',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800',
    tag: 'Untouched Wilderness',
    desc: 'A pristine off-grid haven reached only by cliff trek or boat. Offers white sandy shores, black volcanic rocks, and absolute tropical silence.'
  },
  {
    id: 5,
    name: 'Kudle Beach',
    distance: '1.2 km from stay',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800',
    tag: 'Sunset & Yoga',
    desc: 'A vast golden crescent flanked by high coconut palms. The perfect destination for peaceful sunset treks, beachfront yoga, and acoustic evening cafes.'
  },
  {
    id: 6,
    name: 'Koti Teertha',
    distance: '0.6 km from stay',
    image: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=800',
    tag: 'Sacred Waters',
    desc: 'A massive holy water tank in the heart of town, surrounded by ancient temples, colorful bathing ghats, and red-tiled roofs.'
  },
  {
    id: 7,
    name: 'Half Moon Beach',
    distance: 'Boat / Trek only',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800',
    tag: 'Secluded Cove',
    desc: 'A small crescent-shaped shoreline carved into high cliffs. Famous for its quiet atmosphere, calm swimming waters, and absence of commercial crowds.'
  },
  {
    id: 8,
    name: 'Gokarna Cliff Path',
    distance: '1.5 km trek route',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800',
    tag: 'Panoramic Trek',
    desc: 'An epic clifftop walking route connecting Kudle and Om beaches. Delivers breathtaking panoramic views of the rocky coastline and the Arabian Sea.'
  }
];

const testimonials = [
  { id: 1, name: 'Rahul Sharma', review: 'Absolutely incredible experience. The beach trek was organized perfectly, and the ocean view cottage was exactly as promised!', rating: 5 },
  { id: 2, name: 'Priya Desai', review: 'Gokarna Explore made our trip so easy. The scuba diving instructors were professional, and the food at the resort was amazing.', rating: 5 },
  { id: 3, name: 'Arjun Menon', review: 'Highly recommend the premium family suite. Perfect balance of spiritual visits and relaxing beach time.', rating: 4 }
];

const faqs = [
  { id: 1, q: 'What is the best time to visit Gokarna?', a: 'The ideal time to visit Gokarna is from October to March when the weather is pleasant and perfect for beach activities.' },
  { id: 2, q: 'Is Gokarna safe for solo travelers?', a: 'Yes, Gokarna is generally very safe for solo travelers. However, it is always advisable to take standard precautions, especially at night near secluded beaches.' },
  { id: 3, q: 'Do you provide transportation from the railway station?', a: 'Yes! We offer pick-up and drop-off services from Gokarna Road Railway Station as part of our premium packages.' },
  { id: 4, q: 'Are water sports available all year round?', a: 'Water sports are usually suspended during the monsoon season (June to September) for safety reasons. They resume fully by October.' }
];

export default function Home() {
  const [searchData, setSearchData] = useState({ checkIn: '', checkOut: '', guests: 1 });
  const [activeFaq, setActiveFaq] = useState(null);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const isStayOpen = (room) => {
    // Dynamically fetch current local hour
    const currentHour = new Date().getHours();
    return currentHour >= room.checkInStart && currentHour < room.checkInEnd;
  };

  const filteredRooms = showOnlyAvailable 
    ? rooms.filter(room => isStayOpen(room)) 
    : rooms;

  const handleSearch = (e) => {
    e.preventDefault();
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };


  // Booking Modal States for Stays
  const [bookingStay, setBookingStay] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleModalBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          guests: formData.guests,
          packageId: selectedRoomType.id,
        }),
      });
      if (res.ok) {
        setBookingSuccess(true);
      } else {
        alert('Booking failed. Please check details and try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during payment processing.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* 1. Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Discover Your Paradise</span>
          <h1 className="hero-title">Explore the <em>Soul</em> of Gokarna</h1>
          <p className="hero-subtitle">Experience pristine beaches, ancient temples, and thrilling adventures on the stunning Arabian coast.</p>
          <div className="hero-actions">
            <Link href="#packages" className="btn-primary">View Packages</Link>
          </div>
        </div>
      </section>

      {/* 1.5 Aesthetic Editorial Intro Section */}
      <section className="intro-section">
        <div className="intro-watermark">GOKARNA</div>
        <div className="container intro-grid">
          
          <div className="intro-image-wrapper">
            <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800" className="intro-img-arch" alt="Gokarna Beach Coastline" />
            <div className="intro-glass-stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Years of Curating Memories</span>
            </div>
          </div>

          <div className="intro-content-wrapper">
            <h2 className="intro-heading">A journey beyond the ordinary shores.</h2>
            <div className="intro-text-body">
              <p>Nestled on the pristine coastline of Karnataka, Gokarna is a breathtaking blend of untouched beaches and ancient spirituality. Whether you seek the quiet whisper of the ocean, the thrill of diving, or the profound peace of a temple town, we curate experiences that resonate with your soul.</p>
              <p>Explore hidden coves, taste authentic coastal flavors, and let the rhythm of the waves guide your escape.</p>
            </div>
            
            <div className="intro-action-area">
              <div className="intro-connect-hub">
                <a href="tel:+919876543210" className="connect-item connect-call">
                  <div className="connect-icon-wrapper">
                    <Phone size={20} />
                  </div>
                  <div className="connect-text">
                    <span className="connect-label">Call Us Anytime</span>
                    <span className="connect-value">+91 98765 43210</span>
                  </div>
                </a>
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="connect-item connect-whatsapp"
                >
                  <div className="connect-icon-wrapper">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.557 1.876 14.079.845 11.45.845 6.012.845 1.588 5.267 1.584 10.71c-.001 1.762.461 3.48 1.337 5.024l-.994 3.634 3.72-.974zm12.352-6.52c-.313-.156-1.854-.915-2.13-.1.015-.276-.156-.375-.36-.077l-.612.88c-.204.22-.408.24-.72.083-2.146-1.072-3.536-2.509-4.222-3.69-.204-.347-.022-.534.15-.705.153-.152.34-.395.51-.593.17-.197.226-.34.34-.565.113-.226.056-.423-.028-.593-.085-.17-.762-1.838-1.045-2.522-.276-.665-.558-.574-.763-.585-.197-.01-.424-.012-.65-.012-.226 0-.594.085-.905.424-.31.34-1.187 1.159-1.187 2.825 0 1.666 1.214 3.275 1.384 3.5.17.227 2.39 3.65 5.79 5.12.808.35 1.44.558 1.932.715.811.258 1.55.222 2.133.135.65-.098 1.854-.76 2.115-1.459.26-.7.26-1.3.18-1.428-.077-.128-.276-.204-.59-.36z"/>
                    </svg>
                  </div>
                  <div className="connect-text">
                    <span className="connect-label">WhatsApp Live</span>
                    <span className="connect-value">Chat Directly</span>
                  </div>
                </a>
                <a 
                  href="https://instagram.com/gokarna.explore" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="connect-item connect-instagram"
                >
                  <div className="connect-icon-wrapper">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  <div className="connect-text">
                    <span className="connect-label">Instagram</span>
                    <span className="connect-value">@gokarna.explore</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Promotion Banner */}
      <section className="promo-banner">
        <div className="container promo-content">
          <h2>Monsoon Special: Get 20% Off on Advance Bookings!</h2>
          <p>Book your Gokarna getaway 30 days in advance and unlock exclusive discounts on all beach cottages.</p>
          <Link href="/packages" className="btn-secondary">Claim Offer</Link>
        </div>
      </section>

      {/* 3. Rooms (Gokarna Postcard Collection) */}
      <section className="stays-section">
        <div className="container stays-container">
          <div className="stays-header-block">
            <div className="stays-intro">
              <span className="stays-subtitle">Featured Stays</span>
              <h2 className="stays-main-title">We believe in giving you the best comfort ever</h2>
              
              <div className="stays-header-row">
                <p className="stays-lead-text">
                  We have hand-selected three exclusive homestays located along the pristine shores of Gokarna, designed to give you the ultimate cozy seaside escape.
                </p>
                
                {/* Dynamic availability filter tabs */}
                <div className="stays-filter-group">
                  <button 
                    className={`filter-tab-btn ${!showOnlyAvailable ? 'active' : ''}`}
                    onClick={() => setShowOnlyAvailable(false)}
                  >
                    All Stays
                  </button>
                  <button 
                    className={`filter-tab-btn ${showOnlyAvailable ? 'active' : ''}`}
                    onClick={() => setShowOnlyAvailable(true)}
                  >
                    <span className="live-pulse-dot"></span> Open Now
                  </button>
                </div>
              </div>

              <div className="vintage-postmark-stamp">
                <span className="stamp-circle-text">GOKARNA EXPLORER • ORIGINAL</span>
                <span className="stamp-inner-text">PASSPORT</span>
              </div>
            </div>
          </div>
          
          <div className="postcard-collage">
            {filteredRooms.map((room, index) => {
              const isOpen = isStayOpen(room);
              return (
                <div 
                  key={room.id} 
                  className={`postcard-card postcard-${index + 1}`}
                >
                  <div className="postcard-image-wrapper">
                    <img src={room.image} alt={room.name} className="postcard-img" />
                    
                    {/* Pulsing Live check-in badge */}
                    <div className={`postcard-live-badge ${isOpen ? 'badge-open' : 'badge-closed'}`}>
                      <span className="live-pulse-indicator"></span>
                      <span>{isOpen ? 'Open Now' : 'Closed'}</span>
                    </div>

                    <div className="postcard-stamp-overlay">
                      <div className="postmark-circle">
                        <span>GOKARNA</span>
                        <span>★</span>
                        <span>POST</span>
                      </div>
                    </div>
                    <div className="postcard-price-badge">{room.price}<span>/night</span></div>
                  </div>
                  
                  <div className="postcard-content">
                    <div className="postcard-meta">

                      <h3 className="postcard-title">{room.name}</h3>
                      <div className="postcard-location-pin">
                        <MapPin size={14} className="pin-icon" />
                        <span>{room.location}</span>
                      </div>
                    </div>
                  
                  <p className="postcard-desc">{room.description}</p>
                  
                  <ul className="postcard-features">
                    {room.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  
                  <div className="postcard-actions">
                    <a 
                      href={room.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="postcard-map-btn"
                    >
                      <MapPin size={16} />
                      <span>Open in Maps</span>
                    </a>
                    <button 
                      onClick={() => {
                        setBookingStay(room);
                        setSelectedRoomType(null);
                        setBookingSuccess(false);
                      }} 
                      className="postcard-book-btn"
                      style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
                    >
                      Reserve Stay
                    </button>
                    <a 
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi! I'm interested in booking rooms at ${room.name}.`)}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="postcard-whatsapp-btn"
                      title="Enquire on WhatsApp"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.557 1.876 14.079.845 11.45.845 6.012.845 1.588 5.267 1.584 10.71c-.001 1.762.461 3.48 1.337 5.024l-.994 3.634 3.72-.974zm12.352-6.52c-.313-.156-1.854-.915-2.13-.1.015-.276-.156-.375-.36-.077l-.612.88c-.204.22-.408.24-.72.083-2.146-1.072-3.536-2.509-4.222-3.69-.204-.347-.022-.534.15-.705.153-.152.34-.395.51-.593.17-.197.226-.34.34-.565.113-.226.056-.423-.028-.593-.085-.17-.762-1.838-1.045-2.522-.276-.665-.558-.574-.763-.585-.197-.01-.424-.012-.65-.012-.226 0-.594.085-.905.424-.31.34-1.187 1.159-1.187 2.825 0 1.666 1.214 3.275 1.384 3.5.17.227 2.39 3.65 5.79 5.12.808.35 1.44.558 1.932.715.811.258 1.55.222 2.133.135.65-.098 1.854-.76 2.115-1.459.26-.7.26-1.3.18-1.428-.077-.128-.276-.204-.59-.36z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      {/* 2. Featured Packages (Ticket Layout) */}
      <section id="packages" className="content-section bg-light">
        <div className="container">
          <h2 className="section-title">Exclusive Gokarna Packages</h2>
          <div className="packages-ticket-list">
            {mockPackages.map((pkg) => (
              <div key={pkg.id} className="ticket-card">
                <div className="ticket-visual">
                  <img src={pkg.imageUrl} alt={pkg.title} className="ticket-img" />
                  <div className="ticket-duration">{pkg.duration || '3 Days / 2 Nights'}</div>
                </div>
                <div className="ticket-body">
                  <h3 className="ticket-title">{pkg.title}</h3>
                  <p className="ticket-desc">{pkg.description}</p>
                </div>
                <div className="ticket-stub">
                  <span className="ticket-price-label">Starting From</span>
                  <span className="ticket-price">₹{pkg.price.toLocaleString()}</span>
                  <Link href={`/packages/${pkg.id}`} className="btn-primary ticket-btn">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Food & Dining */}
      <section className="content-section">
        <div className="container">
          <h2 className="section-title">Delicious Coastal Cuisine</h2>
          <div className="cuisine-fine-dining">
            <div className="cuisine-plate-wrapper">
              <img src={foods[0].image} alt="Thali" className="cuisine-spinning-plate" />
              <div className="cuisine-plate-accent"></div>
            </div>
            <div className="cuisine-menu-list">
              {foods.map((food, index) => (
                <div className="cuisine-menu-item" key={food.id}>
                  <img src={food.image} alt={food.title} className="cuisine-menu-thumb" />
                  <div className="cuisine-menu-text">
                    <h3>{food.title}</h3>
                    <p>{food.desc}</p>
                  </div>
                  <div className="cuisine-menu-num">0{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* 5. Nearby Attractions Gallery */}
      <section className="beaches-gallery-section">
        <div className="container">
          <div className="gallery-header-block">
            <span className="gallery-subtitle">Discover Gokarna's Treasures</span>
            <h2 className="section-title gallery-title">Iconic Sights & Attractions</h2>
            <p className="gallery-lead-text">From sacred ancient shrines and historic fortresses to secluded pristine coves, explore the ultimate coastal wonders.</p>
          </div>
          
          <div className="beaches-gallery-grid">
            {nearbyAttractions.map((attraction, index) => (
              <div key={attraction.id} className={`beach-gallery-card card-style-${(index % 4) + 1}`}>
                <img src={attraction.image} alt={attraction.name} className="beach-gallery-img" />
                <div className="beach-gallery-overlay"></div>
                <span className="beach-gallery-tag">{attraction.tag}</span>
                
                <div className="beach-gallery-content">
                  <span className="beach-gallery-distance">{attraction.distance}</span>
                  <h3 className="beach-gallery-name">{attraction.name}</h3>
                  <p className="beach-gallery-desc">{attraction.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. User Feedback (Editorial Staggered) */}
      <section className="content-section">
        <div className="container">
          <h2 className="section-title">What Our Guests Say</h2>
          <div className="testimonial-editorial">
            {testimonials.map((test) => (
              <div key={test.id} className="testimonial-item">
                <div className="stars">{'★'.repeat(test.rating)}{'☆'.repeat(5-test.rating)}</div>
                <p className="review-text">"{test.review}"</p>
                <h4 className="reviewer-name">- {test.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ (Split Layout Premium UI) */}
      <section className="faq-section bg-light">
        <div className="container">
          <div className="faq-split-layout">
            
            {/* Left Info Panel */}
            <div className="faq-info-card">
              <div className="faq-info-glow"></div>
              <div className="faq-info-content">
                <span className="faq-info-badge">GUIDE & HELP</span>
                <h2>Frequently Asked <br /><em>Questions</em></h2>
                <p>Have questions about your upcoming trip to Gokarna? We’ve gathered answers to the most common queries to make your preparation seamless.</p>
                
                <div className="faq-support-box">
                  <div className="faq-support-icon">
                    <Phone size={20} />
                  </div>
                  <div className="faq-support-text">
                    <span>24/7 Guest Assistance</span>
                    <strong>+91 98765 43210</strong>
                  </div>
                </div>
                
                <div className="faq-info-footer">
                  <p>Our team is always available on-ground to guide you through bookings, transports, and local treks.</p>
                </div>
              </div>
            </div>

            {/* Right Accordion List */}
            <div className="faq-accordion-list">
              {faqs.map((faq) => {
                const isActive = activeFaq === faq.id;
                return (
                  <div 
                    key={faq.id} 
                    className={`faq-card-item ${isActive ? 'active' : ''}`}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <button className="faq-card-question">
                      <span>{faq.q}</span>
                      <span className="faq-card-chevron">
                        <ChevronDown size={18} />
                      </span>
                    </button>
                    <div className="faq-card-answer-wrapper">
                      <div className="faq-card-answer-content">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Booking Modal Overlay */}
      {bookingStay && (
        <div className="booking-modal-overlay">
          <div className={`booking-modal-card ${!selectedRoomType ? 'modal-step-rooms' : 'modal-step-payment'} animate-modal`}>
            <button 
              className="booking-modal-close" 
              onClick={() => { setBookingStay(null); setSelectedRoomType(null); setBookingSuccess(false); }}
            >
              &times;
            </button>
            
            {!bookingSuccess ? (
              <>
                {/* Step 1: Select Room Type */}
                {!selectedRoomType ? (
                  <div className="modal-room-selection-container">
                    <div className="modal-room-selection-header">
                      <span className="modal-stay-label">{bookingStay.name}</span>
                      <h2>Choose Your Room Option</h2>
                      <p>Select from our hand-picked beachfront room types designed for maximum comfort.</p>
                    </div>
                    
                    <div className="modal-room-options-grid">
                      {bookingStay.roomTypes.map((roomType) => (
                        <div key={roomType.id} className="modal-room-card">
                          <div 
                            className="modal-room-card-image" 
                            style={{ backgroundImage: `url(${roomType.image})` }}
                          >
                            <div className="modal-room-card-price">
                              ₹{roomType.price.toLocaleString()}<span>/night</span>
                            </div>
                          </div>
                          
                          <div className="modal-room-card-content">
                            <h3>{roomType.name}</h3>
                            
                            <ul className="modal-room-card-features">
                              {roomType.features.map((f, i) => (
                                <li key={i}>✓ {f}</li>
                              ))}
                            </ul>
                            
                            <button 
                              className="modal-room-select-btn"
                              onClick={() => setSelectedRoomType(roomType)}
                            >
                              Choose Room & Proceed
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Step 2: Payment Details Form */
                  <div className="booking-modal-grid">
                    {/* Left: Chosen Stay & Room Preview */}
                    <div className="booking-modal-sidebar">
                      <div 
                        className="modal-sidebar-image" 
                        style={{ backgroundImage: `url(${selectedRoomType.image})` }}
                      >
                        <div className="modal-sidebar-price">
                          ₹{selectedRoomType.price.toLocaleString()}<span>/night</span>
                        </div>
                      </div>
                      
                      <div className="modal-sidebar-info">
                        <span className="modal-sidebar-coords">{bookingStay.coords}</span>
                        <h3>{bookingStay.name}</h3>
                        <div className="modal-sidebar-room-tag">
                          Selected: <strong>{selectedRoomType.name}</strong>
                        </div>
                        <p className="modal-sidebar-desc">{bookingStay.description}</p>
                        <button 
                          className="modal-change-room-link"
                          onClick={() => setSelectedRoomType(null)}
                        >
                          ← Change Room Type
                        </button>
                        
                        <div className="modal-sidebar-location">
                          <MapPin size={14} className="pin-icon" />
                          <span>{bookingStay.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right: Custom Form & Payment */}
                    <div className="booking-modal-form-wrapper">
                      <h2>Confirm Room & Payment</h2>
                      <p className="modal-form-lead">Enter details below to complete your checkout reservation.</p>
                      
                      <form onSubmit={handleModalBookingSubmit} className="modal-booking-form">
                        <div className="form-group">
                          <label>Full Name</label>
                          <input 
                            type="text" 
                            required 
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            placeholder="e.g. Rahul Sharma"
                          />
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label>Email Address</label>
                            <input 
                              type="email" 
                              required 
                              value={formData.email} 
                              onChange={(e) => setFormData({...formData, email: e.target.value})} 
                              placeholder="e.g. rahul@example.com"
                            />
                          </div>
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input 
                              type="tel" 
                              required 
                              value={formData.phone} 
                              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                              placeholder="e.g. +91 98765 43210"
                            />
                          </div>
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label>Check-in Date</label>
                            <input 
                              type="date" 
                              required 
                              value={formData.date} 
                              onChange={(e) => setFormData({...formData, date: e.target.value})} 
                            />
                          </div>
                          <div className="form-group">
                            <label>Number of Guests</label>
                            <input 
                              type="number" 
                              min="1" 
                              required 
                              value={formData.guests} 
                              onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value) || 1})} 
                            />
                          </div>
                        </div>
                        
                        <div className="payment-summary-box">
                          <div className="summary-row">
                            <span>Room Rate (₹{selectedRoomType.price.toLocaleString()} x {formData.guests} guests)</span>
                            <strong>₹{(selectedRoomType.price * (formData.guests || 1)).toLocaleString()}</strong>
                          </div>
                          <div className="summary-row total-row">
                            <span>Total Amount Paid</span>
                            <strong>₹{(selectedRoomType.price * (formData.guests || 1)).toLocaleString()}</strong>
                          </div>
                        </div>
                        
                        <button type="submit" className="modal-pay-btn" disabled={bookingLoading}>
                          {bookingLoading ? 'Processing Payment...' : `Pay & Confirm Booking`}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Step 3: Success Confirmation Screen */
              <div className="booking-modal-success text-center">
                <div className="success-icon-circle">✓</div>
                <h2>Payment Successful!</h2>
                <p className="success-message">Your reservation for <strong>{selectedRoomType.name}</strong> at <strong>{bookingStay.name}</strong> has been secured.</p>
                <p className="success-sub">A booking confirmation email has been sent to <strong>{formData.email}</strong>. We look forward to hosting you!</p>
                <button 
                  className="success-close-btn" 
                  onClick={() => { setBookingStay(null); setSelectedRoomType(null); setBookingSuccess(false); }}
                >
                  Return to Landing Page
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
