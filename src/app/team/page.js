import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Team() {
    const team = [
        { name: "S. Rama Krishnan", role: "Principal Advisor & Founder", exp: "25+ Years", qual: "CFP, NISM Certified", bio: "With over two decades of experience, Rama has been the guiding force behind VRK Wealth's disciplined approach." },
        { name: "J. Krishna Murali", role: "Senior Financial Planner", exp: "15+ Years", qual: "MBA Finance, NISM", bio: "Specializes in retirement planning and complex estate planning strategies for HNI clients." },
        { name: "Anita Deshmukh", role: "Investment Strategist", exp: "10+ Years", qual: "CFA, NISM", bio: "Leads the fund research desk, ensuring every internal recommendation meets our quantitative standards." },
    ];

    return (
        <main>
            <Navbar />
            <PageHeader
                title="Meet Our Advisors"
                subtitle="Professional expertise combined with personal commitment."
            />

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                        {team.map((member, i) => (
                            <div key={i} style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                borderRadius: '1.5rem',
                                overflow: 'hidden',
                                transition: 'var(--transition)'
                            }} className="team-card">
                                <div style={{ height: '300px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--primary)', fontSize: '5rem' }}>
                                    {/* Placeholder for photo */}
                                    <div style={{ width: '100%', textAlign: 'center', opacity: 0.1 }}>PHOTO</div>
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <h3 style={{ marginBottom: '0.25rem' }}>{member.name}</h3>
                                    <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1rem' }}>{member.role}</p>

                                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                                        <div><strong>Exp:</strong> {member.exp}</div>
                                        <div><strong>Qual:</strong> {member.qual}</div>
                                    </div>

                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', minHeight: '80px' }}>{member.bio}</p>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <a href="#" style={{ color: 'var(--primary)' }}><FaLinkedin /></a>
                                            <a href="#" style={{ color: 'var(--primary)' }}><FaEnvelope /></a>
                                        </div>
                                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>View Profile</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--surface)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Join Our Vision</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-muted)' }}>
                        We are always looking for passionate financial professionals who share our values of
                        transparency and client-first ethics.
                    </p>
                    <button className="btn btn-primary">Work With Us</button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
