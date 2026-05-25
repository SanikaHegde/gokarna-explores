'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { submitContactQuery } from '../actions/contact';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    
    try {
      const result = await submitContactQuery(formData);
      if (result.success) {
        setFormSubmitted(true);
      } else {
        setErrorMsg(result.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error("Client side error:", error);
      setErrorMsg('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      {/* Background Decorative Accents */}
      <div className="contact-bg-glow-1"></div>
      <div className="contact-bg-glow-2"></div>

      <div className="container contact-container">
        
        {/* Header navigation back */}
        <div className="contact-nav-back">
          <Link href="/" className="back-link-btn">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="contact-split-layout">
          
          {/* Left Column: Direct Info Card */}
          <div className="contact-info-panel">
            <span className="contact-panel-subtitle">GET IN TOUCH</span>
            <h1 className="contact-panel-title">
              Let's craft your <br />
              <em>perfect</em> escape.
            </h1>
            <p className="contact-panel-desc">
              Have a special request? Looking to customize a private beach trek, arrange a romantic sunset dinner, or coordinate group stays? Contact our local guide experts directly.
            </p>

            <div className="contact-info-list">
              
              <a href="tel:+919876543210" className="contact-info-item contact-interactive-item">
                <div className="contact-item-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-item-text">
                  <span>Call us anytime</span>
                  <strong>+91 98765 43210</strong>
                  <p>Check-in support & emergency helpline</p>
                </div>
              </a>

              <a href="mailto:explore@gokarna.com" className="contact-info-item contact-interactive-item">
                <div className="contact-item-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-item-text">
                  <span>Send an email</span>
                  <strong>explore@gokarna.com</strong>
                  <p>Replies within 4 hours</p>
                </div>
              </a>

              <a 
                href="https://maps.app.goo.gl/Kgcq98HbEAKo3Mqs9?g_st=ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-info-item contact-interactive-item"
              >
                <div className="contact-item-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-item-text">
                  <span>Visit our local hub</span>
                  <strong>Belehittal Road, Dandebagh</strong>
                  <p>Gokarna, Karnataka - 581326</p>
                </div>
              </a>

            </div>

            <div className="contact-panel-footer">
              <h4>Social Channels</h4>
              <div className="contact-social-links">
                <a 
                  href="https://instagram.com/gokarna.explore" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                >
                  Instagram
                </a>
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                >
                  WhatsApp
                </a>
                <a href="tel:+919876543210" className="social-link">
                  Direct Line
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Query Form */}
          <div className="contact-form-panel">
            {!formSubmitted ? (
              <div className="contact-form-card">
                <h2>Begin Your Journey</h2>
                <p>Fill out the fields below, and our guides will build a tailored itinerary for you.</p>
                
                <form onSubmit={handleSubmit} className="contact-query-form">
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
                      <label>Preferred Travel Date</label>
                      <input 
                        type="date" 
                        required 
                        value={formData.date} 
                        onChange={(e) => setFormData({...formData, date: e.target.value})} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Total Guests</label>
                      <input 
                        type="number" 
                        min="1" 
                        required 
                        value={formData.guests} 
                        onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value) || 1})} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Customize Your Escape (Special Requests)</label>
                    <textarea 
                      rows="4"
                      value={formData.message} 
                      onChange={(e) => setFormData({...formData, message: e.target.value})} 
                      placeholder="Tell us what you want to experience (e.g., Private beach dinner setup, heritage walks, scuba lessons...)"
                    ></textarea>
                  </div>

                  <button type="submit" className="contact-submit-btn" disabled={loading}>
                    <Send size={16} />
                    <span>{loading ? 'Submitting Details...' : 'Send Query & Start Planning'}</span>
                  </button>
                  {errorMsg && <p className="error-msg" style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}
                </form>
              </div>
            ) : (
              /* High-End Query Confirmation Success Screen */
              <div className="contact-success-card animate-modal">
                <div className="success-icon-wrapper">
                  <CheckCircle2 size={48} className="success-check-icon" />
                </div>
                <h2>Query Received!</h2>
                <p className="success-main-msg">
                  Thank you, <strong>{formData.name}</strong>. Your custom Gokarna itinerary query has been logged in our guide system.
                </p>
                <div className="success-details-box">
                  <p><strong>Proposed Date:</strong> {formData.date}</p>
                  <p><strong>Total Guests:</strong> {formData.guests} people</p>
                  {formData.message && (
                    <p className="success-custom-note"><strong>Custom Request:</strong> "{formData.message}"</p>
                  )}
                </div>
                <p className="success-sub-msg">
                  Our lead travel planner will reach out to you at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong> within the next 4 hours with a custom quote.
                </p>
                
                <button 
                  className="success-return-btn" 
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', date: '', guests: 1, message: '' });
                  }}
                >
                  Submit Another Query
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
