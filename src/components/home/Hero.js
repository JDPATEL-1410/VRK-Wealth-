"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChartLine, FaShieldAlt, FaUserGraduate } from 'react-icons/fa';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className="container">
                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className={styles.tagline}>Established 1997 • Trusted by 500+ Families</span>
                        <h1 className={styles.headline}>
                            Save Today For <br />
                            <span>Better Future</span>
                        </h1>
                        <p className={styles.subtext}>
                            Navigate your financial journey with confidence. We provide bespoke investment
                            strategies and disciplined wealth management to secure your goals.
                        </p>

                        <div className={styles.actions}>
                            <Link href="/contact" className="btn btn-secondary">
                                Get Started Now <FaArrowRight size={14} />
                            </Link>
                            <Link href="/services" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                                Explore Services
                            </Link>
                        </div>

                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <h3>25+</h3>
                                <p>Years Experience</p>
                            </div>
                            <div className={styles.statItem}>
                                <h3>500+</h3>
                                <p>Trusting Families</p>
                            </div>
                            <div className={styles.statItem}>
                                <h3>₹100Cr+</h3>
                                <p>Assets Advised</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Abstract Background Element */}
            <div className={styles.visual}>
                <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
                    <motion.path
                        fill="rgba(234, 179, 8, 0.05)"
                        animate={{
                            d: [
                                "M404.5,334Q357,418,258.5,417.5Q160,417,109.5,333.5Q59,250,109.5,166.5Q160,83,258.5,83.5Q357,84,404.5,167Q452,250,404.5,334Z",
                                "M441,311.5Q413,373,348,409.5Q283,446,219.5,417.5Q156,389,114.5,333.5Q73,278,111.5,219Q150,160,211,114.5Q272,69,335.5,110Q399,151,434,200.5Q469,250,441,311.5Z",
                                "M404.5,334Q357,418,258.5,417.5Q160,417,109.5,333.5Q59,250,109.5,166.5Q160,83,258.5,83.5Q357,84,404.5,167Q452,250,404.5,334Z"
                            ]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </svg>
            </div>
        </section>
    );
};

export default Hero;
