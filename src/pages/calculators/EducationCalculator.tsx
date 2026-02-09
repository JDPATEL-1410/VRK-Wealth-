import { useState } from 'react';
import { GraduationCap, TrendingUp, Calendar, ArrowRight, Download, FileText, IndianRupee } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
        for (let year = 0; year <= yearsToCollege; year++) {
            chartData.push({
                year: `Year ${year}`,
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

    const downloadReport = async () => {
        try {
            const element = document.getElementById('report-content');
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`VRK-Wealth-Education-Planning-Report.pdf`);
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHeader
                title="Child Education"
                highlightedText="Solution"
                subtitle="Ensure your child's educational future with precision planning and inflation-adjusted savings."
                icon={<GraduationCap className="w-16 h-16 text-[#0d9488]" />}
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
                        <motion.div variants={fadeInUp} className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
                                    <IndianRupee className="w-6 h-6 mr-3 text-[#1e3a8a]" />
                                    Education Target
                                </h3>

                                <div className="space-y-12">
                                    <div className="group">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-gray-700 font-bold">Current Course Fees</label>
                                            <span className="text-2xl font-black text-[#1e3a8a] bg-blue-50 px-4 py-2 rounded-xl">{formatCurrency(currentExpense)}</span>
                                        </div>
                                        <input
                                            type="range" min="100000" max="10000000" step="100000" value={currentExpense}
                                            onChange={(e) => setCurrentExpense(Number(e.target.value))}
                                            className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]"
                                        />
                                    </div>

                                    <div className="group">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-gray-700 font-bold">Years Until College</label>
                                            <span className="text-2xl font-black text-[#0d9488] bg-teal-50 px-4 py-2 rounded-xl">{yearsToCollege} Years</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="25" step="1" value={yearsToCollege}
                                            onChange={(e) => setYearsToCollege(Number(e.target.value))}
                                            className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0d9488]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest text-red-500">Edu Inflation (%)</label>
                                            <input type="number" step="0.5" value={inflation} onChange={(e) => setInflation(Number(e.target.value))}
                                                className="w-full px-6 py-4 bg-red-50 border-none rounded-2xl font-black text-2xl text-red-600" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest text-emerald-500">Expected Ret (%)</label>
                                            <input type="number" step="0.5" value={returns} onChange={(e) => setReturns(Number(e.target.value))}
                                                className="w-full px-6 py-4 bg-emerald-50 border-none rounded-2xl font-black text-2xl text-emerald-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 space-y-4">
                                <button
                                    onClick={downloadReport}
                                    className="w-full bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-md"
                                >
                                    <Download className="w-5 h-5" />
                                    Download PDF Report
                                </button>
                                <Link to="/contact" className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-blue-900/10">
                                    Start Planning <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </motion.div>

                        <div className="space-y-8">
                            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#1e3a8a] text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                                    <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-4">Required Future Corpus</p>
                                    <p className="text-4xl font-black leading-tight selection:bg-white/20">{formatCurrency(result.futureCost)}</p>
                                </div>
                                <div className="bg-[#0d9488] text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                                    <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-4">Target SIP Amount</p>
                                    <p className="text-4xl font-black leading-tight selection:bg-white/20">{formatCurrency(result.monthlySIP)}</p>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100 h-full">
                                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center">
                                    <TrendingUp className="w-6 h-6 mr-3 text-[#0d9488]" />
                                    Cost Escalation Curve
                                </h3>
                                <div className="h-[280px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={result.chartData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                                            <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => formatCurrency(val)} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                                            <Tooltip
                                                cursor={{ fill: '#f1f5f9' }}
                                                formatter={(val) => [formatCurrency(Number(val)), 'Education Cost']}
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                            />
                                            <Bar dataKey="cost" fill="#1e3a8a" radius={[8, 8, 0, 0]} barSize={40} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={fadeInUp} className="bg-amber-50 rounded-[2rem] p-8 border border-amber-100 flex gap-6 items-center shadow-lg shadow-amber-900/5">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                            <Calendar className="w-8 h-8 text-amber-500" />
                        </div>
                        <div>
                            <h4 className="font-black text-amber-900 mb-2 text-sm uppercase tracking-widest">Early Mover Advantage</h4>
                            <p className="text-amber-800 text-xs font-bold leading-relaxed opacity-80">
                                For every year you delay, the cost of education increases significantly. Strategic planning starting today protects your child's dreams from future inflation shocks.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="bg-white rounded-[2rem] p-8 border border-gray-100 flex gap-6 items-center shadow-lg shadow-blue-900/5">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <FileText className="w-8 h-8 text-[#1e3a8a]" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-black text-gray-900 text-sm uppercase tracking-widest leading-none">Inflation Sensitivity</h4>
                            <p className="text-gray-500 text-xs font-bold leading-relaxed">Education inflation usually ranges between 8-10% annually in top tier universities globally.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
