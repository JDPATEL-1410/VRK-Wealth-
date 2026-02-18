import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageHeaderProps {
    title: string;
    highlightedText?: string;
    subtitle: string;
    icon?: ReactNode;
    children?: ReactNode;
    /** Full-bleed background image URL */
    image: string;
    /** Optional badge label shown above the title */
    badge?: string;
}

export function PageHeader({ title, highlightedText, subtitle, icon, children, image, badge }: PageHeaderProps) {
    return (
        <div className="relative h-64 md:h-80 overflow-hidden">
            {/* Background photo */}
            <img
                src={image}
                alt={`${title}${highlightedText ? ' ' + highlightedText : ''}`}
                className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/90 via-[#1e3a8a]/75 to-[#0d9488]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="max-w-3xl mx-auto"
                >
                    {/* Badge / icon row */}
                    {(badge || icon) && (
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full mb-4">
                            {icon && <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-white/80">{icon}</span>}
                            {badge && <span className="text-xs font-bold text-white/80 uppercase tracking-widest">{badge}</span>}
                        </div>
                    )}

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
                        {title}
                        {highlightedText && (
                            <> <span className="text-[#d4af37]">{highlightedText}</span></>
                        )}
                    </h1>

                    <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>

                    {children && (
                        <div className="mt-6">{children}</div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
