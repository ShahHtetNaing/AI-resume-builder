
import React from 'react';
import { Linkedin, Github, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <img 
            src="https://picsum.photos/seed/shah/400/400" 
            alt="Shah" 
            className="w-48 h-48 rounded-full shadow-2xl border-4 border-blue-50"
          />
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Meet Shah</h1>
            <p className="text-xl text-blue-600 font-bold">Founder of SHAHHUB & AI Resume Builder</p>
          </div>
        </div>

        <div className="prose prose-lg text-gray-600 space-y-6">
          <p>
            Hello! I’m Shah, a dedicated IT Analyst and cybersecurity professional with a Master’s degree in Cybersecurity from Webster University and currently pursuing a PhD in Information Technology with a focus on Digital Forensics at the University of the Cumberlands.
          </p>
          <p>
            With over seven years of experience in digital security, IT analysis, and building practical technology solutions, I specialize in making complex systems simple, reliable, and useful for professionals and individuals alike.
          </p>
          <p>
            Throughout my career, I’ve developed and led projects ranging from virtual learning systems and smart mirrors to online platforms and cybersecurity solutions for healthcare environments. I thrive on solving complex technical problems and creating tools that users can actually use.
          </p>
          
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 mt-12 shadow-sm">
            <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Connect with me
            </h3>
            <div className="flex flex-col gap-4 mb-10">
              <a href="https://www.linkedin.com/in/shah-htet-naing" target="_blank" className="text-blue-600 font-medium hover:underline flex items-center gap-3">
                <Linkedin size={20} />
                <span>LinkedIn: shah-htet-naing</span>
              </a>
              <a href="https://github.com/ShahHtetNaing" target="_blank" className="text-blue-600 font-medium hover:underline flex items-center gap-3">
                <Github size={20} />
                <span>GitHub: ShahHtetNaing</span>
              </a>
              <a href="https://mysite2024.s3.us-east-1.amazonaws.com/index.html" target="_blank" className="text-blue-600 font-medium hover:underline flex items-center gap-3">
                <Globe size={20} />
                <span>Personal Portfolio</span>
              </a>
            </div>

            <hr className="border-gray-200 mb-10" />

            <div className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Discover: SHAHHUB</h3>
              <p className="text-lg font-bold text-slate-800 leading-snug">
                Practical AI, cybersecurity tools, and study resources—built to solve real problems.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                SHAHHUB is a modular platform created by Shah Htet Naing, bringing together AI-powered utilities, cybersecurity tools, and focused learning resources in one secure hub. Each project is designed to be practical, compliance-aware, and easy to use—helping professionals work smarter, faster, and with confidence.
              </p>
              <div className="py-4 border-y border-dashed border-gray-300">
                <p className="text-center font-black text-gray-900 tracking-widest uppercase text-sm">
                  Build. Analyze. Learn. Secure.
                </p>
                <p className="text-center text-gray-400 font-bold text-[10px] uppercase tracking-tighter mt-1">
                  All in one place.
                </p>
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-indigo-600 font-black uppercase text-xs tracking-widest group">
                Explore All AI Tools at SHAHHUB 
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
