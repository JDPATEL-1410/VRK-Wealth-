import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Award,
  CheckCircle2,
  BarChart3,
  Heart,
  GraduationCap,
  Home as HomeIcon,
  Car,
  Plane,
  Baby,
  Calculator,
  PieChart,
  LineChart,
  Goal,
  Phone,
  Calendar,
  ChevronDown,
  Target, // Added for process and services
  Shield, // Added for process and services
  TrendingUp, // Added for services
  ArrowRight // Added for CTAs
} from 'lucide-react';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function HomeLight() {
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [openFaq, setOpenFaq] = useState<number | null>(null);


  const services = [
    {
      title: 'Mutual Funds',
      description: 'Expert guidance on selecting the right mutual fund schemes based on your goals, risk profile, and investment horizon.',
      icon: BarChart3,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      color: 'blue'
    },
    {
      title: 'Goal-Based Investing',
      description: 'Customized investment plans for retirement, child education, home purchase, and other life goals.',
      icon: Target,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
      color: 'teal'
    },
    {
      title: 'Stocks & Equity Guidance',
      description: 'Strategic guidance on equity investments with focus on quality stocks and long-term value creation.',
      icon: TrendingUp,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
      color: 'green'
    },
    {
      title: 'Fixed Deposits',
      description: 'Access to competitive FD rates from top banks and NBFCs for your debt allocation needs.',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop',
      color: 'purple'
    },
    {
      title: 'Tax Planning',
      description: 'Strategic tax planning through ELSS funds and other tax-saving investment options under Section 80C.',
      icon: Calculator,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop',
      color: 'orange'
    },
    {
      title: 'Life Insurance',
      description: 'Comprehensive life insurance solutions including term plans and ULIPs for financial security.',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
      color: 'red'
    },
    {
      title: 'Health Insurance',
      description: 'Medical and health insurance plans to protect you and your family from healthcare expenses.',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop',
      color: 'pink'
    },
    {
      title: 'Specialised Funds (SIF)',
      description: 'Access to AIFs, PMSs and other specialized investment products for HNI clients.',
      icon: Award,
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop',
      color: 'indigo'
    }
  ];

  const goals = [
    { icon: GraduationCap, title: 'Child Education', color: 'text-blue-600', link: '/calculators/education' },
    { icon: Heart, title: 'Child Marriage', color: 'text-pink-600', link: '/calculators/marriage' },
    { icon: HomeIcon, title: 'Dream Home', color: 'text-green-600', link: '/calculators/home' },
    { icon: Car, title: 'Vehicle Purchase', color: 'text-orange-600', link: '/calculators/car' },
    { icon: Plane, title: 'World Travel', color: 'text-purple-600', link: '/calculators/vacation' },
    { icon: Baby, title: 'Retirement', color: 'text-teal-600', link: '/calculators/retirement' }
  ];

  const process = [
    {
      step: '01',
      title: 'Understand Your Goals',
      description: 'We begin by understanding your financial aspirations, life goals, and investment objectives.',
      icon: Target,
      color: 'blue'
    },
    {
      step: '02',
      title: 'Assess Risk & Time Horizon',
      description: 'Evaluate your risk tolerance and investment time horizon to create a suitable strategy.',
      icon: Shield,
      color: 'teal'
    },
    {
      step: '03',
      title: 'Build Asset Allocation',
      description: 'Design optimal asset allocation across equity, debt, and other asset classes.',
      icon: PieChart,
      color: 'green'
    },
    {
      step: '04',
      title: 'Implement Investments',
      description: 'Execute the investment plan with carefully selected mutual funds and financial products.',
      icon: CheckCircle2,
      color: 'purple'
    },
    {
      step: '05',
      title: 'Review & Rebalance',
      description: 'Regular portfolio reviews and rebalancing to keep you on track towards your goals.',
      icon: LineChart,
      color: 'orange'
    }
  ];

  const tools = [
    {
      title: 'SIP Calculator',
      description: 'Calculate potential returns from systematic investment plans',
      icon: Calculator,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Lumpsum Calculator',
      description: 'Estimate returns on one-time investments',
      icon: PieChart,
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Retirement Planner',
      description: 'Plan your retirement corpus and monthly savings',
      icon: LineChart,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Goal Planning Tool',
      description: 'Calculate monthly SIP needed for your financial goals',
      icon: Goal,
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Patel',
      role: 'Business Owner',
      content: 'VRK Wealth helped me plan my retirement systematically. Their goal-based approach and regular reviews give me confidence about my financial future.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'IT Professional',
      content: 'The transparency and education-first approach is what I appreciate most. They explain everything clearly without any sales pressure.',
      rating: 5
    },
    {
      name: 'Amit Desai',
      role: 'Entrepreneur',
      content: 'Excellent service for mutual fund investments. The team is knowledgeable, responsive, and truly cares about client goals.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'What is the minimum amount to start a SIP?',
      answer: 'You can start a SIP with as little as ₹500 per month. We recommend starting with an amount you can comfortably invest regularly and increasing it as your income grows.'
    },
    {
      question: 'How is VRK Wealth compensated?',
      answer: 'VRK Wealth is an AMFI registered mutual fund distributor. We earn trail commission from Asset Management Companies (AMCs) on the regular plans we distribute. This commission is already factored into the fund NAV and does not involve any additional charges to you.'
    },
    {
      question: 'What is the difference between Regular and Direct plans?',
      answer: 'Direct plans have lower expense ratios as they don\'t include distributor commission, while Regular plans include distributor commission for the advisory and service provided. We distribute Regular plans and provide ongoing advisory, portfolio review, and investor support.'
    },
    {
      question: 'How often should I review my portfolio?',
      answer: 'We recommend reviewing your portfolio at least twice a year or whenever there is a significant change in your financial situation. Our team conducts regular portfolio reviews and reaches out to you with recommendations.'
    },
    {
      question: 'Are mutual fund investments safe?',
      answer: 'Mutual funds are subject to market risks. While they are regulated by SEBI and managed by professional fund managers, the value of your investment can go up or down based on market conditions. We help you choose funds aligned with your risk profile and time horizon.'
    },
    {
      question: 'Can I withdraw my investment anytime?',
      answer: 'Yes, most mutual funds (except ELSS with 3-year lock-in) allow redemption anytime. However, we recommend staying invested for the long term to benefit from compounding and achieve your financial goals.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Premium Reimagined Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-24 pb-12">
        {/* Background Sophistication */}
        <div className="absolute inset-0 z-0">
          {/* Subtle Parallax Background Gradient */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-[120px] opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tl from-teal-50 to-transparent rounded-full blur-[100px] opacity-60"></div>

          {/* Noise/Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge Section */}
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-50 border border-slate-100 rounded-full mb-10 shadow-sm hover:shadow-md transition-all group cursor-default">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors">
                  AMFI Registered Mutual Fund Distributor
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 leading-[0.95] mb-10 tracking-tight">
                Save <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#1e3a8a] via-blue-600 to-teal-500 bg-clip-text text-transparent">Today.</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="absolute bottom-4 left-0 h-4 bg-blue-100/50 -z-10 rounded-full"
                  ></motion.span>
                </span><br />
                Secure <span className="bg-gradient-to-r from-teal-500 via-teal-400 to-[#1e3a8a] bg-clip-text text-transparent italic">Tomorrow.</span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-slate-600 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
                Expert financial stewardship for the modern family. We transform your financial aspirations into disciplined, goal-based reality.
              </p>

              {/* Premium Actions */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-24">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-5 bg-[#1e3a8a] text-white rounded-[2.5rem] font-black text-xl shadow-2xl shadow-blue-900/40 overflow-hidden flex items-center gap-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <span className="relative z-10 uppercase tracking-[0.1em]">Consult An Expert</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                </motion.a>

                <motion.a
                  href="/calculators"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-12 py-5 bg-white text-[#1e3a8a] border-2 border-slate-100 rounded-[2.5rem] font-black text-xl shadow-xl hover:border-blue-600 transition-all uppercase tracking-[0.1em]"
                >
                  Explore Strategies
                </motion.a>
              </div>

              {/* Floating Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  { icon: Target, title: "Goal Focused", desc: "Strategy aligned with life milestones", color: "blue" },
                  { icon: Shield, title: "Risk Managed", desc: "Scientific approach to capital safety", color: "teal" },
                  { icon: GraduationCap, title: "Unbiased Advice", desc: "Transparent, research-backed insights", color: "indigo" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + (i * 0.2) }}
                    whileHover={{ y: -8 }}
                    className="p-8 bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 group"
                  >
                    <div className={`w-14 h-14 bg-${item.color}-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-sm font-medium text-slate-500">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Foreground Graphic Elements */}
        <div className="absolute right-[-10%] top-[20%] w-[30%] h-[30%] pointer-events-none -z-10 group">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border-[1px] border-blue-100/50 rounded-full"
          ></motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-teal-200 rounded-full blur-sm"></div>
        </div>
      </section>


      {/* Financial Goals Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Are Your <span className="text-blue-600">Financial Goals?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether it's education, marriage, home, or retirement - we help you plan for every milestone
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {goals.map((goal, index) => (
              <motion.a
                key={index}
                href={goal.link}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-white p-6 rounded-2xl text-center shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 block"
              >
                <goal.icon className={`w-12 h-12 mx-auto mb-4 ${goal.color}`} />
                <h3 className="text-sm font-semibold text-gray-900">{goal.title}</h3>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <motion.section
        ref={servicesRef}
        initial="hidden"
        animate={servicesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-teal-600">Services</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to your needs
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {services.slice(0, 6).map((service, index) => (
              <motion.a
                key={index}
                href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex items-center text-teal-600 font-semibold group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="text-center">
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Explore All Services
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* How We Work Section */}
      <motion.section
        ref={processRef}
        initial="hidden"
        animate={processInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-24 bg-gradient-to-br from-gray-50 to-teal-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How We <span className="text-blue-600">Work</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our proven 5-step process to help you achieve your financial goals
            </motion.p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center shadow-xl`}>
                      <item.icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-gray-900 border-2 border-gray-200 shadow-lg">
                      {item.step}
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Tools Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Financial <span className="text-teal-600">Tools & Calculators</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Plan your investments with our easy-to-use calculators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
            {tools.map((tool, index) => (
              <motion.a
                key={index}
                href="/calculators"
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-8 rounded-2xl bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-teal-600 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center text-teal-600 font-semibold">
                  Calculate Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href="/calculators"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-xl font-semibold text-lg hover:border-teal-600 hover:text-teal-600 hover:scale-105 transition-all duration-300"
            >
              Explore More Financial Tools
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="text-blue-600">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by over 1000 families across India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <motion.section
        ref={faqRef}
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-teal-600">Questions</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about investing and our services
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-teal-600 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-lg text-gray-900 pr-8">{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-600 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-teal-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTE4LTE4YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Ready to Start Your Wealth Journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl mb-12 text-blue-100"
            >
              Schedule a free consultation with our financial experts and take the first step towards your financial goals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                Schedule Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+919876543210"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Call Now: +91 98765 43210
              </a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-blue-100 text-sm"
            >
              ⭐ Trusted by 1000+ families | 🏆 10+ years of experience | 📈 ₹5000+ Cr AUM
            </motion.p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-gray-100 border-t border-gray-300 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-700">
            <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.
            VRK Wealth is an AMFI registered mutual fund distributor. We distribute Regular Plans and earn trail commission from AMCs.
          </p>
        </div>
      </div>
    </div >
  );
}
