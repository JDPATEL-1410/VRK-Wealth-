"use client";
import React from 'react';
import Link from 'next/link';
import { FaChartLine, FaUserTie, FaShieldAlt, FaCalculator, FaChevronRight } from 'react-icons/fa';
import styles from './ServicesGrid.module.css';

const services = [
    {
        title: "Investment Planning",
        desc: "Bespoke mutual fund portfolios and equity strategies designed for your wealth creation goals.",
        icon: <FaChartLine />,
        path: "/services/investment-planning"
    },
    {
        title: "Retirement Solutions",
        desc: "Maintain your lifestyle post-retirement with our inflation-adjusted corpus planning.",
        icon: <FaUserTie />,
        path: "/services/retirement-planning"
    },
    {
        title: "Insurance Planning",
        desc: "Safeguard your family's future with robust Life and Health Insurance need-assessment.",
        icon: <FaShieldAlt />,
        path: "/services/insurance"
    },
    {
        title: "Tax-Efficient Strategies",
        desc: "Maximize returns by optimizing your portfolio with tax-smart investment instruments.",
        icon: <FaCalculator />,
        path: "/services/tax-planning"
    }
];

const ServicesGrid = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.intro}>
                    <span>Our Solutions</span>
                    <h2>Comprehensive Wealth <br /> Management Tailored for You</h2>
                </div>

                <div className={styles.grid}>
                    {services.map((item, idx) => (
                        <Link key={idx} href={item.path} className={styles.card}>
                            <div className={styles.iconBox}>
                                {item.icon}
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            <div className={styles.learnMore}>
                                Explore Solution <FaChevronRight size={12} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
