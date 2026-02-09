import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface StatsCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: React.ReactNode;
}

export function StatsCounter({ end, duration = 2, suffix = '', prefix = '', label, icon }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, { duration });
      return controls.stop;
    }
  }, [isInView, count, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-center mb-3 text-teal-600">
        {icon}
      </div>
      <motion.div className="text-4xl font-bold text-navy-900 mb-2">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </motion.div>
      <div className="text-gray-600 font-medium">{label}</div>
    </motion.div>
  );
}
