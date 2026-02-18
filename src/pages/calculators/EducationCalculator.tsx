import { useState } from 'react';
import { GraduationCap, TrendingUp, Calendar, ArrowRight, Download, FileText, IndianRupee } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { motion } from 'framer-motion';
import { generatePDF } from '../../utils/pdfGenerator';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function EducationCalculator() {
    const [currentExpense, setCurrentExpense] = useState(1000000);
    const [yearsToCollege, setYearsToCollege] = useState(15);
    const [inflation, setInflation] = useState(8);
    const [returns, setReturns] = useState(12);

    const calculateEducation = () => {
        const futureCost = currentExpense * Math.pow(1 + inflation / 100, yearsToCollege);
        const monthlyRate = returns / 12 / 100;
        const totalMonths = yearsToCollege * 12;

        let monthlySIP = 0;
        if (yearsToCollege > 0) {
            monthlySIP = futureCost / (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
        }

        const chartData = [];
        for (let year = 0; year <= yearsToCollege; year += yearsToCollege > 10 ? 2 : 1) {
            chartData.push({
                year: `Y${year}`,
                cost: Math.round(currentExpense * Math.pow(1 + inflation / 100, year)),
            });
        }

        return {
            futureCost: Math.round(futureCost),
            monthlySIP: Math.round(monthlySIP),
            chartData
        };
    };

    const result = calculateEducation();

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
            await generatePDF('report-content', 'VRK-Wealth-Education-Planning-Report');
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
                title="Child Education"
                highlightedText="Solution"
                subtitle="Ensure your child's educational future with precision planning and inflation-adjusted savings."
                image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&auto=format&fit=crop&q=80"
                badge="Invest in Their Future"
                icon={<GraduationCap className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
                <div id="report-content" className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[3rem] shadow-sm">
                    {/* Branded Header */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-100 pb-6 gap-3">
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-1 uppercase tracking-tight">Education Fund Roadmap</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs">Precision planning for Academic excellence</p>
                        </div>
                        <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                            <span className="text-emerald-600 font-black text-xs sm:text-sm uppercase">Future Ready</span>
                        </div>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-7xl mx-auto"
                    >
                        {/* Inputs Panel */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100">
                            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                <IndianRupee className="w-6 h-6 mr-3 text-[#1e3a8a]" />
                                Target Details
                            </h3>

                            <div className="space-y-8 sm:space-y-10">
                                <div className="group">
                                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm sm:text-base">Current Course Fees</label>
                                        <span className="text-base sm:text-2xl font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(currentExpense)}</span>
                                    </div>
                                    <input
                                        type="range" min="100000" max="10000000" step="100000" value={currentExpense}
                                        onChange={(e) => setCurrentExpense(Number(e.target.value))}
                                        className="w-full h-2 sm:h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]"
                                    />
                                </div>

                                <div className="group">
                                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm sm:text-base">Years Until College</label>
                                        <span className="text-base sm:text-2xl font-black text-[#0d9488] bg-teal-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{yearsToCollege} Years</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="25" step="1" value={yearsToCollege}
                                        onChange={(e) => setYearsToCollege(Number(e.target.value))}
                                        className="w-full h-2 sm:h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0d9488]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-gray-50">
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-red-500">Edu Inflation (%)</label>
                                        <input type="number" step="0.5" value={inflation} onChange={(e) => setInflation(Number(e.target.value))}
                                            className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-red-50 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-red-600 focus:ring-2 focus:ring-red-100" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-emerald-500">Expected Return (%)</label>
                                        <input type="number" step="0.5" value={returns} onChange={(e) => setReturns(Number(e.target.value))}
                                            className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-emerald-50 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-emerald-600 focus:ring-2 focus:ring-emerald-100" />
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
                                <Link to="/contact" className="w-full bg-[#1e3a8a] text-white py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-blue-900/10">
                                    Start Planning <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Results & Chart */}
                        <div className="space-y-6 sm:space-y-8">
                            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="bg-[#1e3a8a] text-white p-6 sm:p-8 rounded-xl sm:rounded-[2rem] shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500" />
                                    <p className="text-white/40 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] mb-2 sm:mb-4 text-center sm:text-left">Future Corpus Required</p>
                                    <p className="text-2xl sm:text-4xl font-black leading-tight text-center sm:text-left">{formatCurrency(result.futureCost)}</p>
                                </div>
                                <div className="bg-[#0d9488] text-white p-6 sm:p-8 rounded-xl sm:rounded-[2rem] shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500" />
                                    <p className="text-white/40 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] mb-2 sm:mb-4 text-center sm:text-left">Target SIP Amount</p>
                                    <p className="text-2xl sm:text-4xl font-black leading-tight text-center sm:text-left">{formatCurrency(result.monthlySIP)}</p>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100 flex-grow">
                                <h3 className="text-base sm:text-xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-[#0d9488]" />
                                    Cost Escalation Curve
                                </h3>
                                <div className="h-[200px] sm:h-[280px] w-full px-2">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={result.chartData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                                            <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => formatCurrency(val)} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} width={60} />
                                            <Tooltip
                                                cursor={{ fill: '#f1f5f9' }}
                                                formatter={(val) => [formatCurrency(Number(val)), 'Education Cost']}
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '11px' }}
                                            />
                                            <Bar dataKey="cost" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={30} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Info Cards */}
                <div className="max-w-7xl mx-auto mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                    <motion.div variants={fadeInUp} className="bg-amber-50 rounded-xl sm:rounded-[2rem] p-6 sm:p-8 border border-amber-100 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-100">
                            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                        </div>
                        <div>
                            <h4 className="font-black text-amber-900 mb-2 text-xs sm:text-sm uppercase tracking-widest text-center sm:text-left">Early Mover Advantage</h4>
                            <p className="text-amber-800 text-[11px] sm:text-xs font-bold leading-relaxed opacity-80 text-center sm:text-left">
                                Every year you delay, the cost of education increases significantly. Starting today protects your child's dreams from future inflation shocks.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2rem] p-6 sm:p-8 border border-gray-100 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 border border-blue-50">
                            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-[#1e3a8a]" />
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 text-xs sm:text-sm uppercase tracking-widest mb-2 text-center sm:text-left">Inflation Sensitivity</h4>
                            <p className="text-gray-500 text-[11px] sm:text-xs font-bold leading-relaxed text-center sm:text-left">
                                Education inflation usually ranges between 8-10% annually in top-tier global universities and specialized courses.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
