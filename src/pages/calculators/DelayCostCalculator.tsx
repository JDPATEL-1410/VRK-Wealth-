import { useState } from 'react';
import { Clock, TrendingUp, AlertCircle, Download, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function DelayCostCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
    const [period, setPeriod] = useState(20);
    const [returnRate, setReturnRate] = useState(12);
    const [delayYears, setDelayYears] = useState(5);

    const calculateDelayCost = () => {
        const monthlyRate = returnRate / 12 / 100;

        // Scenario 1: Start Now
        const totalMonthsNow = period * 12;
        const futureValueNow = monthlyInvestment * ((Math.pow(1 + monthlyRate, totalMonthsNow) - 1) / monthlyRate) * (1 + monthlyRate);
        const totalInvestedNow = monthlyInvestment * totalMonthsNow;

        // Scenario 2: Start After Delay (same end time, so investment period is reduced)
        const totalMonthsDelayed = (period - delayYears) * 12;
        let futureValueDelayed = 0;
        let totalInvestedDelayed = 0;

        if (totalMonthsDelayed > 0) {
            futureValueDelayed = monthlyInvestment * ((Math.pow(1 + monthlyRate, totalMonthsDelayed) - 1) / monthlyRate) * (1 + monthlyRate);
            totalInvestedDelayed = monthlyInvestment * totalMonthsDelayed;
        }

        const costOfDelay = futureValueNow - futureValueDelayed;
        const missingReturns = (futureValueNow - totalInvestedNow) - (futureValueDelayed - totalInvestedDelayed);

        return {
            futureValueNow: Math.round(futureValueNow),
            futureValueDelayed: Math.round(futureValueDelayed),
            costOfDelay: Math.round(costOfDelay),
            totalInvestedNow: Math.round(totalInvestedNow),
            totalInvestedDelayed: Math.round(totalInvestedDelayed),
            missingReturns: Math.round(missingReturns),
            percentageLoss: ((costOfDelay / futureValueNow) * 100).toFixed(1)
        };
    };

    const result = calculateDelayCost();

    const chartData = [
        {
            name: 'Start Today',
            'Full Wealth': result.futureValueNow,
            'Capital': result.totalInvestedNow,
        },
        {
            name: `After ${delayYears}Y Delay`,
            'Full Wealth': result.futureValueDelayed,
            'Capital': result.totalInvestedDelayed,
        }
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
            await generatePDF('report-content', 'VRK-Wealth-Delay-Cost-Report');
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
                title="Delay Cost"
                highlightedText="Calculator"
                subtitle="See how delaying investments impacts your wealth creation goals and future returns"
                image="https://images.unsplash.com/photo-1501139083538-0139583c060f?w=1920&auto=format&fit=crop&q=80"
                badge="Don't Wait, Start Today"
                icon={<Clock className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
                <div id="report-content" className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[3rem] shadow-sm">
                    {/* Branded Header */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-100 pb-6 gap-3">
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-1 uppercase tracking-tight">The Cost of Inaction</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs">Financial impact of delaying your investment start</p>
                        </div>
                        <div className="bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                            <span className="text-red-600 font-black text-xs sm:text-sm uppercase">Time is Money</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-7xl mx-auto">
                        {/* High Impact Result Card */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-2xl p-6 sm:p-10 border border-gray-100 flex flex-col items-center text-center justify-center"
                        >
                            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mb-4 sm:mb-6 border-4 border-white shadow-lg animate-pulse">
                                <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
                            </div>
                            <h3 className="text-xs sm:text-xl font-black text-gray-400 uppercase tracking-widest mb-1 sm:mb-2 text-center">Total Wealth Sacrifice</h3>
                            <p className="text-3xl sm:text-6xl font-black text-red-600 mb-4 sm:mb-8 text-center">{formatCurrency(result.costOfDelay)}</p>

                            <div className="bg-red-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-red-100 w-full mb-6 sm:mb-8">
                                <p className="text-red-900 font-bold leading-relaxed text-sm sm:text-lg text-center">
                                    A mere <span className="font-black">{delayYears} Year</span> delay results in losing
                                    <span className="font-black block mt-1 sm:mt-2 text-xl sm:text-2xl">{result.percentageLoss}% of your potential wealth</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                                <button
                                    onClick={downloadReport}
                                    disabled={isExporting}
                                    className="bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isExporting ? <div className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin" /> : <Download className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    {isExporting ? 'Generating...' : 'Download PDF'}
                                </button>
                                <Link to="/contact" className="bg-[#1e3a8a] text-white py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl text-center">
                                    Start Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Analysis & Controls */}
                        <div className="space-y-6 sm:space-y-8">
                            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-5 sm:p-8 border border-gray-100">
                                <h3 className="text-base sm:text-xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-[#1e3a8a]" />
                                    Wealth Impact Comparison
                                </h3>
                                <div className="h-[200px] sm:h-[280px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" fontSize={9} fontWeight={700} tickLine={false} axisLine={false} stroke="#94a3b8" />
                                            <YAxis fontSize={9} fontWeight={700} tickLine={false} axisLine={false} stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} width={60} />
                                            <Tooltip
                                                cursor={{ fill: '#f1f5f9' }}
                                                formatter={(value: any) => formatCurrency(Number(value))}
                                                contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '11px' }}
                                            />
                                            <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                            <Bar name="Capital" dataKey="Capital" fill="#94a3b8" radius={[6, 6, 0, 0]} barSize={40} />
                                            <Bar name="Full Wealth" dataKey="Full Wealth" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={40} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-5 sm:p-8 border border-gray-100 h-fit">
                                <h3 className="text-base sm:text-xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-[#1e3a8a]" />
                                    Adjust Parameters
                                </h3>

                                <div className="space-y-6 sm:space-y-8">
                                    <div>
                                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                                            <label className="text-gray-600 font-bold text-xs sm:text-base">Monthly Savings</label>
                                            <span className="text-base sm:text-xl font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 rounded-lg">{formatCurrency(monthlyInvestment)}</span>
                                        </div>
                                        <input type="range" min="1000" max="200000" step="1000" value={monthlyInvestment}
                                            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                                            <label className="text-red-600 font-bold text-xs sm:text-base">Delay Duration</label>
                                            <span className="text-base sm:text-xl font-black text-red-600 bg-red-50 px-3 py-1 rounded-lg">{delayYears} Years</span>
                                        </div>
                                        <input type="range" min="1" max={period - 1} step="1" value={delayYears}
                                            onChange={(e) => setDelayYears(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                                        <div>
                                            <label className="block text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Return (%)</label>
                                            <input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))}
                                                className="w-full p-2 sm:p-3 bg-gray-50 rounded-xl font-black text-[#1e3a8a] border-none text-center sm:text-left" />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Horizon (Yrs)</label>
                                            <input type="number" value={period} onChange={(e) => setPeriod(Number(e.target.value))}
                                                className="w-full p-2 sm:p-3 bg-gray-50 rounded-xl font-black text-[#0d9488] border-none text-center sm:text-left" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Educational Cards */}
                <div className="mt-8 sm:mt-16 bg-white rounded-xl sm:rounded-[2rem] shadow-xl p-6 sm:p-12 border border-gray-100 max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8 sm:mb-12 text-center">The Invisible Cost of "Tomorrow"</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
                        <div className="p-6 sm:p-8 bg-blue-50/50 rounded-2xl sm:rounded-3xl border border-blue-100 shadow-sm hover:-translate-y-1 transition-transform">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg shadow-blue-500/30">
                                <TrendingUp size={20} className="sm:w-6 sm:h-6" />
                            </div>
                            <h3 className="text-[#1e3a8a] font-black text-lg sm:text-xl mb-3">Power of Endings</h3>
                            <p className="text-gray-600 text-[11px] sm:text-sm font-medium leading-relaxed">The exponential growth of compounding happens in the final years. By delaying your start, you essentially delete the most profitable years of your entire investment journey.</p>
                        </div>
                        <div className="p-6 sm:p-8 bg-teal-50/50 rounded-2xl sm:rounded-3xl border border-teal-100 shadow-sm hover:-translate-y-1 transition-transform">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0d9488] rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg shadow-teal-500/30">
                                <AlertCircle size={20} className="sm:w-6 sm:h-6" />
                            </div>
                            <h3 className="text-[#0d9488] font-black text-lg sm:text-xl mb-3">Escalating Effort</h3>
                            <p className="text-gray-600 text-[11px] sm:text-sm font-medium leading-relaxed">To achieve the same goal after a 5-year delay, you don't just invest for 5 years less; you may need to double your monthly contribution to catch up.</p>
                        </div>
                        <div className="p-6 sm:p-8 bg-amber-50/50 rounded-2xl sm:rounded-3xl border border-amber-100 shadow-sm hover:-translate-y-1 transition-transform">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg shadow-amber-500/30">
                                <Clock size={20} className="sm:w-6 sm:h-6" />
                            </div>
                            <h3 className="text-amber-900 font-black text-lg sm:text-xl mb-3">Time Over Capital</h3>
                            <p className="text-gray-600 text-[11px] sm:text-sm font-medium leading-relaxed">In wealth creation, time is more powerful than capital. Starting early with a small amount often beats starting late with a much larger monthly commitment.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 text-center max-w-4xl mx-auto">
                    <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] leading-relaxed">
                        Compounding returns are theoretical and market performance is unpredictable. Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.
                    </p>
                </div>
            </div>
        </div>
    );
}
