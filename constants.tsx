
import React from 'react';
import { 
  FileText,
  Shield,
  Stethoscope, 
  ShieldCheck, 
  Mail, 
  ClipboardList, 
  BookOpen, 
  Globe, 
  FileSearch, 
  AlertTriangle, 
  Gavel
} from 'lucide-react';
import { ToolStatus } from './types';

export const CURRENT_TOOLS = [
  {
    name: 'CompTIA Security+ SY0-701',
    subtitle: 'Cybersecurity Practice & Study Resource',
    description: 'A practical resource for CompTIA Security+ SY0-701 learners. This platform provides concise notes and structured practice questions with answers to help users understand core security concepts and reinforce exam preparation. Designed for self-study, it serves as a reliable companion for reviewing key topics and testing knowledge—not a formal course, but a focused tool for building confidence and readiness.',
    features: ['Exam Dump Practice', 'Multiple Choice Drills', 'Security+ SY0-701 Focus'],
    linkText: 'Start Explore',
    externalLink: 'https://shahsecplus.netlify.app/',
    freeUsage: 'Open Access Resource',
    icon: <Shield className="w-6 h-6 text-green-600" />
  },
  {
    name: 'AI Resume Builder',
    description: 'Professional resumes tailored by AI.',
    freeUsage: 'One free resume download per user; additional downloads paid.',
    linkText: 'Get Started',
    externalLink: '#/builder',
    icon: <FileText className="w-6 h-6 text-blue-600" />
  }
];

export const FUTURE_TOOLS = [
  {
    id: 'healthcare-analyzer',
    name: 'AI Healthcare Log Analyzer',
    purpose: 'Automatically analyze healthcare IT logs, identify risks, and suggest remediation steps.',
    monetization: 'Subscription-based ($49/month)',
    status: ToolStatus.COMING_SOON,
    icon: 'Stethoscope'
  },
  {
    id: 'security-generator',
    name: 'AI Security Policy Generator',
    purpose: 'Generate company-specific security policies and perform automatic audits.',
    monetization: 'Annual license ($99/year)',
    status: ToolStatus.COMING_SOON,
    icon: 'ShieldCheck'
  },
  {
    id: 'email-triage',
    name: 'AI Email Triage Assistant',
    purpose: 'Auto-classify support emails and draft replies.',
    monetization: 'Per-user subscription ($25/month)',
    status: ToolStatus.COMING_SOON,
    icon: 'Mail'
  }
];

export const getIconComponent = (name: string) => {
  switch (name) {
    case 'Stethoscope': return <Stethoscope className="w-6 h-6" />;
    case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
    case 'Mail': return <Mail className="w-6 h-6" />;
    case 'ClipboardList': return <ClipboardList className="w-6 h-6" />;
    case 'BookOpen': return <BookOpen className="w-6 h-6" />;
    case 'Globe': return <Globe className="w-6 h-6" />;
    case 'FileSearch': return <FileSearch className="w-6 h-6" />;
    case 'AlertTriangle': return <AlertTriangle className="w-6 h-6" />;
    case 'Gavel': return <Gavel className="w-6 h-6" />;
    default: return <ShieldCheck className="w-6 h-6" />;
  }
};
