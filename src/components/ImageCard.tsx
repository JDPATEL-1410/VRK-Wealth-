import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ImageCardProps {
  image: string;
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
}

export function ImageCard({ image, title, description, icon, delay = 0 }: ImageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {icon && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full">
            {icon}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}
