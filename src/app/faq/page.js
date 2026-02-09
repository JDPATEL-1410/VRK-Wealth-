import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

export default function FAQ() {
    const faqs = [
        { q: "What is your advisory fee?", a: "VRK Wealth acts as a Mutual Fund Distributor. We earn commissions from Asset Management Companies (AMCs) as per the structure disclosed on our 'Commission Disclosure' page. We do not charge separate advisory fees to retail clients." },
        { q: "Is registration with SEBI mandatory?", a: "Yes, all financial advisors/distributors must be registered with SEBI and/or AMFI. We are AMFI registered distributors (ARN-XXXXXX)." },
        { q: "Can I track my investments online?", a: "Absolutely. We provide a secure client portal and mobile app where you can track your portfolio, download statements, and execute transactions." },
        { q: "What is the minimum investment amount?", a: "You can start a Systematic Investment Plan (SIP) with as little as ₹500 per month." },
    ];

    return (
        <main>
            <Navbar />
            <PageHeader title="Frequently Asked Questions" subtitle="Clear answers to your common financial queries." />

            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '1.5rem',
                                border: '1px solid var(--border)',
                                transition: 'var(--transition)'
                            }}>
                                <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '1.2rem' }}>{faq.q}</h4>
                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '5rem', textAlign: 'center', background: 'var(--surface)', padding: '4rem', borderRadius: '3rem' }}>
                        <h3>Still have questions?</h3>
                        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>We're here to help you gain clarity.</p>
                        <button className="btn btn-primary">Contact Support</button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
