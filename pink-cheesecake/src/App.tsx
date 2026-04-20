import { useState } from 'react';
import { motion } from 'motion/react';
import { db } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import strawberryCheesecakeImg from './download-1.jpg';
import { 
  Instagram, 
  Facebook, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Truck, 
  PackageSearch, 
  Printer, 
  UserPlus, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  CakeSlice,
  Info
} from 'lucide-react';

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#FDF2F8"/> 
    <path d="M25 60 Q 50 80 75 60 L 75 80 Q 50 95 25 80 Z" fill="#FBCFE8"/> 
    <path d="M20 50 Q 50 15 80 50 Q 50 75 20 50 Z" fill="#F472B6"/> 
    <circle cx="50" cy="35" r="8" fill="#E879F9"/> 
    <path d="M30 45 Q 40 55 50 45 Q 60 55 70 45" stroke="#FDF2F8" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const NavLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About Us', id: 'about' },
  { name: 'Services', id: 'services' },
  { name: 'Best Sellers', id: 'best-sellers' },
  { name: 'Contact Us', id: 'contact' }
];

const features = [
  { icon: Clock, title: '24/7 Open', desc: 'Round-the-clock pickup, ready for all your baking needs' },
  { icon: Truck, title: 'Doorstep Delivery', desc: 'Fast courier delivery across St. Petersburg and Leningrad Region' },
  { icon: PackageSearch, title: 'Equipment Rental', desc: 'Professional baking molds and tools available for rent' },
  { icon: Printer, title: 'Photo Printing', desc: 'Beautiful digital dessert printing to make your creations unique' },
  { icon: UserPlus, title: 'Consultation', desc: 'One-on-one customized solutions from senior bakers' },
];

const offers = [
  { title: "Free Delivery Over 5000₽", desc: "Enjoy free 24-hour delivery on orders over 5000 rubles", bg: "bg-pink-100", text: "text-pink-800" },
  { title: "Express City Delivery", desc: "24-hour express courier service supported in St. Petersburg and the region", bg: "bg-teal-100", text: "text-teal-800" },
  { title: "24/7 Ordering", desc: "Professional customer service and order processing system, open all year round", bg: "bg-amber-100", text: "text-amber-800" }
];

const bestSellers = [
  { name: "Classic Strawberry Cheesecake", price: "2,500 ₽", img: strawberryCheesecakeImg },
  { name: "Macaron French Gift Box", price: "1,800 ₽", img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=400&auto=format&fit=crop" },
  { name: "Berry Charlotte", price: "3,200 ₽", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=400&auto=format&fit=crop" },
  { name: "Dark Chocolate Lava Tart", price: "2,100 ₽", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop" }
];

export default function App() {
  const [formData, setFormData] = useState({ name: '', contact: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setSubmitStatus('loading');
    
    try {
      const requestId = crypto.randomUUID();
      const docRef = doc(db, 'contact_requests', requestId);
      await setDoc(docRef, {
        name: formData.name,
        contact: formData.contact,
        createdAt: serverTimestamp()
      });
      setSubmitStatus('success');
      setFormData({ name: '', contact: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <div className="font-sans text-slate-800 bg-stone-50 min-h-screen selection:bg-pink-200" id="home">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <Logo className="w-12 h-12" />
              <span className="font-bold text-2xl tracking-tight text-pink-600">Pink Cake</span>
            </div>
            
            <nav className="hidden md:flex gap-8">
              {NavLinks.map(link => (
                <a key={link.id} href={`#${link.id}`} className="text-sm font-medium text-slate-600 hover:text-pink-500 transition-colors">
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-pink-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-pink-500 transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden" id="about">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-200/50 rounded-full blur-3xl" />
          <div className="absolute top-48 -left-24 w-72 h-72 bg-teal-200/40 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-medium text-sm mb-6">
                <CakeSlice className="w-4 h-4" />
                <span>15 Years of Baking Experience</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Late-night baking troubles?<br/>
                <span className="text-pink-500">Pink Cake</span> is always here.
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                We deeply understand sudden situations like running out of ingredients, broken molds, or spilled batter. How do bakers buy ingredients in the middle of the night? Look no further! We provide you with round-the-clock baking support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition-colors shadow-lg shadow-pink-200">
                  Contact Now
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a href="#services" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                  Learn More
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl rotate-3 relative">
                <img 
                  src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop" 
                  alt="Delicious pink cake"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 -rotate-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">100% Quality Guaranteed</p>
                  <p className="text-sm text-slate-500">Fresh Ingredients, Fast Delivery</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Baking Support</h2>
            <p className="text-slate-500">No more worrying about equipment and ingredients, we safeguard your creative baking.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:shadow-xl hover:shadow-pink-100/50 transition-all group"
              >
                <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {offers.map((offer, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className={`${offer.bg} p-8 rounded-3xl relative overflow-hidden`}
              >
                <div className={`relative z-10 ${offer.text}`}>
                  <h3 className="text-2xl font-black mb-2">{offer.title}</h3>
                  <p className="opacity-80 font-medium">{offer.desc}</p>
                </div>
                {/* Decorative blob */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-white" id="best-sellers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Best Sellers</h2>
              <p className="text-slate-500">Freshly baked daily, St. Petersburg's most popular choice</p>
            </div>
            <a href="#" className="hidden sm:flex text-pink-500 font-medium items-center hover:text-pink-600 gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-4 relative bg-stone-100">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-slate-800 shadow-sm">
                    {item.price}
                  </div>
                </div>
                <h3 className="text-lg font-bold group-hover:text-pink-500 transition-colors">{item.name}</h3>
                <p className="text-sm text-slate-400 mt-1">In Stock / Pre-order Delivery</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section className="py-24 bg-pink-50" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Form */}
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-pink-100/50">
              <h2 className="text-3xl font-bold mb-2">Get Your Baking Solution</h2>
              <p className="text-slate-500 mb-8">Fill out the form and our experienced baking consultants will contact you shortly.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name / Company</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Ivan / Sweet Bakery"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone or Email</label>
                  <input 
                    type="text" 
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    placeholder="+7 (___) ___-__-__ or email@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
                
                <button 
                  disabled={submitStatus === 'loading'}
                  type="submit" 
                  className="w-full py-4 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'loading' ? 'Submitting...' : 'Send Request'}
                </button>

                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-teal-600 bg-teal-50 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">Thank you for your submission! We will contact you shortly.</p>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
                    <Info className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">Sorry, submission failed. Please try again later or call us.</p>
                  </motion.div>
                )}
              </form>
            </div>

            {/* Contacts & Map */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-8">Contact Us</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-500 shadow-sm flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">24/7 Hotline</p>
                      <a href="tel:+78121112233" className="text-xl font-bold hover:text-pink-500 transition-colors">+7 (812) 111-22-33</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-500 shadow-sm flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Business & Collaboration</p>
                      <a href="mailto:info@pinkcake.ru" className="text-lg font-bold hover:text-pink-500 transition-colors">info@pinkcake.ru</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-500 shadow-sm flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Office Address</p>
                      <p className="text-lg font-bold">Russia, 191186, St. Petersburg<br/>Bolshaya Morskaya St, 18</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 aspect-[4/3] w-full rounded-3xl overflow-hidden bg-slate-200 shadow-lg border-4 border-white translate-x-4">
                {/* Embed Map Placeholder */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.718617637841!2d30.312953215570087!3d59.93665268187807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696310f8ed849f1%3A0x6b8bcbeb4f331f!2sBolshaya%20Morskaya%20Ulitsa%2C%2018%2C%20Sankt-Peterburg%2C%20Russia%2C%20191186!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pink Cake Office Location"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                <Logo className="w-10 h-10" />
                <span className="font-bold text-2xl text-white">Pink Cake</span>
              </div>
              <p className="text-sm text-slate-400 text-center md:text-left max-w-xs">
                St. Petersburg's premier dessert delivery and baking support service for 15 years. Accompanying your sweet creations 24/7.
              </p>
            </div>
            
            <div className="flex justify-center gap-8">
              <a href="#about" className="hover:text-pink-400 transition-colors">About Us</a>
              <a href="#services" className="hover:text-pink-400 transition-colors">Services</a>
              <a href="#best-sellers" className="hover:text-pink-400 transition-colors">Best Sellers</a>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 text-sm">
              <p>info@pinkcake.ru</p>
              <p>+7 (812) 111-22-33</p>
              <p>Bolshaya Morskaya St, 18, St. Petersburg</p>
              <div className="flex gap-4 mt-4">
                <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-400" />
                <Facebook className="w-5 h-5 cursor-pointer hover:text-pink-400" />
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Pink Cheesecake. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
