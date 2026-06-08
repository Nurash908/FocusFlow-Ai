import React from 'react';
import { Link } from 'react-router-dom';
import { BrandedLogo } from '../BrandedLogo';

export const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-[#070B14]/80 backdrop-blur-xl border-b border-white/5">
            <Link to="/" className="hover:opacity-80 transition-opacity">
                <BrandedLogo size="md" withText={true} />
            </Link>
            
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
                {['Features', 'Intelligence', 'Impact', 'Roadmap'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors uppercase tracking-wider">{item}</a>
                ))}
            </div>
            
            <Link to="/login" className="px-6 py-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md text-indigo-400 hover:text-white">
                Enter Focus Mode
            </Link>
        </nav>
    );
};
