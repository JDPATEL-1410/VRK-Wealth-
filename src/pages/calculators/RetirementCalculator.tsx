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
            alert(`Failed to generate PDF: ${error.message || 'Unknown error'}. If you are on mobile, please try from a desktop browser.`);
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
                icon={<Target className="w-16 h-16 text-[#0d9488]" />}
            />

            <div className="container mx-auto px-4 py-16">
                <div id="report-content" className="bg-white p-8 rounded-[3rem]">
                    {/* Report Branding Header */}
                    <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-slate-100 pb-8 gap-4">
                        <div>
                            <h2 className="text-4xl font-black text-[#1e3a8a] mb-2 uppercase tracking-tight">Financial Freedom Roadmap</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs">Custom retirement projection for your golden years</p>
                        </div>
                        <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100">
                            <span className="text-[#1e3a8a] font-black text-sm uppercase">Secure Tomorrow</span>
                        </div>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto"
                    >
                        {/* Inputs Column 1 */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 lg:col-span-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                                <Target className="w-8 h-8 mr-4 text-[#1e3a8a]" />
                                Lifestyle
                            </h3>

                            <div className="space-y-8">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-3 uppercase tracking-wider">Current Monthly Expenses</label>
                                    <div className="relative group">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1e3a8a] group-focus-within:scale-110 transition-transform" />
                                        <input
                                            type="number"
                                            value={monthlyExpenses}
                                            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e3a8a] transition-all font-bold text-lg"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 block mb-2 uppercase tracking-tighter">Current Age</label>
                                        <input
                                            type="number"
                                            value={currentAge}
                                            onChange={(e) => setCurrentAge(Number(e.target.value))}
                                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-black text-center"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 block mb-2 uppercase tracking-tighter">Retirement Age</label>
                                        <input
                                            type="number"
                                            value={retirementAge}
                                            onChange={(e) => setRetirementAge(Number(e.target.value))}
                                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-black text-center"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-400 block mb-2 uppercase tracking-tighter">Expectation of Life</label>
                                    <input
                                        type="number"
                                        value={lifeExpectancy}
                                        onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                                        className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-center"
                                    />
                                </div>

                                <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                    <div className="flex justify-between mb-4">
                                        <label className="text-red-900 font-bold block">Inflation (%)</label>
                                        <span className="font-black text-red-600 text-xl">{inflation}%</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="15" step="0.5" value={inflation}
                                        onChange={(e) => setInflation(Number(e.target.value))}
                                        className="w-full accent-red-600 h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Inputs Column 2 */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 lg:col-span-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                                <TrendingUp className="w-8 h-8 mr-4 text-[#0d9488]" />
                                Investments
                            </h3>

                            <div className="space-y-10">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-gray-700 font-bold">Returns (Pre-Retirement)</label>
                                        <span className="font-black text-[#0d9488] text-xl">{returnBefore}%</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="25" step="0.5" value={returnBefore}
                                        onChange={(e) => setReturnBefore(Number(e.target.value))}
                                        className="w-full accent-[#0d9488] h-2 bg-teal-100 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-gray-700 font-bold">Returns (Post-Retirement)</label>
                                        <span className="font-black text-amber-600 text-xl">{returnAfter}%</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="15" step="0.5" value={returnAfter}
                                        onChange={(e) => setReturnAfter(Number(e.target.value))}
                                        className="w-full accent-amber-600 h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 relative group">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#1e3a8a]">
                                        <Info className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-bold text-[#1e3a8a] uppercase tracking-widest mb-2">Cost of Living Effect</p>
                                    <p className="text-sm text-blue-800 leading-relaxed font-medium">
                                        Due to inflation, your monthly expenses of {formatCurrency(monthlyExpenses)} will grow to <span className="font-black text-[#1e3a8a]">{formatCurrency(result.monthlyExpenseAtRetirement)}</span> by the time you retire.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Results Column */}
                        <div className="lg:col-span-1 space-y-8">
                            <motion.div
                                variants={fadeInUp}
                                className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-white rounded-[2.5rem] shadow-2xl p-10 text-center relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-700"></div>
                                <h3 className="text-blue-100/60 uppercase text-xs font-bold tracking-[0.2em] mb-4 font-mono">Total Required Corpus</h3>
                                <p className="text-5xl font-black mb-2">{formatCurrency(result.requiredCorpus)}</p>
                                <p className="text-blue-100/40 text-sm font-medium">Accumulate by age {retirementAge}</p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
                                <h3 className="text-gray-400 uppercase text-xs font-black tracking-widest mb-6">Actionable Target</h3>
                                <div className="flex flex-col gap-2 mb-8">
                                    <span className="text-gray-600 font-bold text-sm">Monthly SIP Required</span>
                                    <span className="text-4xl font-black text-[#0d9488]">{formatCurrency(result.requiredMonthlySavings)}</span>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={downloadReport}
                                        disabled={isExporting}
                                        className="w-full bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isExporting ? (
                                            <div className="w-6 h-6 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <Download className="w-6 h-6" />
                                        )}
                                        {isExporting ? 'Generating...' : 'Download PDF'}
                                    </button>
                                    <Link
                                        to="/contact"
                                        className="w-full bg-[#1e3a8a] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-blue-600/20"
                                    >
                                        Plan Independence
                                        <ArrowRight className="w-6 h-6" />
                                    </Link>
                                    <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        *Assumes regular monthly contributions
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Projection Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 bg-white rounded-[3rem] shadow-2xl p-12 border border-gray-100 overflow-hidden relative"
                    >
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900">Wealth Journey</h3>
                                <p className="text-gray-400 font-bold text-sm">Corpus projection from age {currentAge} to {lifeExpectancy}</p>
                            </div>
                            <div className="hidden md:flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#1e3a8a]"></div>
                                    <span className="text-xs font-bold text-gray-600 uppercase">Growth Phase</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#0d9488]"></div>
                                    <span className="text-xs font-bold text-gray-600 uppercase">Pension Phase</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[450px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={result.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorCorpus" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="age"
                                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                                        axisLine={false}
                                        tickLine={false}
                                        padding={{ left: 20, right: 20 }}
                                    />
                                    <YAxis
                                        tickFormatter={(val) => formatCurrency(val)}
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ stroke: '#1e3a8a', strokeWidth: 2 }}
                                        formatter={(val) => [formatCurrency(Number(val)), 'Total Corpus']}
                                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', padding: '20px' }}
                                        itemStyle={{ fontSize: '18px', fontWeight: '900', color: '#1e3a8a' }}
                                        labelStyle={{ fontWeight: 'bold', marginBottom: '8px', color: '#64748b' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="corpus"
                                        stroke="#1e3a8a"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorCorpus)"
                                        animationDuration={2000}
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
