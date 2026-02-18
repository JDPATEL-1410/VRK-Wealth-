import { useState } from 'react';
import { Target, Sparkles, Download, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function GoalCalculator() {
    const [goalName, setGoalName] = useState('Dream Home');
    const [targetAmount, setTargetAmount] = useState(1000000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(12);

    const calculateGoal = () => {
        const monthlyRate = rate / 12 / 100;
        const months = years * 12;

        let monthlySIP = 0;
        if (years > 0) {
            monthlySIP = targetAmount / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        }

        const lumpsumNeeded = targetAmount / Math.pow(1 + rate / 100, years);

        return {
            monthlySIP: Math.round(monthlySIP),
            lumpsumNeeded: Math.round(lumpsumNeeded)
        };
    };

    const { monthlySIP, lumpsumNeeded } = calculateGoal();

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
            await generatePDF('report-content', 'VRK-Wealth-Goal-Planning-Report');
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
                title="Goal"
                highlightedText="Solutions"
                subtitle="Every dream needs a blueprint. Calculate exactly what it takes to reach your milestone."
                image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&auto=format&fit=crop&q=80"
                badge="Achieve Your Dreams"
                icon={<Target className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
                <div id="report-content" className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[3rem] shadow-sm">
                    {/* Branded Header */}
                    <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-100 pb-5 gap-3">
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-1 uppercase tracking-tight">Milestone Blueprint</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs">Architecting your financial success</p>
                        </div>
                        <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                            <span className="text-blue-600 font-black text-xs sm:text-sm uppercase">Goal Driven</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-7xl mx-auto">
                        {/* Inputs Panel */}
                        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                    <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-[#1e3a8a]" />
                                    Objective Details
                                </h3>

                                <div className="space-y-8 sm:space-y-10">
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 sm:mb-3 block uppercase tracking-[0.1em] sm:tracking-[0.2em]">Goal Name</label>
                                        <input type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)}
                                            className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 border-none rounded-xl sm:rounded-2xl font-black text-base sm:text-xl text-[#1e3a8a] focus:ring-2 ring-blue-100 transition-all outline-none"
                                            placeholder="e.g. World Tour 2028" />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                                            <label className="text-gray-700 font-bold text-sm sm:text-base">Target Corpus</label>
                                            <span className="text-base sm:text-2xl font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(targetAmount)}</span>
                                        </div>
                                        <input type="range" min="100000" max="50000000" step="100000" value={targetAmount}
                                            onChange={(e) => setTargetAmount(Number(e.target.value))}
                                            className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 sm:gap-8">
                                        <div>
                                            <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-[#0d9488]">Horizon (Yrs)</label>
                                            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                                                className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-teal-50 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-[#0d9488] text-center sm:text-left focus:ring-2 focus:ring-teal-100" />
                                        </div>
                                        <div>
                                            <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-amber-600">Return (%)</label>
                                            <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                                                className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-amber-50 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-amber-600 text-center sm:text-left focus:ring-2 focus:ring-amber-100" />
                                        </div>
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
                                    {isExporting ? 'Generating...' : 'Download PDF'}
                                </button>
                                <Link to="/contact" className="w-full bg-[#1e3a8a] text-white py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl text-center">
                                    Execute Plan <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Result Panel */}
                        <div className="space-y-6 sm:space-y-8">
                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-6 sm:p-10 border-l-[8px] sm:border-l-[12px] border-[#0d9488] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>
                                <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 sm:mb-4">Systematic Path (Monthly SIP)</p>
                                <p className="text-3xl sm:text-6xl font-black text-[#0d9488] mb-2 sm:mb-4">{formatCurrency(monthlySIP)}</p>
                                <p className="text-gray-500 font-bold text-[11px] sm:text-sm">Monthly contribution for {years} years.</p>
                            </motion.div>

                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-6 sm:p-10 border-l-[8px] sm:border-l-[12px] border-[#1e3a8a] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>
                                <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 sm:mb-4">Front-Load Path (Lumpsum Today)</p>
                                <p className="text-3xl sm:text-6xl font-black text-[#1e3a8a] mb-2 sm:mb-4">{formatCurrency(lumpsumNeeded)}</p>
                                <p className="text-gray-500 font-bold text-[11px] sm:text-sm">One-time capital required today.</p>
                            </motion.div>

                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-xl sm:rounded-[2rem] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start relative z-10 text-center sm:text-left">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <h5 className="font-black text-base sm:text-lg uppercase tracking-widest text-teal-300">Strategy View</h5>
                                        <p className="text-[11px] sm:text-sm font-medium leading-relaxed opacity-90">For <span className="underline font-bold text-white decoration-teal-400 decoration-1 sm:decoration-2">{goalName}</span>, a hybrid approach often yields the most robust results against volatility.</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-3xl p-5 sm:p-8 border border-gray-100 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 rounded-full flex items-center justify-center">
                                        <Calendar className="text-amber-500 w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Date</p>
                                        <p className="font-black text-gray-900 text-sm sm:text-base">{new Date().getFullYear() + years}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Multiplier</p>
                                    <p className="font-black text-emerald-600 text-sm sm:text-base">{(targetAmount / lumpsumNeeded).toFixed(1)}x</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 text-center max-w-4xl mx-auto px-2">
                    <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] leading-relaxed">
                        Disclaimer: Goal projections are based on expected returns and not guaranteed. Market risks apply.
                    </p>
                </div>
            </div>
        </div>
    );
}
