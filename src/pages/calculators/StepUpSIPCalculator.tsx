import { useState } from 'react';
import { TrendingUp, PieChart as PieChartIcon, Calendar, IndianRupee, Download, ArrowRight } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';

export function StepUpSIPCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
    const [period, setPeriod] = useState(10);
    const [returnRate, setReturnRate] = useState(12);
    const [stepUp, setStepUp] = useState(10);

    const calculateStepUpSIP = () => {
        let totalInvested = 0;
        let totalValue = 0;
        const monthlyRate = returnRate / 12 / 100;
        let currentMonthlyInvestment = monthlyInvestment;
        const yearWiseData = [];

        for (let year = 1; year <= period; year++) {
            let yearlyInvested = 0;
            for (let month = 1; month <= 12; month++) {
                totalValue = (totalValue + currentMonthlyInvestment) * (1 + monthlyRate);
                yearlyInvested += currentMonthlyInvestment;
                totalInvested += currentMonthlyInvestment;
            }

            yearWiseData.push({
                year: `Year ${year}`,
                invested: Math.round(totalInvested),
                returns: Math.round(totalValue - totalInvested),
                total: Math.round(totalValue),
                monthly: Math.round(currentMonthlyInvestment)
            });

            currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUp / 100);
        }

        return {
            futureValue: Math.round(totalValue),
            invested: Math.round(totalInvested),
            returns: Math.round(totalValue - totalInvested),
            yearWiseData
        };
    };

    const result = calculateStepUpSIP();
    const chartData = result.yearWiseData;

    const pieData = [
        { name: 'Total Investment', value: result.invested, color: '#1e3a8a' },
        { name: 'Estimated Returns', value: result.returns, color: '#0d9488' }
    ];

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
            await generatePDF('report-content', 'VRK-Wealth-Step-Up-SIP-Report');
        } catch (error: any) {
            console.error('PDF Generation Error:', error);
            alert(`Failed to generate PDF: ${error.message || 'Unknown error'}. If you are on mobile, please try from a desktop browser.`);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHeader
                title="Step-Up SIP"
                highlightedText="Calculator"
                subtitle="Calculate returns with annual increment in your SIP amount for accelerated wealth creation"
                image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&auto=format&fit=crop&q=80"
                badge="Grow With Your Income"
                icon={<TrendingUp className="w-4 h-4 text-white/80" />}
            />

            <div className="container mx-auto px-4 py-12">
                <div id="report-content" className="bg-white p-8 rounded-[3rem]">
                    {/* Report Branding Header */}
                    <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-slate-100 pb-8 gap-4">
                        <div>
                            <h2 className="text-4xl font-black text-[#1e3a8a] mb-2 uppercase tracking-tight">Step-Up SIP Projection</h2>
                            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs">Accelerated wealth creation analysis</p>
                        </div>
                        <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100">
                            <span className="text-[#1e3a8a] font-black text-sm uppercase">Growth Optimized</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                            <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
                                <IndianRupee className="w-6 h-6 mr-2 text-[#1e3a8a]" />
                                Power Parameters
                            </h2>

                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-gray-700 font-bold">Initial Monthly Investment</label>
                                    <span className="text-2xl font-black text-[#1e3a8a] bg-blue-50 px-4 py-2 rounded-xl">{formatCurrency(monthlyInvestment)}</span>
                                </div>
                                <input
                                    type="range" min="500" max="100000" step="500" value={monthlyInvestment}
                                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]"
                                />
                            </div>

                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-gray-700 font-bold">Annual Step-Up (%)</label>
                                    <span className="text-2xl font-black text-amber-600 bg-amber-50 px-4 py-2 rounded-xl">{stepUp}%</span>
                                </div>
                                <input
                                    type="range" min="1" max="50" step="1" value={stepUp}
                                    onChange={(e) => setStepUp(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                />
                            </div>

                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-gray-700 font-bold">Investment Tenure</label>
                                    <span className="text-2xl font-black text-[#0d9488] bg-teal-50 px-4 py-2 rounded-xl">{period} Years</span>
                                </div>
                                <input
                                    type="range" min="1" max="35" step="1" value={period}
                                    onChange={(e) => setPeriod(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0d9488]"
                                />
                            </div>

                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-gray-700 font-bold">Expected Return (p.a.)</label>
                                    <span className="text-2xl font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">{returnRate}%</span>
                                </div>
                                <input
                                    type="range" min="1" max="30" step="0.5" value={returnRate}
                                    onChange={(e) => setReturnRate(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 mt-8">
                                <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] p-6 rounded-2xl text-white shadow-lg">
                                    <p className="opacity-80 text-sm font-bold mb-1 uppercase tracking-wider">Total Investment</p>
                                    <p className="text-3xl font-black font-mono">{formatCurrency(result.invested)}</p>
                                </div>
                                <div className="bg-gradient-to-r from-[#0d9488] to-[#0f766e] p-6 rounded-2xl text-white shadow-lg">
                                    <p className="opacity-80 text-sm font-bold mb-1 uppercase tracking-wider">Estimated Returns</p>
                                    <p className="text-3xl font-black font-mono">{formatCurrency(result.returns)}</p>
                                </div>
                                <div className="bg-white border-2 border-[#d4af37] p-6 rounded-2xl shadow-lg">
                                    <p className="text-gray-500 text-sm font-bold mb-1 uppercase tracking-wider">Total Future Value</p>
                                    <p className="text-3xl font-black font-mono text-[#d4af37]">{formatCurrency(result.futureValue)}</p>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={downloadReport}
                                    disabled={isExporting}
                                    className="bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isExporting ? (
                                        <div className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Download className="w-5 h-5" />
                                    )}
                                    {isExporting ? 'Generating...' : 'Download PDF'}
                                </button>
                                <button className="bg-[#1e3a8a] text-white py-4 rounded-xl font-black text-lg hover:scale-[1.02] transition-all flex items-center justify-center shadow-lg shadow-blue-900/10">
                                    Accelerate Goal <ArrowRight className="ml-2 w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center">
                                    <TrendingUp className="w-6 h-6 mr-2 text-[#1e3a8a]" />
                                    Step-Up Growth Curve
                                </h3>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                            <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                            <YAxis stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} tick={{ fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                            <Tooltip
                                                formatter={(value) => formatCurrency(Number(value))}
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                            />
                                            <Legend iconType="circle" />
                                            <Area type="monotone" dataKey="invested" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorInvested)" name="Total Invested" />
                                            <Area type="monotone" dataKey="total" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" name="Wealth Value" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center">
                                    <PieChartIcon className="w-6 h-6 mr-2 text-[#0d9488]" />
                                    Wealth Dynamics
                                </h3>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={8} dataKey="value">
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                            <Legend verticalAlign="bottom" height={36} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
                        <div className="px-10 py-8 bg-gray-50 border-b border-gray-100">
                            <h3 className="text-2xl font-black text-gray-900 flex items-center">
                                <Calendar className="w-7 h-7 mr-3 text-amber-500" />
                                Annual Maturity Outlook
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Investment Year</th>
                                        <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-[#1e3a8a]">Monthly Contribution</th>
                                        <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Yielding Gains</th>
                                        <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total Corpus Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {chartData.map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-10 py-5 font-bold text-gray-600">{row.year}</td>
                                            <td className="px-10 py-5 font-black text-[#1e3a8a]">{formatCurrency(row.monthly)}</td>
                                            <td className="px-10 py-5 font-black text-[#0d9488]">{formatCurrency(row.returns)}</td>
                                            <td className="px-10 py-5 font-black text-emerald-600 text-right group-hover:scale-105 transition-transform">{formatCurrency(row.total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-[#1e3a8a] rounded-[2.5rem] p-12 text-white relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110"></div>
                    <div className="relative z-10 max-w-5xl">
                        <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                            <TrendingUp className="text-teal-400" />
                            Accelerate Your Financial Independence
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12 font-medium leading-relaxed">
                            <p>Step-Up SIP is the ultimate financial hack to match your investments with your career growth. By increasing your contributions annually, you're not just saving; you're compounding your wealth at an exponential rate.</p>
                            <p>A mere 10% annual step-up can often result in a final corpus that is 2x or 3x higher than a standard SIP over the long term. It's the most effective strategy to counteract inflation and lifestyle creep.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] leading-relaxed">
                        Disclaimer: Mutual fund investments are subject to market risks. Past performance does not guarantee future results. Calculations are for illustration purposes only.
                    </p>
                </div>
            </div>
        </div>
    );
}
