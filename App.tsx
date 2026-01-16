import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Hammer, Tv, Zap, DoorOpen, Wrench, ChevronRight, Menu, X, CheckCircle2 } from 'lucide-react';
import { Button } from './components/Button';
import { ServiceCard } from './components/ServiceCard';
import { QuoteAssistant } from './components/QuoteAssistant';
import { ServiceItem } from './types';

const SERVICES: ServiceItem[] = [
  { id: '1', title: 'TV Mounting', icon: Tv, description: 'Secure wall mounting on drywall, brick, or stone. Concealed wiring options available.' },
  { id: '2', title: 'Plumbing Fixtures', icon: Wrench, description: 'Faucet replacement, garbage disposal installation, and minor leak repairs.' },
  { id: '3', title: 'Electrical Fixtures', icon: Zap, description: 'Ceiling fans, light fixtures, dimmer switches, and outlet replacements.' },
  { id: '4', title: 'Doors & Hardware', icon: DoorOpen, description: 'Interior door installation, lock replacement, and handle upgrades.' },
];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-gray-100 flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-sm border-b border-gray-800 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-yellow tracking-tight leading-none">
              HANDYMAN HELP
            </h1>
            <div className="hidden md:flex items-center gap-1 text-xs font-bold text-brand-red uppercase tracking-wider mt-1">
              <MapPin className="w-3 h-3" /> Spartanburg + Charlotte
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-sm font-semibold hover:text-brand-yellow transition-colors">Services</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-semibold hover:text-brand-yellow transition-colors">How It Works</button>
            <div className="flex items-center gap-4">
               <a href="tel:4072345863" className="text-brand-yellow font-bold text-lg hover:underline flex items-center gap-2">
                <Phone className="w-4 h-4" /> (407) 234-5863
               </a>
               <Button onClick={() => scrollToSection('quote-assistant')} variant="primary" className="py-2 px-4 text-sm">
                 Book Now
               </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-b border-gray-800 p-4 flex flex-col gap-4 shadow-2xl">
            <button onClick={() => scrollToSection('services')} className="text-left font-semibold py-2">Services</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-left font-semibold py-2">How It Works</button>
            <a href="tel:4072345863" className="text-brand-yellow font-bold py-2 block">(407) 234-5863</a>
            <Button onClick={() => scrollToSection('quote-assistant')} fullWidth>Book Online</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Hero background with real arrival scene photo */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
          {/* Arrival Scene hero image - positioned right */}
          <div 
            className="absolute inset-0 bg-cover bg-right bg-no-repeat"
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}hero-3.png')` }}
          ></div>
          {/* Golden hour warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-brand-yellow/5 z-10"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="max-w-2xl">
            <div className="inline-block bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
              Reliable Mobile Service
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Help is <br/>
              <span className="text-brand-yellow">on the way.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-xl leading-relaxed">
              Fast home repairs & installs. <br/>
              <span className="text-white font-semibold">Text-first booking</span> with clear, upfront pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollToSection('quote-assistant')} className="text-lg px-8 py-4">
                Book Online
              </Button>
              <a href="sms:4072345863" className="inline-flex items-center justify-center px-8 py-4 border border-white text-white text-lg font-bold rounded-md hover:bg-white hover:text-black transition-all duration-200">
                <Phone className="w-5 h-5 mr-2" /> Text (407) 234-5863
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-sm text-gray-400 font-medium">
               <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Licensed & Insured</div>
               <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Same-Day Quotes</div>
            </div>
          </div>
        </div>
      </header>

      {/* Quote Assistant / CTA Section */}
      <section id="quote-assistant" className="py-20 bg-gray-950 relative border-y border-gray-900">
         <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
               <div className="lg:w-1/2">
                  <h3 className="text-3xl font-bold text-white mb-6">Get a Fast Quote</h3>
                  <div className="space-y-6 text-gray-300">
                    <p className="text-lg">
                      We keep it simple. No long phone calls or waiting windows. Just text us what you need, and we'll get you a price.
                    </p>
                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                      <h4 className="text-brand-yellow font-bold mb-4 uppercase text-sm tracking-wider">What we need to know:</h4>
                      <ul className="space-y-3">
                        {['Exact location (Address or ZIP)', 'What you need done (1-2 sentences)', 'Photos/Video (Helps a lot!)', 'Are materials on-site?'].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="min-w-6 h-6 rounded-full bg-brand-red/20 text-brand-red flex items-center justify-center text-sm font-bold mt-0.5">{i + 1}</div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
               </div>
               <div className="lg:w-1/2 w-full">
                  <QuoteAssistant />
               </div>
            </div>
         </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-brand-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Common Requests</h2>
              <p className="text-gray-400 max-w-xl">
                We specialize in the small-to-medium jobs that big contractors won't touch.
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex">View All Services</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" fullWidth>View All Services</Button>
          </div>
        </div>
      </section>

      {/* How It Works (Instructions) */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">How It Works</h2>
            <div className="h-1 w-20 bg-brand-yellow mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-800 -z-10"></div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-brand-black border-4 border-brand-yellow rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Send Info</h3>
              <p className="text-gray-400">Use our smart form or text us directly with your job details and photos.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-brand-black border-4 border-gray-700 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-gray-300">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get Quote</h3>
              <p className="text-gray-400">We'll review your info and send back a clear, flat-rate price. No hidden fees.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-brand-black border-4 border-gray-700 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-gray-300">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Job Done</h3>
              <p className="text-gray-400">We arrive fully equipped, do the job right, and clean up before we leave.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">HANDYMAN HELP</h2>
              <p className="text-gray-400 max-w-sm mb-6">
                Professional home repairs and installations in Spartanburg and Charlotte. 
                Dedicated to quality workmanship and reliable communication.
              </p>
              <div className="flex items-center gap-4">
                 <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-brand-red transition-colors text-white">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                 </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Service Areas</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Spartanburg, SC</li>
                <li>Charlotte, NC</li>
                <li>Greenville, SC</li>
                <li>Gastonia, NC</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                   <Phone className="w-4 h-4 text-brand-red" /> (407) 234-5863
                </li>
                <li className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-green-500"></span> Available Mon-Sat
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Handyman Help. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;