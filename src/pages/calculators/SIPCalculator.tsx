import { useState } from 'react';
import { TrendingUp, PieChart as PieChartIcon, Calendar, ArrowRight, IndianRupee, Download } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';

export function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [period, setPeriod] = useState(10);
  const [returnRate, setReturnRate] = useState(12);

  const calculateSIP = () => {
    const monthlyRate = returnRate / 12 / 100;
    const months = period * 12;
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const invested = monthlyInvestment * months;
    const returns = futureValue - invested;

    return {
      futureValue: Math.round(futureValue),
      invested: Math.round(invested),
      returns: Math.round(returns)
    };
  };

  const result = calculateSIP();

  const generateYearWiseData = () => {
    const data = [];
    for (let year = 1; year <= period; year++) {
      const months = year * 12;
      const monthlyRate = returnRate / 12 / 100;
      const fv = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      const inv = monthlyInvestment * months;
      data.push({
        year: `Year ${year}`,
        invested: Math.round(inv),
        returns: Math.round(fv - inv),
        total: Math.round(fv)
      });
    }
    return data;
  };

  const chartData = generateYearWiseData();

  const pieData = [
    { name: 'Total Investment', value: result.invested, color: '#1e3a8a' },
    { name: 'Estimated Returns', value: result.returns, color: '#0d9488' }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const [isExporting, setIsExporting] = useState(false);

  const downloadReport = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      await generatePDF('report-content', 'VRK-Wealth-SIP-Report');
    } catch (error: any) {
      console.error('PDF Generation Error:', error);
      alert(`Failed to generate PDF: ${error.message || 'Unknown error'}. If you are on mobile, please try from a desktop browser.`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="SIP"
        highlightedText="Calculator"
        subtitle="Calculate returns on your monthly SIP investments with detailed projections and year-wise breakup"
        image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&auto=format&fit=crop&q=80"
        badge="Systematic Investment Plan"
        icon={<TrendingUp className="w-4 h-4 text-white/80" />}
      />

      <div className="container mx-auto px-4 py-12">
        <div id="report-content" className="bg-white p-8 rounded-[3rem]">
          {/* Report Branding Header */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-slate-100 pb-8 gap-4">
            <div>
              <h2 className="text-4xl font-black text-[#1e3a8a] mb-2 uppercase tracking-tight">SIP Wealth Analysis</h2>
              <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs">Customized projection for consistent wealth building</p>
            </div>
            <div className="bg-teal-50 px-6 py-3 rounded-2xl border border-teal-100">
              <span className="text-[#0d9488] font-black text-sm uppercase">Wealth Builder</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <IndianRupee className="w-6 h-6 mr-2 text-[#1e3a8a]" />
                Investment Details
              </h2>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-bold">Monthly Investment</label>
                  <span className="text-2xl font-black text-[#1e3a8a] bg-blue-50 px-4 py-2 rounded-xl">{formatCurrency(monthlyInvestment)}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]"
                />
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-bold">Investment Period</label>
                  <span className="text-2xl font-black text-[#0d9488] bg-teal-50 px-4 py-2 rounded-xl">{period} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={period}
                  onChange={(e) => setPeriod(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0d9488]"
                />
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-bold">Expected Return Rate (p.a.)</label>
                  <span className="text-2xl font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">{returnRate}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 mt-12">
                <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] p-6 rounded-2xl text-white shadow-lg">
                  <p className="opacity-80 text-sm font-bold uppercase tracking-wider mb-1">Total Investment</p>
                  <p className="text-3xl font-black">{formatCurrency(result.invested)}</p>
                </div>
                <div className="bg-gradient-to-r from-[#0d9488] to-[#0f766e] p-6 rounded-2xl text-white shadow-lg">
                  <p className="opacity-80 text-sm font-bold uppercase tracking-wider mb-1">Estimated Returns</p>
                  <p className="text-3xl font-black">{formatCurrency(result.returns)}</p>
                </div>
                <div className="bg-white border-2 border-emerald-500 p-6 rounded-2xl shadow-lg">
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Total Value</p>
                  <p className="text-3xl font-black text-emerald-600">{formatCurrency(result.futureValue)}</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={downloadReport}
                  disabled={isExporting}
                  className="w-full bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? (
                    <div className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  {isExporting ? 'Generating...' : 'Download PDF'}
                </button>
                <button className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-black text-lg hover:scale-[1.02] transition-all flex items-center justify-center shadow-lg shadow-blue-900/20">
                  Start Your SIP Now <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-[#1e3a8a]" />
                  Wealth Growth Analysis
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12, fontWeight: 700 }} axisLine={false} tickLine={false} />
                      <YAxis stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} tick={{ fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(value) => [formatCurrency(Number(value)), 'Value']}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                      />
                      <Legend iconType="circle" />
                      <Area type="monotone" dataKey="invested" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorInvested)" name="Invested" />
                      <Area type="monotone" dataKey="total" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" name="Total Value" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center">
                  <PieChartIcon className="w-6 h-6 mr-2 text-[#0d9488]" />
                  Portfolio Composition
                </h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-[2rem] shadow-xl p-10 border border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
              <Calendar className="w-7 h-7 mr-3 text-[#10b981]" />
              Projected Growth Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="px-6 py-4 text-sm font-black text-gray-400 uppercase tracking-wider">Year No.</th>
                    <th className="px-6 py-4 text-sm font-black text-gray-400 uppercase tracking-wider">Total Invested</th>
                    <th className="px-6 py-4 text-sm font-black text-gray-400 uppercase tracking-wider">Wealth Gains</th>
                    <th className="px-6 py-4 text-sm font-black text-gray-400 uppercase tracking-wider text-right">Maturity Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {chartData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 font-bold text-gray-600">{row.year}</td>
                      <td className="px-6 py-4 font-black text-[#1e3a8a]">{formatCurrency(row.invested)}</td>
                      <td className="px-6 py-4 font-black text-[#0d9488]">{formatCurrency(row.returns)}</td>
                      <td className="px-6 py-4 font-black text-emerald-600 text-right group-hover:scale-105 transition-transform">{formatCurrency(row.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-[2rem] shadow-xl p-12 border border-gray-100">
          <h2 className="text-3xl font-black text-gray-900 mb-10">Strategic SIP Planning</h2>
          <div className="grid md:grid-cols-2 gap-12 text-gray-700">
            <div className="space-y-4">
              <h3 className="font-black text-xl text-[#1e3a8a]">What is a Systematic Investment Plan?</h3>
              <p className="leading-relaxed font-medium">Systematic Investment Plan (SIP) is a strategic method of investing in mutual funds where you commit a fixed amount regularly. This approach instills financial discipline and leverages the market volatility to your advantage.</p>
              <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-[#1e3a8a]">
                <p className="text-blue-900 font-bold italic">"SIP is not just an investment; it's a commitment to your future self."</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-black text-xl text-[#0d9488]">Key Advantages</h3>
              <ul className="grid grid-cols-1 gap-4">
                {[
                  { title: "Rupee Cost Averaging", desc: "Reduces risk by averaging the unit cost during market swings." },
                  { title: "Compounding Effect", desc: "Long-term wealth creation by earning returns on your returns." },
                  { title: "Financial Discipline", desc: "Automates savings and builds consistent wealth-building habits." },
                  { title: "Portfolio Flexibility", desc: "Easily adjust, pause, or increase your investments as per needs." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-[#0d9488] flex-shrink-0 mt-1">
                      <TrendingUp size={14} />
                    </div>
                    <div>
                      <span className="font-black text-gray-900 block">{item.title}</span>
                      <span className="text-sm font-medium text-gray-600">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-blue-900 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] opacity-90"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-black mb-2">Need a Personalized Investment Roadmap?</h3>
              <p className="text-blue-100 font-medium">Our expert advisors are ready to help you build a high-performance portfolio.</p>
            </div>
            <button className="bg-white text-[#1e3a8a] px-10 py-4 rounded-xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl active:scale-95 whitespace-nowrap">
              Consult Advisor
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
            Mutual Fund investments are subject to market risks. Read all scheme related documents carefully.
          </p>
        </div>
      </div>
    </div>
  );
}
