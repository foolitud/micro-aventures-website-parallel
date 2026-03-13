/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Mail, Phone, Info, Zap, Shield, Globe, ArrowRight, X, ChevronDown } from 'lucide-react';
import { adventures } from './data/adventures';
import { Adventure } from './types';

const DNA_TAGS = [
  { icon: Globe, label: "Expérience Grandeur Nature" },
  { icon: Zap, label: "Native No-App (WhatsApp/SMS)" },
  { icon: Shield, label: "Conséquences Réelles" }
];

const COUNTRY_CODES = [
  { code: '+33', flag: '🇫🇷', label: 'France' },
  { code: '+32', flag: '🇧🇪', label: 'Belgique' },
  { code: '+41', flag: '🇨🇭', label: 'Suisse' },
  { code: '+44', flag: '🇬🇧', label: 'UK' },
  { code: '+1', flag: '🇺🇸', label: 'USA' },
  { code: '+352', flag: '🇱🇺', label: 'Luxembourg' },
];

const ParallelLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 807 262" className={className} fill="currentColor">
    <defs>
      <clipPath id="logo-clip"><path d="m0 0h807v262h-807z" /></clipPath>
    </defs>
    <g clipPath="url(#logo-clip)" transform="translate(1, 0)">
      <path d="m55.734375-70.765625-12.421875 70.765625h-40.421875l34.90625-200.84375 70.359375.125c21.695312 0 38.753906 6.027344 51.171875 18.078125 12.414063 12.042969 17.84375 27.765625 16.28125 47.171875-1.46875 19.6875-9.679687 35.417969-24.625 47.1875-14.949219 11.773438-34.011719 17.65625-57.1875 17.65625zm5.65625-33.515625 33.65625.265625c10.851563 0 19.863281-2.800781 27.03125-8.40625 7.175781-5.613281 11.453125-13.203125 12.828125-22.765625 1.382812-9.5625-.15625-17.191406-4.625-22.890625-4.460938-5.707031-11.054688-8.742187-19.78125-9.109375l-38.078125-.140625zm0 0" transform="translate(1.122238 234.802717)" />
      <path d="m86.765625 0c-1.199219-3.769531-1.703125-8.273438-1.515625-13.515625-11.21875 11.21875-23.914062 16.644531-38.078125 16.28125-13.054687-.1875-23.882813-4.441406-32.484375-12.765625-8.59375-8.320312-12.617188-18.597656-12.0625-30.828125.644531-16.28125 7.472656-28.765625 20.484375-37.453125 13.007813-8.695312 30.457031-13.046875 52.34375-13.046875l18.21875.28125 1.921875-8.96875c.550781-3.03125.691406-5.925781.421875-8.6875-.460937-4.320313-2.09375-7.703125-4.90625-10.140625-2.804687-2.4375-6.5-3.703125-11.09375-3.796875-6.074219-.175781-11.226563 1.324219-15.453125 4.5-4.230469 3.167969-6.945312 7.742187-8.140625 13.71875l-39.046875.140625c.644531-14.257812 7.195312-25.828125 19.65625-34.703125 12.46875-8.875 27.851562-13.21875 46.15625-13.03125 16.914062.367187 30.15625 5.402344 39.71875 15.109375 9.5625 9.699219 13.5625 22.183594 12 37.453125l-11.4375 71.453125-.703125 8.828125c-.179687 6.53125.609375 12.046875 2.359375 16.546875l-.140625 2.625zm-29.9375-27.453125c11.21875.367187 21.015625-4.507813 29.390625-14.625l4.828125-25.796875-13.515625-.140625c-14.355469.375-24.703125 4.746094-31.046875 13.109375-2.292969 3.042969-3.714844 6.765625-4.265625 11.171875-.742188 4.96875.289062 8.902344 3.09375 11.796875 2.800781 2.898438 6.640625 4.390625 11.515625 4.484375zm0 0" transform="translate(157.349045 234.802717)" />
      <path d="m102.625-111.875c-5.335938-.914062-9.699219-1.375-13.09375-1.375-13.886719-.375-24.875 4.820312-32.96875 15.578125l-17.25 97.671875h-38.90625l25.9375-149.265625 36.5625-.125-3.59375 18.203125c9.382812-14.070312 20.972656-21.109375 34.765625-21.109375 3.863281 0 8.367187.648437 13.515625 1.9375zm0 0" transform="translate(285.297384 234.802717)" />
      <path d="m86.765625 0c-1.199219-3.769531-1.703125-8.273438-1.515625-13.515625-11.21875 11.21875-23.914062 16.644531-38.078125 16.28125-13.054687-.1875-23.882813-4.441406-32.484375-12.765625-8.59375-8.320312-12.617188-18.597656-12.0625-30.828125.644531-16.28125 7.472656-28.765625 20.484375-37.453125 13.007813-8.695312 30.457031-13.046875 52.34375-13.046875l18.21875.28125 1.921875-8.96875c.550781-3.03125.691406-5.925781.421875-8.6875-.460937-4.320313-2.09375-7.703125-4.90625-10.140625-2.804687-2.4375-6.5-3.703125-11.09375-3.796875-6.074219-.175781-11.226563 1.324219-15.453125 4.5-4.230469 3.167969-6.945312 7.742187-8.140625 13.71875l-39.046875.140625c.644531-14.257812 7.195312-25.828125 19.65625-34.703125 12.46875-8.875 27.851562-13.21875 46.15625-13.03125 16.914062.367187 30.15625 5.402344 39.71875 15.109375 9.5625 9.699219 13.5625 22.183594 12 37.453125l-11.4375 71.453125-.703125 8.828125c-.179687 6.53125.609375 12.046875 2.359375 16.546875l-.140625 2.625zm-29.9375-27.453125c11.21875.367187 21.015625-4.507813 29.390625-14.625l4.828125-25.796875-13.515625-.140625c-14.355469.375-24.703125 4.746094-31.046875 13.109375-2.292969 3.042969-3.714844 6.765625-4.265625 11.171875-.742188 4.96875.289062 8.902344 3.09375 11.796875 2.800781 2.898438 6.640625 4.390625 11.515625 4.484375zm0 0" transform="translate(362.206557 234.802717)" />
      <path d="m41.515625 0h-39.171875l36.828125-211.890625h39.046875zm0 0" transform="translate(490.154896 234.802717)" />
      <path d="m41.515625 0h-39.171875l36.828125-211.890625h39.046875zm0 0" transform="translate(543.889496 234.802717)" />
      <path d="m71.3125 2.765625c-13.054688-.09375-24.617188-3.289063-34.6875-9.59375-10.074219-6.300781-17.59375-14.945313-22.5625-25.9375-4.960938-10.988281-6.886719-23.101563-5.78125-36.34375l.40625-5.515625c1.382812-14.53125 5.613281-27.863281 12.6875-40 7.082031-12.144531 16.1875-21.503906 27.3125-28.078125 11.132812-6.570313 23.460938-9.675781 36.984375-9.3125 19.21875.367187 33.769531 7.421875 43.65625 21.171875 9.882813 13.75 13.628906 31.15625 11.234375 52.21875l-2.203125 16.96875h-91.453125c-.375 9.65625 1.96875 17.382812 7.03125 23.171875 5.0625 5.792969 11.957031 8.78125 20.6875 8.96875 14.164062.367187 26.582031-5.109375 37.25-16.421875l17.796875 22.078125c-5.617187 8.460937-13.710937 15.058594-24.28125 19.796875-10.574219 4.726562-21.933594 7.003906-34.078125 6.828125zm12.421875-122.640625c-7.179687-.1875-13.546875 2.070312-19.109375 6.765625-5.5625 4.6875-10.554688 12.824219-14.96875 24.40625h53.53125l.828125-3.578125c.550781-3.675781.597656-7.171875.140625-10.484375-.929688-5.332031-3.183594-9.492187-6.765625-12.484375-3.585937-2.988281-8.136719-4.53125-13.65625-4.625zm0 0" transform="translate(597.624096 234.802717)" />
      <path d="m41.515625 0h-39.171875l36.828125-211.890625h39.046875zm0 0" transform="translate(726.81396 234.802717)" />
    </g>
  </svg>
);

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  adventure?: Adventure;
}

const ContactModal = ({ isOpen, onClose, adventure }: ContactModalProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({ email: '', phone: '', countryCode: '+33' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.phone) {
      setStep('success');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-10 w-full max-w-lg bg-brand-primary border border-brand-accent/20 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-brand-accent/40 hover:text-brand-accent transition-colors p-2"
        >
          <X size={24} />
        </button>

        <AnimatePresence mode="wait">
          {step === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-accent/10 mb-6 border border-brand-accent/20">
                   <Zap size={28} className="text-brand-accent animate-pulse" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter mb-3 leading-none">Prêt à jouer ?</h3>
                <p className="text-brand-accent/60 font-medium max-w-xs mx-auto">
                   Inscrivez-vous pour lancer <span className="text-brand-accent">{adventure?.title}</span>.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent/40 ml-4">Numéro de téléphone</label>
                  <div className="flex gap-2">
                    {/* Country Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="h-14 bg-brand-bg/50 border border-brand-accent/10 rounded-xl px-4 flex items-center gap-2 hover:border-brand-accent/30 transition-colors"
                      >
                        <span className="text-lg">{COUNTRY_CODES.find(c => c.code === formData.countryCode)?.flag}</span>
                        <span className="font-bold text-white text-sm">{formData.countryCode}</span>
                        <ChevronDown size={14} className={`text-brand-accent/40 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full mt-2 left-0 w-48 bg-brand-primary border border-brand-accent/20 rounded-xl shadow-2xl overflow-hidden py-2 z-50 backdrop-blur-xl"
                          >
                            {COUNTRY_CODES.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, countryCode: country.code });
                                  setIsDropdownOpen(false);
                                }}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-brand-accent/10 transition-colors text-left"
                              >
                                <span>{country.flag}</span>
                                <span className="font-bold text-white text-sm flex-1">{country.label}</span>
                                <span className="text-brand-accent/40 text-[10px] font-black">{country.code}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <input 
                      type="tel" 
                      required
                      placeholder="6 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 bg-brand-bg/50 border border-brand-accent/10 rounded-xl px-5 py-4 focus:border-brand-accent/50 focus:outline-none transition-colors font-bold text-white placeholder:text-brand-accent/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent/40 ml-4">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="nom@exemple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-brand-bg/50 border border-brand-accent/10 rounded-xl px-5 py-4 focus:border-brand-accent/50 focus:outline-none transition-colors font-bold text-white placeholder:text-brand-accent/20"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-brand-accent text-brand-primary py-5 rounded-xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 shadow-[0_0_30px_rgba(222,233,237,0.2)]"
                >
                  LANCER L'AVENTURE
                  <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 text-center py-8"
            >
              <div className="h-20 w-20 bg-brand-accent text-brand-primary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(222,233,237,0.4)]">
                <Play size={40} className="fill-current ml-2" />
              </div>
              <div>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-2">C'est parti !</h3>
                <p className="text-brand-accent/80 font-bold text-lg leading-tight px-4">
                  Vérifiez vos messages. L'aventure vous attend sur <span className="text-white underline">{adventure?.contactLabel}</span>.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="mt-4 px-10 py-4 bg-white/5 border border-brand-accent/20 rounded-xl text-brand-accent font-black uppercase tracking-widest hover:bg-white/10 transition-all text-sm"
              >
                C'est compris
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const ConceptModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-brand-primary border border-brand-accent/20 rounded-3xl md:rounded-[2.5rem] p-6 md:p-14 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-y-auto scrollbar-hide"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-brand-accent/40 hover:text-brand-accent transition-colors p-2 z-20 bg-brand-primary/80 rounded-full backdrop-blur-sm"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col gap-6 md:gap-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-brand-accent text-brand-primary shadow-[0_0_30px_rgba(222,233,237,0.3)] shrink-0">
            <ParallelLogo className="h-5 md:h-6" />
          </div>

          <div>
            <h3 className="text-2xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
              Découvrez les micro-aventures Parallel
            </h3>
            <p className="text-lg md:text-2xl text-brand-accent/80 font-bold leading-tight mb-6 md:mb-8">
              Un avant-goût pour vous initier au concept avant de plonger dans nos aventures de plusieurs jours.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-4 items-start p-5 md:p-6 bg-brand-accent/5 rounded-2xl border border-brand-accent/10">
                <div className="mt-1 text-brand-accent shrink-0">
                  <Zap size={20} md:size={24} />
                </div>
                <p className="text-base md:text-lg font-medium text-brand-accent/90 leading-snug">
                  Pas de boîtes de jeux, pas de CD, vous jouez via vos outils de communication habituels, en parallèle de votre vie.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {DNA_TAGS.map((tag) => (
                  <div key={tag.label} className="flex flex-row md:flex-col items-center text-center md:text-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                    <tag.icon size={18} className="text-brand-accent/60 shrink-0" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-accent/40 leading-tight">
                      {tag.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-5 bg-brand-accent text-brand-primary rounded-xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(222,233,237,0.2)]"
          >
            C'EST COMPRIS
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const AdventureSection = ({ adventure, onPlay }: { adventure: Adventure, onPlay: (a: Adventure) => void, key?: string }) => {
  return (
    <section className="snap-section relative flex items-center justify-center p-3 md:p-8">
      {/* Immersive Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src={adventure.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 scale-105 blur-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent to-brand-bg" />
        <div className="absolute inset-0 bg-brand-bg/60" />
      </div>

      {/* Main Immersive Modal */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl bg-brand-primary/30 backdrop-blur-3xl border border-brand-accent/10 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.6)] flex flex-col md:flex-row min-h-[85vh] md:min-h-[75vh]"
      >
        {/* Left Side: Visuals */}
        <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden border-b md:border-b-0 md:border-r border-brand-accent/10 min-h-[250px] md:min-h-0">
          <video
            src={adventure.videoUrl}
            poster={adventure.imageUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-brand-accent text-brand-primary text-[10px] font-black rounded-full uppercase tracking-widest">
                AVENTURE
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold border border-white/20 uppercase tracking-widest">
                {adventure.players}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-6 md:p-14 flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-[0.85] tracking-tighter uppercase italic">
              {adventure.title}
            </h2>
            <p className="text-base md:text-xl text-brand-accent/80 leading-tight font-medium max-w-xl mx-auto md:mx-0">
              {adventure.description}
            </p>
          </div>

          {/* DNA Items */}
          <div className="grid grid-cols-1 gap-2 md:gap-3 mb-6 md:mb-10 max-w-xs mx-auto md:mx-0">
            {DNA_TAGS.map((tag) => (
              <div 
                key={tag.label}
                className="flex items-center gap-4 text-brand-accent/70 hover:text-brand-accent transition-colors cursor-default group"
              >
                <div className="w-9 h-9 rounded-full bg-brand-accent/5 flex items-center justify-center group-hover:bg-brand-accent/20 transition-all border border-brand-accent/10">
                  <tag.icon size={18} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tag.label}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => onPlay(adventure)}
              className="group flex items-center gap-3 md:gap-4 bg-brand-accent text-brand-primary px-8 md:px-10 py-4 md:py-5 rounded-xl font-black text-lg md:text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(222,233,237,0.3)] hover:shadow-[0_0_50px_rgba(222,233,237,0.5)]"
            >
              <Play size={28} className="fill-current" />
              LANCER L'AVENTURE
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default function App() {
  const [modal, setModal] = useState<{ isOpen: boolean; type: 'contact' | 'concept'; adventure?: Adventure }>({
    isOpen: false,
    type: 'contact'
  });

  return (
    <div className="snap-container bg-brand-bg text-brand-accent selection:bg-brand-accent/30 font-sans h-screen overflow-hidden">
      {/* Branding Logo & Info Trigger */}
      <div className="fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-50 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 group cursor-pointer transition-all hover:brightness-110 active:scale-95 pointer-events-auto">
          <ParallelLogo className="h-6 md:h-10 text-white" />
        </div>
        
        <button 
          onClick={() => setModal({ isOpen: true, type: 'concept' })}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-brand-accent/20 bg-brand-primary/40 backdrop-blur-xl flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary transition-all text-brand-accent/60 shadow-xl group pointer-events-auto"
        >
          <Info size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-center gap-4 opacity-40 pointer-events-none">
        <div className="w-1 h-3 bg-brand-accent rounded-full animate-bounce" />
        <span className="text-[8px] font-black uppercase tracking-[0.4em] rotate-90 origin-center whitespace-nowrap mt-4">SCROLL</span>
      </div>

      {/* Adventures List */}
      <div className="relative h-full">
        {adventures.map((adventure) => (
          <AdventureSection 
            key={adventure.id} 
            adventure={adventure} 
            onPlay={(a) => setModal({ isOpen: true, type: 'contact', adventure: a })}
          />
        ))}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modal.isOpen && modal.type === 'contact' && (
          <ContactModal 
            isOpen={modal.isOpen} 
            onClose={() => setModal({ ...modal, isOpen: false })} 
            adventure={modal.adventure}
          />
        )}
        {modal.isOpen && modal.type === 'concept' && (
          <ConceptModal 
            isOpen={modal.isOpen} 
            onClose={() => setModal({ ...modal, isOpen: false })} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
