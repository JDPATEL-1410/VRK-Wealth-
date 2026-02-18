import { useState } from 'react';
import { TrendingUp, PieChart as PieChartIcon, Calendar, IndianRupee, Download, ArrowRight } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function StepUpSIPCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
    const [period, setPeriod] = useState(10);
    const [returnRate, setReturnRate] = useState(12);
    const [stepUp, setStepUp] = useState(10);

    const calculateStepUpSIP = () => {
        let totalInvested = 0;
        let totalValue = 0;
        const monthlyRate = returnRate / 12 / 100;
        let currentMonthlyInvestment = monthlyInvestment;
        const yearWiseData = [];

        for (let year = 1; year <= period; year++) {
            for (let month = 1; month <= 12; month++) {
                totalValue = (totalValue + currentMonthlyInvestment) * (1 + monthlyRate);
                totalInvested += currentMonthlyInvestment;
            }

            yearWiseData.push({
                year: `Y${year}`,
                invested: Math.round(totalInvested),
                returns: Math.round(totalValue - totalInvested),
                total: Math.round(totalValue),
                monthly: Math.round(currentMonthlyInvestment)
            });

            currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUp / 100);
        }

        return {
            futureValue: Math.round(totalValue),
            invested: Math.round(totalInvested),
            returns: Math.round(totalValue - totalInvested),
            yearWiseData
        };
    };

    const result = calculateStepUpSIP();
    const chartData = result.yearWiseData;

    const pieData = [
        { name: 'Capital', value: result.invested, color: '#1e3a8a' },
        { name: 'Returns', value: result.returns, color: '#0d9488' }
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
            await generatePDF('report-content', 'VRK-Wealth-Step-Up-SIP-Report');
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
                title="Step-Up SIP"
                highlightedText="Growth"
                subtitle="Calculate returns with annual increment in your SIP amount for accelerated wealth creation"
                image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&auto=format&fit=crop&q=80"
                badge="Grow With Your Income"
                icon={<TrendingUp className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
                <div id="report-content" className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[3rem] shadow-sm">
                    {/* Branded Header */}
                    <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-100 pb-5 gap-3">
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-1 uppercase tracking-tight">Step-Up SIP Roadmap</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs">Precision wealth acceleration model</p>
                        </div>
                        <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                            <span className="text-blue-600 font-black text-xs sm:text-sm uppercase">Optimized Growth</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-7xl mx-auto">
                        {/* Inputs Panel */}
                        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100">
                            <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-[#1e3a8a]" />
                                Power Parameters
                            </h3>

                            <div className="space-y-8 sm:space-y-12">
                                <div>
                                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm sm:text-base">Initial Monthly</label>
                                        <span className="text-base sm:text-2xl font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(monthlyInvestment)}</span>
                                    </div>
                                    <input type="range" min="500" max="100000" step="500" value={monthlyInvestment}
                                        onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                        className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm sm:text-base">Annual Step-Up</label>
                                        <span className="text-base sm:text-2xl font-black text-amber-600 bg-amber-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{stepUp}%</span>
                                    </div>
                                    <input type="range" min="1" max="50" step="1" value={stepUp}
                                        onChange={(e) => setStepUp(Number(e.target.value))}
                                        className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-4">
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-[#0d9488]">Tenure (Yrs)</label>
                                        <input type="number" value={period} onChange={(e) => setPeriod(Number(e.target.value))}
                                            className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-teal-50 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-[#0d9488] outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-[#1e3a8a]">Return (%)</label>
                                        <input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))}
                                            className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-blue-50 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-[#1e3a8a] outline-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
                                <button
                                    onClick={downloadReport}
                                    disabled={isExporting}
                                    className="w-full bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isExporting ? <div className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin" /> : <Download className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    {isExporting ? 'Generating...' : 'Download PDF Report'}
                                </button>
                                <button className="w-full bg-[#1e3a8a] text-white py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl">
                                    Accelerate Goal <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Result Display */}
                        <div className="space-y-6 sm:space-y-8">
                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-6 sm:p-10 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-50/50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                                <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-4 relative z-10 text-center">Future Wealth Estimate</p>
                                <p className="text-3xl sm:text-5xl font-black text-[#1e3a8a] mb-6 sm:mb-10 relative z-10 text-center">{formatCurrency(result.futureValue)}</p>

                                <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full pt-6 sm:pt-10 border-t border-gray-50 relative z-10">
                                    <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center">
                                        <p className="text-gray-400 text-[8px] sm:text-[9px] font-black uppercase mb-1 tracking-widest text-center">Invested Capital</p>
                                        <p className="text-xs sm:text-xl font-black text-[#1e3a8a] text-center">{formatCurrency(result.invested)}</p>
                                    </div>
                                    <div className="bg-emerald-50/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center">
                                        <p className="text-gray-400 text-[8px] sm:text-[9px] font-black uppercase mb-1 tracking-widest text-center">Estimated Returns</p>
                                        <p className="text-xs sm:text-xl font-black text-emerald-600 text-center">{formatCurrency(result.returns)}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100">
                                <h3 className="text-base sm:text-xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#1e3a8a]" />
                                    Growth Trajectory
                                </h3>
                                <div className="h-[200px] sm:h-[280px]">
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
                                            <XAxis dataKey="year" hide />
                                            <YAxis hide />
                                            <Tooltip
                                                formatter={(value: any) => formatCurrency(Number(value))}
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', fontSize: '10px' }}
                                                itemStyle={{ fontWeight: 'bold' }}
                                            />
                                            <Area type="monotone" dataKey="invested" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorInvested)" name="Total Invested" />
                                            <Area type="monotone" dataKey="total" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" name="Wealth Value" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-8 sm:mt-16 bg-white rounded-xl sm:rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 sm:p-8 flex items-center gap-3 border-b border-gray-100">
                            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                            <h3 className="text-lg sm:text-2xl font-black text-gray-900">Maturity Outlook</h3>
                        </div>
                        <div className="overflow-x-auto -mx-1">
                            <table className="w-full text-left min-w-[500px]">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Year</th>
                                        <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly</th>
                                        <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Returns</th>
                                        <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Portfolio</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {chartData.map((row, index) => (
                                        <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-gray-500 font-bold">{row.year}</td>
                                            <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-[#1e3a8a] font-black">{formatCurrency(row.monthly)}</td>
                                            <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-[#0d9488] font-black">{formatCurrency(row.returns)}</td>
                                            <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-emerald-600 text-right font-black">
                                                {formatCurrency(row.total)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 sm:mt-12 bg-[#1e3a8a] rounded-xl sm:rounded-[2.5rem] p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
                    <div className="relative z-10 max-w-5xl">
                        <h2 className="text-xl sm:text-3xl font-black mb-4 sm:mb-8 flex items-center gap-3">
                            <TrendingUp className="text-teal-400" />
                            Financial Independence Hack
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 font-medium leading-relaxed text-xs sm:text-base text-center sm:text-left">
                            <p>Step-Up SIP matches your investment growth with your career growth. By increasing contributions annually, you counteract lifestyle creep and inflation effectively.</p>
                            <p>A mere 10% annual step-up can result in a terminal corpus that is often 2x higher than a standard SIP over 20 years. It's the most powerful tool for accelerated wealth creation.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 text-center max-w-5xl mx-auto px-2">
                    <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] leading-relaxed">
                        Disclaimer: Step-Up projections are indicative. Mutual Fund investments are subject to market risks. Read all scheme related documents carefully.
                    </p>
                </div>
            </div>
        </div>
    );
}
