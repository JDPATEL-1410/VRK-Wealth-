import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { PiggyBank, Target, TrendingUp, Wallet, Calculator, Shield, Heart, Briefcase, ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      title: 'Mutual Funds',
      icon: PiggyBank,
      description: 'Professionally managed diversified investment portfolios across equity, debt, and hybrid categories. Access to top-performing mutual fund schemes from leading AMCs with comprehensive research and selection support.',
      link: '/services/mutual-funds',
      color: 'blue'
    },
    {
      title: 'Goal-Based Investing',
      icon: Target,
      description: 'Customized investment strategies aligned with your specific life goals such as retirement, children\'s education, home purchase, or wealth creation. We create targeted plans with defined timelines and realistic targets.',
      link: '/services/goal-based-investing',
      color: 'teal'
    },
    {
      title: 'Stocks & Equity Guidance',
      icon: TrendingUp,
      description: 'Research-driven stock recommendations and equity portfolio management guidance for investors looking to build direct equity positions. Fundamental and technical analysis support for informed decision-making.',
      link: '/services/stocks-equity',
      color: 'green'
    },
    {
      title: 'Fixed Deposits',
      icon: Wallet,
      description: 'Safe and stable fixed deposit options from leading banks and NBFCs offering competitive interest rates. Ideal for capital preservation and guaranteed returns with flexible tenure options.',
      link: '/services/fixed-deposits',
      color: 'purple'
    },
    {
      title: 'Tax Planning',
      icon: Calculator,
      description: 'Strategic tax-saving investment solutions under Section 80C, 80D, and other provisions of the Income Tax Act. Optimize your tax liability while building wealth through ELSS, PPF, NPS, and other instruments.',
      link: '/services/tax-planning',
      color: 'orange'
    },
    {
      title: 'Life Insurance',
      icon: Shield,
      description: 'Comprehensive life insurance coverage including term plans, endowment policies, and ULIPs to protect your family\'s financial future. Get the right coverage at the most competitive premiums.',
      link: '/services/life-insurance',
      color: 'red'
    },
    {
      title: 'Health & General Insurance',
      icon: Heart,
      description: 'Medical insurance plans covering hospitalization, critical illness, and family floater options. Also offering motor, home, and travel insurance for complete protection against unforeseen events.',
      link: '/services/health-insurance',
      color: 'pink'
    },
    {
      title: 'Specialised Investment Funds (SIF)',
      icon: Briefcase,
      description: 'Alternative investment opportunities including AIFs, PMSs, and structured products for qualified investors seeking portfolio diversification beyond traditional asset classes.',
      link: '/services/specialised-investment-fund',
      color: 'indigo'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader
        title="Our"
        highlightedText="Services"
        subtitle="Comprehensive financial solutions tailored to your investment goals and life stages"
        icon={<Briefcase className="w-16 h-16 text-teal-600" />}
      />

      <section className="py-20" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-teal-100 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-${service.color}-50 flex items-center justify-center mb-6 group-hover:bg-${service.color}-100 transition-colors`}>
                  <service.icon className={`w-8 h-8 text-${service.color}-600`} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-4">
                  {service.description}
                </p>

                <Link
                  to={service.link}
                  className="inline-flex items-center text-teal-600 font-semibold group-hover:gap-2 transition-all"
                >
                  Know More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Not Sure Which Service is Right for You?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Book a free consultation with our advisors and we'll help you choose the right solutions for your goals
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Talk to an Advisor
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
