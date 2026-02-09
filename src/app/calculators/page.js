import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { FaCalculator, FaRocket, FaLevelUpAlt, FaUmbrella, FaBriefcaseMedical, FaHome } from 'react-icons/fa';
import Link from 'next/link';

export default function Calculators() {
    const tools = [
        { title: "SIP Calculator", desc: "Calculate the future value of your monthly investments.", icon: <FaRocket />, path: "/calculators/sip" },
        { title: "Step-up SIP", desc: "See the impact of increasing your SIP every year.", icon: <FaLevelUpAlt />, path: "/calculators/step-up" },
        { title: "Retirement Planner", desc: "Estimate the corpus needed to sustain your lifestyle.", icon: <FaHome />, path: "/calculators/retirement" },
        { title: "Goal Planner", desc: "Calculate how much to save monthly for specific goals.", icon: <FaCalculator />, path: "/calculators/goal" },
        { title: "Insurance Needs", desc: "Assess the right Life Insurance cover for your family.", icon: <FaUmbrella />, path: "/calculators/insurance" },
        { title: "Emergency Fund", desc: "Calculate your safety net for life's surprises.", icon: <FaBriefcaseMedical />, path: "/calculators/emergency" },
    ];

    return (
        <main>
            <Navbar />
            <PageHeader
                title="Financial Tools & Calculators"
                subtitle="Empowering you with data to make smarter financial decisions."
            />

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {tools.map((t, i) => (
                            <div key={i} style={{
                                background: 'white',
                                padding: '2.5rem',
                                borderRadius: '1.5rem',
                                border: '1px solid var(--border)',
                                transition: 'var(--transition)',
                                cursor: 'pointer'
                            }} className="calc-card">
                                <div style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>{t.icon}</div>
                                <h3 style={{ marginBottom: '1rem' }}>{t.title}</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{t.desc}</p>
                                <button className="btn btn-outline" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>Open Tool</button>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '5rem', background: 'var(--surface)', padding: '3rem', borderRadius: '2rem', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Need a Personalized Plan?</h3>
                        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Calculators provide estimates. Our advisors provide reality checks.</p>
                        <Link href="/contact" className="btn btn-primary">Book a Strategy Session</Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
