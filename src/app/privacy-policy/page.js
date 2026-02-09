import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

export default function PrivacyPolicy() {
    return (
        <main>
            <Navbar />
            <PageHeader title="Privacy Policy" subtitle="Last Updated: January 31, 2026" />

            <section className="section">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ lineHeight: 1.8, color: 'var(--text-main)' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>1. Introduction</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            VRK Wealth ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services.
                        </p>

                        <h3 style={{ marginBottom: '1.5rem' }}>2. Information Collection</h3>
                        <p style={{ marginBottom: '1rem' }}>We collect information that you provide to us directly, including:</p>
                        <ul style={{ marginBottom: '2rem', paddingLeft: '2rem', listStyle: 'disc' }}>
                            <li>Name and Contact Information</li>
                            <li>Financial information for investment planning</li>
                            <li>KYC documents (PAN, Aadhaar) as required by SEBI/AMFI</li>
                            <li>Usage data (IP address, browser type)</li>
                        </ul>

                        <h3 style={{ marginBottom: '1.5rem' }}>3. How We Use Your Data</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Your data is primarily used to provide advisory services, execute mutual fund transactions via authorized platforms, and comply with regulatory requirements from AMFI and SEBI. We do not sell your data to third parties.
                        </p>

                        <h3 style={{ marginBottom: '1.5rem' }}>4. Security</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            We implement industry-standard security measures to protect your digital assets and information. However, no method of transmission over the internet is 100% secure.
                        </p>

                        <h3 style={{ marginBottom: '1.5rem' }}>5. Contact Us</h3>
                        <p>
                            For any privacy-related queries, please contact our Compliance Officer at compliance@vrkwealth.com.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
