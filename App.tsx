
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import { User } from './types';
import { X, Crown, ShieldCheck, LogIn, UserCircle } from 'lucide-react';
import { 
  loginWithGoogle, 
  logoutFromFirebase, 
  subscribeToAuthChanges 
} from './firebase-config';

const ADMIN_EMAIL = 'shahhtetnaing@gmail.com';

const Navbar: React.FC<{ 
  user: User | null; 
  onLoginRequest: () => void; 
  onLogout: () => void; 
  isLoggingIn: boolean;
  onOpenSettings: () => void;
}> = ({ user, onLoginRequest, onLogout, isLoggingIn, onOpenSettings }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'text-indigo-600 font-black' : 'text-gray-600 hover:text-indigo-500 font-bold';

  const isUserPro = user?.isPro || user?.email === ADMIN_EMAIL;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <div className="bg-indigo-600 text-white px-2 py-1 rounded font-black leading-none shadow-md">S</div>
              <span className="tracking-tight font-black uppercase">AI Resume Builder</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 uppercase text-[10px] tracking-widest">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/builder" className={isActive('/builder')}>Resume Building</Link>
            <Link to="/pricing" className={isActive('/pricing')}>Pricing</Link>
            <Link to="/about" className={isActive('/about')}>About Me</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact Me</Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={onOpenSettings}
                  className="flex items-center gap-2 hover:bg-slate-50 p-1.5 pr-4 rounded-full transition-all border border-transparent hover:border-slate-200 group"
                >
                  <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border shadow-sm group-hover:ring-2 ring-indigo-500" />
                  <div className="text-left leading-none">
                    <div className="text-[9px] font-black uppercase text-slate-800">{user.name.split(' ')[0]}</div>
                    <div className={`text-[8px] font-bold uppercase ${isUserPro ? 'text-indigo-600' : user.isGuest ? 'text-amber-500' : 'text-slate-400'}`}>
                      {isUserPro ? 'Pro Member' : user.isGuest ? 'Guest Trial' : 'Free Account'}
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginRequest}
                disabled={isLoggingIn}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-black text-xs hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2"
              >
                {isLoggingIn ? 'Connecting...' : 'Sign In'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const GoogleLoginPortal: React.FC<{
  onSuccess: (data: Partial<User>) => void;
  onClose: () => void;
  hideGuest?: boolean;
}> = ({ onSuccess, onClose, hideGuest }) => {
  const handleFirebaseLogin = async () => {
    try {
      const user = await loginWithGoogle();
      onSuccess({
        email: user.email || '',
        name: user.displayName || 'Google User',
        picture: user.photoURL || '',
        isGuest: false
      });
    } catch (err) {
      console.error("Firebase Login Failed", err);
    }
  };

  const handleGuestLogin = () => {
    const guestUses = parseInt(localStorage.getItem('shah_guest_total_uses') || '0');
    if (guestUses >= 1) {
      alert("Device Limit Reached: Guest trial has already been used. Please sign in with Google.");
      return;
    }
    onSuccess({
      email: 'guest@temp.shahhub.ai',
      name: 'Guest User',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
      isGuest: true
    });
  };

  return (
    <div className="fixed inset-0 z-[600] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[420px] rounded-[32px] shadow-2xl p-10 flex flex-col items-center">
        <button onClick={onClose} className="self-end p-2 hover:bg-slate-100 rounded-full mb-4"><X size={20} /></button>
        <div className="mb-8 flex justify-center">
           <svg viewBox="0 0 48 48" className="w-12 h-12">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.13-.45-4.63H24v9.3h12.91c-.58 3.12-2.33 5.76-4.96 7.5l7.7 5.96c4.5-4.15 7.1-10.27 7.1-16.71z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.7-5.96c-2.14 1.44-4.88 2.3-8.19 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
        </div>
        <h2 className="text-2xl font-black text-[#202124] mb-2 text-center">Get Started</h2>
        <p className="text-slate-500 font-bold text-xs mb-10 text-center uppercase tracking-widest">Select your login preference</p>
        
        <div className="w-full space-y-4">
          <button 
            onClick={handleFirebaseLogin}
            className="w-[320px] mx-auto flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-lg text-slate-700 font-black text-sm hover:bg-slate-50 transition-all bg-white shadow-sm"
          >
            <LogIn size={20} className="text-indigo-600" />
            Sign in with Google Account
          </button>
          {!hideGuest && (
            <button onClick={handleGuestLogin} className="w-[320px] mx-auto flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 rounded-lg text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all bg-white shadow-sm">
              <UserCircle size={20} className="text-slate-400" />
              Continue as Guest
            </button>
          )}
        </div>
        <p className="mt-8 text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest leading-relaxed">
          Guest users are limited. Signed-in members enjoy permanent auto-save.
        </p>
      </div>
    </div>
  );
};

const AccountSettingsModal: React.FC<{
  user: User;
  onClose: () => void;
  onLogout: () => void;
}> = ({ user, onClose, onLogout }) => {
  const isUserPro = user.isPro || user.email === ADMIN_EMAIL;
  return (
    <div className="fixed inset-0 z-[500] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Account Profile</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
          </div>

          <div className="flex flex-col items-center mb-8 bg-slate-50 p-8 rounded-[24px]">
            <div className="relative">
              <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white shadow-xl mb-4" />
              {isUserPro && <div className="absolute -top-1 -right-1 bg-indigo-600 text-white p-1.5 rounded-xl shadow-lg border-2 border-white"><Crown size={16} /></div>}
            </div>
            <h3 className="text-xl font-black text-slate-900">{user.name}</h3>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mt-1">{user.email}</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className={`p-5 rounded-2xl flex items-center justify-between border-2 transition-all ${isUserPro ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100'}`}>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</div>
                <div className={`text-xs font-black uppercase ${isUserPro ? 'text-indigo-600' : user.isGuest ? 'text-amber-500' : 'text-slate-600'}`}>
                  {isUserPro ? 'Verified Pro Lifetime' : user.isGuest ? 'Guest Trial (Limited)' : 'Standard Free Account'}
                </div>
              </div>
              {isUserPro && <ShieldCheck className="text-indigo-600" size={24} />}
            </div>
          </div>

          <button onClick={() => { onLogout(); onClose(); }} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-red-100 transition-all border border-red-100 shadow-sm">
            Log Out from Secure Hub
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [forceRealLogin, setForceRealLogin] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('shah_builder_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.email === ADMIN_EMAIL) {
        parsed.isPro = true;
      }
      setUser(parsed);
    }

    // Subscribe to Firebase auth changes
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      if (firebaseUser) {
        const isFounder = firebaseUser.email === ADMIN_EMAIL;
        const savedUserStr = localStorage.getItem('shah_builder_user');
        const savedUser = savedUserStr ? JSON.parse(savedUserStr) : null;
        
        const finalUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "Candidate",
          email: firebaseUser.email || "user@shahhub.ai",
          picture: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`,
          uploadsCount: (savedUser && savedUser.email === firebaseUser.email) ? savedUser.uploadsCount : 0,
          isPro: isFounder || ((savedUser && savedUser.email === firebaseUser.email) ? savedUser.isPro : false),
          isGuest: false,
          savedResumes: (savedUser && savedUser.email === firebaseUser.email) ? savedUser.savedResumes : []
        };
        
        setUser(finalUser);
        localStorage.setItem('shah_builder_user', JSON.stringify(finalUser));
        if (isFounder) {
          document.body.classList.add('is-admin');
        }
      } else {
        setUser(prev => (prev?.isGuest ? prev : null));
        document.body.classList.remove('is-admin');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLoginConfirm = (userData: Partial<User>) => {
    setShowSignInDialog(false);
    setForceRealLogin(false);
    
    if (userData.isGuest) {
      setIsLoggingIn(true);
      setTimeout(() => {
        const finalUser: User = {
          id: `guest_${Math.random().toString(36).substr(2, 9)}`,
          name: userData.name || "Guest User",
          email: userData.email || "guest@temp.shahhub.ai",
          picture: userData.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=Guest`,
          uploadsCount: 0,
          isPro: false,
          isGuest: true,
          savedResumes: []
        };
        setUser(finalUser);
        localStorage.setItem('shah_builder_user', JSON.stringify(finalUser));
        setIsLoggingIn(false);
      }, 500);
    }
  };

  const handleLogout = async () => {
    await logoutFromFirebase();
    setUser(null);
    localStorage.removeItem('shah_builder_user');
  };

  const updateUserInStorage = (updatedUser: User) => {
    if (updatedUser.email === ADMIN_EMAIL) {
      updatedUser.isPro = true;
    }
    setUser(updatedUser);
    localStorage.setItem('shah_builder_user', JSON.stringify(updatedUser));
  };

  const handleProUpgrade = async () => {
    if (!user || user.isGuest) {
      setForceRealLogin(true);
      setShowSignInDialog(true);
      return;
    }
    const mockSuccess = confirm("Initiate Pro Lifetime Activation for $19.99?");
    if (mockSuccess) {
        const updatedUser = { ...user, isPro: true };
        updateUserInStorage(updatedUser);
        alert("Activation Successful! Your Pro Lifetime membership is now active.");
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar 
          user={user} 
          onLoginRequest={() => { setForceRealLogin(false); setShowSignInDialog(true); }} 
          onLogout={handleLogout} 
          isLoggingIn={isLoggingIn} 
          onOpenSettings={() => setShowSettings(true)} 
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onLogin={() => { setForceRealLogin(false); setShowSignInDialog(true); }} user={user} />} />
            <Route path="/builder" element={<Builder user={user} onLogin={(forceReal = false) => { setForceRealLogin(forceReal); setShowSignInDialog(true); }} onUpdateUser={updateUserInStorage} />} />
            <Route path="/pricing" element={<Pricing user={user} onUpgrade={handleProUpgrade} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="bg-slate-900 text-white py-16 no-print">
          <div className="max-w-7xl mx-auto px-4 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <div className="bg-indigo-600 text-white px-2 py-1 rounded font-black">S</div>
                <span className="font-black text-xl tracking-tight uppercase">AI Resume Builder</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-medium">Professional AI-powered tools for career growth designed by Shah Htet Naing.</p>
            </div>
            <div>
              <h4 className="font-black text-white mb-6 uppercase tracking-[0.3em] text-[10px]">Resources</h4>
              <div className="flex flex-col gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Link to="/" className="hover:text-indigo-400">Home</Link>
                <Link to="/builder" className="hover:text-indigo-400">Builder</Link>
                <Link to="/pricing" className="hover:text-indigo-400">Pricing</Link>
              </div>
            </div>
            <div>
              <h4 className="font-black text-white mb-6 uppercase tracking-[0.3em] text-[10px]">Contact</h4>
              <p className="text-indigo-400 font-black mb-2 text-lg">shahhtetnaing@gmail.com</p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Support Response: 24h</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-[9px] font-black uppercase tracking-[0.5em]">
            &copy; {new Date().getFullYear()} SHAHHUB. Built by Shah Htet Naing.
          </div>
        </footer>
        {showSignInDialog && <GoogleLoginPortal onSuccess={handleLoginConfirm} onClose={() => setShowSignInDialog(false)} hideGuest={forceRealLogin} />}
        {showSettings && user && <AccountSettingsModal user={user} onClose={() => setShowSettings(false)} onLogout={handleLogout} />}
      </div>
    </HashRouter>
  );
}

export default App;
