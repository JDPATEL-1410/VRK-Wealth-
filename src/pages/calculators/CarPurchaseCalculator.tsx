import { useState } from 'react';
import { Car, Key, ArrowRight, TrendingUp, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function CarPurchaseCalculator() {
    const [carPrice, setCarPrice] = useState(1000000);
    const [yearsToBuy, setYearsToBuy] = useState(3);
    const inflation = 5;
    const [returns, setReturns] = useState(10);

    const calculateCarGoal = () => {
        const inflatedPrice = carPrice * Math.pow(1 + inflation / 100, yearsToBuy);
        const monthlyRate = returns / 12 / 100;
        const months = yearsToBuy * 12;

        let monthlySIP = 0;
        if (yearsToBuy > 0) {
            monthlySIP = inflatedPrice / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        }

        return {
            inflatedPrice: Math.round(inflatedPrice),
            monthlySIP: Math.round(monthlySIP)
        };
    };

    const { inflatedPrice, monthlySIP } = calculateCarGoal();

    const formatCurrency = (value: number) => {
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
            pdf.save(`VRK-Wealth-Car-Purchase-Report.pdf`);
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHeader
                title="Vehicle Purchase"
                highlightedText="Calculator"
                subtitle="Accelerate your way to your dream car. Plan your automotive investment with precision."
                icon={<Car className="w-16 h-16 text-[#0d9488]" />}
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
                        <motion.div variants={fadeInUp} className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100 h-fit">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1e3a8a] shadow-inner">
                                    <Car className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900">Vehicle Dreams</h3>
                            </div>

                            <div className="space-y-12">
                                <div className="group">
                                    <div className="flex justify-between items-center mb-6">
                                        <label className="text-gray-700 font-bold text-lg">Current Car Price</label>
                                        <span className="text-2xl font-black text-[#1e3a8a] bg-blue-50 px-5 py-2 rounded-2xl">{formatCurrency(carPrice)}</span>
                                    </div>
                                    <input
                                        type="range" min="300000" max="10000000" step="50000" value={carPrice}
                                        onChange={(e) => setCarPrice(Number(e.target.value))}
                                        className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-400 mt-4 font-black uppercase tracking-widest">
                                        <span>3 LAKH</span>
                                        <span>1 CRORE</span>
                                    </div>
                                </div>

                                <div className="group">
                                    <div className="flex justify-between items-center mb-6">
                                        <label className="text-gray-700 font-bold text-lg">Possession After</label>
                                        <span className="text-2xl font-black text-[#0d9488] bg-teal-50 px-5 py-2 rounded-2xl">{yearsToBuy} Years</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="10" step="1" value={yearsToBuy}
                                        onChange={(e) => setYearsToBuy(Number(e.target.value))}
                                        className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0d9488]"
                                    />
                                </div>

                                <div className="bg-blue-50 p-8 rounded-[2rem] flex items-center justify-between border border-blue-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-[#1e3a8a]">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Assumed Return</p>
                                            <p className="text-2xl font-black text-blue-900 leading-none">{returns}%</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number" value={returns} onChange={(e) => setReturns(Number(e.target.value))}
                                            className="w-20 px-4 py-3 bg-white rounded-xl font-black text-center text-[#1e3a8a] shadow-sm border border-blue-100 focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e3a8a] transition-all outline-none"
                                        />
                                        <Key className="absolute -top-3 -right-3 w-6 h-6 text-amber-400 bg-white rounded-full p-1 shadow-md" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-8">
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white rounded-[2.5rem] shadow-2xl p-12 text-center border border-gray-100 relative group overflow-hidden"
                            >
                                <div className="absolute -bottom-20 -right-20 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                                    <Car className="w-[300px] h-[300px]" />
                                </div>

                                <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] mb-3">Projected Cost in {yearsToBuy} Years</p>
                                <p className="text-6xl font-black text-gray-900 mb-12 flex items-center justify-center gap-2">
                                    {formatCurrency(inflatedPrice)}
                                </p>

                                <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                    <p className="text-blue-100/60 text-xs font-bold uppercase tracking-[0.2em] mb-4 relative z-10">Monthly Investment Required</p>
                                    <p className="text-5xl font-black mb-10 relative z-10 leading-none">{formatCurrency(monthlySIP)}</p>

                                    <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                                        <button
                                            onClick={downloadReport}
                                            className="flex-1 bg-white text-[#1e3a8a] py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl"
                                        >
                                            <Download className="w-6 h-6" />
                                            PDF Report
                                        </button>
                                        <Link
                                            to="/contact"
                                            className="flex-1 bg-[#0d9488] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl"
                                        >
                                            <FileText className="w-6 h-6" />
                                            Start Now
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-teal-50 rounded-3xl p-8 border border-teal-100">
                                <p className="text-teal-900 font-bold text-sm leading-relaxed text-center italic">
                                    "A car is more than just transport; it's a milestone. Plan early to cruise through your goals comfortably."
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
