import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';

export default function SiteMap() {
    const sections = [
        {
            title: "Main Pages",
            links: [
                { name: "Homepage", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Our Team", path: "/team" },
                { name: "Contact Us", path: "/contact" },
                { name: "FAQ", path: "/faq" },
            ]
        },
        {
            title: "Services",
            links: [
                { name: "Services Overview", path: "/services" },
                { name: "Investment Planning", path: "/services/investment-planning" },
                { name: "Retirement Solutions", path: "/services/retirement-planning" },
                { name: "Education Planning", path: "/services/education-planning" },
                { name: "Tax Planning", path: "/services/tax-planning" },
                { name: "Insurance Solutions", path: "/services/insurance" },
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Financial Calculators", path: "/calculators" },
                { name: "Knowledge Center", path: "/knowledge" },
                { name: "Client Stories", path: "/clients" },
            ]
        },
        {
            title: "Compliance",
            links: [
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Use", path: "/terms-of-use" },
                { name: "Risk Factors", path: "/risk-factors" },
                { name: "SEBI Disclosures", path: "/disclosures" },
                { name: "Grievance Redressal", path: "/grievance" },
            ]
        }
    ];

    return (
        <main>
            <Navbar />
            <PageHeader title="Site Map" />

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>
                        {sections.map((sec, i) => (
                            <div key={i}>
                                <h3 style={{ marginBottom: '2rem', borderBottom: '2px solid var(--accent)', paddingBottom: '0.5rem', display: 'inline-block' }}>{sec.title}</h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {sec.links.map((link, j) => (
                                        <li key={j}>
                                            <Link href={link.path} style={{ color: 'var(--text-main)', fontWeight: 500 }}>{link.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
