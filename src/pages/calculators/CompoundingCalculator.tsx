import { useState } from 'react';
import { Sparkles, TrendingUp, Zap, Download, ArrowRight, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';

export function CompoundingCalculator() {
    const [principal, setPrincipal] = useState(100000);
    const [monthlyContribution, setMonthlyContribution] = useState(5000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(12);

    const calculateCompounding = () => {
        const monthlyRate = rate / 12 / 100;
        const totalMonths = years * 12;

        const fvPrincipal = principal * Math.pow(1 + monthlyRate, totalMonths);
        const fvSIP = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);

        const totalValue = fvPrincipal + fvSIP;
        const totalInvested = principal + (monthlyContribution * totalMonths);
        const totalReturns = totalValue - totalInvested;

        const chartData = [];
        for (let y = 0; y <= years; y++) {
            const months = y * 12;
            const fvP = principal * Math.pow(1 + monthlyRate, months);
            const fvS = months === 0 ? 0 : monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
            const currentVal = fvP + fvS;
            const currentInv = principal + (monthlyContribution * months);

            chartData.push({
                year: `Year ${y}`,
                total: Math.round(currentVal),
                invested: Math.round(currentInv),
                returns: Math.round(currentVal - currentInv)
            });
        }

        return {
            totalValue: Math.round(totalValue),
            totalInvested: Math.round(totalInvested),
            totalReturns: Math.round(totalReturns),
            chartData
        };
    };

    const result = calculateCompounding();

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
            await generatePDF('report-content', 'VRK-Wealth-Compounding-Report');
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
                title="Compounding"
                highlightedText="Calculator"
                subtitle="The eighth wonder of the world. Visualize how your money grows exponentially over time."
                image="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1920&auto=format&fit=crop&q=80"
                badge="Power of Compounding"
                icon={<Sparkles className="w-4 h-4 text-white/80" />}
            />

            <div id="report-content" className="container mx-auto px-4 py-12 bg-gray-50">
                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    <div className="bg-white rounded-[2rem] shadow-xl p-10 border border-gray-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
                            <Zap className="w-6 h-6 mr-3 text-amber-500" />
                            Growth Variables
                        </h3>

                        <div className="space-y-12">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-gray-700 font-bold">Initial Lumpsum</label>
                                    <span className="text-2xl font-black text-[#1e3a8a] bg-blue-50 px-4 py-2 rounded-xl">{formatCurrency(principal)}</span>
                                </div>
                                <input
                                    type="range" min="0" max="10000000" step="10000" value={principal}
                                    onChange={(e) => setPrincipal(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-gray-700 font-bold">Monthly Top-up</label>
                                    <span className="text-2xl font-black text-[#0d9488] bg-teal-50 px-4 py-2 rounded-xl">{formatCurrency(monthlyContribution)}</span>
                                </div>
                                <input
                                    type="range" min="0" max="500000" step="1000" value={monthlyContribution}
                                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0d9488]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">Time (Years)</label>
                                    <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-black text-2xl text-[#1e3a8a]" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">Returns (%)</label>
                                    <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-black text-2xl text-emerald-600" />
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
                                Start Growing <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.3em] mb-4">Projected Future Wealth</p>
                            <p className="text-6xl font-black text-[#1e3a8a] mb-10 selection:bg-blue-100">{formatCurrency(result.totalValue)}</p>

                            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-gray-100">
                                <div className="bg-blue-50/50 p-4 rounded-2xl">
                                    <p className="text-gray-400 text-[9px] font-black uppercase mb-1 tracking-widest">Total Principal</p>
                                    <p className="text-xl font-black text-gray-700">{formatCurrency(result.totalInvested)}</p>
                                </div>
                                <div className="bg-teal-50/50 p-4 rounded-2xl">
                                    <p className="text-gray-400 text-[9px] font-black uppercase mb-1 tracking-widest">Wealth Multiplier</p>
                                    <p className="text-xl font-black text-[#0d9488]">{formatCurrency(result.totalReturns)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1e3a8a] rounded-[2.5rem] p-10 text-white shadow-2xl h-[380px] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] opacity-50"></div>
                            <h4 className="font-black text-xl mb-8 flex items-center gap-3 relative z-10">
                                <TrendingUp className="w-6 h-6 text-teal-400" />
                                Exponential Growth Curve
                            </h4>
                            <div className="w-full h-[220px] relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={result.chartData}>
                                        <defs>
                                            <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                        <XAxis dataKey="year" hide />
                                        <YAxis hide />
                                        <Tooltip
                                            formatter={(v: any) => formatCurrency(Number(v))}
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}
                                        />
                                        <Area type="monotone" dataKey="total" stroke="#2dd4bf" strokeWidth={5} fill="url(#compGrad)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-[10px] text-teal-200 mt-4 font-black uppercase tracking-widest relative z-10 text-center">Growth accelerates exponentially over the years</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 max-w-7xl mx-auto overflow-hidden">
                    <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                        <Calendar className="w-7 h-7 text-[#0d9488]" />
                        Maturity Roadmap
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-gray-100">
                                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-[#1e3a8a]">Year</th>
                                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Invested Capital</th>
                                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Returns Generated</th>
                                    <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Portfolio Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 font-bold">
                                {result.chartData.map((data, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                        <td className="py-4 px-6 text-gray-500 font-bold">{data.year}</td>
                                        <td className="py-4 px-6 text-[#1e3a8a]">{formatCurrency(data.invested)}</td>
                                        <td className="py-4 px-6 text-[#0d9488]">{formatCurrency(data.returns)}</td>
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
