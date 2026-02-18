import { useState } from 'react';
import { Wallet, PieChart as PieChartIcon, Download, ArrowRight, IndianRupee } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function FDCalculator() {
    const [investment, setInvestment] = useState(100000);
    const [interestRate, setInterestRate] = useState(6.5);
    const [tenure, setTenure] = useState(5);

    const calculateFD = () => {
        // A = P(1 + r/n)^(nt)
        const n = 4; // quarterly compounding
        const r = interestRate / 100;
        const maturityAmount = investment * Math.pow(1 + r / n, n * tenure);
        const estReturns = maturityAmount - investment;

        return {
            maturityAmount: Math.round(maturityAmount),
            estReturns: Math.round(estReturns)
        };
    };

    const { maturityAmount, estReturns } = calculateFD();

    const formatCurrency = (value: number) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
        return `₹${value.toLocaleString('en-IN')}`;
    };

    const pieData = [
        { name: 'Principal', value: investment, color: '#1e3a8a' },
        { name: 'Interest', value: estReturns, color: '#0d9488' }
    ];

    const [isExporting, setIsExporting] = useState(false);

    const downloadReport = async () => {
        if (isExporting) return;
        setIsExporting(true);
        try {
            await generatePDF('report-content', 'VRK-Wealth-FD-Report');
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
                title="Fixed Deposit"
                highlightedText="Calculator"
                subtitle="Calculate maturity amount and interest earned on your fixed deposits with quarterly compounding."
                image="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&auto=format&fit=crop&q=80"
                badge="Safe & Guaranteed Returns"
                icon={<Wallet className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
                <div id="report-content" className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[3rem] shadow-sm">
                    {/* Branded Header */}
                    <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-100 pb-5 gap-3">
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-1 uppercase tracking-tight">Fixed Deposit Report</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs">Guaranteed wealth accumulation</p>
                        </div>
                        <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                            <span className="text-emerald-600 font-black text-xs sm:text-sm uppercase">Safe Assets</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-7xl mx-auto">
                        {/* Inputs Panel */}
                        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100 h-fit">
                            <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-[#1e3a8a]" />
                                Deposit Details
                            </h3>

                            <div className="space-y-8 sm:space-y-12">
                                <div>
                                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm sm:text-base">Principal Deposit</label>
                                        <span className="text-base sm:text-2xl font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(investment)}</span>
                                    </div>
                                    <input type="range" min="10000" max="10000000" step="10000" value={investment}
                                        onChange={(e) => setInvestment(Number(e.target.value))}
                                        className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                    <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-400 mt-2 font-black uppercase tracking-widest">
                                        <span>10 K</span>
                                        <span>1 Cr</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-[#0d9488]">Interest Rate (% p.a.)</label>
                                        <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="w-full px-3 py-3 sm:px-6 sm:py-4 bg-teal-50 border-none rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl text-[#0d9488] focus:ring-2 focus:ring-teal-100" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-amber-600">Tenure (Years)</label>
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
                                    Open FD Account <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Result Display */}
                        <div className="space-y-6 sm:space-y-8">
                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-6 sm:p-10 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-50/50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                                <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-4 relative z-10 text-center">Maturity Proceeds</p>
                                <p className="text-3xl sm:text-6xl font-black text-[#1e3a8a] mb-6 sm:mb-10 relative z-10 text-center">{formatCurrency(maturityAmount)}</p>

                                <div className="w-full pt-6 sm:pt-10 border-t border-gray-50 relative z-10 flex flex-col items-center">
                                    <p className="text-gray-400 text-[8px] sm:text-[9px] font-black uppercase mb-1 tracking-widest text-center">Calculated Interest Earnings</p>
                                    <p className="text-xl sm:text-4xl font-black text-[#0d9488] text-center">{formatCurrency(estReturns)}</p>
                                </div>
                            </motion.div>

                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100">
                                <h3 className="text-base sm:text-xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                    <PieChartIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-[#0d9488]" />
                                    Composition
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
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Educational Banner */}
                <div className="mt-8 sm:mt-12 bg-[#1e3a8a] rounded-xl sm:rounded-[2rem] p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] opacity-50"></div>
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div className="space-y-4 sm:space-y-6">
                            <h3 className="text-2xl sm:text-3xl font-black text-center sm:text-left">Security Meets Structure</h3>
                            <p className="text-blue-100 font-medium leading-relaxed text-sm sm:text-base text-center sm:text-left">Fixed Deposits offer guaranteed returns and complete capital protection, making them the cornerstone of any conservative investment portfolio.</p>
                            <div className="flex justify-center sm:justify-start gap-4">
                                <div className="bg-white/10 p-3 sm:p-4 rounded-xl backdrop-blur-sm border border-white/20">
                                    <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest mb-1">Risk Profile</p>
                                    <p className="font-bold text-xs sm:text-base">Very Low</p>
                                </div>
                                <div className="bg-white/10 p-3 sm:p-4 rounded-xl backdrop-blur-sm border border-white/20">
                                    <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest mb-1">Liquidity</p>
                                    <p className="font-bold text-xs sm:text-base">High</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-md border border-white/10">
                            <h4 className="font-black text-teal-400 mb-3 sm:mb-4 uppercase tracking-widest text-[10px] sm:text-xs">Note on Compounding</h4>
                            <p className="text-[11px] sm:text-sm leading-relaxed text-blue-50">This calculator assumes <strong>Quarterly Compounding</strong>, which is the industry standard for FD calculation in most Indian banks. Some schemes may offer monthly compounding which can slightly alter results.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 text-center max-w-4xl mx-auto px-2">
                    <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] leading-relaxed">
                        Disclaimer: Fixed Deposit interest rates are subject to change. Tax on interest (TDS) depends on your individual income tax slab.
                    </p>
                </div>
            </div>
        </div>
    );
}
