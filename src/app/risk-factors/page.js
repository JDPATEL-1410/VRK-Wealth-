import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function RiskFactors() {
    return (
        <main>
            <Navbar />
            <PageHeader title="Risk Factors & Investor Education" />

            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ background: '#FFFBEB', border: '1px solid #FEF3C7', padding: '2.5rem', borderRadius: '1.5rem', marginBottom: '4rem', display: 'flex', gap: '2rem' }}>
                        <FaExclamationTriangle size={40} color="#D97706" style={{ flexShrink: 0 }} />
                        <div>
                            <h3 style={{ color: '#92400E', marginBottom: '1rem' }}>Mandatory Risk Disclosure</h3>
                            <p style={{ color: '#92400E', lineHeight: 1.6 }}>
                                Mutual Fund investments are subject to market risks. Please read all scheme-related
                                documents carefully before investing. Past performance is no guarantee of future returns.
                            </p>
                        </div>
                    </div>

                    <div style={{ lineHeight: 1.8 }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>1. Market Risk</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            The Net Asset Value (NAV) of the schemes can go up or down depending on the factors and
                            forces affecting the capital markets. These include changes in interest rates,
                            trading volumes, settlement periods and transfer procedures.
                        </p>

                        <h3 style={{ marginBottom: '1.5rem' }}>2. Liquidity Risk</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Certain investments may be difficult to buy or sell, especially during market
                            stress. This might affect the fund manager's ability to fulfill redemption requests
                            immediately.
                        </p>

                        <h3 style={{ marginBottom: '1.5rem' }}>3. Credit Risk</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Debt funds are exposed to the risk of the issuer of a fixed income security defaulting
                            on interest or principal payments.
                        </p>

                        <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--primary)', color: 'white', borderRadius: '2rem' }}>
                            <h3 style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Investor Education</h3>
                            <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                                An educated investor is a protected investor. We encourage all clients to visit the
                                <strong> AMFI Investor Education</strong> portal and <strong>SEBI SCORES</strong>
                                platform to understand their rights and responsibilities.
                            </p>
                            <button className="btn btn-secondary">Download Investor Kit</button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
