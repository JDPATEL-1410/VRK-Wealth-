import React, { useState } from 'react';
import { IndianRupee, ArrowDownToLine, Download, ArrowRight, TrendingUp, Calendar, PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';

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
      data.push({ year: `Year ${year}`, balance: Math.round(Math.max(0, balance)) });
      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + monthlyRate) - withdrawalAmount;
        if (balance < 0) break;
      }
    }
    return data;
  };

  const yearlyData = generateYearlyData();

  const pieData = [
    { name: 'Total Withdrawn', value: result.totalWithdrawn, color: '#1e3a8a' },
    { name: 'Remaining Value', value: result.finalValue, color: '#0d9488' }
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
        title="SWP"
        highlightedText="Calculator"
        subtitle="Plan your systematic withdrawal strategy for regular income from investments"
        image="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&auto=format&fit=crop&q=80"
        badge="Systematic Withdrawal Plan"
        icon={<ArrowDownToLine className="w-4 h-4 text-white/80" />}
      />

      <div className="container mx-auto px-4 py-12">
        <div id="report-content" className="bg-gray-50 p-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 h-fit">
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
                <IndianRupee className="w-6 h-6 text-[#1e3a8a]" />
                Withdrawal Strategy
              </h2>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-bold">Total Principal Investment</label>
                  <span className="text-2xl font-black text-[#1e3a8a] bg-blue-50 px-4 py-2 rounded-xl">{formatCurrency(totalInvestment)}</span>
                </div>
                <input type="range" min="100000" max="10000000" step="50000" value={totalInvestment}
                  onChange={(e) => setTotalInvestment(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-bold">Monthly Withdrawal</label>
                  <span className="text-2xl font-black text-[#0d9488] bg-teal-50 px-4 py-2 rounded-xl">{formatCurrency(withdrawalAmount)}</span>
                </div>
                <input type="range" min="1000" max="100000" step="1000" value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0d9488]" />
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-bold">Withdrawal Tenure</label>
                  <span className="text-2xl font-black text-amber-600 bg-amber-50 px-4 py-2 rounded-xl">{period} Years</span>
                </div>
                <input type="range" min="1" max="35" step="1" value={period}
                  onChange={(e) => setPeriod(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600" />
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-bold">Expected Return (p.a.)</label>
                  <span className="text-2xl font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">{returnRate}%</span>
                </div>
                <input type="range" min="1" max="30" step="0.5" value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex flex-col justify-center text-center">
                  <div className="text-[10px] text-[#1e3a8a] font-black uppercase tracking-widest mb-1">Principal</div>
                  <div className="text-lg font-black text-[#1e3a8a]">{formatCurrency(result.totalInvestment)}</div>
                </div>
                <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 flex flex-col justify-center text-center">
                  <div className="text-[10px] text-[#0d9488] font-black uppercase tracking-widest mb-1">Withdrawn</div>
                  <div className="text-lg font-black text-[#0d9488]">{formatCurrency(result.totalWithdrawn)}</div>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex flex-col justify-center text-center">
                  <div className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1">Remaining</div>
                  <div className="text-lg font-black text-emerald-600">{formatCurrency(result.finalValue)}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={downloadReport}
                  disabled={isExporting}
                  className="w-full bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? <div className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin" /> : <Download className="w-5 h-5" />}
                  {isExporting ? 'Generating...' : 'Download PDF'}
                </button>
                <button className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-blue-900/10">
                  Plan Strategy <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#1e3a8a]" />
                  Capital Depletion Graph
                </h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={yearlyData}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="year" tick={{ fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(val) => formatCurrency(val)} tick={{ fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(value: any) => formatCurrency(Number(value))}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                      />
                      <Area type="monotone" dataKey="balance" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  <PieChartIcon className="w-6 h-6 text-[#0d9488]" />
                  Fund Utilization
                </h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={8} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                      <Legend verticalAlign="bottom" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 max-w-7xl mx-auto"
          >
            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
              <Calendar className="w-7 h-7 text-[#0d9488]" />
              Annual Fund Projection
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">End of Year</th>
                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Fund Balance</th>
                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right text-teal-600">Total Withdrawal Till Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {yearlyData.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-4 px-6 font-bold text-gray-600">{data.year}</td>
                      <td className="py-4 px-6 font-black text-[#1e3a8a]">{formatCurrency(data.balance)}</td>
                      <td className="py-4 px-6 font-black text-[#0d9488] text-right group-hover:scale-105 transition-transform">
                        {formatCurrency(index * withdrawalAmount * 12)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 bg-white rounded-[2.5rem] p-12 shadow-xl border border-gray-100 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
          <h2 className="text-3xl font-black text-[#1e3a8a] mb-6 relative z-10">Understanding SWP Strategies</h2>
          <div className="grid md:grid-cols-2 gap-12 text-gray-700 relative z-10">
            <div className="space-y-4 font-medium leading-relaxed">
              <p>A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount of money from your mutual fund scheme at regular intervals. This is purely the opposite of an SIP.</p>
              <p>It's an excellent tool for retirees or anyone looking for a regular monthly income while keeping their remaining capital invested to potentially grow.</p>
            </div>
            <div className="bg-teal-50 p-8 rounded-3xl border border-teal-100">
              <h4 className="font-black text-[#0d9488] mb-4 uppercase tracking-widest text-xs">Expert Insight</h4>
              <p className="italic text-sm text-[#0f766e]">"Maintaining a withdrawal rate lower than your expected return rate can help your capital last indefinitely, creating a perpetual income stream."</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center max-w-5xl mx-auto">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] leading-relaxed">
            Disclaimer: Systematic Withdrawal Plans are subject to capital erosion if withdrawal rates exceed return rates. Mutual Fund investments are subject to market risks. Past performance is no guarantee of future returns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SWPCalculator;