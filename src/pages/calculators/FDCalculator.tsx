import { useState } from 'react';
import { Wallet, PieChart as PieChartIcon, Download, ArrowRight, IndianRupee } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { generatePDF } from '../../utils/pdfGenerator';

export function FDCalculator() {
    const [investment, setInvestment] = useState(100000);
    const [interestRate, setInterestRate] = useState(6.5);
    const [tenure, setTenure] = useState(5);

    const calculateFD = () => {
        // A = P(1 + r/n)^(nt)
        // For FD in India, n is usually 4 (quarterly compounding)
        const n = 4;
        const r = interestRate / 100;
        const maturityAmount = investment * Math.pow(1 + r / n, n * tenure);
        const estReturns = maturityAmount - investment;

        return {
            maturityAmount: Math.round(maturityAmount),
            estReturns: Math.round(estReturns)
        };
    };

    const { maturityAmount, estReturns } = calculateFD();

    const formatCurrency = (value: number) => {
        return `₹${value.toLocaleString('en-IN')}`;
    };

    const pieData = [
        { name: 'Principal Amount', value: investment, color: '#1e3a8a' },
        { name: 'Interest Component', value: estReturns, color: '#0d9488' }
    ];

    const [isExporting, setIsExporting] = useState(false);

    const downloadReport = async () => {
        if (isExporting) return;
        setIsExporting(true);
        try {
            await generatePDF('report-content', 'VRK-Wealth-FD-Report');
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
                title="Fixed Deposit"
                highlightedText="Calculator"
                subtitle="Calculate maturity amount and interest earned on your fixed deposits with quarterly compounding."
                image="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&auto=format&fit=crop&q=80"
                badge="Safe & Guaranteed Returns"
                icon={<Wallet className="w-4 h-4 text-white/80" />}
            />

            <div id="report-content" className="container mx-auto px-4 py-12 bg-gray-50">
                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    <div className="bg-white rounded-[2rem] shadow-xl p-10 border border-gray-100 h-fit">
                        <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
                            <IndianRupee className="w-6 h-6 mr-3 text-[#1e3a8a]" />
                            Deposit Configuration
                        </h3>

                        <div className="space-y-12">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-gray-700 font-bold">Principal Deposit</label>
                                    <span className="text-2xl font-black text-[#1e3a8a] bg-blue-50 px-4 py-2 rounded-xl">{formatCurrency(investment)}</span>
                                </div>
                                <input type="range" min="10000" max="10000000" step="10000" value={investment}
                                    onChange={(e) => setInvestment(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-black uppercase tracking-widest">
                                    <span>10 K</span>
                                    <span>1 Cr</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest">Interest Rate (% p.a.)</label>
                                    <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="w-full px-6 py-4 bg-teal-50 border-none rounded-2xl font-black text-2xl text-[#0d9488]" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest">Tenure (Years)</label>
                                    <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                                        className="w-full px-6 py-4 bg-amber-50 border-none rounded-2xl font-black text-2xl text-amber-600" />
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
                                Open FD Account <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.3em] mb-4 relative z-10">Maturity Proceeds</p>
                            <p className="text-6xl font-black text-[#1e3a8a] mb-10 relative z-10">{formatCurrency(maturityAmount)}</p>

                            <div className="w-full pt-10 border-t border-gray-50 relative z-10">
                                <p className="text-gray-400 text-[9px] font-black uppercase mb-1 tracking-widest">Calculated Interest Earnings</p>
                                <p className="text-3xl font-black text-[#0d9488]">{formatCurrency(estReturns)}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
                            <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center">
                                <PieChartIcon className="w-6 h-6 mr-3 text-[#0d9488]" />
                                Capital Composition
                            </h3>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                                            {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                        </Pie>
                                        <Tooltip formatter={(v: any) => formatCurrency(Number(v))} />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-[#1e3a8a] rounded-[2rem] p-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] opacity-50"></div>
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black">Security Meets Structure</h3>
                            <p className="text-blue-100 font-medium leading-relaxed">Fixed Deposits offer guaranteed returns and complete capital protection, making them the cornerstone of any conservative investment portfolio.</p>
                            <div className="flex gap-4">
                                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Risk Profile</p>
                                    <p className="font-bold">Very Low</p>
                                </div>
                                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Liquidity</p>
                                    <p className="font-bold">High</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-md border border-white/10">
                            <h4 className="font-black text-teal-400 mb-4 uppercase tracking-widest text-xs">Note on Compounding</h4>
                            <p className="text-sm leading-relaxed text-blue-50">This calculator assumes <strong>Quarterly Compounding</strong>, which is the industry standard for calculation of FD interest in most Indian banks. Some schemes may offer monthly or annual compounding which can slightly alter results.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] leading-relaxed">
                        Disclaimer: Fixed Deposit interest rates are subject to change by banks. Tax on interest (TDS) depends on your income tax slab.
                    </p>
                </div>
            </div>
        </div>
    );
}
