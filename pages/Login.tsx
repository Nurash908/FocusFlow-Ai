import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { BrandedLogo } from '../components/BrandedLogo';

export const Login: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
      return (
          <div className="min-h-screen bg-slate-950 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] delay-1000 animate-pulse"></div>
        </div>

        <div className="z-10 w-full max-w-md p-8 animate-fade-in-up">
            <div className="text-center mb-10 flex flex-col items-center">
                <div className="mb-6 scale-125">
                    <BrandedLogo size="lg" withText={false} animated={true} />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-slate-400">Sign in to access your study workspace</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <button 
                    onClick={() => login()}
                    className="w-full bg-white text-slate-900 rounded-xl py-4 px-6 font-bold flex items-center justify-center space-x-3 hover:bg-slate-100 transition-all hover:scale-[1.02] active:scale-95 group relative overflow-hidden"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                    <span>Continue with Google</span>
                </button>

                <div className="my-8 flex items-center text-xs text-slate-500 uppercase tracking-widest font-bold">
                    <div className="flex-1 h-px bg-slate-800"></div>
                    <span className="px-4">Secure Access</span>
                    <div className="flex-1 h-px bg-slate-800"></div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-slate-400 text-sm">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>Enterprise-grade encryption</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-400 text-sm">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>Multi-modal AI access (Audio/Video)</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-400 text-sm">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>Unlimited context retention</span>
                    </div>
                </div>
            </div>

            <p className="text-center text-slate-500 text-xs mt-8">
                By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
    </div>
  );
};