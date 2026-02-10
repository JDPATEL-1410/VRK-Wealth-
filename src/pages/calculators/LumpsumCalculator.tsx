import React, { useState } from 'react';
import { IndianRupee, PiggyBank, Download, ArrowRight, TrendingUp, Calendar, PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';

const LumpsumCalculator: React.FC = () => {
  const [investment, setInvestment] = useState(100000);
  const [period, setPeriod] = useState(10);
  const [returnRate, setReturnRate] = useState(12);

  const calculateReturns = () => {
    const futureValue = investment * Math.pow(1 + returnRate / 100, period);
    const totalReturns = futureValue - investment;
    return {
      totalInvestment: investment,
      estimatedReturns: Math.round(totalReturns),
      totalValue: Math.round(futureValue)
    };
  };

  const result = calculateReturns();

  const formatCurrency = (num: number) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const generateYearlyData = () => {
    const data = [];
    for (let year = 0; year <= period; year++) {
      const value = investment * Math.pow(1 + returnRate / 100, year);
      data.push({
        year: `Year ${year}`,
        value: Math.round(value),
        investment: investment,
        growth: Math.round(value - investment)
      });
    }
    return data;
  };

  const yearlyData = generateYearlyData();

  const pieData = [
    { name: 'Investment', value: result.totalInvestment, color: '#1e3a8a' },
    { name: 'Returns', value: result.estimatedReturns, color: '#0d9488' }
  ];

  const [isExporting, setIsExporting] = useState(false);

  const downloadReport = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      await generatePDF('report-content', 'VRK-Wealth-Lumpsum-Report');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. If you are on mobile, please try from a desktop browser.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Lumpsum"
        highlightedText="Calculator"
        subtitle="Estimate returns on your one-time lumpsum investments in mutual funds"
        icon={<PiggyBank className="w-16 h-16 text-[#0d9488]" />}
      />

      <div className="container mx-auto px-4 py-12">
        <div id="report-content" className="bg-gray-50 p-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 h-fit"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
                <IndianRupee className="w-6 h-6 text-[#1e3a8a]" />
                Investment Details
              </h2>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-bold">Investment Amount</label>
                  <span className="text-2xl font-black text-[#1e3a8a] bg-blue-50 px-4 py-2 rounded-xl">{formatCurrency(investment)}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-black uppercase tracking-widest">
                  <span>10K</span>
                  <span>1 Cr</span>
                </div>
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
                  <label className="text-gray-700 font-bold">Expected Return (p.a.)</label>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex flex-col justify-center text-center">
                  <div className="text-[10px] text-[#1e3a8a] font-black uppercase tracking-widest mb-1">Investment</div>
                  <div className="text-lg font-black text-[#1e3a8a]">{formatCurrency(result.totalInvestment)}</div>
                </div>
                <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 flex flex-col justify-center text-center">
                  <div className="text-[10px] text-[#0d9488] font-black uppercase tracking-widest mb-1">Est. Returns</div>
                  <div className="text-lg font-black text-[#0d9488]">{formatCurrency(result.estimatedReturns)}</div>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex flex-col justify-center text-center">
                  <div className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1">Total Value</div>
                  <div className="text-lg font-black text-emerald-600">{formatCurrency(result.totalValue)}</div>
                </div>
              </div>

              <div className="space-y-4">
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
                <button className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-blue-900/10">
                  Start Investing <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#1e3a8a]" />
                  Wealth Composition
                </h3>
                <div className="h-[280px]">
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
                      <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                      <Legend verticalAlign="bottom" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#0d9488]" />
                  Growth Journey
                </h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={yearlyData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="year" tick={{ fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(val) => formatCurrency(val)} tick={{ fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(value: any) => formatCurrency(Number(value))}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
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
              Detailed Projections
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Investment Year</th>
                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Portfolio Value</th>
                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Wealth Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {yearlyData.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-4 px-6 font-bold text-gray-600">{data.year}</td>
                      <td className="py-4 px-6 font-black text-[#1e3a8a]">{formatCurrency(data.value)}</td>
                      <td className="py-4 px-6 font-black text-[#0d9488] text-right group-hover:scale-105 transition-transform">
                        {data.growth <= 0 ? '-' : formatCurrency(data.growth)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto mt-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-2xl p-8 shadow-sm">
            <h4 className="flex items-center gap-2 font-black text-amber-900 mb-3">
              <PiggyBank className="w-5 h-5" />
              Crucial Investor Disclaimer
            </h4>
            <p className="text-sm text-gray-700 font-medium leading-relaxed">
              Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.
              The historical performance of any scheme is not necessarily indicative of future results. These calculations are for
              illustration only and do not constitute a guarantee of returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LumpsumCalculator;