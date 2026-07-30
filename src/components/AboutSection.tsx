import React from 'react';
import { ShieldCheck, Award, MapPin, Phone, Instagram, MessageCircle } from 'lucide-react';
import { BROKER_INFO, buildGeneralWhatsAppMessage, buildWhatsAppLink } from '../data/brokerInfo';
import brokerProfileImg from '../assets/images/rosana_profile_broker_1785346335994.jpg';

export const AboutSection: React.FC = () => {
  const whatsappUrl = buildWhatsAppLink(buildGeneralWhatsAppMessage());

  return (
    <section id="sobre" className="py-16 sm:py-24 bg-[#0d1b2a] border-t border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Profile Image & Badge Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 to-blue-500/20 rounded-3xl blur-2xl pointer-events-none" />
              
              <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-[#070d14]">
                <img
                  src={brokerProfileImg}
                  alt={BROKER_INFO.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* CRECI Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0d1b2a]/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-sm font-serif font-bold text-white">{BROKER_INFO.name}</span>
                    <span className="text-xs text-amber-400 font-semibold">{BROKER_INFO.creci}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biography Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Corretora Credenciada</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Rosana Demicheli <br />
              <span className="text-amber-400 italic">Imóveis por Temporada</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed font-normal">
              {BROKER_INFO.bio}
            </p>

            {/* Highlights 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {BROKER_INFO.highlights.map((item, idx) => (
                <div key={idx} className="p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact details bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Bombinhas, Itapema &amp; Litoral</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{BROKER_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-amber-400" />
                <span>{BROKER_INFO.instagram}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-xl shadow-amber-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar com Rosana Demicheli</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

