
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { ResumeData, User, Region, Experience, Education, Project, Certification, Volunteering, Honor, Language, Publication, Recommendation, TemplateType } from '../types';
import { parseResumeText } from '../services/geminiService';
import { 
  Sparkles, 
  Trash2, 
  Plus, 
  UploadCloud, 
  Lock, 
  ChevronLeft, 
  Download, 
  ArrowRight,
  ShieldCheck,
  FileText,
  Layers,
  CloudUpload,
  Clock,
  Ban,
  UserCheck,
  Camera,
  Settings2,
  LogIn,
  Crown,
  Zap,
  Search,
  Check,
  Copy,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  X,
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Calendar,
  UserPlus
} from 'lucide-react';

const ADMIN_EMAIL = 'shahhtetnaing@gmail.com';

type PageSize = 'A4' | 'Letter' | 'Legal';
type TabType = 'parsing' | 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'interests' | 'volunteering' | 'honors' | 'languages' | 'publications' | 'recommendations';

const TABS: { id: TabType; label: string }[] = [
  { id: 'parsing', label: 'Import' },
  { id: 'personal', label: 'Contact' },
  { id: 'experience', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Project' },
  { id: 'certifications', label: 'Certs' },
  { id: 'interests', label: 'Interests' },
  { id: 'volunteering', label: 'Volunteer' },
  { id: 'honors', label: 'Honors' },
  { id: 'languages', label: 'Language' },
  { id: 'publications', label: 'Publishes' },
  { id: 'recommendations', label: 'Reference' }
];

const ALL_TEMPLATES: { value: TemplateType; label: string }[] = [
  { value: 'Modern', label: 'Modern Professional' },
  { value: 'Executive', label: 'Executive Sharp' },
  { value: 'Sidebar', label: 'Sidebar Creative' },
  { value: 'Academic', label: 'Academic / CV' },
  { value: 'Word-Pro-1', label: 'Word Style Premium 1' },
  { value: 'Word-Pro-2', label: 'Word Style Premium 2' },
  { value: 'Word-Pro-3', label: 'Word Style Premium 3' },
  { value: 'Word-Pro-4', label: 'Word Style Premium 4' },
  { value: 'Word-Pro-5', label: 'Word Style Premium 5' },
  { value: 'Word-Pro-6', label: 'Word Style Premium 6' },
];

const Builder: React.FC<{ 
  user: User | null; 
  onLogin: (forceReal?: boolean) => void;
  onUpdateUser: (u: User) => void;
}> = ({ user, onLogin, onUpdateUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>('USA');
  const [template, setTemplate] = useState<TemplateType>('Modern');
  const [pageSize, setPageSize] = useState<PageSize>('A4');
  const [fontSize, setFontSize] = useState<number>(11);
  const [activeTab, setActiveTab] = useState<TabType>('parsing');
  const [pasteText, setPasteText] = useState('');
  const [showPreviewMode, setShowPreviewMode] = useState(false);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [isAnalyzingKeywords, setIsAnalyzingKeywords] = useState(false);
  
  const [alternatives, setAlternatives] = useState<{id: string, options: string[] } | null>(null);

  const isUserPro = user?.isPro || user?.email === ADMIN_EMAIL;

  const [data, setData] = useState<ResumeData>({
    id: Math.random().toString(36).substr(2, 9),
    lastModified: Date.now(),
    personalInfo: { fullName: '', email: '', phone: '', location: '', website: '', linkedin: '', summary: '', dob: '', photoUrl: '', gender: '', race: '', ethnicity: '' },
    experience: [], education: [], skills: [], projects: [], certifications: [], interests: [], volunteering: [], honors: [], languages: [], publications: [], recommendations: []
  });

  const isAsianRegion = useMemo(() => ['Singapore', 'India', 'China', 'Asia'].includes(region), [region]);
  const isNorthAmericanRegion = useMemo(() => region === 'USA' || region === 'Canada', [region]);

  const resumeUploadRef = useRef<HTMLInputElement>(null);
  const photoUploadRef = useRef<HTMLInputElement>(null);
  const pdfExportRef = useRef<HTMLDivElement>(null);

  const availableTemplates = isUserPro 
    ? ALL_TEMPLATES 
    : ALL_TEMPLATES.slice(0, 4);

  // ACCESS CONTROL HELPER: Strictly enforces access tiers
  const getLockType = (tab: TabType): 'PRO' | 'LOGIN' | 'NONE' => {
    // Pro members or Admin have full access to everything
    if (isUserPro) return 'NONE'; 
    
    const proOnlyTabs: TabType[] = ['projects', 'interests', 'honors', 'languages', 'publications', 'recommendations'];
    const loginOnlyTabs: TabType[] = ['skills', 'certifications', 'volunteering'];
    
    if (proOnlyTabs.includes(tab)) return 'PRO';
    if (loginOnlyTabs.includes(tab)) {
       if (user?.isGuest) return 'LOGIN';
       return 'NONE';
    }
    return 'NONE';
  };

  useEffect(() => {
    if (isUserPro && data.personalInfo.fullName) {
      const timer = setTimeout(() => {
        const updatedResumes = (user?.savedResumes || []).filter(r => r.id !== data.id);
        const updatedUser = {
          ...user!,
          savedResumes: [{ ...data, lastModified: Date.now() }, ...updatedResumes]
        };
        onUpdateUser(updatedUser);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [data, user, isUserPro]);

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[50px] p-12 md:p-16 max-w-2xl w-full text-center shadow-4xl border-4 border-slate-100 flex flex-col items-center">
          <div className="bg-indigo-600 w-24 h-24 rounded-[32px] flex items-center justify-center mb-10 shadow-2xl animate-bounce-slow">
            <Lock className="text-white" size={44} />
          </div>
          <h2 className="text-4xl font-black mb-6 uppercase tracking-tight text-slate-900 leading-none">Access Restricted</h2>
          <p className="text-slate-500 text-sm mb-12 uppercase font-black tracking-widest leading-relaxed max-w-md">
            Sign in to your account to build, optimize, and save your professional resumes with SHAHHUB AI.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 w-full">
            <button 
              onClick={() => onLogin(true)} 
              className="flex flex-col items-center gap-4 p-8 bg-indigo-600 text-white rounded-[32px] hover:bg-indigo-700 transition-all group shadow-xl hover:scale-[1.02]"
            >
              <LogIn size={32} className="group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-black uppercase text-[11px] tracking-widest mb-1 opacity-80">Permanent Membership</div>
                <div className="font-black text-lg leading-tight text-center w-full">Sign In to Your Account</div>
              </div>
            </button>

            <button 
              onClick={() => onLogin(false)} 
              className="flex flex-col items-center gap-4 p-8 bg-white border-4 border-slate-100 text-slate-900 rounded-[32px] hover:border-indigo-200 transition-all group shadow-sm hover:scale-[1.02]"
            >
              <UserPlus size={32} className="text-indigo-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-black uppercase text-[11px] tracking-widest mb-1 opacity-40">Single Session</div>
                <div className="font-black text-lg leading-tight text-center w-full">Continue as Guest</div>
              </div>
            </button>
          </div>

          <Link to="/" className="mt-12 text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600 tracking-widest flex items-center gap-2 transition-colors">
            <ChevronLeft size={14} /> Back to Hub Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAIParse = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const parsed = await parseResumeText(text);
      const generateId = () => Math.random().toString(36).substr(2, 9);
      const newData: ResumeData = { 
        ...data,
        ...parsed,
        experience: (parsed.experience || []).map((e: any) => ({ ...e, id: e.id || generateId() })),
        education: (parsed.education || []).map((e: any) => ({ ...e, id: e.id || generateId() })),
        skills: (parsed.skills || []).map((s: any) => typeof s === 'string' ? { id: generateId(), name: s } : { ...s, id: s.id || generateId() }),
        projects: (parsed.projects || []).map((p: any) => ({ ...p, id: p.id || generateId() })),
        certifications: (parsed.certifications || []).map((c: any) => ({ ...c, id: c.id || generateId() })),
        interests: (parsed.interests || []).map((i: any) => typeof i === 'string' ? { id: generateId(), name: i } : { ...i, id: i.id || generateId() }),
        volunteering: (parsed.volunteering || []).map((v: any) => ({ ...v, id: v.id || generateId() })),
        honors: (parsed.honors || []).map((h: any) => ({ ...h, id: h.id || generateId() })),
        languages: (parsed.languages || []).map((l: any) => ({ ...l, id: l.id || generateId() })),
        publications: (parsed.publications || []).map((p: any) => ({ ...p, id: p.id || generateId() })),
        recommendations: (parsed.recommendations || []).map((r: any) => ({ ...r, id: r.id || generateId() })),
      };
      setData(newData);
      setActiveTab('personal');
      if (user) onUpdateUser({ ...user, uploadsCount: user.uploadsCount + 1 });
      analyzeKeywords(newData);
    } catch (err) { alert("AI Analysis failed. Check API connectivity."); } finally { setLoading(false); }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      let text = "";
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      // Implementation placeholder for extraction functions
      if (text) await handleAIParse(text);
    } catch (err: any) { alert(err.message || "File processing failed."); } finally { setLoading(false); }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => updatePersonalInfo('photoUrl', event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const analyzeKeywords = async (resumeData: ResumeData) => {
    if (!isUserPro) return;
    setIsAnalyzingKeywords(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Role: ATS Recruiter. Analyze content and suggest 12-15 keywords. Return CSV. Content: ${resumeData.personalInfo.summary}`;
      const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setSuggestedKeywords(response.text?.split(',').map(s => s.trim()) || []);
    } catch (e) { console.error(e); } finally { setIsAnalyzingKeywords(false); }
  };

  const getAlternatives = async (id: string, text: string, type: string) => {
    if (!text.trim()) return;
    if (!isUserPro) {
      alert("Pro Feature: AI Phrasing Alternatives require Pro Lifetime membership.");
      navigate('/pricing');
      return;
    }
    setIsOptimizing(id);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Rewrite variations as JSON array: ${text}`;
      const response = await ai.models.generateContent({ 
        model: 'gemini-3-flash-preview', 
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      setAlternatives({ id, options: JSON.parse(response.text || '[]') });
    } catch (e) { alert("AI Refinement failed."); } finally { setIsOptimizing(null); }
  };

  const applyAlternative = (type: keyof ResumeData, id: string, field: string, value: string) => {
    if (type === 'personalInfo') updatePersonalInfo(field, value);
    else updateItem(type, id, field, value);
    setAlternatives(null);
  };

  const updatePersonalInfo = (field: string, val: string) => {
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: val } }));
  };

  const updateItem = (type: keyof ResumeData, id: string, field: string, val: string) => {
    setData(prev => {
      const list = (prev[type] as any[]) || [];
      return { ...prev, [type]: list.map(item => (typeof item === 'object' && item.id === id) ? { ...item, [field]: val } : item) };
    });
  };

  const addItem = (type: keyof ResumeData) => {
    const id = Math.random().toString(36).substr(2, 9);
    let newItem: any = { id };
    // Switching logic based on type...
    setData(prev => ({ ...prev, [type]: [...((prev[type] as any[]) || []), newItem] }));
  };

  const removeItem = (type: keyof ResumeData, id: string) => {
    setData(prev => ({ ...prev, [type]: ((prev[type] as any[]) || []).filter(item => item.id !== id) }));
  };

  const formatRegionalDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return isNorthAmericanRegion ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatRegionalDateRange = (start: string, end: string) => `${formatRegionalDate(start)} — ${end.toLowerCase() === 'present' ? 'Present' : formatRegionalDate(end)}`;

  const SectionHeader = ({ title }: { title: string }) => (
    <h2 className="section-title font-black uppercase tracking-[0.15em] mb-4 pb-1 border-b-2 border-slate-900" style={{ fontSize: '1.05em' }}>{title}</h2>
  );

  const ResumeContent = () => (
    <div className={`template-${template} w-full text-[#1e293b] bg-white`}>
      <div className="flex justify-between items-start mb-8">
        <div className="flex-grow">
          <h1 className="font-black uppercase tracking-tighter leading-none mb-4 text-[3em]">{data.personalInfo.fullName || 'RESUME CANDIDATE'}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-bold text-slate-500 uppercase text-[0.7em] tracking-wider mb-2">
            {data.personalInfo.email && <div className="flex items-center gap-1.5"><Mail size={12} /> {data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div className="flex items-center gap-1.5"><Phone size={12} /> {data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div className="flex items-center gap-1.5"><MapPin size={12} /> {data.personalInfo.location}</div>}
          </div>
        </div>
        {(isAsianRegion || region === 'Europe') && data.personalInfo.photoUrl && (
          <div className="shrink-0 ml-4"><img src={data.personalInfo.photoUrl} className="w-24 h-32 object-cover rounded-xl shadow-lg border-2 border-white" alt="Profile" /></div>
        )}
      </div>
      {template === 'Sidebar' ? (
        <div className="sidebar-layout">
          <div className="sidebar-col space-y-4">{renderGenericSections(true)}</div>
          <div className="main-col">{renderGenericSections(false)}</div>
        </div>
      ) : (
        <div className="full-layout">{renderGenericSections(false)}</div>
      )}
    </div>
  );

  const renderGenericSections = (isSidebarRequested: boolean) => {
    const list = [
      { id: 'summary', title: 'Executive Summary', show: !!data.personalInfo.summary, isSidebarSection: false },
      { id: 'experience', title: 'Work Experience', show: data.experience.length > 0, isSidebarSection: false },
      { id: 'education', title: 'Academic History', show: data.education.length > 0, isSidebarSection: false },
      { id: 'skills', title: 'Expertise & Skills', show: data.skills.length > 0, isSidebarSection: true },
      { id: 'projects', title: 'Project', show: data.projects.length > 0, isSidebarSection: false },
      { id: 'certifications', title: 'Certs', show: data.certifications.length > 0, isSidebarSection: true },
      { id: 'interests', title: 'Interests', show: data.interests.length > 0, isSidebarSection: true },
      { id: 'volunteering', title: 'Volunteer', show: data.volunteering.length > 0, isSidebarSection: false },
      { id: 'honors', title: 'Honors', show: data.honors.length > 0, isSidebarSection: false },
      { id: 'languages', title: 'Language', show: data.languages.length > 0, isSidebarSection: true },
      { id: 'publications', title: 'Publishes', show: data.publications.length > 0, isSidebarSection: false },
      { id: 'recommendations', title: 'Reference', show: data.recommendations.length > 0, isSidebarSection: false },
    ];

    return list.filter(s => {
      if (!s.show) return false;
      if (template === 'Sidebar') return isSidebarRequested ? s.isSidebarSection : !s.isSidebarSection;
      return true;
    }).map(s => (
      <section key={s.id} className="mb-8">
        <SectionHeader title={s.title} />
        {/* Renderers for each section based on ID... */}
      </section>
    ));
  };

  const renderGenericListEditor = (type: keyof ResumeData, fields: { key: string; label: string; type?: string }[]) => {
    const list = (data[type] as any[]) || [];
    const lockType = getLockType(type as TabType);

    if (lockType !== 'NONE') {
      const isProLock = lockType === 'PRO';
      return (
        <div className="bg-slate-50 rounded-[32px] p-10 text-center border-2 border-dashed border-slate-200">
           <div className="bg-white w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-slate-100">
             {isProLock ? <Crown className="text-amber-500" size={32} /> : <Lock className="text-indigo-600" size={32} />}
           </div>
           <h3 className="text-lg font-black uppercase text-slate-900 mb-3 tracking-tight">{isProLock ? 'Pro Exclusive' : 'Sign-In Feature'}</h3>
           <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-8 leading-relaxed">
             {isProLock ? 'Unlock all premium modules with Pro Lifetime membership.' : 'Authenticated members enjoy advanced features.'}
           </p>
           {isProLock ? (
             <Link to="/pricing" className="bg-amber-500 text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2"><Zap size={14} /> Get Pro Lifetime</Link>
           ) : (
             <button onClick={() => onLogin(true)} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2"><LogIn size={14} /> Sign In</button>
           )}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <button onClick={() => addItem(type)} className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-black uppercase text-[9px] flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-sm"><Plus size={14} /> Add new entry</button>
        {list.map((item: any) => (
          <div key={item.id} className="bg-white border-2 border-slate-50 rounded-2xl p-5 relative group shadow-sm hover:border-indigo-100 transition-colors">
            <button onClick={() => removeItem(type, item.id)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
            <div className="space-y-4 pt-4">
              {fields.map(f => (
                <div key={f.key}>
                  <label className="editor-label">{f.label}</label>
                  {f.type === 'textarea' ? (
                    <div className="relative">
                      <textarea className="editor-input h-32 leading-relaxed" value={item[f.key] || ''} onChange={e => updateItem(type, item.id, f.key, e.target.value)} />
                      {(type === 'experience' || type === 'projects') && f.key === 'description' && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          <button onClick={() => getAlternatives(item.id, item[f.key], type as string)} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-[8px] font-black uppercase flex items-center gap-1 shadow-xl hover:scale-105 transition-all">
                            {isOptimizing === item.id ? <RefreshCw size={10} className="animate-spin" /> : <Sparkles size={10} />} Phrasing Alternatives
                          </button>
                        </div>
                      )}
                      {alternatives?.id === item.id && (
                        <div className="mt-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                           {alternatives.options.map((opt, idx) => (
                            <button key={idx} onClick={() => applyAlternative(type, item.id, f.key, opt)} className="w-full text-left p-3 bg-white rounded-xl border border-transparent hover:border-indigo-300 transition-all shadow-sm text-xs text-slate-600 leading-relaxed flex gap-3 group">
                              <span className="shrink-0 mt-0.5"><Check size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100" /></span>{opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <input className="editor-input" value={item[f.key] || ''} onChange={e => updateItem(type, item.id, f.key, e.target.value)} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col md:flex-row bg-slate-50">
      <div className="w-full md:w-[460px] bg-white border-r flex flex-col no-print h-full shadow-2xl z-40 relative overflow-hidden">
        <div className="p-5 bg-slate-50 border-b flex-shrink-0 space-y-5">
          <div className="flex items-center justify-between mb-2">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Formatting</div>
             <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-[9px] font-black uppercase"><ShieldCheck size={10} /> {isUserPro ? 'Pro Member' : 'Member'}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="editor-label">Region Style</label><select value={region} onChange={e => setRegion(e.target.value as Region)} className="editor-input font-bold"><option value="USA">USA</option><option value="Singapore">Singapore</option></select></div>
            <div><label className="editor-label">Active Template</label><select value={template} onChange={e => setTemplate(e.target.value as TemplateType)} className="editor-input font-bold">{availableTemplates.map(t => (<option key={t.value} value={t.value}>{t.label}</option>))}</select></div>
          </div>
        </div>

        {isUserPro && suggestedKeywords.length > 0 && (
          <div className="px-5 py-3 bg-slate-900 border-b overflow-hidden h-[120px] flex flex-col justify-center">
            <div className="text-[9px] font-black uppercase text-indigo-400 mb-2 tracking-widest flex items-center gap-2"><Search size={10} /> Smart Keywords Insight</div>
            <div className="flex flex-wrap gap-1.5 max-h-[70px] overflow-y-auto scrollbar-hide">{suggestedKeywords.map((kw, i) => (<span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[9px] font-bold flex items-center gap-1 border border-slate-700 hover:border-indigo-500 hover:text-white transition-all"><Check size={8} /> {kw}</span>))}</div>
          </div>
        )}

        <div className="flex-shrink-0 flex p-1.5 gap-1 border-b bg-white overflow-x-auto scrollbar-hide h-[52px] items-center">
          {TABS.map(t => (<button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-3 py-2 rounded-lg font-black text-[9px] uppercase transition-all whitespace-nowrap ${activeTab === t.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>{t.label}</button>))}
        </div>

        <div className="flex-grow overflow-y-auto p-5 space-y-6 bg-white scrollbar-hide pb-40">
          {activeTab === 'parsing' && (
            <div className="space-y-6">
              <div className="bg-indigo-600 p-10 rounded-[36px] text-white shadow-2xl text-center border-2 border-white">
                <UploadCloud className="mx-auto mb-4 opacity-80" size={40} />
                <h3 className="font-black uppercase text-xs mb-2 tracking-widest">AI Import Engine</h3>
                <button onClick={() => resumeUploadRef.current?.click()} className={`w-full bg-white text-indigo-600 py-3 rounded-xl font-black uppercase text-[10px] shadow-xl hover:scale-105 transition-all`}>Upload Document</button>
                <input type="file" ref={resumeUploadRef} className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileUpload} />
              </div>
              <textarea className="editor-input h-40" placeholder="Paste content here..." value={pasteText} onChange={e => setPasteText(e.target.value)} />
              <button onClick={() => handleAIParse(pasteText)} className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-black uppercase text-[10px] shadow-lg">Begin Synthesis</button>
            </div>
          )}
          {activeTab === 'personal' && (
             <div className="space-y-4">
                {(isAsianRegion || region === 'Europe') && (
                  <div className="flex flex-col items-center gap-4 mb-6 p-6 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
                    <div className="relative w-24 h-32 bg-white rounded-lg border-2 border-slate-200 overflow-hidden flex items-center justify-center">
                      {data.personalInfo.photoUrl ? (<img src={data.personalInfo.photoUrl} alt="Portrait" className="w-full h-full object-cover" />) : (<Camera size={32} className="text-slate-300" />)}
                    </div>
                    <button onClick={() => photoUploadRef.current?.click()} className="text-[10px] font-black uppercase text-indigo-600 hover:underline">Upload Photo</button>
                    <input type="file" ref={photoUploadRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                  </div>
                )}
                <div><label className="editor-label">Name</label><input className="editor-input font-bold" value={data.personalInfo.fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} /></div>
                <div><label className="editor-label">Summary</label><textarea className="editor-input h-48" value={data.personalInfo.summary} onChange={e => updatePersonalInfo('summary', e.target.value)} /></div>
             </div>
          )}
          {activeTab === 'experience' && renderGenericListEditor('experience', [{ key: 'position', label: 'Role' }, { key: 'company', label: 'Company' }, { key: 'startDate', label: 'Start' }, { key: 'endDate', label: 'End' }, { key: 'description', label: 'Description', type: 'textarea' }])}
          {activeTab === 'education' && renderGenericListEditor('education', [{ key: 'school', label: 'School' }, { key: 'degree', label: 'Degree' }, { key: 'year', label: 'Year' }])}
          {activeTab === 'skills' && renderGenericListEditor('skills', [{ key: 'name', label: 'Skill' }])}
          {activeTab === 'projects' && renderGenericListEditor('projects', [{ key: 'name', label: 'Project' }, { key: 'description', label: 'Description', type: 'textarea' }])}
          {activeTab === 'certifications' && renderGenericListEditor('certifications', [{ key: 'name', label: 'Cert' }, { key: 'issuer', label: 'Issuer' }, { key: 'year', label: 'Year' }])}
          {activeTab === 'interests' && renderGenericListEditor('interests', [{ key: 'name', label: 'Interest' }])}
          {activeTab === 'volunteering' && renderGenericListEditor('volunteering', [{ key: 'organization', label: 'Org' }, { key: 'role', label: 'Role' }, { key: 'description', label: 'Description', type: 'textarea' }])}
          {activeTab === 'honors' && renderGenericListEditor('honors', [{ key: 'title', label: 'Award' }, { key: 'issuer', label: 'Issuer' }, { key: 'date', label: 'Date' }])}
          {activeTab === 'languages' && renderGenericListEditor('languages', [{ key: 'name', label: 'Language' }, { key: 'proficiency', label: 'Level' }])}
          {activeTab === 'publications' && renderGenericListEditor('publications', [{ key: 'title', label: 'Title' }, { key: 'publisher', label: 'Publisher' }, { key: 'date', label: 'Date' }])}
          {activeTab === 'recommendations' && renderGenericListEditor('recommendations', [{ key: 'name', label: 'Name' }, { key: 'title', label: 'Title' }, { key: 'text', label: 'Text', type: 'textarea' }])}
        </div>
        
        <div className="absolute bottom-0 inset-x-0 p-5 bg-white border-t z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex gap-3">
          <button onClick={() => setShowPreviewMode(true)} className="flex-grow bg-indigo-600 text-white py-4 rounded-xl font-black uppercase text-xs shadow-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3"><Layers size={18} /> Review & Export</button>
        </div>
      </div>

      <div className="flex-grow resume-view-scroll no-print bg-slate-200 overflow-y-auto">
        <div className="flex flex-col items-center gap-12 py-20 w-full">
          {[0, 1, 2, 3, 4].map(idx => (
            <div key={idx} className={`resume-page size-${pageSize} shadow-2xl relative border border-slate-300`}>
              {!isUserPro && <div className="watermark">Draft - Unlock PRO</div>}
              <div className="page-content-window" style={{ top: '1in', left: '1in', right: '1in', bottom: '1in' }}>
                <div className="master-content-flow" style={{ transform: `translateY(-${idx * innerHeight}px)`, fontSize: `${fontSize}px`, minHeight: `${innerHeight * 5}px` }}>
                  <ResumeContent />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPreviewMode && (
        <div className="fixed inset-0 bg-slate-900 z-[100] flex flex-col overflow-hidden animate-in fade-in duration-300">
          <div className="bg-white border-b p-4 flex justify-between items-center px-10 shadow-md flex-shrink-0 no-print">
            <button onClick={() => setShowPreviewMode(false)} className="flex items-center gap-2 text-slate-500 font-black uppercase text-[10px] hover:text-indigo-600 transition-colors"><ChevronLeft size={16} /> Return to Editor</button>
            <div className="flex items-center gap-6">
               {!isUserPro && <span className="text-amber-600 font-black text-[10px] uppercase tracking-widest">Upgrade to remove watermarks</span>}
               <button onClick={() => window.print()} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-all"><Download size={18} /> Export as PDF</button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto bg-slate-800 flex flex-col items-center py-20 gap-16 scrollbar-hide no-print">
             {[0, 1, 2, 3, 4].map(idx => (
                <div key={idx} className={`resume-page size-${pageSize} shadow-[0_60px_100px_rgba(0,0,0,0.6)] relative`}>
                  {!isUserPro && <div className="watermark">Draft - Unlock PRO</div>}
                  <div className="page-content-window" style={{ top: '1in', left: '1in', right: '1in', bottom: '1in' }}>
                    <div className="master-content-flow" style={{ transform: `translateY(-${idx * innerHeight}px)`, fontSize: `${fontSize}px`, minHeight: `${innerHeight * 5}px` }}><ResumeContent /></div>
                  </div>
                </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;
