import { useState } from 'react';
import { Calculator, PieChart as PieChartIcon, Download, ArrowRight, IndianRupee } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function EMICalculator() {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(10); // years

    const calculateEMI = () => {
        const r = interestRate / 12 / 100;
        const n = tenure * 12;
        const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        const totalPayment = emi * n;
        const totalInterest = totalPayment - loanAmount;

        return {
            emi: Math.round(emi),
            totalInterest: Math.round(totalInterest),
            totalPayment: Math.round(totalPayment)
        };
    };

    const result = calculateEMI();

    const formatCurrency = (value: number) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
        return `₹${value.toLocaleString('en-IN')}`;
    };

    const pieData = [
        { name: 'Principal', value: loanAmount, color: '#1e3a8a' },
        { name: 'Interest', value: result.totalInterest, color: '#0d9488' }
    ];

    const [isExporting, setIsExporting] = useState(false);

    const downloadReport = async () => {
        if (isExporting) return;
        setIsExporting(true);
        try {
            await generatePDF('report-content', 'VRK-Wealth-EMI-Report');
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
                title="Loan"
                highlightedText="EMI Calculator"
                subtitle="Calculate your monthly loan repayments and total interest payable."
                image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&auto=format&fit=crop&q=80"
                badge="Loan Planning"
                icon={<Calculator className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
                <div id="report-content" className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[3rem] shadow-sm">
                    {/* Branded Header */}
                    <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-100 pb-5 gap-3">
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-1 uppercase tracking-tight">Loan EMI Analysis</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs">Precision liability forecasting</p>
                        </div>
                        <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                            <span className="text-blue-600 font-black text-xs sm:text-sm uppercase">Smart Debt</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-7xl mx-auto">
                        {/* Inputs Panel */}
                        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100">
                            <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-[#1e3a8a]" />
                                Loan Specifications
                            </h3>

                            <div className="space-y-8 sm:space-y-12">
                                <div>
                                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm sm:text-base">Loan Amount</label>
                                        <span className="text-base sm:text-2xl font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(loanAmount)}</span>
                                    </div>
                                    <input type="range" min="100000" max="50000000" step="50000" value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                    <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-400 mt-2 font-black uppercase tracking-widest">
                                        <span>1 L</span>
                                        <span>5 Cr</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">Interest (% p.a.)</label>
                                        <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-teal-50 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-[#0d9488] focus:ring-2 focus:ring-teal-100" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">Tenure (Years)</label>
                                        <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                                            className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-amber-50 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-amber-600 focus:ring-2 focus:ring-amber-100" />
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
                                <button className="w-full bg-[#1e3a8a] text-white py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl">
                                    Apply for Loan <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Result Display */}
                        <div className="space-y-6 sm:space-y-8">
                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-6 sm:p-10 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-50/50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                                <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-4 relative z-10">Monthly Repayment (EMI)</p>
                                <p className="text-3xl sm:text-6xl font-black text-[#1e3a8a] mb-6 sm:mb-10 relative z-10">{formatCurrency(result.emi)}</p>

                                <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full pt-6 sm:pt-10 border-t border-gray-50 relative z-10">
                                    <div className="bg-teal-50/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                        <p className="text-gray-400 text-[8px] sm:text-[9px] font-black uppercase mb-1 tracking-widest">Total Interest</p>
                                        <p className="text-sm sm:text-xl font-black text-[#0d9488]">{formatCurrency(result.totalInterest)}</p>
                                    </div>
                                    <div className="bg-amber-50/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                        <p className="text-gray-400 text-[8px] sm:text-[9px] font-black uppercase mb-1 tracking-widest">Total Payable</p>
                                        <p className="text-sm sm:text-xl font-black text-amber-600">{formatCurrency(result.totalPayment)}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100">
                                <h3 className="text-base sm:text-xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                    <PieChartIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-[#0d9488]" />
                                    Liability Breakdown
                                </h3>
                                <div className="h-[200px] sm:h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={8} dataKey="value" stroke="none">
                                                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                            </Pie>
                                            <Tooltip formatter={(v: any) => formatCurrency(Number(v))} />
                                            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-900 rounded-xl sm:rounded-3xl text-white shadow-xl">
                                    <p className="text-xs sm:text-sm font-bold text-center leading-relaxed">Interest constitutes <strong>{((result.totalInterest / result.totalPayment) * 100).toFixed(1)}%</strong> of your total repayment liability.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-8 sm:mt-12 bg-white rounded-xl sm:rounded-[2rem] shadow-xl p-6 sm:p-12 border border-gray-100 max-w-7xl mx-auto">
                    <h3 className="text-xl sm:text-3xl font-black text-gray-900 mb-6 sm:mb-10 text-center">Mastering Your Liabilities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
                        <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl sm:rounded-3xl group hover:-translate-y-1 transition-transform border border-transparent hover:border-blue-100">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 font-black text-sm">01</div>
                            <h4 className="font-black text-gray-900 text-lg sm:text-xl mb-2 sm:mb-3">Pre-Payment Power</h4>
                            <p className="text-gray-600 text-[11px] sm:text-sm font-medium leading-relaxed">Even a single extra EMI paid every year can reduce your 20-year loan by more than 3 years, saving thousands in interest cost.</p>
                        </div>
                        <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl sm:rounded-3xl group hover:-translate-y-1 transition-transform border border-transparent hover:border-teal-100">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0d9488] rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 font-black text-sm">02</div>
                            <h4 className="font-black text-gray-900 text-lg sm:text-xl mb-2 sm:mb-3">Tenure Logic</h4>
                            <p className="text-gray-600 text-[11px] sm:text-sm font-medium leading-relaxed">While a longer tenure reduces your monthly EMI, it drastically increases the total interest burden on your finances.</p>
                        </div>
                        <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl sm:rounded-3xl group hover:-translate-y-1 transition-transform border border-transparent hover:border-amber-100">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 font-black text-sm">03</div>
                            <h4 className="font-black text-gray-900 text-lg sm:text-xl mb-2 sm:mb-3">The 40% Rule</h4>
                            <p className="text-gray-600 text-[11px] sm:text-sm font-medium leading-relaxed">Ensure your total EMIs across all loans never exceed 40% of your take-home pay to maintain financial health and flexibility.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 text-center max-w-4xl mx-auto">
                    <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] leading-relaxed">
                        Disclaimer: Loan interest rates are subject to change by financial institutions. All calculations are indicative.
                    </p>
                </div>
            </div>
        </div>
    );
}
