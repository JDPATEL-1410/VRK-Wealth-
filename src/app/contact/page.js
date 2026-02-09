import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa';

export default function Contact() {
    return (
    <main>
      <Navbar />
      <PageHeader 
        title="Connect With Us" 
        subtitle="Start your journey towards financial freedom today."
      />
      
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ marginBottom: '2.5rem' }}>Office Information</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', background: 'var(--surface)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Visit Us</h4>
                    <p style={{ color: 'var(--text-muted)' }}>101, Wealth Tower, Financial District,<br /> Mumbai, MH 400001</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', background: 'var(--surface)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Call Us</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Advisory: +91 98765 43210<br />Support: +91 022 1234 5678</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', background: 'var(--surface)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Email Us</h4>
                    <p style={{ color: 'var(--text-muted)' }}>info@vrkwealth.com<br />support@vrkwealth.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', background: 'var(--surface)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <FaClock />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Working Hours</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Mon - Fri: 10 AM to 6 PM<br />Sat: 10 AM to 2 PM</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#25D366', color: 'white', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                <FaWhatsapp size={30} />
                <div>
                  <h4 style={{ color: 'white', margin: 0 }}>Chat on WhatsApp</h4>
                  <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.8 }}>Instant support for queries</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'white', padding: '4rem', borderRadius: '2rem', border: '1px solid var(--border)', boxShadow: var(--shadow-lg) }}>
              <h2 style={{ marginBottom: '1rem' }}>Book a Consultation</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Fill out the form below and one of our dedicated advisors will get back to you within 24 business hours.</p>
              
              <form style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Full Name</label>
                    <input type="text" placeholder="John Doe" style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'var(--surface)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
                    <input type="email" placeholder="john@example.com" style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'var(--surface)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'var(--surface)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Subject</label>
                    <select style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                      <option>Investment Planning</option>
                      <option>Retirement Planning</option>
                      <option>Tax Solutions</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Your Message</label>
                  <textarea rows="4" placeholder="How can we help you?" style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'var(--surface)' }}></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem' }}>Send Inquiry</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main >
  );
}
