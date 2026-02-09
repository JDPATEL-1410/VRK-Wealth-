import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import ServicesGrid from '@/components/home/ServicesGrid';
import SIPCalculator from '@/components/home/SIPCalculator';
import { FaQuoteLeft, FaHandshake, FaAward, FaRegCheckCircle } from 'react-icons/fa';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServicesGrid />
      <SIPCalculator />

      {/* Experience Section */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ color: 'var(--secondary)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our Heritage: Since 1997</h2>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.8, opacity: 0.8, marginBottom: '2rem' }}>
                With over 25 years in the financial advisory space, VRK Wealth has navigated multiple
                market cycles, helping families preserve and grow their wealth with unshakeable discipline.
                Our foundation is built on trust, transparency, and a client-first philosophy.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <FaHandshake size={30} color="var(--secondary)" />
                  <div>
                    <h4 style={{ color: 'white' }}>Ethics First</h4>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Unbiased advice always.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <FaAward size={30} color="var(--secondary)" />
                  <div>
                    <h4 style={{ color: 'white' }}>Proven Track Record</h4>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>25+ years of success.</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '3rem',
                borderRadius: '2rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <FaQuoteLeft size={40} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.9 }}>
                  "Financial planning is not just about numbers; it's about life goals.
                  We believe in creating a roadmap that gives you clarity and confidence
                  for your family's future."
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <h5 style={{ color: 'var(--secondary)', margin: 0 }}>Founder, VRK Wealth</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container" style={{
          background: 'var(--surface)',
          padding: '5rem 2rem',
          borderRadius: '3rem',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to Secure Your Future?</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            The best time to start was yesterday. The second best time is today.
            Join 500+ families who trust VRK Wealth for their financial journey.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <button className="btn btn-primary">Book Free Consultation</button>
            <button className="btn btn-outline">Call Us Now</button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
