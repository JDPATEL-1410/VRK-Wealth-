import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: number;
}

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns];

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
        >
          <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 text-white`}>
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
