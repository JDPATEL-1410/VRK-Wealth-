import { useState } from 'react';
import { Repeat, Download, ArrowRight, Calendar, TrendingUp } from 'lucide-react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function STPCalculator() {
    const [initialAmount, setInitialAmount] = useState(500000);
    const [transferAmount, setTransferAmount] = useState(5000);
    const [period, setPeriod] = useState(60); // months
    const [sourceReturn, setSourceReturn] = useState(6);
    const [targetReturn, setTargetReturn] = useState(12);

    const calculateSTP = () => {
        let sourceValue = initialAmount;
        let targetValue = 0;
        const sourceMonthlyRate = sourceReturn / 12 / 100;
        const targetMonthlyRate = targetReturn / 12 / 100;
        const chartData = [];

        for (let month = 1; month <= period; month++) {
            sourceValue = sourceValue * (1 + sourceMonthlyRate);
            const actualTransfer = Math.min(sourceValue, transferAmount);
            sourceValue -= actualTransfer;
            targetValue = (targetValue + actualTransfer) * (1 + targetMonthlyRate);

            if (month % 6 === 0 || month === period) {
                chartData.push({
                    month: `M${month}`,
                    source: Math.round(sourceValue),
                    target: Math.round(targetValue),
                    total: Math.round(sourceValue + targetValue)
                });
            }
        }

        return {
            finalSource: Math.round(sourceValue),
            finalTarget: Math.round(targetValue),
            totalValue: Math.round(sourceValue + targetValue),
            totalGains: Math.round(sourceValue + targetValue - initialAmount),
            chartData
        };
    };

    const result = calculateSTP();

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
            await generatePDF('report-content', 'VRK-Wealth-STP-Report');
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
                title="STP"
                highlightedText="Transition"
                subtitle="Systematic Transfer Plan. Transition your assets strategically while managing market volatility."
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&auto=format&fit=crop&q=80"
                badge="Smart Asset Transfer"
                icon={<Repeat className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
                <div id="report-content" className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[3rem] shadow-sm">
                    {/* Branded Header */}
                    <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-100 pb-5 gap-3">
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-1 uppercase tracking-tight">STP Migration Blueprint</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs">Precision portfolio transition modeling</p>
                        </div>
                        <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                            <span className="text-blue-600 font-black text-xs sm:text-sm uppercase">Smart Rebalancing</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-7xl mx-auto">
                        {/* Inputs Panel */}
                        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2rem] shadow-lg sm:shadow-xl p-5 sm:p-10 border border-gray-100 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center">
                                    <Repeat className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-[#1e3a8a]" />
                                    Strategic Transition
                                </h3>

                                <div className="space-y-8 sm:space-y-12">
                                    <div>
                                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                                            <label className="text-gray-700 font-bold text-sm sm:text-base">Initial Principal</label>
                                            <span className="text-base sm:text-2xl font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(initialAmount)}</span>
                                        </div>
                                        <input type="range" min="50000" max="10000000" step="50000" value={initialAmount}
                                            onChange={(e) => setInitialAmount(Number(e.target.value))}
                                            className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                                            <label className="text-gray-700 font-bold text-sm sm:text-base">Monthly Transfer</label>
                                            <span className="text-base sm:text-2xl font-black text-[#0d9488] bg-teal-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl">{formatCurrency(transferAmount)}</span>
                                        </div>
                                        <input type="range" min="1000" max="500000" step="1000" value={transferAmount}
                                            onChange={(e) => setTransferAmount(Number(e.target.value))}
                                            className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0d9488]" />
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-gray-50">
                                        <div>
                                            <label className="text-[8px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-center">Months</label>
                                            <input type="number" value={period} onChange={(e) => setPeriod(Number(e.target.value))}
                                                className="w-full p-2 sm:p-4 bg-gray-100 rounded-xl font-black text-center text-sm sm:text-xl text-[#1e3a8a]" />
                                        </div>
                                        <div>
                                            <label className="text-[8px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-center">Src %</label>
                                            <input type="number" value={sourceReturn} onChange={(e) => setSourceReturn(Number(e.target.value))}
                                                className="w-full p-2 sm:p-4 bg-emerald-50 rounded-xl font-black text-center text-sm sm:text-xl text-emerald-600" />
                                        </div>
                                        <div>
                                            <label className="text-[8px] sm:text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-center">Tgt %</label>
                                            <input type="number" value={targetReturn} onChange={(e) => setTargetReturn(Number(e.target.value))}
                                                className="w-full p-2 sm:p-4 bg-teal-50 rounded-xl font-black text-center text-sm sm:text-xl text-teal-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 sm:mt-12 space-y-3">
                                <button
                                    onClick={downloadReport}
                                    disabled={isExporting}
                                    className="w-full bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isExporting ? <div className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin" /> : <Download className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    {isExporting ? 'Generating...' : 'Download PDF Report'}
                                </button>
                                <button className="w-full bg-[#1e3a8a] text-white py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl">
                                    Configure STP <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Result Display */}
                        <div className="space-y-6 sm:space-y-8">
                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-[#1e3a8a] text-white rounded-xl sm:rounded-[2.5rem] p-6 sm:p-10 shadow-lg sm:shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 sm:w-48 sm:h-48 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                                <p className="text-white/40 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-2 sm:mb-4 text-center sm:text-left">Projected Final Balance</p>
                                <p className="text-3xl sm:text-6xl font-black mb-6 sm:mb-10 text-center sm:text-left selection:bg-white/20">{formatCurrency(result.totalValue)}</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-10 border-t border-white/10">
                                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm shadow-inner">
                                        <p className="text-[7px] sm:text-[9px] text-white/50 uppercase font-black mb-1 tracking-widest text-center sm:text-left">Target Fund (Equity)</p>
                                        <p className="text-base sm:text-2xl font-black text-center sm:text-left">{formatCurrency(result.finalTarget)}</p>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm shadow-inner">
                                        <p className="text-[7px] sm:text-[9px] text-white/50 uppercase font-black mb-1 tracking-widest text-center sm:text-left">Source Fund (Debt)</p>
                                        <p className="text-base sm:text-2xl font-black text-center sm:text-left">{formatCurrency(result.finalSource)}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white rounded-xl sm:rounded-[2.5rem] shadow-lg sm:shadow-xl p-6 sm:p-10 border border-gray-100 flex flex-col">
                                <h4 className="font-black text-gray-900 mb-6 sm:mb-8 flex items-center text-sm sm:text-lg">
                                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-[#0d9488]" />
                                    Asset Migration Map
                                </h4>
                                <div className="h-[200px] sm:h-[280px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={result.chartData}>
                                            <defs>
                                                <linearGradient id="sourceGrad" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.6} />
                                                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="month" hide />
                                            <YAxis hide />
                                            <Tooltip
                                                formatter={(v: any) => formatCurrency(Number(v))}
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', fontSize: '10px' }}
                                                itemStyle={{ fontWeight: 'bold' }}
                                            />
                                            <Area type="monotone" dataKey="source" stackId="1" stroke="#94a3b8" strokeWidth={2} fill="url(#sourceGrad)" name="Source Asset" />
                                            <Area type="monotone" dataKey="target" stackId="1" stroke="#1e3a8a" strokeWidth={3} fill="url(#targetGrad)" name="Target Wealth" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-6 sm:mt-8 p-4 bg-teal-50 rounded-2xl border border-teal-100 italic text-[10px] sm:text-sm text-[#0f766e] text-center font-medium">
                                    "Transitioning reduces the risk of market timing peaks while keeping your capital productive."
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="mt-8 sm:mt-16 bg-white rounded-xl sm:rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 sm:p-8 flex items-center gap-3 border-b border-gray-100">
                            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                            <h3 className="text-lg sm:text-2xl font-black text-gray-900">Migration Lifecycle</h3>
                        </div>
                        <div className="overflow-x-auto -mx-1">
                            <table className="w-full text-left min-w-[500px]">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Month</th>
                                        <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Source (Debt)</th>
                                        <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Target (Equity)</th>
                                        <th className="py-4 px-4 sm:px-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 font-bold">
                                    {result.chartData.map((data, index) => (
                                        <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-gray-500">{data.month}</td>
                                            <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-slate-500 font-bold">{formatCurrency(data.source)}</td>
                                            <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-[#1e3a8a] font-black">{formatCurrency(data.target)}</td>
                                            <td className="py-4 px-4 sm:px-6 text-[11px] sm:text-sm text-emerald-600 text-right font-black">{formatCurrency(data.total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 text-center max-w-4xl mx-auto px-2">
                    <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] leading-relaxed">
                        STP is a powerful mechanism for Rupee Cost Averaging when you have a lumpsum. Market risks apply to the equity portion. Past performance is not indicative of future results.
                    </p>
                </div>
            </div>
        </div>
    );
}
