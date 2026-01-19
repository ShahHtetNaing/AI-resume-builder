
import React from 'react';
import { Mail, Linkedin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight uppercase">Get in Touch</h2>
          <p className="text-xl text-slate-600">Have questions about SHAHHUB or need technical help? Reach out below.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <Mail className="text-indigo-600 mb-4" size={32} />
              <h3 className="font-bold text-lg mb-1">Direct Email</h3>
              <p className="text-indigo-600 font-bold break-all">shahhtetnaing@gmail.com</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <Linkedin className="text-indigo-600 mb-4" size={32} />
              <h3 className="font-bold text-lg mb-1">LinkedIn</h3>
              <a href="https://www.linkedin.com/in/shah-htet-naing" target="_blank" className="text-indigo-600 font-bold hover:underline">Connect with Shah</a>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <Clock className="text-indigo-600 mb-4" size={32} />
              <h3 className="font-bold text-lg mb-1">Typical Response</h3>
              <p className="text-slate-500 font-medium italic">Within 24 business hours</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-4 rounded-3xl shadow-xl overflow-hidden min-h-[800px] border border-slate-200">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSeawteSpg6QJssm6EYR1bbz8mTyP7iPBuVs9Cy6roDQigWXXg/viewform?embedded=true" 
              width="100%" 
              height="1000" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0}
              className="w-full"
            >
              Loading form...
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
