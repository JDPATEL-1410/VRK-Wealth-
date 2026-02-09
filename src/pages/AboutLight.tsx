import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Award, Users, TrendingUp, Shield, Heart, BookOpen, CheckCircle2, GraduationCap } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function AboutLight() {
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [philosophyRef, philosophyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [whyRef, whyInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: Target,
      title: 'Goal-Based Planning',
      description: 'We help you define clear financial goals and create actionable plans to achieve them through systematic investing.',
      gradient: 'from-blue-50 to-blue-100'
    },
    {
      icon: TrendingUp,
      title: 'Research-Driven Approach',
      description: 'Our investment recommendations are backed by thorough research and analysis of market trends and fund performance.',
      gradient: 'from-teal-50 to-teal-100'
    },
    {
      icon: Shield,
      title: 'Long-Term Wealth Focus',
      description: 'We focus on sustainable wealth creation through disciplined, long-term investment strategies.',
      gradient: 'from-green-50 to-green-100'
    },
    {
      icon: Users,
      title: 'Regular Portfolio Review',
      description: 'Periodic portfolio reviews and rebalancing ensure your investments stay aligned with your goals.',
      gradient: 'from-purple-50 to-purple-100'
    },
    {
      icon: Award,
      title: 'Transparent & Ethical',
      description: 'Complete transparency in all dealings. We disclose all commissions and maintain highest ethical standards.',
      gradient: 'from-orange-50 to-orange-100'
    },
    {
      icon: GraduationCap,
      title: 'Investor Education First',
      description: 'We believe in empowering investors with knowledge to make informed financial decisions.',
      gradient: 'from-pink-50 to-pink-100'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold the highest standards of honesty and transparency in all our dealings with clients.',
      gradient: 'from-blue-50 to-blue-100'
    },
    {
      icon: Users,
      title: 'Client-First',
      description: 'Your financial goals and interests always come first. We succeed only when you succeed.',
      gradient: 'from-teal-50 to-teal-100'
    },
    {
      icon: BookOpen,
      title: 'Education',
      description: 'We believe in empowering clients with knowledge to make informed investment decisions.',
      gradient: 'from-green-50 to-green-100'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in service delivery and maintain professional competence.',
      gradient: 'from-purple-50 to-purple-100'
    }
  ];

  const philosophy = [
    {
      icon: Target,
      title: 'Goal-Based Approach',
      description: 'Every investment should align with a specific financial goal - whether retirement, education, or wealth creation.'
    },
    {
      icon: TrendingUp,
      title: 'Long-Term Focus',
      description: 'We believe in the power of compounding and staying invested for the long term to build sustainable wealth.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Understanding and managing risk is crucial. We help you invest according to your risk tolerance.'
    },
    {
      icon: Users,
      title: 'Disciplined Investing',
      description: 'Regular, systematic investing through SIPs helps overcome market volatility and builds wealth steadily.'
    },
    {
      icon: Heart,
      title: 'Diversification',
      description: 'A well-diversified portfolio across asset classes and sectors reduces risk and enhances returns.'
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'Markets evolve, and so should we. Continuous learning keeps us ahead in serving you better.'
    }
  ];

  const commitments = [
    {
      title: 'Transparent Communication',
      description: 'Clear disclosure of all costs, commissions, and potential conflicts of interest.'
    },
    {
      title: 'Regular Portfolio Review',
      description: 'Periodic reviews to ensure your investments stay aligned with your goals.'
    },
    {
      title: 'Unbiased Recommendations',
      description: 'Investment suggestions based purely on merit and suitability for your goals.'
    },
    {
      title: 'Investor Education',
      description: 'Ongoing guidance and education to help you understand your investments better.'
    },
    {
      title: 'Ethical Practices',
      description: 'Adherence to AMFI code of conduct and highest professional standards.'
    },
    {
      title: 'Long-Term Partnership',
      description: 'Building lasting relationships focused on your financial success over decades.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="About"
        highlightedText="VRK Wealth"
        subtitle="Your trusted partner in building long-term wealth through disciplined, goal-based investing"
      />

      {/* Vision & Mission - Enhanced & Moved to Top */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute inset-0 bg-slate-50">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.08)_0%,transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-600/10 rounded-[2.5rem] blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative bg-white border border-blue-100 rounded-[2.5rem] p-10 md:p-12 shadow-xl shadow-blue-900/5 h-full flex flex-col">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">
                    Our <span className="text-blue-600">Vision</span>
                  </h2>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                    To be the most trusted financial partner for families across India, empowering them to achieve financial independence through education, discipline, and goal-based investing.
                  </p>
                  <div className="mt-auto pt-8">
                    <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/5 to-teal-600/10 rounded-[2.5rem] blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative bg-white border border-teal-100 rounded-[2.5rem] p-10 md:p-12 shadow-xl shadow-teal-900/5 h-full flex flex-col">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-teal-500/30 group-hover:-rotate-6 transition-transform">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">
                    Our <span className="text-teal-600">Mission</span>
                  </h3>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                    To provide transparent, ethical, and professional financial guidance that helps our clients build lasting wealth while educating them to make informed investment decisions.
                  </p>
                  <div className="mt-auto pt-8">
                    <div className="h-1 w-20 bg-teal-600 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  VRK Wealth is an AMFI registered mutual fund distributor committed to helping individuals and families achieve their financial goals through systematic, disciplined investing.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  With over a decade of experience in financial planning and wealth management, we have helped thousands of families navigate their investment journey with confidence.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We believe that financial planning is not just about returns - it's about understanding your dreams, quantifying your goals, and creating a roadmap to achieve them.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why VRK Wealth Section */}
      <motion.section
        ref={whyRef}
        initial="hidden"
        animate={whyInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-teal-600">VRK Wealth</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine expertise, ethics, and education to help you build lasting wealth
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <feature.icon className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


      {/* Core Values */}
      <motion.section
        ref={valuesRef}
        initial="hidden"
        animate={valuesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core <span className="text-teal-600">Values</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`p-8 rounded-2xl bg-gradient-to-br ${value.gradient} border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <value.icon className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Investment Philosophy */}
      <motion.section
        ref={philosophyRef}
        initial="hidden"
        animate={philosophyInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-24 bg-gradient-to-br from-gray-50 to-teal-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Investment <span className="text-blue-600">Philosophy</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
              The foundational beliefs that shape our investment approach
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {philosophy.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Commitments */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-teal-600">Commitments</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What you can always expect from us
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {commitments.map((commitment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CheckCircle2 className="w-10 h-10 text-teal-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{commitment.title}</h3>
                <p className="text-gray-700 leading-relaxed">{commitment.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Information */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-10 rounded-2xl shadow-xl border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                Regulatory Information
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  <strong className="text-gray-900">AMFI Registration:</strong> VRK Wealth is registered with the Association of Mutual Funds in India (AMFI) as a mutual fund distributor.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-gray-900">ARN Number:</strong> XXXXXX (Placeholder - to be updated with actual ARN)
                </p>
                <p className="leading-relaxed">
                  <strong className="text-gray-900">Plan Distribution:</strong> We distribute Regular Mutual Fund Plans only. Regular plans include distributor commission, which is paid by the Asset Management Company (AMC) and is already factored into the fund's expense ratio.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-gray-900">Commission Disclosure:</strong> We earn trail commission from AMCs for the mutual fund products we distribute. This commission does not involve any additional cost to you beyond the fund's stated expense ratio.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-gray-900">Code of Conduct:</strong> We strictly adhere to the AMFI Code of Conduct for mutual fund distributors and maintain the highest standards of professional ethics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-gray-100 border-t border-gray-300 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-700">
            <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.
          </p>
        </div>
      </div>
    </div>
  );
}
