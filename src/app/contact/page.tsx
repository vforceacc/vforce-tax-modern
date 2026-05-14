import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';


export const metadata = {
  title: 'Contact Us | V-Force Tax & Advisory',
  description: 'Get in touch with Townsville\'s leading accounting firm.',
};

export default function ContactPage() {
  return (
    <div className="bg-vforce-primary min-h-screen pt-64 pb-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-vforce-emerald/20 blur-[150px] rounded-full"></div>
        <div className="absolute top-[40%] left-[-10%] w-[30%] h-[30%] bg-vforce-emerald/5 blur-[100px] rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="inline-flex items-center text-vforce-emerald font-black tracking-[0.4em] uppercase text-[10px] mb-8">
          <span className="w-8 h-[1px] bg-vforce-emerald mr-4"></span> Let's Talk
        </div>
        <h1 className="text-6xl lg:text-[100px] font-black text-vforce-navy italic tracking-tighter mb-16 uppercase leading-[0.85] font-heading">
          Contact <span className="text-vforce-emerald">Us.</span>
        </h1>
        
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <p className="text-xl text-vforce-charcoal font-light leading-relaxed">
              Ready to engineer better financial outcomes? Schedule your free consultation with Townsville's trusted CPA and Tax Agent.
            </p>
            
            <div className="space-y-8 pt-8 border-t border-vforce-border">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-vforce-secondary rounded-2xl flex items-center justify-center mr-6 shrink-0 border border-vforce-border">
                  <MapPin className="w-5 h-5 text-vforce-emerald" />
                </div>
                <div>
                  <h4 className="text-vforce-navy font-bold uppercase tracking-widest text-sm mb-2">Office Location</h4>
                  <p className="text-vforce-charcoal font-medium">43 Roosevelt Loop<br/>Mount Louisa, QLD 4814</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-vforce-secondary rounded-2xl flex items-center justify-center mr-6 shrink-0 border border-vforce-border">
                  <Phone className="w-5 h-5 text-vforce-emerald" />
                </div>
                <div>
                  <h4 className="text-vforce-navy font-bold uppercase tracking-widest text-sm mb-2">Phone Number</h4>
                  <p className="text-vforce-charcoal font-medium">07 3473 5556</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-vforce-secondary rounded-2xl flex items-center justify-center mr-6 shrink-0 border border-vforce-border">
                  <Mail className="w-5 h-5 text-vforce-emerald" />
                </div>
                <div>
                  <h4 className="text-vforce-navy font-bold uppercase tracking-widest text-sm mb-2">Email Address</h4>
                  <p className="text-vforce-charcoal font-medium">contact@vforcetax.com.au</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-vforce-secondary rounded-2xl flex items-center justify-center mr-6 shrink-0 border border-vforce-border">
                  <Clock className="w-5 h-5 text-vforce-emerald" />
                </div>
                <div>
                  <h4 className="text-vforce-navy font-bold uppercase tracking-widest text-sm mb-2">Office Hours</h4>
                  <p className="text-vforce-charcoal font-medium">Mon - Fri: 8:30 AM - 5:30 PM<br/>Weekend: By Appointment</p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-vforce-border">
              <h4 className="text-vforce-navy font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Serving Townsville Suburbs</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {["Mount Louisa", "Kirwan", "Bohle Plains", "North Ward", "Townsville CBD", "Annandale", "Douglas"].map(suburb => (
                  <span key={suburb} className="text-vforce-charcoal text-[11px] font-bold uppercase tracking-widest">
                    {suburb}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="bg-vforce-secondary border border-vforce-border p-10 md:p-14 rounded-[2.5rem] shadow-sm relative text-center">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-vforce-emerald/20 blur-[40px] rounded-full pointer-events-none"></div>
              
              <h4 className="text-vforce-navy font-black text-4xl italic tracking-tighter uppercase mb-6">Schedule Your <span className="text-vforce-emerald">Session.</span></h4>
              <p className="text-vforce-charcoal font-bold mb-10 leading-relaxed max-w-md mx-auto">
                Skip the back-and-forth. Select a time that works for you directly on our calendar and get your financial engineering started today.
              </p>
              
              <Link 
                href="/booking" 
                className="inline-block bg-vforce-navy-blue text-white py-6 px-12 rounded-xl font-black text-[13px] tracking-widest uppercase hover:bg-vforce-navy transition-all duration-300 shadow-md hover:shadow-xl mb-8"
              >
                Open Booking Calendar
              </Link>
              
              <div className="pt-8 border-t border-vforce-border">
                <p className="text-[10px] font-bold text-vforce-charcoal uppercase tracking-widest">
                  Powered by Microsoft Bookings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
