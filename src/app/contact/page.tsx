import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';


export const metadata = {
  title: 'Contact Us | V-Force Tax & Advisory',
  description: 'Get in touch with Townsville\'s leading accounting firm.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#0a0f1e] min-h-screen pt-64 pb-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#39d237]/20 blur-[150px] rounded-full"></div>
        <div className="absolute top-[40%] left-[-10%] w-[30%] h-[30%] bg-[#39d237]/5 blur-[100px] rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="inline-flex items-center text-[#39d237] font-black tracking-[0.4em] uppercase text-[10px] mb-8">
          <span className="w-8 h-[1px] bg-[#39d237] mr-4"></span> Let's Talk
        </div>
        <h1 className="text-6xl lg:text-[100px] font-black text-white italic tracking-tighter mb-16 uppercase leading-[0.85] font-heading">
          Contact <span className="text-[#39d237]">Us.</span>
        </h1>
        
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <p className="text-xl text-slate-300 font-light leading-relaxed">
              Ready to engineer better financial outcomes? Schedule your free consultation with Townsville's trusted CPA and Tax Agent.
            </p>
            
            <div className="space-y-8 pt-8 border-t border-white/10">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-6 shrink-0 border border-white/10">
                  <MapPin className="w-5 h-5 text-[#39d237]" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Office Location</h4>
                  <p className="text-slate-400 font-medium">43 Roosevelt Loop<br/>Mount Louisa, QLD 4814</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-6 shrink-0 border border-white/10">
                  <Phone className="w-5 h-5 text-[#39d237]" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Phone Number</h4>
                  <p className="text-slate-400 font-medium">07 3473 5556</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-6 shrink-0 border border-white/10">
                  <Mail className="w-5 h-5 text-[#39d237]" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Email Address</h4>
                  <p className="text-slate-400 font-medium">contact@vforcetax.com.au</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-6 shrink-0 border border-white/10">
                  <Clock className="w-5 h-5 text-[#39d237]" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Office Hours</h4>
                  <p className="text-slate-400 font-medium">Mon - Fri: 8:30 AM - 5:30 PM<br/>Weekend: By Appointment</p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Serving Townsville Suburbs</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {["Mount Louisa", "Kirwan", "Bohle Plains", "North Ward", "Townsville CBD", "Annandale", "Douglas"].map(suburb => (
                  <span key={suburb} className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                    {suburb}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative text-center">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#39d237]/20 blur-[40px] rounded-full pointer-events-none"></div>
              
              <h4 className="text-[#0a0f1e] font-black text-4xl italic tracking-tighter uppercase mb-6">Schedule Your <span className="text-[#39d237]">Session.</span></h4>
              <p className="text-slate-600 font-bold mb-10 leading-relaxed max-w-md mx-auto">
                Skip the back-and-forth. Select a time that works for you directly on our calendar and get your financial engineering started today.
              </p>
              
              <Link 
                href="https://meetings.hubspot.com/vforce-tax/intro" 
                target="_blank"
                className="inline-block bg-[#0a0f1e] text-white py-6 px-12 rounded-xl font-black text-[13px] tracking-widest uppercase hover:bg-[#39d237] transition-all duration-300 shadow-xl hover:shadow-[0_8px_20px_rgba(57,210,55,0.3)] mb-8"
              >
                Open Booking Calendar
              </Link>
              
              <div className="pt-8 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Powered by HubSpot Meetings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
