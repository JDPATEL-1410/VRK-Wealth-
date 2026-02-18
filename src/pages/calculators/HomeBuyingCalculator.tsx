import { useState } from 'react';
import { Home, Key, Percent, Download, FileText } from 'lucide-react';
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
                title="Dream Home"
                highlightedText="Calculator"
                subtitle="Calculate the future value of your dream property and create a systematic roadmap to ownership."
                image="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&auto=format&fit=crop&q=80"
                badge="Your Home Awaits"
                icon={<Home className="w-4 h-4 text-white/80" />}
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
                                    <Home className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900">Property Vision</h3>
                            </div>

                            <div className="space-y-12">
                                <div className="group">
                                    <div className="flex justify-between items-center mb-6">
                                        <label className="text-gray-700 font-bold text-lg">Current Property Value</label>
                                        <span className="text-2xl font-black text-[#1e3a8a] bg-blue-50 px-5 py-2 rounded-2xl">{formatCurrency(targetAmount)}</span>
                                    </div>
                                    <input
                                        type="range" min="1000000" max="50000000" step="100000" value={targetAmount}
                                        onChange={(e) => setTargetAmount(Number(e.target.value))}
                                        className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-400 mt-4 font-black uppercase tracking-widest">
                                        <span>10 LAKH</span>
                                        <span>5 CRORE</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="text-sm font-bold text-gray-400 block mb-3 uppercase">Buying After (Yrs)</label>
                                        <div className="relative">
                                            <input
                                                type="number" value={yearsToBuy}
                                                onChange={(e) => setYearsToBuy(Number(e.target.value))}
                                                className="w-full pl-5 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-gray-900 focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e3a8a] transition-all"
                                            />
                                            <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="text-sm font-bold text-gray-400 block mb-3 uppercase">Property Inflation (%)</label>
                                        <div className="relative">
                                            <input
                                                type="number" value={inflation}
                                                onChange={(e) => setInflation(Number(e.target.value))}
                                                className="w-full pl-5 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-gray-900 focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e3a8a] transition-all"
                                            />
                                            <Percent className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <label className="text-gray-700 font-bold text-lg">Expected Returns (%)</label>
                                        <span className="text-2xl font-black text-[#0d9488] bg-teal-50 px-5 py-2 rounded-2xl">{expectedReturn}%</span>
                                    </div>
                                    <input
                                        type="range" min="5" max="25" step="0.5" value={expectedReturn}
                                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                        className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0d9488]"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-8">
                            <motion.div variants={fadeInUp} className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 p-10 text-center relative">
                                <div className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={80}
                                                outerRadius={110}
                                                paddingAngle={10}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                                formatter={(v) => formatCurrency(Number(v))}
                                            />
                                            <Legend
                                                verticalAlign="bottom"
                                                iconType="circle"
                                                wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold', fontSize: '12px', color: '#64748b' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-6">
                                    <p className="text-gray-400 uppercase font-black text-[10px] tracking-[0.2em] mb-2">Projected Cost in {yearsToBuy} Years</p>
                                    <p className="text-5xl font-black text-[#1e3a8a] leading-none">{formatCurrency(inflatedGoal)}</p>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-[2.5rem] p-12 text-white shadow-2xl relative group overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700"></div>
                                <h4 className="text-blue-100/60 font-bold uppercase text-xs tracking-[0.2em] mb-4">Monthly Investment Required</h4>
                                <p className="text-6xl font-black mb-10 leading-none">{formatCurrency(monthlySIP)}</p>

                                <div className="flex items-center gap-5 py-6 border-t border-white/10">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                        <Percent className="w-6 h-6 text-amber-400" />
                                    </div>
                                    <p className="text-sm font-medium text-blue-100/80 leading-relaxed">
                                        Assuming a disciplined portfolio yielding <strong className="text-white">{expectedReturn}% p.a.</strong>
                                    </p>
                                </div>

                                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        onClick={downloadReport}
                                        disabled={isExporting}
                                        className="bg-white text-[#1e3a8a] py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all active:scale-95 border-2 border-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isExporting ? <div className="w-6 h-6 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin" /> : <Download className="w-6 h-6" />}
                                        {isExporting ? 'Generating...' : 'PDF Report'}
                                    </button>
                                    <Link
                                        to="/contact"
                                        className="bg-[#0d9488] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(13,148,136,0.3)] transition-all active:scale-95"
                                    >
                                        <FileText className="w-6 h-6" />
                                        Get Plan
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
