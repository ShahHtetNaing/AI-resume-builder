
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { CheckCircle2, Sparkles, ShieldCheck, Zap, Globe, Cloud, Crown, ArrowRight, CreditCard, Lock, Search, Layout } from 'lucide-react';

const Pricing: React.FC<{ user: User | null; onUpgrade: () => void }> = ({ user, onUpgrade }) => {
  const navigate = useNavigate();

  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100">
            <CreditCard size={14} />
            <span>Secure Checkout</span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">Elevate Your Career</h2>
          <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto">One-time payment for a lifetime of professional success.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
          {/* Starter Plan */}
          <div className="bg-white p-12 rounded-[48px] border-4 border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight text-slate-400">Standard Access</h3>
            <div className="text-5xl font-black mb-8 text-slate-900">$0 <span className="text-base text-slate-300 font-bold uppercase tracking-widest">/forever</span></div>
            
            <ul className="space-y-5 mb-12 text-slate-500 text-xs font-black uppercase tracking-widest">
              <li className="flex items-center gap-3"><CheckCircle2 className="text-indigo-400" size={18} /> Basic AI Analysis</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-indigo-400" size={18} /> Standard Layouts (4)</li>
              <li className="flex items-center gap-3 line-through opacity-40"><Lock size={18} /> Professional Skills & Projects</li>
              <li className="flex items-center gap-3 line-through opacity-40"><Lock size={18} /> Impact Statements & Alternatives</li>
              <li className="flex items-center gap-3 line-through opacity-40"><ShieldCheck size={18} /> Remove Watermarks</li>
            </ul>
            
            <button onClick={() => navigate('/builder')} className="w-full py-5 bg-slate-100 text-slate-400 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all border border-slate-200">Start Standard Draft</button>
          </div>

          {/* Pro Lifetime Plan */}
          <div className={`bg-white p-12 rounded-[56px] shadow-4xl relative overflow-hidden transform scale-105 z-10 transition-all border-8 ${user?.isPro ? 'border-emerald-500' : 'border-indigo-600'}`}>
            <div className={`absolute top-0 right-0 text-white text-[10px] font-black px-10 py-4 uppercase tracking-[0.3em] rounded-bl-[40px] shadow-lg ${user?.isPro ? 'bg-emerald-500' : 'bg-indigo-600'}`}>
              {user?.isPro ? 'PRO ACTIVATED' : 'LIFETIME ACCESS'}
            </div>
            
            <h3 className={`text-2xl font-black mb-2 flex items-center gap-3 uppercase tracking-tight ${user?.isPro ? 'text-emerald-600' : 'text-indigo-600'}`}>
              <Crown size={28} /> Pro Lifetime
            </h3>
            <div className="text-6xl font-black mb-10 text-slate-900 leading-none">$19.99 <span className="text-base text-slate-400 font-bold uppercase tracking-widest">/one time</span></div>
            
            <div className="space-y-6 mb-12 text-slate-700 font-black text-[11px] leading-relaxed uppercase tracking-[0.1em]">
              <div className="flex items-start gap-4 p-3 bg-indigo-50/50 rounded-2xl">
                <span className="text-indigo-600 shrink-0"><CheckCircle2 size={20} /></span>
                <span>Full Access to Skills, Projects, Certs, and Volunteering modules.</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-indigo-600 shrink-0"><Layout size={20} /></span>
                <span>Unlock All 10+ Premium Resume Templates.</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-indigo-600 shrink-0"><Search size={20} /></span>
                <span>Pro ATS Keyword Analysis & Deep Scan.</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-indigo-600 shrink-0"><Sparkles size={20} /></span>
                <span>Unlimited AI Phrasing Alternatives per bullet point.</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-indigo-600 shrink-0"><ShieldCheck size={20} /></span>
                <span>Remove Draft Watermarks & Professional PDF Export.</span>
              </div>
              <div className="flex items-start gap-4 p-3 bg-indigo-50/50 rounded-2xl">
                <span className="text-indigo-600 shrink-0"><Cloud size={20} /></span>
                <span>Unlimited Resume Storage & Automatic Backups.</span>
              </div>
            </div>
            
            <button onClick={onUpgrade} disabled={user?.isPro} className={`w-full py-7 rounded-[32px] font-black uppercase text-sm tracking-[0.2em] transition-all shadow-3xl flex items-center justify-center gap-3 active:scale-95 ${user?.isPro ? 'bg-emerald-500 text-white cursor-default' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'}`}>
              {user?.isPro ? 'Enjoy Lifetime Access' : 'Become Pro Lifetime'}
              {!user?.isPro && <ArrowRight size={20} />}
            </button>
            <div className="mt-6 text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">Safe & Secure Activation via ShahHub Secure Payments</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
