"use client";
import React, { useState, useMemo } from 'react';
import { FaCheckCircle, FaDownload, FaArrowRight } from 'react-icons/fa';
import styles from './SIPCalculator.module.css';
import { generatePDF } from '../../utils/pdfGenerator';

const SIPCalculator = () => {
    const [amount, setAmount] = useState(10000);
    const [years, setYears] = useState(10);
    const [returns, setReturns] = useState(12);

    const calculateSip = useMemo(() => {
        const monthlyRate = returns / 12 / 100;
        const months = years * 12;
        const futureValue = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        const investedAmount = amount * months;
        return {
            total: Math.round(futureValue),
            invested: investedAmount,
            gains: Math.round(futureValue - investedAmount)
        };
    }, [amount, years, returns]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const [isExporting, setIsExporting] = useState(false);

    const downloadReport = async () => {
        if (isExporting) return;
        setIsExporting(true);

        try {
            await generatePDF('home-sip-card', 'VRK-Wealth-SIP-Quick-Report');
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert(`Failed to generate PDF: ${error.message || 'Unknown error'}. If you are on mobile, please try from a desktop browser.`);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.textSide}>
                        <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
                            Watch Your <br /> <span className="text-[#1e3a8a]">Wealth Grow</span>
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg font-medium leading-relaxed">
                            Experience the power of compounding with Systematic Investment Planning.
                            Small monthly contributions can build a substantial corpus for your
                            long-term financial freedom.
                        </p>
                        <div className="space-y-4 mb-12">
                            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-[#0d9488]">
                                <FaCheckCircle className="text-[#0d9488] text-xl" /> Disciplined Wealth Creation
                            </div>
                            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-[#1e3a8a]">
                                <FaCheckCircle className="text-[#1e3a8a] text-xl" /> Rupee Cost Averaging
                            </div>
                            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-emerald-600">
                                <FaCheckCircle className="text-emerald-600 text-xl" /> Precise Goal Alignment
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={downloadReport}
                                disabled={isExporting}
                                className={`inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all shadow-lg active:scale-95 ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isExporting ? (
                                    <div className="w-4 h-4 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <FaDownload />
                                )}
                                {isExporting ? 'Generating...' : 'Save Projection'}
                            </button>
                            <a
                                href="/calculators/sip"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1e3a8a] text-white rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl active:scale-95 shadow-blue-900/10"
                            >
                                Full Analysis <FaArrowRight />
                            </a>
                        </div>
                    </div>

                    <div className={styles.cardSide}>
                        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 relative overflow-hidden group" id="home-sip-card">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>

                            <div className="relative z-10">
                                <div className="mb-8 pb-6 border-b border-gray-100">
                                    <h3 className="text-xl font-black text-[#1e3a8a] uppercase tracking-tight">Wealth Projection</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Quick SIP Analysis Report</p>
                                </div>

                                <div className="space-y-10">
                                    <div className={styles.inputGroup}>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Contribution</span>
                                            <span className="text-xl font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 rounded-lg">₹{amount.toLocaleString('en-IN')}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="500" max="100000" step="500"
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1e3a8a]"
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Investment Period</span>
                                            <span className="text-xl font-black text-[#0d9488] bg-teal-50 px-3 py-1 rounded-lg">{years} Years</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1" max="30" step="1"
                                            value={years}
                                            onChange={(e) => setYears(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0d9488]"
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expected Returns %</span>
                                            <span className="text-xl font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">{returns}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="5" max="25" step="0.5"
                                            value={returns}
                                            onChange={(e) => setReturns(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                        />
                                    </div>

                                    <div className="bg-[#1e3a8a] rounded-[2rem] p-8 text-white shadow-xl mt-6 relative overflow-hidden group/box">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                                        <div className="relative z-10 text-center">
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">Projected Maturity Balance</p>
                                            <div className="text-4xl font-black mb-4">{formatCurrency(calculateSip.total)}</div>
                                            <div className="pt-4 border-t border-white/10 flex justify-between gap-4">
                                                <div className="text-left">
                                                    <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Invested</p>
                                                    <p className="text-xs font-bold text-white/90">{formatCurrency(calculateSip.invested)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Wealth Gain</p>
                                                    <p className="text-xs font-bold text-teal-400">{formatCurrency(calculateSip.gains)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SIPCalculator;
