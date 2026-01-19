
export interface ResumeData {
  id: string;
  lastModified: number;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin?: string;
    summary: string;
    dob?: string;
    nationality?: string;
    photoUrl?: string;
    gender?: string;
    race?: string;
    ethnicity?: string;
  };
  experience: Experience[];
  education: Education[];
  skills: { id: string; name: string }[];
  projects: Project[];
  certifications: Certification[];
  interests: { id: string; name: string }[];
  volunteering: Volunteering[];
  honors: Honor[];
  languages: Language[];
  publications: Publication[];
  recommendations: Recommendation[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Volunteering {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Honor {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  description: string;
}

export interface Recommendation {
  id: string;
  name: string;
  title: string;
  text: string;
}

export type Region = 'USA' | 'UK' | 'Canada' | 'Europe' | 'Singapore' | 'India' | 'China' | 'Asia';

export type TemplateType = 'Modern' | 'Executive' | 'Sidebar' | 'Academic' | 'Word-Pro-1' | 'Word-Pro-2' | 'Word-Pro-3' | 'Word-Pro-4' | 'Word-Pro-5' | 'Word-Pro-6';

export enum ToolStatus {
  COMING_SOON = 'COMING_SOON',
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  uploadsCount: number;
  isPro: boolean;
  savedResumes: ResumeData[];
  isGuest?: boolean;
}
