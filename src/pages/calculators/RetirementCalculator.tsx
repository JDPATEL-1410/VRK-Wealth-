import { useState } from 'react';
import { Target, IndianRupee, Info, TrendingUp, ArrowRight, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { motion } from 'framer-motion';
import { generatePDF } from '../../utils/pdfGenerator';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function RetirementCalculator() {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
    const [inflation, setInflation] = useState(6);
    const [returnBefore, setReturnBefore] = useState(12);
    const [returnAfter, setReturnAfter] = useState(8);
    const [lifeExpectancy, setLifeExpectancy] = useState(85);

    const calculateRetirement = () => {
        const yearsToRetirement = Math.max(0, retirementAge - currentAge);
        const retirementYears = Math.max(0, lifeExpectancy - retirementAge);

        const monthlyExpenseAtRetirement = monthlyExpenses * Math.pow(1 + inflation / 100, yearsToRetirement);
        const yearlyExpenseAtRetirement = monthlyExpenseAtRetirement * 12;

        const realRateAfter = ((1 + returnAfter / 100) / (1 + inflation / 100) - 1);

        let requiredCorpus = 0;
        if (realRateAfter === 0) {
            requiredCorpus = yearlyExpenseAtRetirement * retirementYears;
        } else {
            requiredCorpus = yearlyExpenseAtRetirement * ((1 - Math.pow(1 + realRateAfter, -retirementYears)) / realRateAfter);
        }

        const monthlyRateBefore = returnBefore / 12 / 100;
        const totalMonths = yearsToRetirement * 12;
        let requiredMonthlySavings = 0;
        if (yearsToRetirement > 0) {
            requiredMonthlySavings = requiredCorpus / (((Math.pow(1 + monthlyRateBefore, totalMonths) - 1) / monthlyRateBefore) * (1 + monthlyRateBefore));
        }

        const chartData = [];
        let currentCorpus = 0;
        for (let age = currentAge; age <= lifeExpectancy; age++) {
            if (age <= retirementAge && yearsToRetirement > 0) {
                if (age > currentAge) {
                    currentCorpus = (currentCorpus + (requiredMonthlySavings * 12)) * (1 + returnBefore / 100);
                }
            } else if (age > retirementAge) {
                const annualWithdrawal = yearlyExpenseAtRetirement * Math.pow(1 + inflation / 100, age - retirementAge - 1);
                currentCorpus = (currentCorpus - annualWithdrawal) * (1 + returnAfter / 100);
            }

            chartData.push({
                age,
                corpus: Math.max(0, Math.round(currentCorpus))
            });
        }

        return {
            requiredCorpus: Math.round(requiredCorpus),
            requiredMonthlySavings: Math.round(requiredMonthlySavings),
            monthlyExpenseAtRetirement: Math.round(monthlyExpenseAtRetirement),
            chartData
        };
    };

    const result = calculateRetirement();

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
            await generatePDF('report-content', 'VRK-Wealth-Retirement-Planning-Report');
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
                title="Retirement"
                highlightedText="Calculator"
                subtitle="Design your financial freedom. Plan your golden years with expert corpus projections."
                image="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&auto=format&fit=crop&q=80"
                badge="Plan Your Golden Years"
                icon={<Target className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-16">
                <div id="report-content" className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem]">

                    {/* Report Header */}
                    <div className="mb-6 sm:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-100 pb-5 sm:pb-8 gap-3 sm:gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e3a8a] mb-1 uppercase tracking-tight">Financial Freedom Roadmap</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs">Custom retirement projection for your golden years</p>
                        </div>
                        <div className="bg-blue-50 px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl border border-blue-100">
                            <span className="text-[#1e3a8a] font-black text-xs sm:text-sm uppercase">Secure Tomorrow</span>
                        </div>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-12 max-w-7xl mx-auto"
                    >
                        {/* Lifestyle Inputs */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-xl sm:rounded-3xl shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center">
                                <Target className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-[#1e3a8a]" />
                                Lifestyle
                            </h3>

                            <div className="space-y-6 sm:space-y-8">
                                <div>
                                    <label className="text-xs font-bold text-gray-700 block mb-2 sm:mb-3 uppercase tracking-wider">Current Monthly Expenses</label>
                                    <div className="relative group">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#1e3a8a]" />
                                        <input
                                            type="number"
                                            value={monthlyExpenses}
                                            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                                            className="w-full pl-10 pr-4 py-3 sm:pl-12 sm:pr-4 sm:py-4 bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-base sm:text-lg"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="text-[10px] sm:text-xs font-bold text-gray-400 block mb-2 uppercase">Current Age</label>
                                        <input
                                            type="number"
                                            value={currentAge}
                                            onChange={(e) => setCurrentAge(Number(e.target.value))}
                                            className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl font-black text-center"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] sm:text-xs font-bold text-gray-400 block mb-2 uppercase">Retirement Age</label>
                                        <input
                                            type="number"
                                            value={retirementAge}
                                            onChange={(e) => setRetirementAge(Number(e.target.value))}
                                            className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl font-black text-center"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] sm:text-xs font-bold text-gray-400 block mb-2 uppercase">Life Expectancy</label>
                                    <input
                                        type="number"
                                        value={lifeExpectancy}
                                        onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                                        className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl font-black text-center"
                                    />
                                </div>

                                <div className="bg-red-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-red-100">
                                    <div className="flex justify-between mb-3 sm:mb-4">
                                        <label className="text-red-900 font-bold block text-sm">Inflation (%)</label>
                                        <span className="font-black text-red-600 text-lg sm:text-xl">{inflation}%</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="15" step="0.5" value={inflation}
                                        onChange={(e) => setInflation(Number(e.target.value))}
                                        className="w-full accent-red-600 h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Investment Inputs */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-xl sm:rounded-3xl shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center">
                                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-[#0d9488]" />
                                Investments
                            </h3>

                            <div className="space-y-8 sm:space-y-10">
                                <div>
                                    <div className="flex justify-between mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm">Pre-Retirement Returns</label>
                                        <span className="font-black text-[#0d9488] text-lg sm:text-xl">{returnBefore}%</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="25" step="0.5" value={returnBefore}
                                        onChange={(e) => setReturnBefore(Number(e.target.value))}
                                        className="w-full accent-[#0d9488] h-2 bg-teal-100 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm">Post-Retirement Returns</label>
                                        <span className="font-black text-amber-600 text-lg sm:text-xl">{returnAfter}%</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="15" step="0.5" value={returnAfter}
                                        onChange={(e) => setReturnAfter(Number(e.target.value))}
                                        className="w-full accent-amber-600 h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                <div className="bg-blue-50 p-5 sm:p-8 rounded-xl sm:rounded-[2rem] border border-blue-100 relative mt-4">
                                    <div className="hidden sm:flex absolute -top-4 -left-4 w-10 h-10 bg-white rounded-xl shadow-lg items-center justify-center text-[#1e3a8a]">
                                        <Info className="w-5 h-5" />
                                    </div>
                                    <p className="text-[10px] sm:text-xs font-bold text-[#1e3a8a] uppercase tracking-widest mb-2">Cost of Living Effect</p>
                                    <p className="text-xs sm:text-sm text-blue-800 leading-relaxed font-medium">
                                        Monthly expenses of {formatCurrency(monthlyExpenses)} will grow to <span className="font-black text-[#1e3a8a]">{formatCurrency(result.monthlyExpenseAtRetirement)}</span> by retirement.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Results Panel */}
                        <div className="lg:col-span-1 space-y-5 sm:space-y-8">
                            <motion.div
                                variants={fadeInUp}
                                className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-white rounded-xl sm:rounded-[2.5rem] shadow-xl sm:shadow-2xl p-6 sm:p-10 text-center relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/5 rounded-full -mr-16 sm:-mr-24 -mt-16 sm:-mt-24 group-hover:scale-110 transition-transform duration-700"></div>
                                <h3 className="text-blue-100/60 uppercase text-[9px] sm:text-xs font-bold tracking-[0.2em] mb-3 sm:mb-4">Required Corpus</h3>
                                <p className="text-3xl sm:text-5xl font-black mb-1 sm:mb-2">{formatCurrency(result.requiredCorpus)}</p>
                                <p className="text-blue-100/40 text-[10px] sm:text-sm font-medium">Accumulate by age {retirementAge}</p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-xl sm:shadow-2xl p-6 sm:p-10 border border-gray-100">
                                <h3 className="text-gray-400 uppercase text-[10px] sm:text-xs font-black tracking-widest mb-4 sm:mb-6">Actionable Target</h3>
                                <div className="flex flex-col gap-1 mb-6 sm:mb-8">
                                    <span className="text-gray-600 font-bold text-xs sm:text-sm">Monthly SIP Required</span>
                                    <span className="text-2xl sm:text-4xl font-black text-[#0d9488]">{formatCurrency(result.requiredMonthlySavings)}</span>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <button
                                        onClick={downloadReport}
                                        disabled={isExporting}
                                        className="w-full bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-3 sm:py-5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-50 transition-all shadow-md sm:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isExporting ? <div className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin"></div> : <Download className="w-5 h-5 sm:w-6 sm:h-6" />}
                                        {isExporting ? 'Generating...' : 'Download PDF'}
                                    </button>
                                    <Link
                                        to="/contact"
                                        className="w-full bg-[#1e3a8a] text-white py-3 sm:py-5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 sm:gap-3 hover:scale-[1.02] transition-all shadow-xl"
                                    >
                                        Plan Indepedence <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <p className="text-center text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                                        *Assumes regular monthly contributions
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Chart Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 sm:mt-16 bg-white rounded-xl sm:rounded-[3rem] shadow-xl sm:shadow-2xl p-5 sm:p-12 border border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4 text-center sm:text-left">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-black text-gray-900">Wealth Journey</h3>
                                <p className="text-gray-400 font-bold text-xs sm:text-sm">Corpus projection from age {currentAge} to {lifeExpectancy}</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#1e3a8a]"></div>
                                    <span className="text-[10px] font-bold text-gray-600 uppercase">Growth</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#0d9488]"></div>
                                    <span className="text-[10px] font-bold text-gray-600 uppercase">Pension</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[250px] sm:h-[450px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={result.chartData}>
                                    <defs>
                                        <linearGradient id="colorCorpus" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="age"
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                        axisLine={false}
                                        tickLine={false}
                                        padding={{ left: 10, right: 10 }}
                                    />
                                    <YAxis
                                        tickFormatter={(val) => formatCurrency(val)}
                                        tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 700 }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={60}
                                    />
                                    <Tooltip
                                        formatter={(val) => [formatCurrency(Number(val)), 'Total Corpus']}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', fontSize: '11px' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="corpus"
                                        stroke="#1e3a8a"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorCorpus)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
