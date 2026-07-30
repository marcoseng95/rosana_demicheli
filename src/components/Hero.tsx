import React from 'react';
import { MessageCircle, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { BROKER_INFO, buildGeneralWhatsAppMessage, buildWhatsAppLink } from '../data/brokerInfo';
import heroBannerImg from '../assets/images/rosana_hero_banner_1785346318218.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onInquiryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onInquiryClick }) => {
  const whatsappUrl = buildWhatsAppLink(buildGeneralWhatsAppMessage());

  return (
    <section id="hero" className="relative bg-[#0d1b2a] text-white overflow-hidden py-12 lg:py-20">
      {/* Background image with frosted overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBannerImg}
          alt="Imóveis por Temporada Rosana Demicheli"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/90 via-[#0d1b2a]/70 to-[#0d1b2a]" />
        
        {/* Glow Ambient Orbs for Frosted Depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Aluguel por Temporada • Atendimento Exclusivo</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            Seu refúgio perfeito para as <span className="text-amber-400 italic">férias inesquecíveis</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            Seleção exclusiva de casas, coberturas e apartamentos pé na areia com toda a segurança, conforto e atendimento direto com a corretora credenciada <strong className="text-white font-semibold">Rosana Demicheli</strong>.
          </p>

          {/* Highlight badges in frosted glass */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-200 font-medium">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Contratos Seguros</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Imóveis Verificados</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Check-in Presencial</span>
            </div>
          </div>

          {/* Main Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              id="hero-explore-properties-btn"
              onClick={onExploreClick}
              className="px-7 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase text-xs tracking-widest rounded-full shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 text-center cursor-pointer"
            >
              Ver Catálogo de Imóveis
            </button>

            <a
              id="hero-whatsapp-direct-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold uppercase text-xs tracking-widest rounded-full backdrop-blur-md shadow-xl transition-all transform hover:-translate-y-0.5 text-center"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span>Consultar Disponibilidade</span>
            </a>
          </div>

          {/* Quick Notice Banner */}
          <div className="mt-8 p-6 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Procurando por praia ou data específica de temporada?
                </p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Sem a complicação de filtros genéricos, Rosana realiza a seleção sob medida para o perfil da sua família!
                </p>
              </div>
            </div>

            <button
              onClick={onInquiryClick}
              className="w-full md:w-auto px-5 py-3 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all whitespace-nowrap cursor-pointer text-center backdrop-blur-md"
            >
              Atendimento Personalizado
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

