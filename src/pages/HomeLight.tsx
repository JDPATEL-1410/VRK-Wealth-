import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  Award, CheckCircle2, BarChart3, Heart, GraduationCap,
  Home as HomeIcon, Car, Plane, Baby, Calculator, PieChart,
  LineChart, Goal, Phone, Calendar, ChevronDown, Target,
  Shield, TrendingUp, ArrowRight, Star, Users, Briefcase, IndianRupee
} from 'lucide-react';
import { useState } from 'react';

import type { Variants } from 'framer-motion';
const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } };
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const MotionLink = motion(Link);

export default function HomeLight() {
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    { title: 'Mutual Funds', description: 'Expert guidance on selecting the right mutual fund schemes based on your goals, risk profile, and investment horizon.', icon: BarChart3, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80', link: '/services/mutual-funds', color: 'from-blue-500 to-blue-700' },
    { title: 'Goal-Based Investing', description: 'Customized investment plans for retirement, child education, home purchase, and other life goals.', icon: Target, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80', link: '/services/goal-based-investing', color: 'from-teal-500 to-teal-700' },
    { title: 'Stocks & Equity', description: 'Strategic guidance on equity investments with focus on quality stocks and long-term value creation.', icon: TrendingUp, image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80', link: '/services/stocks-equity', color: 'from-green-500 to-emerald-700' },
    { title: 'Fixed Deposits', description: 'Access to competitive FD rates from top banks and NBFCs for your debt allocation needs.', icon: Shield, image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80', link: '/services/fixed-deposits', color: 'from-purple-500 to-purple-700' },
    { title: 'Tax Planning', description: 'Strategic tax planning through ELSS funds and other tax-saving investment options under Section 80C.', icon: Calculator, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80', link: '/services/tax-planning', color: 'from-orange-500 to-orange-700' },
    { title: 'Life Insurance', description: 'Comprehensive life insurance solutions including term plans and ULIPs for financial security.', icon: Heart, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80', link: '/services/life-insurance', color: 'from-rose-500 to-rose-700' },
  ];




  const process = [
    { step: '01', title: 'Understand Your Goals', description: 'We begin by understanding your financial aspirations, life goals, and investment objectives through a detailed discovery session.', icon: Target, color: 'blue' },
    { step: '02', title: 'Assess Risk & Time Horizon', description: 'Evaluate your risk tolerance and investment time horizon to create a suitable, personalized strategy.', icon: Shield, color: 'teal' },
    { step: '03', title: 'Build Asset Allocation', description: 'Design optimal asset allocation across equity, debt, and other asset classes for maximum risk-adjusted returns.', icon: PieChart, color: 'green' },
    { step: '04', title: 'Implement Investments', description: 'Execute the investment plan with carefully selected mutual funds and financial products aligned to your goals.', icon: CheckCircle2, color: 'purple' },
    { step: '05', title: 'Review & Rebalance', description: 'Regular portfolio reviews and rebalancing to keep you on track towards your goals as markets evolve.', icon: LineChart, color: 'orange' },
  ];

  const stats = [
    { icon: Users, value: '1000+', label: 'Happy Families', color: 'text-blue-600' },
    { icon: IndianRupee, value: '₹500 Cr+', label: 'Assets Managed', color: 'text-teal-600' },
    { icon: Briefcase, value: '10+', label: 'Years Experience', color: 'text-purple-600' },
    { icon: Award, value: 'AMFI', label: 'Registered Distributor', color: 'text-amber-600' },
  ];

  const testimonials = [
    { name: 'Rajesh Patel', role: 'Business Owner', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', content: 'VRK Wealth helped me plan my retirement systematically. Their goal-based approach and regular reviews give me confidence about my financial future.', rating: 5 },
    { name: 'Priya Sharma', role: 'IT Professional', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', content: 'The transparency and education-first approach is what I appreciate most. They explain everything clearly without any sales pressure.', rating: 5 },
    { name: 'Amit Desai', role: 'Entrepreneur', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80', content: 'Excellent service for mutual fund investments. The team is knowledgeable, responsive, and truly cares about client goals.', rating: 5 },
  ];

  const faqs = [
    { question: 'What is the minimum amount to start a SIP?', answer: 'You can start a SIP with as little as ₹500 per month. We recommend starting with an amount you can comfortably invest regularly and increasing it as your income grows.' },
    { question: 'How is VRK Wealth compensated?', answer: 'VRK Wealth is an AMFI registered mutual fund distributor. We earn trail commission from Asset Management Companies (AMCs) on the regular plans we distribute. This commission is already factored into the fund NAV and does not involve any additional charges to you.' },
    { question: 'What is the difference between Regular and Direct plans?', answer: "Direct plans have lower expense ratios as they don't include distributor commission, while Regular plans include distributor commission for the advisory and service provided. We distribute Regular plans and provide ongoing advisory, portfolio review, and investor support." },
    { question: 'How often should I review my portfolio?', answer: 'We recommend reviewing your portfolio at least twice a year or whenever there is a significant change in your financial situation. Our team conducts regular portfolio reviews and reaches out to you with recommendations.' },
    { question: 'Are mutual fund investments safe?', answer: 'Mutual funds are subject to market risks. While they are regulated by SEBI and managed by professional fund managers, the value of your investment can go up or down based on market conditions. We help you choose funds aligned with your risk profile and time horizon.' },
    { question: 'Can I withdraw my investment anytime?', answer: 'Yes, most mutual funds (except ELSS with 3-year lock-in) allow redemption anytime. However, we recommend staying invested for the long term to benefit from compounding and achieve your financial goals.' },
  ];

  return (
    <div className="bg-white font-['Inter',sans-serif]">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&auto=format&fit=crop&q=80"
            alt="Financial district"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/90 via-[#1e3a8a]/75 to-[#0d9488]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-8 pb-16">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-pulse" />
                <span className="text-xs font-bold text-white/90 uppercase tracking-[0.2em]">AMFI Registered Mutual Fund Distributor</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.0] mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Save <span className="text-[#d4af37] italic">Today.</span>
                <br />
                Secure <span className="text-[#0d9488]">Tomorrow.</span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                Expert financial stewardship for the modern Indian family. We transform your financial aspirations into disciplined, goal-based reality.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <MotionLink
                  to="/contact"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group px-8 py-4 bg-[#d4af37] text-white rounded-2xl font-bold text-lg shadow-2xl shadow-amber-900/30 flex items-center justify-center gap-2 hover:bg-[#e6c965] transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </MotionLink>
                <MotionLink
                  to="/calculators"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Try Calculators
                </MotionLink>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center"
                  >
                    <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-white/70 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </section>

      {/* ── GOALS SECTION ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-white">
        {/* Decorative background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-[#1e3a8a] rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-pulse" />
              Life Goals
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Are Your{' '}
              <span className="text-[#1e3a8a] relative inline-block">
                Financial Goals?
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10 Q75 2 150 8 Q225 14 298 6" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Every milestone deserves a plan. Tell us your dream — we'll build the roadmap to get you there.
            </p>
          </motion.div>

          {/* Goal cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {[
              {
                icon: GraduationCap,
                title: 'Child Education',
                subtitle: "Invest today for tomorrow's scholars",
                link: '/calculators/education',
                img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
                gradient: 'from-blue-900/85 via-blue-800/50 to-transparent',
                accent: '#3b82f6',
                badge: 'Education Fund',
              },
              {
                icon: Heart,
                title: 'Child Marriage',
                subtitle: 'Make their special day unforgettable',
                link: '/calculators/marriage',
                img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80',
                gradient: 'from-pink-900/85 via-pink-800/50 to-transparent',
                accent: '#ec4899',
                badge: 'Wedding Fund',
              },
              {
                icon: HomeIcon,
                title: 'Dream Home',
                subtitle: "Own the home you've always envisioned",
                link: '/calculators/home',
                img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80',
                gradient: 'from-emerald-900/85 via-emerald-800/50 to-transparent',
                accent: '#10b981',
                badge: 'Home Fund',
              },
              {
                icon: Car,
                title: 'Vehicle Purchase',
                subtitle: 'Drive your dream without financial stress',
                link: '/calculators/car',
                img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
                gradient: 'from-orange-900/85 via-orange-800/50 to-transparent',
                accent: '#f97316',
                badge: 'Vehicle Fund',
              },
              {
                icon: Plane,
                title: 'World Travel',
                subtitle: 'Explore the globe without breaking the bank',
                link: '/calculators/vacation',
                img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80',
                gradient: 'from-purple-900/85 via-purple-800/50 to-transparent',
                accent: '#a855f7',
                badge: 'Travel Fund',
              },
              {
                icon: Baby,
                title: 'Retirement',
                subtitle: 'Retire comfortably on your own terms',
                link: '/calculators/retirement',
                img: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80',
                gradient: 'from-teal-900/85 via-teal-800/50 to-transparent',
                accent: '#0d9488',
                badge: 'Retirement Corpus',
              },
            ].map((goal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <MotionLink
                  to={goal.link}
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative block rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                  style={{ height: '280px' }}
                >
                  {/* Background image */}
                  <img
                    src={goal.img}
                    alt={goal.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${goal.gradient}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Top badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20"
                      style={{ backgroundColor: `${goal.accent}55` }}
                    >
                      <goal.icon className="w-3 h-3" />
                      {goal.badge}
                    </span>
                  </div>

                  {/* Arrow button top-right */}
                  <div className="absolute top-4 right-4 w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-lg backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${goal.accent}44` }}
                    >
                      <goal.icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-black text-white mb-1 leading-tight">{goal.title}</h3>
                    <p className="text-white/70 text-xs font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {goal.subtitle}
                    </p>

                    {/* Plan now CTA */}
                    <div className="flex items-center gap-1.5 mt-3 text-white/60 text-xs font-bold group-hover:text-white transition-colors duration-300">
                      <span>Plan Now</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </MotionLink>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-slate-500 text-sm mb-5">Not sure where to start? Our advisors will help you prioritize.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] text-white rounded-2xl font-bold text-base shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Talk to a Financial Advisor
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES SECTION ──────────────────────────────────────────── */}
      <motion.section
        ref={servicesRef}
        initial="hidden"
        animate={servicesInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-teal-100 to-blue-100 text-[#0d9488] rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#1e3a8a] animate-pulse" />
              What We Offer
            </span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-slate-900 mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our{' '}
              <span className="text-[#0d9488] relative inline-block">
                Services
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10 Q50 2 100 8 Q150 14 198 6" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Comprehensive financial solutions tailored to your unique needs and goals
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {services.map((service, i) => (
              <MotionLink
                key={i}
                to={service.link}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-400"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className={`absolute top-4 right-4 w-10 h-10 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-black text-white">{service.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.description}</p>
                  <div className="flex items-center text-[#0d9488] font-bold text-sm group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </MotionLink>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="text-center">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] text-white rounded-2xl font-bold text-base shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Explore All Services <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Why VRK Wealth</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Trusted Financial Partner
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                With over a decade of experience and 1000+ satisfied families, we bring transparency, expertise, and genuine care to every financial decision.
              </p>
              <div className="space-y-4">
                {[
                  'Goal-based, not product-based approach',
                  'Complete transparency in fees & commissions',
                  'Regular portfolio reviews & rebalancing',
                  'Education-first, no pressure selling',
                  'SEBI & AMFI regulated, fully compliant',
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#d4af37] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90 font-medium">{point}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-white rounded-2xl font-bold hover:bg-[#e6c965] transition-colors shadow-lg">
                  Learn About Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80"
                  alt="Financial advisor meeting"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/40 to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">₹500 Cr+</p>
                    <p className="text-xs text-slate-500 font-medium">Assets Under Management</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">10+ Yrs</p>
                    <p className="text-xs text-slate-500 font-medium">Trusted Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ───────────────────────────────────────────────── */}
      <motion.section
        ref={processRef}
        initial="hidden"
        animate={processInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="py-20 bg-slate-50"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              Our Process
            </span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-slate-900 mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              How We{' '}
              <span className="text-[#1e3a8a] relative inline-block">
                Work
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 12" fill="none">
                  <path d="M2 10 Q30 2 60 8 Q90 14 118 6" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Our proven 5-step process to help you achieve your financial goals
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 mb-6 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-shrink-0 flex items-center gap-4 md:block">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] flex items-center justify-center shadow-xl">
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg">
                      {item.step}
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white p-7 rounded-3xl shadow-md border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CALCULATORS ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-100 to-teal-100 text-green-700 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-pulse" />
              Free Tools
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Financial{' '}
              <span className="text-[#0d9488] relative inline-block">
                Calculators
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 260 12" fill="none">
                  <path d="M2 10 Q65 2 130 8 Q195 14 258 6" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">Plan your investments with our easy-to-use, free calculators</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-10">
            {[
              { title: 'SIP Calculator', desc: 'Calculate potential returns from systematic investment plans', icon: Calculator, gradient: 'from-blue-500 to-blue-700', link: '/calculators/sip', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=80' },
              { title: 'Lumpsum Calculator', desc: 'Estimate returns on one-time investments', icon: PieChart, gradient: 'from-teal-500 to-teal-700', link: '/calculators/lumpsum', img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&auto=format&fit=crop&q=80' },
              { title: 'Retirement Planner', desc: 'Plan your retirement corpus and monthly savings', icon: LineChart, gradient: 'from-purple-500 to-purple-700', link: '/calculators/retirement', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop&q=80' },
              { title: 'Goal Planning', desc: 'Calculate monthly SIP needed for your financial goals', icon: Goal, gradient: 'from-orange-500 to-orange-700', link: '/calculators/goal', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=80' },
            ].map((tool, i) => (
              <MotionLink
                key={i}
                to={tool.link}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-36 overflow-hidden relative">
                  <img src={tool.img} alt={tool.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute top-3 right-3 w-9 h-9 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <tool.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-black text-slate-900 mb-2 group-hover:text-[#0d9488] transition-colors">{tool.title}</h3>
                  <p className="text-slate-500 text-xs mb-3 leading-relaxed">{tool.desc}</p>
                  <div className="flex items-center text-[#0d9488] font-bold text-xs">
                    Calculate Now <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </MotionLink>
            ))}
          </div>

          <div className="text-center">
            <Link to="/calculators" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-[#1e3a8a] transition-colors shadow-xl hover:shadow-2xl hover:scale-105 duration-300">
              Explore All 16 Calculators <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Client Stories
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Our{' '}
              <span className="text-[#1e3a8a] relative inline-block">
                Clients Say
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 230 12" fill="none">
                  <path d="M2 10 Q57 2 115 8 Q172 14 228 6" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">Trusted by over 1000 families across India</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed italic text-sm">"{t.content}"</p>
                <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#0d9488]" />
                  <div>
                    <p className="font-black text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <motion.section
        ref={faqRef}
        initial="hidden"
        animate={faqInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-[#1e3a8a] rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-pulse" />
              FAQ
            </span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-slate-900 mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frequently Asked{' '}
              <span className="text-[#0d9488] relative inline-block">
                Questions
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 230 12" fill="none">
                  <path d="M2 10 Q57 2 115 8 Q172 14 228 6" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Get answers to common questions about investing and our services
            </motion.p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#0d9488] transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-7 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 pr-6 text-sm md:text-base">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#0d9488] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-5 text-slate-600 leading-relaxed text-sm border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1920&auto=format&fit=crop&q=80"
            alt="Wealth planning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/95 via-[#1e3a8a]/85 to-[#0d9488]/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Start Today</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Start Your Wealth Journey?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Schedule a free consultation with our financial experts and take the first step towards your financial goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#d4af37] text-white rounded-2xl font-bold text-lg shadow-2xl hover:bg-[#e6c965] hover:scale-105 transition-all duration-300">
                  <Calendar className="w-5 h-5" />
                  Schedule Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+919876543210" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
              <p className="mt-8 text-white/60 text-sm">
                ⭐ Trusted by 1000+ families &nbsp;|&nbsp; 🏆 10+ years of experience &nbsp;|&nbsp; 📈 ₹500+ Cr AUM
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ────────────────────────────────────────────────── */}
      <div className="bg-slate-100 border-t border-slate-200 py-5">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-slate-600 leading-relaxed">
            <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.
            VRK Wealth is an AMFI registered mutual fund distributor. We distribute Regular Plans and earn trail commission from AMCs.
          </p>
        </div>
      </div>
    </div>
  );
}
