import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'bordered';
  hover?: boolean;
  gradient?: string;
}

export default function Card({
  children,
  className,
  variant = 'default',
  hover = true,
  gradient
}: CardProps) {
  const variants = {
    default: "bg-navy-800/50 backdrop-blur-sm border border-white/10",
    glass: "bg-white/5 backdrop-blur-xl border border-white/10",
    gradient: gradient || "bg-gradient-to-br from-navy-800/80 to-navy-900/80 border border-white/10",
    bordered: "bg-transparent border-2 border-teal-500/30 hover:border-teal-500/60"
  };

  return (
    <motion.div
      className={cn(
        "rounded-2xl p-6 relative overflow-hidden group",
        variants[variant],
        className
      )}
      whileHover={hover ? { 
        y: -8, 
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)" 
      } : {}}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow effect on hover */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
