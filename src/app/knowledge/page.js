import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { FaSearch, FaFilter, FaBookOpen } from 'react-icons/fa';

export default function KnowledgeCenter() {
    const categories = ["All", "Market Insights", "Regulatory Updates", "Investor Behaviour", "Product Education", "Case Studies"];

    const articles = [
        { title: "Power of Compounding in Real Life", cat: "Investor Behaviour", date: "Jan 25, 2026", desc: "How starting just 5 years earlier can double your retirement corpus." },
        { title: "Budget 2026: Impact on Equity", cat: "Regulatory Updates", date: "Jan 12, 2026", desc: "A deep dive into the new capital gains tax structure and its implications." },
        { title: "Understanding Hybrid Funds", cat: "Product Education", date: "Jan 05, 2026", desc: "Why asset allocation is more important than fund selection." },
        { title: "Market Volatility: Friend or Foe?", cat: "Market Insights", date: "Dec 20, 2025", desc: "Why we see volatility as an opportunity for disciplined SIP investors." },
    ];

    return (
        <main>
            <Navbar />
            <PageHeader
                title="Knowledge Center"
                subtitle="Empowering you with the right information for your financial journey."
            />

            <section className="section">
                <div className="container">
                    {/* Filters */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {categories.map((cat, i) => (
                                <button key={i} style={{
                                    padding: '0.5rem 1.25rem',
                                    borderRadius: '50px',
                                    border: '1px solid var(--border)',
                                    background: i === 0 ? 'var(--primary)' : 'white',
                                    color: i === 0 ? 'white' : 'var(--text-main)',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div style={{ position: 'relative', width: '300px' }}>
                            <input type="text" placeholder="Search articles..." style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '50px', border: '1px solid var(--border)' }} />
                            <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {articles.map((art, i) => (
                            <div key={i} style={{
                                background: 'white',
                                borderRadius: '1.5rem',
                                border: '1px solid var(--border)',
                                overflow: 'hidden',
                                transition: 'var(--transition)'
                            }} className="article-card">
                                <div style={{ height: '200px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FaBookOpen size={40} color="var(--primary)" style={{ opacity: 0.2 }} />
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>{art.cat}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{art.date}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{art.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeights: 1.6 }}>{art.desc}</p>
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 700, padding: 0, cursor: 'pointer' }}>Read Full Article &rarr;</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                        <button className="btn btn-outline">Load More Articles</button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
