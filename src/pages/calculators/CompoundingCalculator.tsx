import { useState } from 'react';
import { Sparkles, TrendingUp, Zap, Download, ArrowRight, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function CompoundingCalculator() {
    const [principal, setPrincipal] = useState(100000);
    const [monthlyContribution, setMonthlyContribution] = useState(5000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(12);

    const calculateCompounding = () => {
        const monthlyRate = rate / 12 / 100;
        const totalMonths = years * 12;

        const fvPrincipal = principal * Math.pow(1 + monthlyRate, totalMonths);
        const fvSIP = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);

        const totalValue = fvPrincipal + fvSIP;
        const totalInvested = principal + (monthlyContribution * totalMonths);
        const totalReturns = totalValue - totalInvested;

        const chartData = [];
        for (let y = 0; y <= years; y++) {
            const months = y * 12;
            const fvP = principal * Math.pow(1 + monthlyRate, months);
            const fvS = months === 0 ? 0 : monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
            const currentVal = fvP + fvS;
            const currentInv = principal + (monthlyContribution * months);

            chartData.push({
                year: `Y${y}`,
                total: Math.round(currentVal),
                invested: Math.round(currentInv),
                returns: Math.round(currentVal - currentInv)
            });
        }

        return {
            totalValue: Math.round(totalValue),
            totalInvested: Math.round(totalInvested),
            totalReturns: Math.round(totalReturns),
            chartData
        };
    };

    const result = calculateCompounding();

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
            await generatePDF('report-content', 'VRK-Wealth-Compounding-Report');
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
                title="Compounding"
                highlightedText="Magic"
                subtitle="The eighth wonder of the world. Visualize how your money grows exponentially over time."
                image="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1920&auto=format&fit=crop&q=80"
                badge="Power of Compounding"
                icon={<Sparkles className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
                <div id="report-content" className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[3rem] shadow-sm">
                    {/* Branded Header */}
                    <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-100 pb-5 gap-3">
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-1 uppercase tracking-tight">Compounding Roadmap</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs">Precision wealth forecasting</p>
                        </div>
                        <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
                            <span className="text-amber-600 font-black text-xs sm:text-sm uppercase">Growth Engine</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-7xl mx-auto">
                        {/* Inputs Panel */}
                        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100">
                            <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-amber-500" />
                                Growth Variables
                            </h3>

                            <div className="space-y-8 sm:space-y-12">
                                <div>
                                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm sm:text-base">Initial Lumpsum</label>
                                        <span className="text-base sm:text-2xl font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(principal)}</span>
                                    </div>
                                    <input type="range" min="0" max="10000000" step="10000" value={principal}
                                        onChange={(e) => setPrincipal(Number(e.target.value))}
                                        className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm sm:text-base">Monthly Top-up</label>
                                        <span className="text-base sm:text-2xl font-black text-[#0d9488] bg-teal-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(monthlyContribution)}</span>
                                    </div>
                                    <input type="range" min="0" max="500000" step="1000" value={monthlyContribution}
                                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                        className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0d9488]" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-gray-50">
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">Horizon (Yrs)</label>
                                        <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                                            className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-gray-100 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-[#1e3a8a]" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">Rate (%)</label>
                                        <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                                            className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-gray-100 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-emerald-600" />
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
                                    Start Growing <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Result Display */}
                        <div className="space-y-6 sm:space-y-8">
                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-6 sm:p-10 border border-gray-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-amber-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                                <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-4 text-center sm:text-left">Future Wealth Estimate</p>
                                <p className="text-3xl sm:text-6xl font-black text-[#1e3a8a] mb-6 sm:mb-10 text-center sm:text-left selection:bg-blue-100">{formatCurrency(result.totalValue)}</p>

                                <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full pt-6 sm:pt-10 border-t border-gray-100">
                                    <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                        <p className="text-gray-400 text-[8px] sm:text-[9px] font-black uppercase mb-1 tracking-widest text-center sm:text-left">Total Principal</p>
                                        <p className="text-xs sm:text-xl font-black text-gray-700 text-center sm:text-left">{formatCurrency(result.totalInvested)}</p>
                                    </div>
                                    <div className="bg-teal-50/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                        <p className="text-gray-400 text-[8px] sm:text-[9px] font-black uppercase mb-1 tracking-widest text-center sm:text-left">Returns Component</p>
                                        <p className="text-xs sm:text-xl font-black text-[#0d9488] text-center sm:text-left">{formatCurrency(result.totalReturns)}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-[#1e3a8a] rounded-xl sm:rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl h-[250px] sm:h-[350px] relative overflow-hidden flex flex-col">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] opacity-50"></div>
                                <h4 className="font-black text-sm sm:text-xl mb-4 sm:mb-8 flex items-center gap-3 relative z-10">
                                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
                                    Growth Trajectory
                                </h4>
                                <div className="w-full flex-grow relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={result.chartData}>
                                            <defs>
                                                <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                            <YAxis hide />
                                            <Tooltip
                                                formatter={(v: any) => formatCurrency(Number(v))}
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.3)', fontSize: '10px' }}
                                                itemStyle={{ color: '#1e3a8a', fontWeight: 'bold' }}
                                            />
                                            <Area type="monotone" dataKey="total" stroke="#2dd4bf" strokeWidth={3} fill="url(#compGrad)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-[8px] sm:text-[10px] text-teal-200 mt-3 sm:mt-4 font-black uppercase tracking-widest relative z-10 text-center">Wealth acceleration increases over time</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="mt-8 sm:mt-16 bg-white rounded-xl sm:rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 sm:p-8 flex items-center gap-3 border-b border-gray-100">
                            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#0d9488]" />
                            <h3 className="text-lg sm:text-2xl font-black text-gray-900">Maturity Roadmap</h3>
                        </div>
                        <div className="overflow-x-auto -mx-1">
                            <table className="w-full text-left min-w-[500px]">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Year</th>
                                        <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Capital</th>
                                        <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Returns</th>
                                        <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Portfolio</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {result.chartData.map((data, index) => (
                                        <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-gray-500 font-bold">{data.year}</td>
                                            <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-[#1e3a8a] font-bold">{formatCurrency(data.invested)}</td>
                                            <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-[#0d9488] font-bold">{formatCurrency(data.returns)}</td>
                                            <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-emerald-600 text-right font-black">{formatCurrency(data.total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 text-center max-w-4xl mx-auto px-2">
                    <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] leading-relaxed">
                        Compounding is highly sensitive to time. Starting just a few years earlier can result in a significantly larger terminal corpus. Mutual fund investments are subject to market risks.
                    </p>
                </div>
            </div>
        </div>
    );
}
