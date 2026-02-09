import { motion } from 'framer-motion';
import { fadeInUp } from '../../lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  badge?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  description,
  centered = true,
  badge
}: SectionHeaderProps) {
  return (
    <motion.div 
      className={centered ? "text-center max-w-3xl mx-auto mb-16" : "mb-16"}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {badge && (
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-800/80 border border-teal-500/30 text-teal-300 text-sm font-medium mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
          {badge}
        </motion.div>
      )}
      
      {subtitle && (
        <p className="text-teal-400 font-semibold text-sm uppercase tracking-wider mb-3">
          {subtitle}
        </p>
      )}
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
        {title}
      </h2>
      
      {description && (
        <p className="text-white text-lg md:text-xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
