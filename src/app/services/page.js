import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import { FaChartLine, FaChair, FaGraduationCap, FaBalanceScale, FaUmbrella, FaChevronRight } from 'react-icons/fa';

export default function Services() {
    const allServices = [
        { title: "Investment Planning", icon: <FaChartLine />, desc: "Customized portfolio construction based on risk profiling and goal horizon.", path: "/services/investment-planning" },
        { title: "Retirement Solutions", icon: <FaChair />, desc: "Comprehensive planning to ensure a comfortable and inflation-protected retired life.", path: "/services/retirement-planning" },
        { title: "Education Planning", icon: <FaGraduationCap />, desc: "Secure your children's future with dedicated corpus building for higher education.", path: "/services/education-planning" },
        { title: "Tax Planning", icon: <FaBalanceScale />, desc: "Optimizing your investments to minimize tax liability legally and efficiently.", path: "/services/tax-planning" },
        { title: "Insurance Solutions", icon: <FaUmbrella />, desc: "Protecting your family from life's uncertainties with right-sized protection.", path: "/services/insurance" },
    ];

    return (
    <main>
      <Navbar />
      <PageHeader 
        title="Our Advisory Solutions" 
        subtitle="Holistic wealth management designed to bring clarity to your financial life."
      />
      
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {allServices.map((s, i) => (
              <Link key={i} href={s.path} style={{ 
                background: 'white', 
                padding: '3rem 2rem', 
                borderRadius: '1.5rem', 
                border: '1px solid var(--border)',
                transition: 'var(--transition)',
                display: 'block'
              }} className="service-card">
                <div style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>{s.icon}</div>
                <h3 style={{ marginBottom: '1rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>{s.desc}</p>
                <div style={{ color: 'var(--accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Learn More <FaChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparative Table */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>Advisory Scope</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: var(--shadow-md) }}>
              <thead>
                <tr style={{ background: 'var(--primary)', color: 'white' }}>
                  <th style={{ padding: '1.5rem', textAlign: 'left' }}>Service Area</th>
                  <th style={{ padding: '1.5rem', textAlign: 'left' }}>Review Frequency</th>
                  <th style={{ padding: '1.5rem', textAlign: 'left' }}>Focus Level</th>
                  <th style={{ padding: '1.5rem', textAlign: 'left' }}>Advisory Mode</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1.5rem', fontWeight: 600 }}>Wealth Creation</td>
                  <td style={{ padding: '1.5rem' }}>Quarterly</td>
                  <td style={{ padding: '1.5rem' }}>High Growth</td>
                  <td style={{ padding: '1.5rem' }}>Active</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1.5rem', fontWeight: 600 }}>Retirement Income</td>
                  <td style={{ padding: '1.5rem' }}>Semi-Annual</td>
                  <td style={{ padding: '1.5rem' }}>Preservation</td>
                  <td style={{ padding: '1.5rem' }}>Passive/Balanced</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1.5rem', fontWeight: 600 }}>Risk Protection</td>
                  <td style={{ padding: '1.5rem' }}>Annual</td>
                  <td style={{ padding: '1.5rem' }}>Safety</td>
                  <td style={{ padding: '1.5rem' }}>Fixed</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            * All advisory services are subject to mutual fund distributor disclaimers. We provide non-discretionary advisory.
          </p>
        </div>
      </section>

      <Footer />
    </main >
  );
}
