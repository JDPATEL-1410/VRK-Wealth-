import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { FaHeartbeat, FaHouseUser, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

export default function Retirement() {
    return (
        <main>
            <Navbar />
            <PageHeader
                title="Retirement Solutions"
                subtitle="Ensuring your golden years are lived with dignity and financial independence."
            />

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ marginBottom: '1.5rem' }}>Retire on Your Own Terms</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                                Retirement is not an end; it's a new beginning. We help you build a corpus
                                that handles inflation and provides a steady income for life.
                            </p>

                            <div style={{ display: 'grid', gap: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ color: 'var(--accent)', fontSize: '1.5rem' }}><FaHouseUser /></div>
                                    <div>
                                        <h4>Lifestyle Maintenance</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Ensuring your post-retirement life matches the comfort of your working years.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ color: 'var(--accent)', fontSize: '1.5rem' }}><FaHeartbeat /></div>
                                    <div>
                                        <h4>Healthcare Cushion</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Dedicated planning for rising medical costs in late life.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ color: 'var(--accent)', fontSize: '1.5rem' }}><FaMoneyBillWave /></div>
                                    <div>
                                        <h4>Inflation Hedge</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Strategies to ensure your purchasing power doesn't decline over 30+ years.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ background: 'var(--surface)', padding: '3.5rem', borderRadius: '2rem', border: '1px solid var(--border)' }}>
                            <h3 style={{ marginBottom: '2rem' }}>Strategy Framework</h3>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', listStyle: 'none' }}>
                                <li style={{ padding: '1rem', background: 'white', borderRadius: '0.75rem', borderLeft: '4px solid var(--primary)' }}>
                                    <strong>Accumulation Phase:</strong> Focused growth with aggressive asset allocation.
                                </li>
                                <li style={{ padding: '1rem', background: 'white', borderRadius: '0.75rem', borderLeft: '4px solid var(--primary)' }}>
                                    <strong>Transition Phase:</strong> Gradually moving to low-volatility debt instruments.
                                </li>
                                <li style={{ padding: '1rem', background: 'white', borderRadius: '0.75rem', borderLeft: '4px solid var(--primary)' }}>
                                    <strong>Withdrawal Phase:</strong> Systematic Withdrawal Plans (SWP) for monthly income.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
