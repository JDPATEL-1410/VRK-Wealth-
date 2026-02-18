import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calculator, TrendingUp, PieChart as PieChartIcon, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generatePDF } from '../utils/pdfGenerator';

export function AdvancedSIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [years, setYears] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [stepUpPercentage, setStepUpPercentage] = useState(0);
  const [inflationRate, setInflationRate] = useState(6);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;

    let totalInvestment = 0;
    let futureValue = 0;
    let currentSIP = monthlyInvestment;

    const yearlyData = [];

    for (let year = 1; year <= years; year++) {
      let yearInvestment = 0;

      for (let month = 1; month <= 12; month++) {
        totalInvestment += currentSIP;
        yearInvestment += currentSIP;
        futureValue = (futureValue + currentSIP) * (1 + monthlyRate);
      }

      yearlyData.push({
        year: `Year ${year}`,
        investment: Math.round(totalInvestment),
        value: Math.round(futureValue),
        returns: Math.round(futureValue - totalInvestment)
      });

      // Step-up SIP
      if (stepUpPercentage > 0) {
        currentSIP = currentSIP * (1 + stepUpPercentage / 100);
      }
    }

    const returns = futureValue - totalInvestment;
    const inflationAdjustedValue = futureValue / Math.pow(1 + inflationRate / 100, years);

    return {
      totalInvestment,
      futureValue,
      returns,
      inflationAdjustedValue,
      yearlyData
    };
  };

  const result = calculateSIP();

  const pieData = [
    { name: 'Principal', value: Math.round(result.totalInvestment), color: '#0d9488' },
    { name: 'Returns', value: Math.round(result.returns), color: '#d4af37' }
  ];

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const [isExporting, setIsExporting] = useState(false);

  const downloadReport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      await generatePDF('advanced-sip-report', 'VRK-Wealth-Advanced-SIP-Report');
    } catch (error: any) {
      console.error('PDF Generation Error:', error);
      alert(`Failed to generate PDF: ${error.message || 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8" id="advanced-sip-report">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-[#0d9488] to-[#1e3a8a] rounded-xl flex items-center justify-center">
          <Calculator className="text-white" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900 uppercase">Advanced SIP Matrix</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Plan with step-up & inflation dynamics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Input Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Monthly Contribution</label>
              <span className="text-xl font-black text-[#1e3a8a]">{formatCurrency(monthlyInvestment)}</span>
            </div>
            <input
              type="range"
              min="500"
              max="200000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Investment Horizon</label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full p-3 bg-gray-50 rounded-xl font-black text-center text-[#1e3a8a] border-none"
                />
                <span className="text-xs font-bold text-gray-400">Yrs</span>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Expected Rate</label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full p-3 bg-gray-50 rounded-xl font-black text-center text-[#0d9488] border-none"
                />
                <span className="text-xs font-bold text-gray-400">%</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Annual Step-Up (%)</label>
              <span className="text-xl font-black text-amber-600">{stepUpPercentage}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={stepUpPercentage}
              onChange={(e) => setStepUpPercentage(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <p className="text-[9px] text-gray-400 font-bold uppercase mt-2 tracking-widest">Automatic annual increment in SIP amount</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Projected Inflation (%)</label>
              <span className="text-xl font-black text-red-600">{inflationRate}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-[#1e3a8a] rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
          <h3 className="text-lg font-black mb-10 flex items-center gap-2 uppercase tracking-widest">
            <TrendingUp className="w-5 h-5 text-teal-400" />
            Financial Projection
          </h3>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Target Wealth Corpus</p>
              <p className="text-4xl font-black leading-none">{formatCurrency(result.futureValue)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <p className="text-[9px] text-white/40 uppercase font-black mb-1">Net Investment</p>
                <p className="text-xl font-black text-white">{formatCurrency(result.totalInvestment)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <p className="text-[9px] text-white/40 uppercase font-black mb-1">Wealth Gained</p>
                <p className="text-xl font-black text-teal-400">{formatCurrency(result.returns)}</p>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-2xl p-6 border border-amber-500/20">
              <p className="text-[10px] text-amber-500/50 font-black uppercase tracking-widest mb-1">Inflation Adjusted Value (Current Pur. Power)</p>
              <p className="text-2xl font-black text-amber-400">{formatCurrency(result.inflationAdjustedValue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div id="report-content" className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
          <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-widest">
            <TrendingUp className="w-4 h-4 text-[#0d9488]" />
            Growth Trajectory
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={result.yearlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" hide />
                <YAxis hide />
                <Tooltip
                  formatter={(value: any) => formatCurrency(Number(value))}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="investment" stroke="#94a3b8" strokeWidth={3} dot={false} name="Principal" />
                <Line type="monotone" dataKey="value" stroke="#1e3a8a" strokeWidth={4} dot={false} name="Corpus" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 flex flex-col items-center">
          <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-widest self-start">
            <PieChartIcon className="w-4 h-4 text-[#0d9488]" />
            Capital Mix
          </h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-10 mt-4">
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Investment</p>
              <p className="font-black text-[#0d9488]">{((result.totalInvestment / result.futureValue) * 100).toFixed(1)}%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Growth</p>
              <p className="font-black text-amber-600">{((result.returns / result.futureValue) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
        <button
          onClick={downloadReport}
          disabled={isExporting}
          className="flex-1 bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? <div className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin" /> : <Download className="w-5 h-5" />}
          {isExporting ? 'Generating...' : 'Download PDF Matrix'}
        </button>
        <Link
          to="/contact"
          className="flex-1 bg-[#1e3a8a] text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-blue-900/10"
        >
          Consult Specialist <TrendingUp className="w-5 h-5" />
        </Link>
      </div>

      <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100 text-center">
        <p className="text-[10px] font-black text-amber-900/50 uppercase tracking-[0.2em] leading-relaxed">
          Mutual Fund investments are subject to market risks. Calculations are projections based on historical asset class performance and do not guarantee future results.
        </p>
      </div>
    </div>
  );
}
