import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { FaHistory, FaGem, FaBullseye, FaLightbulb } from 'react-icons/fa';

export default function About() {
    const values = [
        { title: "Transparency", desc: "No hidden costs or complicated jargon. We believe in absolute clarity in our advisory.", icon: <FaGem /> },
        { title: "Discipline", desc: "Rigorous execution of goal-based strategies, ensuring you stay on track regardless of market noise.", icon: <FaBullseye /> },
        { title: "Customisation", desc: "Your life goals are unique. Your financial plan should be too.", icon: <FaLightbulb /> },
        { title: "Ethical Advisory", desc: "Putting your interests first, every single time. Fiduciary responsibility is at our core.", icon: <FaHistory /> },
    ];

    return (
        <main>
            <Navbar />
            <PageHeader
                title="Our Heritage & Philosophy"
                subtitle="Empowering families since 1997 with disciplined financial strategies."
            />

            {/* Our Journey */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ marginBottom: '2rem' }}>Our Journey</h2>
                            <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-2.45rem', top: '0', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>1997 - The Foundation</h4>
                                    <p>VRK Wealth was established with a mission to simplify financial planning for retail investors.</p>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-2.45rem', top: '0', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>2010 - Expansion</h4>
                                    <p>Achieved a milestone of advising 200+ families and transitioned to comprehensive goal-based planning.</p>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-2.45rem', top: '0', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Present - Trusted Legacy</h4>
                                    <p>Now advising ₹100Cr+ in assets with a team of specialized advisors and 500+ success stories.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ background: 'var(--surface)', padding: '4rem', borderRadius: '2rem' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Investment Philosophy</h3>
                            <p style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>
                                We don't chase markets; we chase goals. Our philosophy is rooted in
                                <strong> Asset Allocation</strong>, <strong>Diversification</strong>, and <strong>Patience</strong>.
                            </p>
                            <p style={{ lineHeight: 1.8 }}>
                                We believe that long-term wealth is built not by timing the market, but by
                                time in the market. Every portfolio we construct is a result of rigorous quantitative
                                and qualitative analysis.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', color: 'var(--secondary)', marginBottom: '4rem' }}>Our Core Values</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        {values.map((v, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}>{v.icon}</div>
                                <h4 style={{ color: 'white', marginBottom: '1rem' }}>{v.title}</h4>
                                <p style={{ opacity: 0.7, fontSize: '0.95rem' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
