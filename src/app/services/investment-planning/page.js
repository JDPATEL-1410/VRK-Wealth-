import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { FaCheckCircle, FaSearchPlus, FaChartPie, FaSyncAlt } from 'react-icons/fa';

export default function InvestmentPlanning() {
    const process = [
        { title: "Risk Profiling", desc: "Understanding your psychological and financial capacity to take risks." },
        { title: "Asset Allocation", desc: "Spreading wealth across Equity, Debt, and Gold based on your time horizon." },
        { title: "Fund Selection", desc: "Quantitative screening of mutual funds based on 25+ parameters." },
        { title: "Execution", desc: "Disciplined SIP/Lumpsum onboarding via our secure digital platform." },
    ];

    return (
    <main>
      <Navbar />
      <PageHeader 
        title="Investment Planning" 
        subtitle="Transforming savings into wealth through disciplined, data-driven strategies."
      />
      
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Goal-Based Portfolio Construction</h2>
              <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                We don't believe in one-size-fits-all. Every portfolio we build is tied to a specific 
                financial goal, ensuring you know exactly why you are investing.
              </p>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: '1rem', borderLeft: '4px solid var(--accent)' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Short-Term Goals (1-3 Years)</h4>
                  <p style={{ fontSize: '0.9rem' }}>Liquid funds, Ultra-short duration debt, and Capital preservation focus.</p>
                </div>
                <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: '1rem', borderLeft: '4px solid var(--accent)' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Medium-Term Goals (3-7 Years)</h4>
                  <p style={{ fontSize: '0.9rem' }}>Balanced Advantage Funds, Hybrid strategies, and Moderate growth.</p>
                </div>
                <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: '1rem', borderLeft: '4px solid var(--accent)' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Long-Term Goals (7+ Years)</h4>
                  <p style={{ fontSize: '0.9rem' }}>Diversified Equity, Mid-cap exposure, and Wealth acceleration focus.</p>
                </div>
              </div>
            </div>
            
            <div style={{ background: 'var(--primary)', color: 'white', padding: '3rem', borderRadius: '2rem' }}>
              <h3 style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>Our Selection Methodology</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <li style={{ display: 'flex', gap: '1rem' }}>
                  <FaSearchPlus size={20} color="var(--secondary)" />
                  <div>
                    <h5 style={{ color: 'white' }}>Quantitative Screening</h5>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Rolling returns, Standard Deviation, Sharpe Ratio analysis.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1rem' }}>
                  <FaChartPie size={20} color="var(--secondary)" />
                  <div>
                    <h5 style={{ color: 'white' }}>Portfolio Suitability</h5>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Overlapping analysis and concentration checks.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1rem' }}>
                  <FaSyncAlt size={20} color="var(--secondary)" />
                  <div>
                    <h5 style={{ color: 'white' }}>Periodic Rebalancing</h5>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Resetting asset allocation during market extremes.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '4rem' }}>The Advisory Process</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {process.map((p, i) => (
              <div key={i} style={{ padding: '2rem', background: 'white', borderRadius: '1rem', boxShadow: var(--shadow-sm) }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 700 }}>{i + 1}</div>
                <h4 style={{ marginBottom: '1rem' }}>{p.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main >
  );
}
