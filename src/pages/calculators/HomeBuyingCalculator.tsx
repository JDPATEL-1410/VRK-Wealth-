import { useState } from 'react';
import { Home, Key, Percent, Download, FileText, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { motion } from 'framer-motion';
import { generatePDF } from '../../utils/pdfGenerator';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function HomeBuyingCalculator() {
    const [targetAmount, setTargetAmount] = useState(5000000);
    const [yearsToBuy, setYearsToBuy] = useState(5);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [inflation, setInflation] = useState(6);

    const calculateGoal = () => {
        const inflatedGoal = targetAmount * Math.pow(1 + inflation / 100, yearsToBuy);
        const monthlyRate = expectedReturn / 12 / 100;
        const months = yearsToBuy * 12;

        let monthlySIP = 0;
        if (yearsToBuy > 0) {
            monthlySIP = inflatedGoal / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        }

        return {
            inflatedGoal: Math.round(inflatedGoal),
            monthlySIP: Math.round(monthlySIP)
        };
    };

    const { inflatedGoal, monthlySIP } = calculateGoal();

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
            await generatePDF('report-content', 'VRK-Wealth-Home-Buying-Report');
        } catch (error: any) {
            console.error('PDF Generation Error:', error);
            alert(`Failed to generate PDF: ${error.message || 'Unknown error'}`);
        } finally {
            setIsExporting(false);
        }
    };

    const pieData = [
        { name: 'Target Today', value: targetAmount, color: '#1e3a8a' },
        { name: 'Inflation Buffer', value: Math.max(0, inflatedGoal - targetAmount), color: '#0d9488' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHeader
                title="Grand Home"
                highlightedText="Solutions"
                subtitle="Calculate the future value of your dream property and create a systematic roadmap."
                image="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&auto=format&fit=crop&q=80"
                badge="Your Home Awaits"
                icon={<Home className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
                <div id="report-content" className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[3rem] shadow-sm">
                    {/* Branded Header */}
                    <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-100 pb-5 gap-3">
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-1 uppercase tracking-tight">Home Acquisition Roadmap</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs">Precision property goals forecasting</p>
                        </div>
                        <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                            <span className="text-emerald-600 font-black text-xs sm:text-sm uppercase">Estate Planning</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-7xl mx-auto">
                        {/* Inputs Panel */}
                        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100">
                            <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                <Home className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-[#1e3a8a]" />
                                Property Vision
                            </h3>

                            <div className="space-y-8 sm:space-y-12">
                                <div>
                                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm sm:text-base">Target Value (Today)</label>
                                        <span className="text-base sm:text-2xl font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(targetAmount)}</span>
                                    </div>
                                    <input type="range" min="1000000" max="50000000" step="100000" value={targetAmount}
                                        onChange={(e) => setTargetAmount(Number(e.target.value))}
                                        className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-amber-600">Horizon (Yrs)</label>
                                        <input type="number" value={yearsToBuy} onChange={(e) => setYearsToBuy(Number(e.target.value))}
                                            className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-amber-50 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-amber-600 text-center sm:text-left shadow-inner outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-[#0d9488]">Property Inflation %</label>
                                        <input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value))}
                                            className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-teal-50 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-[#0d9488] text-center sm:text-left shadow-inner outline-none" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm sm:text-base">Growth ROI (%)</label>
                                        <span className="text-base sm:text-2xl font-black text-emerald-600 bg-emerald-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{expectedReturn}%</span>
                                    </div>
                                    <input type="range" min="5" max="25" step="0.5" value={expectedReturn}
                                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                        className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
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
                                <Link to="/contact" className="w-full bg-[#1e3a8a] text-white py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl">
                                    Finalize Plan <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Result Panel */}
                        <div className="space-y-6 sm:space-y-8">
                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-6 sm:p-10 border border-gray-100 flex flex-col items-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-50/50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>

                                <div className="h-[200px] sm:h-[250px] w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                                                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                            </Pie>
                                            <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                                            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="mt-6 sm:mt-10 pt-6 sm:pt-10 border-t border-gray-50 w-full text-center relative z-10">
                                    <p className="text-gray-400 uppercase font-black text-[8px] sm:text-[10px] tracking-widest mb-1 sm:mb-2">Projected Cost in {yearsToBuy} Years</p>
                                    <p className="text-3xl sm:text-6xl font-black text-[#1e3a8a] leading-tight">{formatCurrency(inflatedGoal)}</p>
                                </div>
                            </motion.div>

                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-xl sm:rounded-[2.5rem] p-6 sm:p-12 text-white shadow-2xl relative group overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                                <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/5 rounded-full -mr-16 sm:-mr-32 -mb-16 sm:-mb-32"></div>

                                <div className="relative z-10 text-center sm:text-left">
                                    <p className="text-blue-100/60 font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] mb-3 sm:mb-4">Monthly Investment Required</p>
                                    <p className="text-4xl sm:text-7xl font-black mb-8 sm:mb-12 leading-none">{formatCurrency(monthlySIP)}</p>

                                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-6 sm:py-8 border-t border-white/10 group">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                                            <Percent className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300" />
                                        </div>
                                        <p className="text-[11px] sm:text-base font-bold text-blue-50 leading-relaxed text-center sm:text-left">
                                            Creating your haven with a disciplined <span className="text-teal-300 font-extrabold">{expectedReturn}% p.a.</span> portfolio strategy.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 text-center max-w-4xl mx-auto px-2">
                    <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] leading-relaxed">
                        Real estate prices are subject to regional variations. This calculator uses a simplified geometric progression for inflation and assumes uniform periodic investments.
                    </p>
                </div>
            </div>
        </div>
    );
}
