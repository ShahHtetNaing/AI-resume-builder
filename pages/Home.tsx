
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Rocket, 
  ArrowRight, 
  Target, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  MousePointer2, 
  Scale, 
  Lightbulb,
  FileText,
  Search,
  Sparkles
} from 'lucide-react';
import { User } from '../types';

interface HomeProps {
  onLogin: () => void;
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-20 pb-24 lg:pt-32 lg:pb-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <Sparkles size={14} />
                <span>Next-Gen Career Tools</span>
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">AI Resume Builder</span>{' '}
                <span className="block text-indigo-600 xl:inline uppercase tracking-tight">by SHAHHUB</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl leading-relaxed">
                Build professional, ATS-optimized resumes in minutes using advanced AI. Automatically rewrite job descriptions, skills, and summaries for maximum impact.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                <Link
                  to="/builder"
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all shadow-lg shadow-indigo-100"
                >
                  Start Building Now
                </Link>
                <Link
                  to="/pricing"
                  className="w-full sm:w-auto mt-3 sm:mt-0 flex items-center justify-center px-8 py-3 border border-slate-200 text-base font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 md:py-4 md:text-lg md:px-10 transition-all"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-3xl shadow-2xl overflow-hidden ring-1 ring-slate-200 lg:max-w-md bg-white p-4">
                <div className="aspect-[3/4] bg-slate-100 rounded-2xl flex items-center justify-center">
                  <FileText size={120} className="text-slate-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent flex items-end p-8">
                    <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg w-full">
                      <div className="w-2/3 h-2 bg-slate-200 rounded mb-2"></div>
                      <div className="w-full h-2 bg-slate-200 rounded mb-2"></div>
                      <div className="w-1/2 h-2 bg-indigo-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl uppercase tracking-tight">Powerful AI Engine</h2>
            <p className="mt-4 text-xl text-slate-600">Built to get you through the ATS and into the interview room.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-6">
                <Search className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">ATS Optimization</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Our AI analyzes your content against common industry keywords to ensure your resume survives the automated screening process.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-6">
                <Zap className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Content Rewriting</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Instantly transform basic bullet points into powerful accomplishment statements using industry-specific action verbs.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-6">
                <Scale className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Compatibility</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Support for regional requirements including photo uploads, date of birth, and local address formats across Asia, US, and Europe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose SHAHHUB Builder */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 uppercase tracking-tight">Why Choose Our Builder</h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-12">
              We focus on substance over flash. While others sell templates, we provide the intelligence needed to articulate your value.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="flex items-start">
                <CheckCircle2 className="text-indigo-400 w-6 h-6 mr-4 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Instant Import</h4>
                  <p className="text-slate-400 text-sm">Upload your existing PDF or Word file and let our AI extract all your data automatically into the editor.</p>
                </div>
              </div>
              <div className="flex items-start">
                <MousePointer2 className="text-indigo-400 w-6 h-6 mr-4 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Live Preview</h4>
                  <p className="text-slate-400 text-sm">See your changes in real-time on professional A4/Letter templates designed by hiring experts.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Lightbulb className="text-indigo-400 w-6 h-6 mr-4 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Smart Scalability</h4>
                  <p className="text-slate-400 text-sm">Easily adjust font sizes and margins to fit your content perfectly across one or multiple pages.</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheck className="text-indigo-400 w-6 h-6 mr-4 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Privacy Centric</h4>
                  <p className="text-slate-400 text-sm">Your data belongs to you. We don't sell your personal information to third-party recruiting firms.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6">Ready to land your next role?</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Join thousands of professionals using SHAHHUB to craft high-impact resumes.</p>
          <Link 
            to="/builder" 
            className="inline-flex items-center justify-center px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Go to Resume Builder
            <ArrowRight className="ml-3" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
