import { useState } from 'react';
import { Plane, Sun, ArrowRight, Compass, Download, TrendingUp } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { generatePDF } from '../../utils/pdfGenerator';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function VacationCalculator() {
    const [currentCost, setCurrentCost] = useState(200000);
    const [yearsUntil, setYearsUntil] = useState(2);
    const [inflation, setInflation] = useState(7);
    const [expectedReturn, setExpectedReturn] = useState(10);

    const calculateVacation = () => {
        const inflatedCost = currentCost * Math.pow(1 + inflation / 100, yearsUntil);
        const monthlyRate = expectedReturn / 12 / 100;
        const months = yearsUntil * 12;

        let monthlySIP = 0;
        if (yearsUntil > 0) {
            monthlySIP = inflatedCost / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        }

        return {
            inflatedCost: Math.round(inflatedCost),
            monthlySIP: Math.round(monthlySIP)
        };
    };

    const { inflatedCost, monthlySIP } = calculateVacation();

    const formatCurrency = (value: number) => {
        return `₹${value.toLocaleString('en-IN')}`;
    };

    const [isExporting, setIsExporting] = useState(false);

    const downloadReport = async () => {
        if (isExporting) return;
        setIsExporting(true);
        try {
            await generatePDF('report-content', 'VRK-Wealth-Vacation-Planning-Report');
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
                title="World Travel"
                highlightedText="Calculator"
                subtitle="Your passport to financial freedom. Plan your global adventures with systematic travel savings."
                image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&auto=format&fit=crop&q=80"
                badge="Explore the World"
                icon={<Plane className="w-4 h-4 text-white/80" />}
            />

            <div id="report-content" className="container mx-auto px-4 py-16 bg-gray-50">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto"
                >
                    <motion.div variants={fadeInUp} className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100 h-fit">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 shadow-inner">
                                <Compass className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900">Travel Blueprint</h3>
                        </div>

                        <div className="space-y-12">
                            <div className="group">
                                <div className="flex justify-between items-center mb-6">
                                    <label className="text-gray-700 font-bold text-lg">Current Cost Estimate</label>
                                    <span className="text-2xl font-black text-blue-600 bg-blue-50 px-5 py-2 rounded-2xl">{formatCurrency(currentCost)}</span>
                                </div>
                                <input
                                    type="range" min="50000" max="5000000" step="10000" value={currentCost}
                                    onChange={(e) => setCurrentCost(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]"
                                />
                                <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-black uppercase tracking-widest">
                                    <span>50 K</span>
                                    <span>50 L</span>
                                </div>
                            </div>

                            <div className="group">
                                <div className="flex justify-between items-center mb-6">
                                    <label className="text-gray-700 font-bold text-lg">Planned Departure (Years)</label>
                                    <span className="text-2xl font-black text-teal-600 bg-teal-50 px-5 py-2 rounded-2xl">{yearsUntil} Years</span>
                                </div>
                                <input
                                    type="range" min="0.5" max="10" step="0.5" value={yearsUntil}
                                    onChange={(e) => setYearsUntil(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0d9488]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100 relative group">
                                    <label className="text-[10px] font-black text-orange-400 block mb-3 uppercase tracking-widest flex items-center gap-2">
                                        <Sun className="w-3 h-3" /> Inflation (%)
                                    </label>
                                    <input
                                        type="number" value={inflation}
                                        onChange={(e) => setInflation(Number(e.target.value))}
                                        className="w-full px-5 py-4 bg-white border border-transparent rounded-2xl font-black text-xl text-center text-orange-600 shadow-sm focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    />
                                </div>
                                <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 relative group">
                                    <label className="text-[10px] font-black text-blue-400 block mb-3 uppercase tracking-widest flex items-center gap-2">
                                        <TrendingUp className="w-3 h-3" /> Returns (%)
                                    </label>
                                    <input
                                        type="number" value={expectedReturn}
                                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                        className="w-full px-5 py-4 bg-white border border-transparent rounded-2xl font-black text-xl text-center text-blue-600 shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 space-y-4">
                            <button
                                onClick={downloadReport}
                                disabled={isExporting}
                                className="w-full bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isExporting ? <div className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin" /> : <Download className="w-5 h-5" />}
                                {isExporting ? 'Generating...' : 'Download PDF'}
                            </button>
                        </div>
                    </motion.div>

                    <div className="space-y-8">
                        <motion.div
                            variants={fadeInUp}
                            className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-[2.5rem] shadow-2xl p-12 text-white relative group h-full overflow-hidden"
                        >
                            <div className="absolute top-20 right-20 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                                <Plane className="w-[350px] h-[350px] rotate-45" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Estimated Target Budget</p>
                                <p className="text-6xl font-black mb-12 leading-none selection:bg-white/20">{formatCurrency(inflatedCost)}</p>

                                <div className="space-y-8 mt-auto">
                                    <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/20 shadow-2xl">
                                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-3">Target SIP Amount</p>
                                        <p className="text-6xl font-black text-amber-400 leading-none">{formatCurrency(monthlySIP)}</p>
                                    </div>

                                    <div className="flex gap-6 items-start p-6 bg-white/5 rounded-3xl border border-white/5">
                                        <div className="p-4 bg-white/10 rounded-2xl shadow-xl flex-shrink-0">
                                            <Compass className="w-7 h-7 text-white" />
                                        </div>
                                        <p className="text-sm font-medium text-blue-50 leading-relaxed">
                                            Early systematic planning for <span className="font-bold text-teal-300">Travel Goals</span> ensures you can explore the world without liquidating your long-term wealth corpus.
                                        </p>
                                    </div>

                                    <Link
                                        to="/contact"
                                        className="w-full bg-white text-[#1e3a8a] py-6 rounded-2xl font-black text-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3 active:scale-95"
                                    >
                                        Start Your Travel Fund
                                        <ArrowRight className="w-6 h-6" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <div className="mt-16 text-center max-w-4xl mx-auto">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] leading-relaxed">
                        Note: Travel inflation often runs higher than average CPI due to rising airfare and hotel costs. We recommend keeping a 15% contingency buffer in your actual goal amount.
                    </p>
                </div>
            </div>
        </div>
    );
}
