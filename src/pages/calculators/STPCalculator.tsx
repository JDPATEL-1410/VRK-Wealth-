import { useState } from 'react';
import { Repeat, Download, ArrowRight, Calendar, TrendingUp } from 'lucide-react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';

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
                    month: `Mo ${month}`,
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
                highlightedText="Solutions"
                subtitle="Systematic Transfer Plan. Transition your assets strategically while managing market volatility."
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&auto=format&fit=crop&q=80"
                badge="Smart Asset Transfer"
                icon={<Repeat className="w-4 h-4 text-white/80" />}
            />

            <div id="report-content" className="container mx-auto px-4 py-12 bg-gray-50">
                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    <div className="bg-white rounded-[2rem] shadow-xl p-10 border border-gray-100 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
                                <Repeat className="w-6 h-6 mr-3 text-[#1e3a8a]" />
                                Strategic Transition
                            </h3>

                            <div className="space-y-10">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-gray-700 font-bold">Initial Asset Value (Principal)</label>
                                        <span className="text-2xl font-black text-[#1e3a8a] bg-blue-50 px-4 py-2 rounded-xl">{formatCurrency(initialAmount)}</span>
                                    </div>
                                    <input type="range" min="50000" max="10000000" step="50000" value={initialAmount}
                                        onChange={(e) => setInitialAmount(Number(e.target.value))}
                                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-gray-700 font-bold">Systematic Monthly Transfer</label>
                                        <span className="text-2xl font-black text-[#0d9488] bg-teal-50 px-4 py-2 rounded-xl">{formatCurrency(transferAmount)}</span>
                                    </div>
                                    <input type="range" min="1000" max="500000" step="1000" value={transferAmount}
                                        onChange={(e) => setTransferAmount(Number(e.target.value))}
                                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0d9488]" />
                                </div>

                                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-50">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-[#1e3a8a]">Months</label>
                                        <input type="number" value={period} onChange={(e) => setPeriod(Number(e.target.value))}
                                            className="w-full p-4 bg-gray-50 rounded-2xl font-black text-xl" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-emerald-600">Source %</label>
                                        <input type="number" value={sourceReturn} onChange={(e) => setSourceReturn(Number(e.target.value))}
                                            className="w-full p-4 bg-gray-50 rounded-2xl font-black text-xl" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest text-teal-600">Target %</label>
                                        <input type="number" value={targetReturn} onChange={(e) => setTargetReturn(Number(e.target.value))}
                                            className="w-full p-4 bg-gray-50 rounded-2xl font-black text-xl" />
                                    </div>
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
                            <button className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-blue-900/10">
                                Configure STP <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-[#1e3a8a] text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform"></div>
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Projected Maturity Balance</p>
                            <p className="text-6xl font-black mb-10 selection:bg-white/20">{formatCurrency(result.totalValue)}</p>
                            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-white/10">
                                <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-sm">
                                    <p className="text-[9px] text-white/50 uppercase font-black mb-1 tracking-widest">Growth in Target Fund</p>
                                    <p className="text-2xl font-black">{formatCurrency(result.finalTarget)}</p>
                                </div>
                                <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-sm">
                                    <p className="text-[9px] text-white/50 uppercase font-black mb-1 tracking-widest">Residual in Source Fund</p>
                                    <p className="text-2xl font-black">{formatCurrency(result.finalSource)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
                            <h4 className="font-black text-gray-900 mb-8 flex items-center text-lg">
                                <TrendingUp className="w-6 h-6 mr-3 text-[#0d9488]" />
                                Asset Migration Map
                            </h4>
                            <div className="h-[280px] w-full">
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
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                        />
                                        <Legend iconType="circle" />
                                        <Area type="monotone" dataKey="source" stackId="1" stroke="#94a3b8" strokeWidth={2} fill="url(#sourceGrad)" name="Source Asset" />
                                        <Area type="monotone" dataKey="target" stackId="1" stroke="#1e3a8a" strokeWidth={3} fill="url(#targetGrad)" name="Target Wealth" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-8 p-6 bg-teal-50 rounded-3xl border border-teal-100 italic text-sm text-[#0f766e] text-center font-medium">
                                "Systematic transition reduces the risk of market timing while keeping your capital productive."
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-white rounded-[2rem] shadow-xl p-12 border border-gray-100 max-w-7xl mx-auto overflow-hidden">
                    <h3 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-amber-500" />
                        Migration Lifecycle Breakdown
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-gray-100">
                                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-[#1e3a8a]">Checkpoint</th>
                                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Liquid / Debt Source</th>
                                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Equity / Growth Target</th>
                                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Consolidated Portfolio</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 font-bold">
                                {result.chartData.map((data, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                        <td className="py-4 px-6 text-gray-500 font-bold">{data.month}</td>
                                        <td className="py-4 px-6 text-slate-500">{formatCurrency(data.source)}</td>
                                        <td className="py-4 px-6 text-[#1e3a8a]">{formatCurrency(data.target)}</td>
                                        <td className="py-4 px-6 text-emerald-600 text-right font-black group-hover:scale-105 transition-transform">{formatCurrency(data.total)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
