import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

interface BrandedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  withText?: boolean;
  className?: string;
}

export const BrandedLogo: React.FC<BrandedLogoProps> = ({ 
  size = 'md', 
  animated = false, 
  withText = true,
  className = ''
}) => {
  
  const sizeClasses = {
    sm: { container: 'w-10 h-10 rounded-xl', text: 'text-xl', iconSize: 20 },     
    md: { container: 'w-16 h-16 rounded-2xl', text: 'text-4xl', iconSize: 32 },     
    lg: { container: 'w-24 h-24 rounded-3xl', text: 'text-5xl', iconSize: 48 },     
    xl: { container: 'w-40 h-40 rounded-[2.5rem]', text: 'text-7xl', iconSize: 80 },     
  };

  const { container, text, iconSize } = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className={`relative ${container} flex items-center justify-center flex-shrink-0 overflow-hidden border border-indigo-500/20 shadow-[0_10px_25px_-5px_rgba(79,70,229,0.3)] bg-gradient-to-br from-indigo-600 to-purple-700 group ${animated ? 'animate-pulse' : ''}`}>
        <Brain className="text-white" size={iconSize} />
        
        {/* Subtle Shine/Gloss Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
      </div>

      {withText && (
        <div className="flex flex-col justify-center h-full">
            <h1 className={`font-bold tracking-tight text-white ${text} drop-shadow-sm flex items-center whitespace-nowrap`}>
                Focus<span className="text-indigo-400">Flow</span>
            </h1>
            {size === 'xl' && (
                <p className="text-lg text-slate-400 font-medium tracking-widest uppercase mt-3 pl-1 animate-fade-in-up">
                    Ignite Your Potential. AI-Powered.
                </p>
            )}
        </div>
      )}
    </div>
  );
};