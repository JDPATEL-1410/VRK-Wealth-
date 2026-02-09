import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  icon,
  iconPosition = 'right',
  fullWidth = false
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 touch-manipulation relative overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40",
    secondary: "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 shadow-lg shadow-gold-500/30 hover:shadow-xl hover:shadow-gold-500/40",
    outline: "border-2 border-teal-500 text-teal-400 hover:bg-teal-500/10 hover:border-teal-400",
    ghost: "text-gray-300 hover:text-white hover:bg-white/5"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shine effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
      
      {icon && iconPosition === 'left' && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && <span className="relative z-10 group-hover:translate-x-1 transition-transform">{icon}</span>}
    </Component>
  );
}
