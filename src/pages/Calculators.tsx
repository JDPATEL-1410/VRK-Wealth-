import { Link } from 'react-router-dom';
import {
  TrendingUp,
  PiggyBank,
  ArrowDownToLine,
  TrendingDown,
  Calculator,
  Home,
  Car,
  GraduationCap,
  Wallet,
  Clock,
  Target,
  LineChart,
  Repeat,
  Sparkles,
  IndianRupee
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

export function Calculators() {
  const calculators = [
    {
      id: 'sip',
      name: 'SIP Calculator',
      description: 'Calculate returns on your monthly SIP investments with detailed projections',
      icon: TrendingUp,
      color: 'from-[#1e3a8a] to-[#1e40af]',
      path: '/calculators/sip'
    },
    {
      id: 'lumpsum',
      name: 'Lumpsum Calculator',
      description: 'Estimate returns on one-time lumpsum investments in mutual funds',
      icon: PiggyBank,
      color: 'from-[#0d9488] to-[#0f766e]',
      path: '/calculators/lumpsum'
    },
    {
      id: 'swp',
      name: 'SWP Calculator',
      description: 'Plan your systematic withdrawal strategy for regular income',
      icon: ArrowDownToLine,
      color: 'from-[#1e3a8a] to-[#0d9488]',
      path: '/calculators/swp'
    },
    {
      id: 'stepup-sip',
      name: 'Step-Up SIP Calculator',
      description: 'Calculate returns with annual increment in your SIP amount',
      icon: TrendingDown,
      color: 'from-[#0d9488] to-[#1e3a8a]',
      path: '/calculators/stepup-sip'
    },
    {
      id: 'delay-cost',
      name: 'Delay Cost Calculator',
      description: 'See how delaying investments impacts your wealth creation goals',
      icon: Clock,
      color: 'from-[#1e3a8a] to-[#3b82f6]',
      path: '/calculators/delay-cost'
    },
    {
      id: 'retirement',
      name: 'Retirement Calculator',
      description: 'Plan your retirement corpus and achieve financial independence',
      icon: Target,
      color: 'from-[#0d9488] to-[#10b981]',
      path: '/calculators/retirement'
    },
    {
      id: 'education',
      name: 'Education Calculator',
      description: 'Plan and save for your child\'s education expenses',
      icon: GraduationCap,
      color: 'from-[#1e3a8a] to-[#1e40af]',
      path: '/calculators/education'
    },
    {
      id: 'home',
      name: 'Home Buying Calculator',
      description: 'Calculate how much you need to save for your dream home',
      icon: Home,
      color: 'from-[#0d9488] to-[#0f766e]',
      path: '/calculators/home'
    },
    {
      id: 'car',
      name: 'Car Purchase Calculator',
      description: 'Plan your savings for buying your dream car',
      icon: Car,
      color: 'from-[#1e3a8a] to-[#0d9488]',
      path: '/calculators/car'
    },
    {
      id: 'emi',
      name: 'EMI Calculator',
      description: 'Calculate loan EMI, total interest, and repayment schedule',
      icon: Calculator,
      color: 'from-[#0d9488] to-[#1e3a8a]',
      path: '/calculators/emi'
    },
    {
      id: 'fd',
      name: 'FD Calculator',
      description: 'Calculate fixed deposit maturity amount and returns',
      icon: Wallet,
      color: 'from-[#1e3a8a] to-[#3b82f6]',
      path: '/calculators/fd'
    },
    {
      id: 'goal',
      name: 'Goal Planning Calculator',
      description: 'Plan investments for any financial goal you want to achieve',
      icon: Target,
      color: 'from-[#0d9488] to-[#10b981]',
      path: '/calculators/goal'
    },
    {
      id: 'stp',
      name: 'STP Calculator',
      description: 'Calculate systematic transfer plan returns and strategy',
      icon: Repeat,
      color: 'from-[#1e3a8a] to-[#1e40af]',
      path: '/calculators/stp'
    },
    {
      id: 'compounding',
      name: 'Compounding Calculator',
      description: 'Understand the power of compounding on your investments',
      icon: Sparkles,
      color: 'from-[#0d9488] to-[#0f766e]',
      path: '/calculators/compounding'
    },
    {
      id: 'marriage',
      name: 'Marriage Calculator',
      description: 'Plan and save for a memorable wedding celebration',
      icon: Target,
      color: 'from-[#1e3a8a] to-[#0d9488]',
      path: '/calculators/marriage'
    },
    {
      id: 'vacation',
      name: 'Vacation Calculator',
      description: 'Plan your dream vacation with systematic savings',
      icon: Sparkles,
      color: 'from-[#0d9488] to-[#1e3a8a]',
      path: '/calculators/vacation'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Financial"
        highlightedText="Calculators"
        subtitle="Plan your financial journey with our comprehensive suite of calculators. Make informed investment decisions with accurate projections."
        image="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1920&auto=format&fit=crop&q=80"
        badge="Plan Your Future"
        icon={<Calculator className="w-4 h-4 text-white/80" />}
      />

      {/* Calculators Grid */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {calculators.map((calculator) => {
            const Icon = calculator.icon;
            return (
              <Link
                key={calculator.id}
                to={calculator.path}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-teal-200 hover:-translate-y-1"
              >
                {/* Icon Header */}
                <div className={`bg-gradient-to-br ${calculator.color} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <IndianRupee className="w-6 h-6 text-white/60" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {calculator.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {calculator.description}
                  </p>
                  <div className="flex items-center text-teal-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                    Calculate Now
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Why Use Our Calculators */}
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Use Our Financial Calculators?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LineChart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Accurate Projections</h3>
              <p className="text-gray-600 text-sm">
                Get precise calculations based on realistic market assumptions and compounding principles
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Goal Planning</h3>
              <p className="text-gray-600 text-sm">
                Plan for specific financial goals like retirement, education, home buying, and more
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#1e3a8a]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Visual Insights</h3>
              <p className="text-gray-600 text-sm">
                Interactive charts and graphs help you understand your investment journey better
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Need Help Planning Your Investments?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Our financial advisors can help you create a personalized investment plan based on your goals and risk profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#1e3a8a] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+919876543210"
              className="bg-[#d4af37] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b8941f] transition"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-600 text-center">
            <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks.
            Read all scheme related documents carefully before investing.
            Past performance is not indicative of future returns.
            The calculators provide estimates based on the inputs provided and assumed rates of return.
          </p>
        </div>
      </div>
    </div>
  );
}
