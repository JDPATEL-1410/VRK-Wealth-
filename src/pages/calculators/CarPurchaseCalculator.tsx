import { useState } from 'react';
import { Car, Key, TrendingUp, Download, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { motion } from 'framer-motion';
import { generatePDF } from '../../utils/pdfGenerator';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function CarPurchaseCalculator() {
    const [carPrice, setCarPrice] = useState(1000000);
    const [yearsToBuy, setYearsToBuy] = useState(3);
    const inflation = 5;
    const [returns, setReturns] = useState(10);

    const calculateCarGoal = () => {
        const inflatedPrice = carPrice * Math.pow(1 + inflation / 100, yearsToBuy);
        const monthlyRate = returns / 12 / 100;
        const months = yearsToBuy * 12;

        let monthlySIP = 0;
        if (yearsToBuy > 0) {
            monthlySIP = inflatedPrice / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        }

        return {
            inflatedPrice: Math.round(inflatedPrice),
            monthlySIP: Math.round(monthlySIP)
        };
    };

    const { inflatedPrice, monthlySIP } = calculateCarGoal();

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
            await generatePDF('report-content', 'VRK-Wealth-Car-Purchase-Report');
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
                title="Elite Wheels"
                highlightedText="Solutions"
                subtitle="Accelerate your way to your dream car. Plan your automotive investment with precision."
                image="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&auto=format&fit=crop&q=80"
                badge="Drive Your Dream"
                icon={<Car className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
                <div id="report-content" className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[3rem] shadow-sm">
                    {/* Branded Header */}
                    <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-100 pb-5 gap-3">
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-1 uppercase tracking-tight">Automotive Wealth Roadmap</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs">Precision vehicle acquisition modeling</p>
                        </div>
                        <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                            <span className="text-blue-600 font-black text-xs sm:text-sm uppercase">Goal Driven</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-7xl mx-auto">
                        {/* Inputs Panel */}
                        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100">
                            <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                <Car className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-[#1e3a8a]" />
                                Vehicle Vision
                            </h3>

                            <div className="space-y-8 sm:space-y-12">
                                <div>
                                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm sm:text-base">Current Car Price</label>
                                        <span className="text-base sm:text-2xl font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(carPrice)}</span>
                                    </div>
                                    <input type="range" min="300000" max="10000000" step="50000" value={carPrice}
                                        onChange={(e) => setCarPrice(Number(e.target.value))}
                                        className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                                        <label className="text-gray-700 font-bold text-sm sm:text-base">Possession After</label>
                                        <span className="text-base sm:text-2xl font-black text-[#0d9488] bg-teal-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{yearsToBuy} Years</span>
                                    </div>
                                    <input type="range" min="1" max="10" step="1" value={yearsToBuy}
                                        onChange={(e) => setYearsToBuy(Number(e.target.value))}
                                        className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0d9488]" />
                                </div>

                                <div className="bg-gray-50 p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col sm:flex-row items-center justify-between border border-gray-100 gap-4">
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#1e3a8a]">
                                            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-[8px] sm:text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Expected Return</p>
                                            <p className="text-xl sm:text-2xl font-black text-blue-900 leading-none">{returns}%</p>
                                        </div>
                                        <div className="relative">
                                            <input type="number" value={returns} onChange={(e) => setReturns(Number(e.target.value))}
                                                className="w-16 sm:w-20 px-2 sm:px-4 py-2 sm:py-3 bg-white rounded-xl font-black text-center text-sm sm:text-[#1e3a8a] shadow-sm border border-blue-100 outline-none" />
                                            <Key className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 text-amber-400 bg-white rounded-full p-1 shadow-md" />
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
                                    {isExporting ? 'Generating...' : 'Download PDF Report'}
                                </button>
                                <Link to="/contact" className="w-full bg-[#1e3a8a] text-white py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl">
                                    Start Planning <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Result Panel */}
                        <div className="space-y-6 sm:space-y-8">
                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-12 text-center border border-gray-100 relative group overflow-hidden">
                                <div className="absolute -bottom-10 -right-10 sm:-bottom-20 sm:-right-20 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                                    <Car className="w-[150px] h-[150px] sm:w-[300px] sm:h-[300px]" />
                                </div>

                                <p className="text-gray-400 font-black uppercase text-[8px] sm:text-[10px] tracking-[0.2em] mb-2 sm:mb-4">Projected Cost in {yearsToBuy} Years</p>
                                <p className="text-3xl sm:text-6xl font-black text-gray-900 mb-8 sm:mb-12 leading-tight">
                                    {formatCurrency(inflatedPrice)}
                                </p>

                                <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                    <p className="text-blue-100/60 text-[9px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-2 sm:mb-4 relative z-10 text-center">Monthly Investment Required</p>
                                    <p className="text-3xl sm:text-6xl font-black mb-0 sm:mb-4 relative z-10 leading-none text-center">{formatCurrency(monthlySIP)}</p>
                                </div>
                            </motion.div>

                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-teal-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-teal-100 shadow-inner">
                                <p className="text-teal-900 font-extrabold text-[11px] sm:text-lg leading-relaxed text-center italic">
                                    "A car is more than just transport; it's a personal milestone. Plan early to cruise through your financial goals with absolute comfort."
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 text-center max-w-4xl mx-auto px-2">
                    <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] leading-relaxed">
                        Vehicle price inflation is typically around 5% annually for premium segments. Tax (GST) and registration costs are usually included in the current price estimates.
                    </p>
                </div>
            </div>
        </div>
    );
}
