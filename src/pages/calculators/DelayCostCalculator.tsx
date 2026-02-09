import { useState } from 'react';
import { Clock, TrendingUp, IndianRupee, AlertCircle, Download, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function DelayCostCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
    const [period, setPeriod] = useState(20);
    const [returnRate, setReturnRate] = useState(12);
    const [delayYears, setDelayYears] = useState(5);

    const calculateDelayCost = () => {
        const monthlyRate = returnRate / 12 / 100;

        // Scenario 1: Start Now
        const totalMonthsNow = period * 12;
        const futureValueNow = monthlyInvestment * ((Math.pow(1 + monthlyRate, totalMonthsNow) - 1) / monthlyRate) * (1 + monthlyRate);
        const totalInvestedNow = monthlyInvestment * totalMonthsNow;

        // Scenario 2: Start After Delay (same end time, so investment period is reduced)
        const totalMonthsDelayed = (period - delayYears) * 12;
        let futureValueDelayed = 0;
        let totalInvestedDelayed = 0;

        if (totalMonthsDelayed > 0) {
            futureValueDelayed = monthlyInvestment * ((Math.pow(1 + monthlyRate, totalMonthsDelayed) - 1) / monthlyRate) * (1 + monthlyRate);
            totalInvestedDelayed = monthlyInvestment * totalMonthsDelayed;
        }

        const costOfDelay = futureValueNow - futureValueDelayed;
        const missingReturns = (futureValueNow - totalInvestedNow) - (futureValueDelayed - totalInvestedDelayed);

        return {
            futureValueNow: Math.round(futureValueNow),
            futureValueDelayed: Math.round(futureValueDelayed),
            costOfDelay: Math.round(costOfDelay),
            totalInvestedNow: Math.round(totalInvestedNow),
            totalInvestedDelayed: Math.round(totalInvestedDelayed),
            missingReturns: Math.round(missingReturns),
            percentageLoss: ((costOfDelay / futureValueNow) * 100).toFixed(1)
        };
    };

    const result = calculateDelayCost();

    const chartData = [
        {
            name: 'Start Today',
            'Total Value': result.futureValueNow,
            'Total Invested': result.totalInvestedNow,
        },
        {
            name: `After ${delayYears}Y delay`,
            'Total Value': result.futureValueDelayed,
            'Total Invested': result.totalInvestedDelayed,
        }
    ];

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
            pdf.save(`VRK-Wealth-Delay-Cost-Report.pdf`);
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHeader
                title="Delay Cost"
                highlightedText="Calculator"
                subtitle="See how delaying investments impacts your wealth creation goals and future returns"
                icon={<Clock className="w-16 h-16 text-[#0d9488]" />}
            />

            <div className="container mx-auto px-4 py-12">
                <div id="report-content" className="bg-gray-50 p-4">
                    <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg animate-pulse">
                                <AlertCircle className="w-10 h-10 text-red-600" />
                            </div>
                            <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest mb-2">Total Wealth Sacrifice</h3>
                            <p className="text-5xl font-black text-red-600 mb-6">{formatCurrency(result.costOfDelay)}</p>

                            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 w-full mb-8">
                                <p className="text-red-900 font-bold leading-relaxed">
                                    A mere <span className="text-2xl font-black">{delayYears} Year</span> delay results in losing
                                    <span className="text-2xl font-black block mt-2">{result.percentageLoss}% of your potential wealth</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                <button
                                    onClick={downloadReport}
                                    className="bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-md"
                                >
                                    <Download className="w-5 h-5" />
                                    Download PDF
                                </button>
                                <Link to="/contact" className="bg-[#1e3a8a] text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-blue-900/10">
                                    Start Now <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center">
                                    <TrendingUp className="w-6 h-6 mr-2 text-[#1e3a8a]" />
                                    Cost Analysis Chart
                                </h3>
                                <div className="h-[280px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" fontSize={11} fontWeight={700} tickLine={false} axisLine={false} stroke="#94a3b8" />
                                            <YAxis fontSize={10} fontWeight={700} tickLine={false} axisLine={false} stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} />
                                            <Tooltip
                                                cursor={{ fill: '#f1f5f9' }}
                                                formatter={(value) => formatCurrency(Number(value))}
                                                contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                            />
                                            <Legend iconType="circle" />
                                            <Bar name="Principal Invested" dataKey="Total Invested" fill="#94a3b8" radius={[8, 8, 0, 0]} barSize={50} />
                                            <Bar name="Maturity Value" dataKey="Total Value" fill="#1e3a8a" radius={[8, 8, 0, 0]} barSize={50} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 h-fit">
                                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center">
                                    <Clock className="w-6 h-6 mr-2 text-[#1e3a8a]" />
                                    Investment Variables
                                </h3>

                                <div className="space-y-8">
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-gray-600 font-bold">Planned Monthly Savings</label>
                                            <span className="text-xl font-black text-[#1e3a8a]">{formatCurrency(monthlyInvestment)}</span>
                                        </div>
                                        <input type="range" min="1000" max="200000" step="1000" value={monthlyInvestment}
                                            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-red-600 font-bold">Delay Duration</label>
                                            <span className="text-xl font-black text-red-600">{delayYears} Years</span>
                                        </div>
                                        <input type="range" min="1" max={period - 1} step="1" value={delayYears}
                                            onChange={(e) => setDelayYears(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Return (%)</label>
                                            <input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))}
                                                className="w-full p-3 bg-gray-50 rounded-xl font-black text-[#1e3a8a] border-none" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Horizon (Yrs)</label>
                                            <input type="number" value={period} onChange={(e) => setPeriod(Number(e.target.value))}
                                                className="w-full p-3 bg-gray-50 rounded-xl font-black text-[#0d9488] border-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-white rounded-[2rem] shadow-xl p-12 border border-gray-100 max-w-7xl mx-auto">
                    <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">The Invisible Cost of "Tomorrow"</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-sm relative group hover:-translate-y-2 transition-transform">
                            <div className="w-12 h-12 bg-[#1e3a8a] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-[#1e3a8a] font-black text-xl mb-3">Power of Endings</h3>
                            <p className="text-gray-600 text-sm font-medium leading-relaxed">The exponential growth of compounding happens in the final years. By delaying your start, you essentially delete the most profitable years of your entire investment journey.</p>
                        </div>
                        <div className="p-8 bg-teal-50/50 rounded-3xl border border-teal-100 shadow-sm relative group hover:-translate-y-2 transition-transform">
                            <div className="w-12 h-12 bg-[#0d9488] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-teal-500/30">
                                <AlertCircle size={24} />
                            </div>
                            <h3 className="text-[#0d9488] font-black text-xl mb-3">Escalating Effort</h3>
                            <p className="text-gray-600 text-sm font-medium leading-relaxed">To achieve the same goal after a 5-year delay, you don't just invest for 5 years less; you may need to double your monthly contribution to catch up.</p>
                        </div>
                        <div className="p-8 bg-amber-50/50 rounded-3xl border border-amber-100 shadow-sm relative group hover:-translate-y-2 transition-transform">
                            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-amber-500/30">
                                <Clock size={24} />
                            </div>
                            <h3 className="text-amber-900 font-black text-xl mb-3">Time Over Capital</h3>
                            <p className="text-gray-600 text-sm font-medium leading-relaxed">In wealth creation, time is more powerful than capital. Starting early with a small amount often beats starting late with a much larger monthly commitment.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center max-w-4xl mx-auto">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] leading-relaxed">
                        Compounding returns are theoretical and market performance is unpredictable. Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.
                    </p>
                </div>
            </div>
        </div>
    );
}
