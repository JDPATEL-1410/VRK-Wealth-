import { useState } from 'react';
import { Heart, Sparkles, TrendingUp, ArrowRight, Download, FileText } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { motion } from 'framer-motion';
import { generatePDF } from '../../utils/pdfGenerator';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function MarriageCalculator() {
    const [currentCost, setCurrentCost] = useState(2500000);
    const [yearsToMarriage, setYearsToMarriage] = useState(10);
    const [inflation, setInflation] = useState(8);
    const [returns, setReturns] = useState(12);

    const calculateMarriage = () => {
        const futureCost = currentCost * Math.pow(1 + inflation / 100, yearsToMarriage);
        const monthlyRate = returns / 12 / 100;
        const totalMonths = yearsToMarriage * 12;

        let monthlySIP = 0;
        if (totalMonths > 0) {
            monthlySIP = futureCost / (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
        }

        const chartData = [];
        for (let year = 0; year <= yearsToMarriage; year++) {
            chartData.push({
                year: `Year ${year}`,
                cost: Math.round(currentCost * Math.pow(1 + inflation / 100, year)),
            });
        }

        return {
            futureCost: Math.round(futureCost),
            monthlySIP: Math.round(monthlySIP),
            chartData
        };
    };

    const result = calculateMarriage();

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
            await generatePDF('report-content', 'VRK-Wealth-Marriage-Planning-Report');
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
                title="Grand Wedding"
                highlightedText="Calculator"
                subtitle="Celebrate a legacy of love. Plan for a grand celebration with systematic wealth creation."
                image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&auto=format&fit=crop&q=80"
                badge="Plan the Perfect Day"
                icon={<Heart className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-4 py-16">
                <div id="report-content" className="bg-gray-50 p-4">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1e3a8a] shadow-inner">
                                    <Sparkles className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900">Celebration Goals</h3>
                            </div>

                            <div className="space-y-12">
                                <div className="group">
                                    <div className="flex justify-between items-center mb-6">
                                        <label className="text-gray-700 font-bold text-lg">Current Marriage Budget</label>
                                        <span className="text-2xl font-black text-[#1e3a8a] bg-blue-50 px-5 py-2 rounded-2xl">{formatCurrency(currentCost)}</span>
                                    </div>
                                    <input
                                        type="range" min="500000" max="50000000" step="500000" value={currentCost}
                                        onChange={(e) => setCurrentCost(Number(e.target.value))}
                                        className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-400 mt-4 font-black uppercase tracking-widest">
                                        <span>5 LAKH</span>
                                        <span>5 CRORE</span>
                                    </div>
                                </div>

                                <div className="group">
                                    <div className="flex justify-between items-center mb-6">
                                        <label className="text-gray-700 font-bold text-lg">Estimated Years</label>
                                        <span className="text-2xl font-black text-[#0d9488] bg-teal-50 px-5 py-2 rounded-2xl">{yearsToMarriage} Years</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="25" step="1" value={yearsToMarriage}
                                        onChange={(e) => setYearsToMarriage(Number(e.target.value))}
                                        className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0d9488]"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100">
                                        <label className="text-orange-900 font-bold block mb-4">Inflation (%)</label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range" min="5" max="15" step="0.5" value={inflation}
                                                onChange={(e) => setInflation(Number(e.target.value))}
                                                className="flex-grow h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                            />
                                            <span className="font-black text-orange-600 text-xl w-12">{inflation}%</span>
                                        </div>
                                    </div>

                                    <div className="bg-teal-50 p-6 rounded-[2rem] border border-teal-100">
                                        <label className="text-teal-900 font-bold block mb-4">Return (%)</label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range" min="5" max="25" step="0.5" value={returns}
                                                onChange={(e) => setReturns(Number(e.target.value))}
                                                className="flex-grow h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-[#0d9488]"
                                            />
                                            <span className="font-black text-[#0d9488] text-xl w-12">{returns}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-8">
                            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                                    <p className="text-blue-100/60 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Final Corpus Goal</p>
                                    <p className="text-4xl font-black">{formatCurrency(result.futureCost)}</p>
                                </div>
                                <div className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                                    <p className="text-teal-100/60 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Monthly Investment</p>
                                    <p className="text-4xl font-black">{formatCurrency(result.monthlySIP)}</p>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
                                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center">
                                    <TrendingUp className="w-7 h-7 mr-3 text-[#0d9488]" />
                                    Appreciation Forecast
                                </h3>
                                <div className="h-[280px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={result.chartData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                                            <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => formatCurrency(val)} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                                            <Tooltip
                                                cursor={{ fill: '#f1f5f9' }}
                                                formatter={(val) => [formatCurrency(Number(val)), 'Wedding Cost']}
                                                contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
                                                itemStyle={{ fontWeight: 'black', color: '#1e3a8a' }}
                                            />
                                            <Bar dataKey="cost" fill="#1e3a8a" radius={[10, 10, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        variants={fadeInUp}
                        className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl flex flex-col items-center text-center justify-center gap-6"
                    >
                        <Heart className="w-12 h-12 text-[#0d9488] animate-pulse" />
                        <div>
                            <h4 className="text-2xl font-black text-gray-900 mb-2">Ready to Create a Legacy?</h4>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                A grand celebration requires grand planning. Let us help you navigate the financial journey to your family's most cherished milestone.
                            </p>
                        </div>
                    </motion.div>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={downloadReport}
                            disabled={isExporting}
                            className="bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] px-8 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isExporting ? <div className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin" /> : <Download className="w-6 h-6" />}
                            {isExporting ? 'Generating...' : 'Download PDF Report'}
                        </button>
                        <Link
                            to="/contact"
                            className="bg-[#1e3a8a] text-white px-8 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3"
                        >
                            <FileText className="w-6 h-6" />
                            Secure the Celebration
                        </Link>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-[3rem] shadow-2xl p-16 text-white text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-4xl font-black mb-6">Plan Your Future Together</h2>
                        <p className="text-xl text-blue-100/80 mb-12 leading-relaxed">
                            With professional guidance and disciplined investing, you can ensure that every milestone in your life is celebrated exactly as you envisioned.
                        </p>
                        <Link
                            to="/contact"
                            className="bg-white text-[#1e3a8a] px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl hover:shadow-white/20 flex items-center gap-3 mx-auto w-fit"
                        >
                            Get Professional Guidance
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
