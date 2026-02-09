import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface PageHeaderProps {
    title: string;
    highlightedText?: string;
    subtitle: string;
    icon?: ReactNode;
    children?: ReactNode;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

export function PageHeader({ title, highlightedText, subtitle, icon, children }: PageHeaderProps) {
    const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <motion.section
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden"
        >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {icon && (
                        <motion.div variants={fadeInUp} className="flex justify-center mb-6">
                            {icon}
                        </motion.div>
                    )}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6"
                    >
                        {title}{highlightedText && (
                            <> <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">{highlightedText}</span></>
                        )}
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8"
                    >
                        {subtitle}
                    </motion.p>
                    {children && (
                        <motion.div variants={fadeInUp}>
                            {children}
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.section>
    );
}
