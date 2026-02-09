import { useState } from 'react';
import { Target, Sparkles, Download, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function GoalCalculator() {
    const [goalName, setGoalName] = useState('Dream Home');
    const [targetAmount, setTargetAmount] = useState(1000000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(12);

    const calculateGoal = () => {
        const monthlyRate = rate / 12 / 100;
        const months = years * 12;

        let monthlySIP = 0;
        if (years > 0) {
            monthlySIP = targetAmount / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        }

        const lumpsumNeeded = targetAmount / Math.pow(1 + rate / 100, years);

        return {
            monthlySIP: Math.round(monthlySIP),
            lumpsumNeeded: Math.round(lumpsumNeeded)
        };
    };

    const { monthlySIP, lumpsumNeeded } = calculateGoal();

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
            pdf.save(`VRK-Wealth-Goal-Planning-Report.pdf`);
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHeader
                title="Goal"
                highlightedText="Solutions"
                subtitle="Every dream needs a blueprint. Calculate exactly what it takes to reach your milestone."
                icon={<Target className="w-16 h-16 text-[#0d9488]" />}
            />

            <div id="report-content" className="container mx-auto px-4 py-12 bg-gray-50">
                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    <div className="bg-white rounded-[2rem] shadow-xl p-10 border border-gray-100 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
                                <Target className="w-6 h-6 mr-3 text-[#1e3a8a]" />
                                Objective Blueprint
                            </h3>

                            <div className="space-y-10">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-[0.2em]">Milestone Name</label>
                                    <input type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)}
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-black text-xl text-[#1e3a8a] focus:ring-2 ring-blue-100 transition-all"
                                        placeholder="e.g. World Tour 2028" />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-gray-700 font-bold">Target Corpus Needed</label>
                                        <span className="text-2xl font-black text-[#1e3a8a] bg-blue-50 px-4 py-2 rounded-xl">{formatCurrency(targetAmount)}</span>
                                    </div>
                                    <input type="range" min="100000" max="50000000" step="100000" value={targetAmount}
                                        onChange={(e) => setTargetAmount(Number(e.target.value))}
                                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]" />
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest">Horizon (Years)</label>
                                        <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                                            className="w-full px-6 py-4 bg-teal-50 border-none rounded-2xl font-black text-2xl text-[#0d9488]" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest">Returns (%)</label>
                                        <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                                            className="w-full px-6 py-4 bg-amber-50 border-none rounded-2xl font-black text-2xl text-amber-600" />
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
                                Download PDF
                            </button>
                            <Link to="/contact" className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-blue-900/10">
                                Execute Plan <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] shadow-xl p-10 border-l-[12px] border-[#0d9488] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-4">The Systematic Path (Monthly SIP)</p>
                            <p className="text-6xl font-black text-[#0d9488] mb-4">{formatCurrency(monthlySIP)}</p>
                            <p className="text-gray-500 font-bold text-sm">Invest this amount monthly for the next {years} years to reach your goal.</p>
                        </div>

                        <div className="bg-white rounded-[2rem] shadow-xl p-10 border-l-[12px] border-[#1e3a8a] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-4">The Front-Load Path (Lumpsum Today)</p>
                            <p className="text-6xl font-black text-[#1e3a8a] mb-4">{formatCurrency(lumpsumNeeded)}</p>
                            <p className="text-gray-500 font-bold text-sm">A one-time investment today that grows to your target amount autonomously.</p>
                        </div>

                        <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                            <div className="flex gap-6 items-start relative z-10">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <h5 className="font-black text-lg uppercase tracking-widest text-teal-300">Strategy Consultant's View</h5>
                                    <p className="text-sm font-medium leading-relaxed opacity-90">For the goal of <span className="underline font-bold text-white decoration-teal-400 decoration-2">{goalName}</span>, a hybrid approach combining a 30% lumpsum with a monthly SIP often yields the most robust results against market volatility.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
                                    <Calendar className="text-amber-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Date</p>
                                    <p className="font-black text-gray-900">{new Date().getFullYear() + years}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Wealth Multiplier</p>
                                <p className="font-black text-emerald-600">{(targetAmount / lumpsumNeeded).toFixed(1)}x</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
