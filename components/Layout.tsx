import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Settings, LogOut, GraduationCap, User as UserIcon, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FocusProvider, useFocusContext } from '../context/FocusContext';
import { motion } from 'motion/react';
import { BrandedLogo } from './BrandedLogo';

interface LayoutProps {
  children: React.ReactNode;
}

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { isDeepWork } = useFocusContext();
    const isActive = (path: string) => location.pathname === path;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLogout = () => { logout(); navigate('/'); };

    return (
        <aside className={`
            fixed md:static inset-y-0 left-0 z-50
            w-72 border-r border-slate-800 flex flex-col bg-slate-900/95 md:bg-slate-900/50 backdrop-blur-xl shrink-0
            transition-all duration-500 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            ${isDeepWork ? 'border-r-indigo-500/50 shadow-[0_0_50px_-10px_rgba(79,70,229,0.3)]' : ''}
        `}>
            {isDeepWork && (
                <motion.div 
                    className="absolute inset-0 bg-indigo-500/10 pointer-events-none z-0"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            )}
            
            <div className="relative z-10 p-8 cursor-pointer hover:opacity-90 transition-opacity hidden md:block" onClick={() => navigate('/dashboard')}>
            <BrandedLogo size="sm" withText={true} />
            </div>
            
            <div className="relative z-10 h-16 md:hidden flex items-center px-8 border-b border-slate-800/50">
            <BrandedLogo size="sm" withText={true} />
            </div>

            <nav className="relative z-10 flex-1 px-6 space-y-3 mt-6 md:mt-2 overflow-y-auto custom-scrollbar">
            <NavLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={isActive('/dashboard')} onClick={() => setIsMobileMenuOpen(false)} />
            
            <div className="pt-6 pb-3">
                <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Workspace</p>
            </div>
            </nav>

            <div className="relative z-10 p-6 border-t border-slate-800 bg-slate-900/30">
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shadow-lg shrink-0">
                    <div className="w-full h-full rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon size={20} className="text-slate-400" />
                        )}
                    </div>
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-4 mb-4 border border-slate-700/50 shadow-inner">
                <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300">Pro Plan</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-indigo-500/30">Active</span>
                </div>
                <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-3/4 animate-pulse"></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">1,240 / 5,000 AI Credits</p>
            </div>
            
            <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 text-slate-400 hover:text-red-400 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all duration-200 group"
            >
                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Sign Out</span>
            </button>
            </div>
        </aside>
    );
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <FocusProvider>
        <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
        
        {/* Mobile Header (Visible only on small screens) */}
        {/* ... (This is now problematic because Sidebar has its own mobile menu implementation... */}
        {/* I'll need to refactor Layout to put the mobile menu control back or just keep it simple) */}
        
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative pt-16 md:pt-0">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl"></div>
            </div>
            {children}
        </main>
        </div>
    </FocusProvider>
  );
};

const NavLink = ({ to, icon, label, active, onClick }: { to: string; icon: React.ReactNode; label: string; active: boolean; onClick?: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-3 px-5 py-3.5 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
    }`}
  >
    <div className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`}>
        {icon}
    </div>
    <span className="font-bold text-sm tracking-wide">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>}
  </Link>
);
