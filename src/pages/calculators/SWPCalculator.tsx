import React, { useState } from 'react';
import { IndianRupee, ArrowDownToLine, Download, ArrowRight, TrendingUp, Calendar, PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const SWPCalculator: React.FC = () => {
  const [totalInvestment, setTotalInvestment] = useState(1000000);
  const [withdrawalAmount, setWithdrawalAmount] = useState(10000);
  const [period, setPeriod] = useState(10);
  const [returnRate, setReturnRate] = useState(12);

  const calculateSWP = () => {
    let balance = totalInvestment;
    const monthlyRate = returnRate / 100 / 12;
    let totalWithdrawn = 0;

    for (let month = 1; month <= period * 12; month++) {
      balance = balance * (1 + monthlyRate) - withdrawalAmount;
      totalWithdrawn += withdrawalAmount;
      if (balance < 0) break;
    }

    return {
      totalWithdrawn: Math.round(totalWithdrawn),
      finalValue: Math.max(0, Math.round(balance)),
      totalInvestment: totalInvestment
    };
  };

  const result = calculateSWP();

  const formatCurrency = (num: number) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const generateYearlyData = () => {
    const data = [];
    let balance = totalInvestment;
    const monthlyRate = returnRate / 100 / 12;

    for (let year = 0; year <= period; year++) {
      data.push({ year: `Y${year}`, balance: Math.round(Math.max(0, balance)) });
      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + monthlyRate) - withdrawalAmount;
        if (balance < 0) break;
      }
    }
    return data;
  };

  const yearlyData = generateYearlyData();

  const pieData = [
    { name: 'Withdrawn', value: result.totalWithdrawn, color: '#1e3a8a' },
    { name: 'Remaining', value: result.finalValue, color: '#0d9488' }
  ];

  const [isExporting, setIsExporting] = useState(false);

  const downloadReport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      await generatePDF('report-content', 'VRK-Wealth-SWP-Report');
    } catch (error: any) {
      console.error('PDF Generation Error:', error);
      alert(`Failed to generate PDF: ${error.message || 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Income"
        highlightedText="Solutions"
        subtitle="Plan your systematic withdrawal strategy for regular income from investments"
        image="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&auto=format&fit=crop&q=80"
        badge="Systematic Withdrawal Plan"
        icon={<ArrowDownToLine className="w-4 h-4 text-white/80" />}
      />

      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
        <div id="report-content" className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[3rem] shadow-sm">
          {/* Branded Header */}
          <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-100 pb-5 gap-3">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-1 uppercase tracking-tight">SWP Income Roadmap</h2>
              <p className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs">Precision fund depletion forecasting</p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
              <span className="text-blue-600 font-black text-xs sm:text-sm uppercase">Steady Cashflow</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-7xl mx-auto">
            {/* Inputs Panel */}
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100 h-fit">
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-[#1e3a8a]" />
                Withdrawal Strategy
              </h2>

              <div className="space-y-8 sm:space-y-12">
                <div>
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <label className="text-gray-700 font-bold text-sm sm:text-base">Initial Principal</label>
                    <span className="text-base sm:text-2xl font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(totalInvestment)}</span>
                  </div>
                  <input type="range" min="100000" max="10000000" step="50000" value={totalInvestment}
                    onChange={(e) => setTotalInvestment(Number(e.target.value))}
                    className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <label className="text-gray-700 font-bold text-sm sm:text-base">Monthly Withdrawal</label>
                    <span className="text-base sm:text-2xl font-black text-[#0d9488] bg-teal-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(withdrawalAmount)}</span>
                  </div>
                  <input type="range" min="1000" max="100000" step="1000" value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                    className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0d9488]" />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-4">
                  <div>
                    <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">Tenure (Yrs)</label>
                    <input type="number" value={period} onChange={(e) => setPeriod(Number(e.target.value))}
                      className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-gray-100 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-amber-600 outline-none" />
                  </div>
                  <div>
                    <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">Return (%)</label>
                    <input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))}
                      className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-gray-100 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-emerald-600 outline-none" />
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12 space-y-3">
                <button
                  onClick={downloadReport}
                  disabled={isExporting}
                  className="w-full bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? <div className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin" /> : <Download className="w-4 h-4 sm:w-5 sm:h-5" />}
                  {isExporting ? 'Generating...' : 'Download PDF Report'}
                </button>
                <button className="w-full bg-[#1e3a8a] text-white py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl">
                  Plan Strategy <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </motion.div>

            {/* Results Display */}
            <div className="space-y-6 sm:space-y-8">
              <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-6 sm:p-10 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-teal-50/50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full relative z-10">
                  <div className="bg-blue-50/50 p-4 rounded-xl sm:rounded-2xl">
                    <p className="text-gray-400 text-[8px] sm:text-[9px] font-black uppercase mb-1 tracking-widest text-center">Total Withdrawn</p>
                    <p className="text-xl sm:text-3xl font-black text-[#1e3a8a] text-center">{formatCurrency(result.totalWithdrawn)}</p>
                  </div>
                  <div className="bg-emerald-50/50 p-4 rounded-xl sm:rounded-2xl">
                    <p className="text-gray-400 text-[8px] sm:text-[9px] font-black uppercase mb-1 tracking-widest text-center">Final Corpus Value</p>
                    <p className="text-xl sm:text-3xl font-black text-emerald-600 text-center">{formatCurrency(result.finalValue)}</p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-10 w-full pt-6 sm:pt-10 border-t border-gray-50">
                  <h3 className="text-sm sm:text-lg font-black text-gray-900 mb-4 sm:mb-6 flex items-center justify-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#1e3a8a]" />
                    Capital Depletion Graph
                  </h3>
                  <div className="h-[180px] sm:h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={yearlyData}>
                        <defs>
                          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="year" hide />
                        <YAxis hide />
                        <Tooltip
                          formatter={(value: any) => formatCurrency(Number(value))}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', fontSize: '10px' }}
                          itemStyle={{ color: '#1e3a8a', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="balance" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100 flex flex-col justify-center">
                <h3 className="text-base sm:text-xl font-black text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0d9488]" />
                  Fund Utilization
                </h3>
                <div className="h-[200px] sm:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={8} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                      <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-8 sm:mt-16 bg-white rounded-xl sm:rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 sm:p-8 flex items-center gap-3 border-b border-gray-100">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#0d9488]" />
              <h3 className="text-lg sm:text-2xl font-black text-gray-900">Annual Projection</h3>
            </div>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-left min-w-[500px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">End of Year</th>
                    <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Fund Balance</th>
                    <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total Withdrawn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {yearlyData.map((data, index) => (
                    <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-gray-500 font-bold">{data.year}</td>
                      <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-[#1e3a8a] font-black">{formatCurrency(data.balance)}</td>
                      <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-[#0d9488] text-right font-black">
                        {formatCurrency(index * withdrawalAmount * 12)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 sm:mt-12 bg-white rounded-xl sm:rounded-[2.5rem] p-6 sm:p-12 shadow-xl border border-gray-100 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-teal-50 rounded-full -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-110"></div>
          <h2 className="text-xl sm:text-3xl font-black text-[#1e3a8a] mb-4 sm:mb-6 relative z-10 text-center sm:text-left">Understanding SWP Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 text-gray-700 relative z-10">
            <div className="space-y-4 font-medium leading-relaxed text-xs sm:text-base text-center sm:text-left">
              <p>A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount of money from your mutual fund scheme at regular intervals. It is effectively the inverse of an SIP.</p>
              <p>It's an excellent tool for retirees or anyone looking for a regular monthly income while keeping their remaining capital invested to potentially grow.</p>
            </div>
            <div className="bg-teal-50 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-teal-100 shadow-inner">
              <h4 className="font-black text-[#0d9488] mb-3 sm:mb-4 uppercase tracking-widest text-[10px] sm:text-xs">Expert Insight</h4>
              <p className="italic text-[11px] sm:text-sm text-[#0f766e] leading-relaxed">"Maintaining a withdrawal rate lower than your expected return rate can help your capital last indefinitely, creating a perpetual income stream across generations."</p>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center max-w-5xl mx-auto px-2">
          <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] leading-relaxed">
            Disclaimer: Systematic Withdrawal Plans are subject to capital erosion if withdrawal rates exceed return rates. Mutual Fund investments are subject to market risks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SWPCalculator;