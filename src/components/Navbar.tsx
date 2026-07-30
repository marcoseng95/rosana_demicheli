import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, ShieldCheck, Home, Lock } from 'lucide-react';
import { BROKER_INFO, buildGeneralWhatsAppMessage, buildWhatsAppLink } from '../data/brokerInfo';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const whatsappUrl = buildWhatsAppLink(buildGeneralWhatsAppMessage());

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#0d1b2a]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      {/* Top micro-bar with broker CRECI and direct telephone */}
      <div id="top-micro-bar" className="bg-[#070d14]/80 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {BROKER_INFO.creci}
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">Corretora Credenciada de Imóveis por Temporada</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 px-2.5 py-0.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-400/30 rounded-md font-semibold text-[11px] transition-all cursor-pointer"
              title="Acesso exclusivo para alterar ou acrescentar imóveis"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Área da Corretora</span>
            </button>
            <span className="text-slate-700">|</span>
            <a 
              href={`tel:${BROKER_INFO.phone.replace(/\D/g, '')}`} 
              className="hidden sm:flex items-center gap-1 hover:text-amber-400 transition-colors text-slate-300"
            >
              <Phone className="w-3 h-3 text-sky-400" />
              <span>{BROKER_INFO.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Atendimento no WhatsApp</span>
              <span className="md:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div id="nav-container" className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 text-left group cursor-pointer"
          id="brand-logo-btn"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-sky-500/20 border border-white/20 flex items-center justify-center text-amber-400 shadow-lg group-hover:border-amber-400/50 transition-all">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-lg font-serif font-bold text-white tracking-widest uppercase leading-none group-hover:text-amber-400 transition-colors">
              Rosana Demicheli
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-[0.25em] uppercase">
              Imóveis de Temporada
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-widest uppercase text-slate-300">
          <button 
            onClick={() => handleNavClick('imoveis')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Imóveis
          </button>
          <button 
            onClick={() => handleNavClick('sobre')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Sobre Rosana
          </button>
          <button 
            onClick={() => handleNavClick('orcamento')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Orçamento
          </button>
          <button 
            onClick={() => handleNavClick('depoimentos')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Depoimentos
          </button>
          <button 
            onClick={() => handleNavClick('duvidas')}
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Dúvidas
          </button>
        </nav>

        {/* Action Buttons: WhatsApp & Broker Area */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="main-nav-admin-btn"
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase rounded-full shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 cursor-pointer border border-amber-300/50"
            title="Acesso exclusivo para cadastrar, editar e remover hospedagens"
          >
            <Lock className="w-3.5 h-3.5 text-slate-950" />
            <span>Área da Corretora</span>
          </button>

          <a
            id="nav-whatsapp-cta-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider uppercase rounded-full backdrop-blur-md shadow-lg transition-all hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        {/* Mobile Actions & Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-[11px] uppercase rounded-full shadow-md cursor-pointer"
            title="Área da Corretora"
          >
            <Lock className="w-3.5 h-3.5 text-slate-950" />
            <span>Corretora</span>
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-200 hover:bg-white/10 transition-colors border border-white/10"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Tablet Hamburger Toggle */}
        <button
          id="tablet-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="hidden sm:block lg:hidden p-2 rounded-xl text-slate-200 hover:bg-white/10 transition-colors border border-white/10"
          aria-label="Abrir Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden bg-[#0d1b2a]/95 backdrop-blur-2xl border-b border-white/15 px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 font-medium text-slate-200 text-sm">
            <button
              onClick={() => handleNavClick('imoveis')}
              className="text-left py-2 hover:text-amber-400 border-b border-white/10 uppercase tracking-wider text-xs"
            >
              🏡 Imóveis Disponíveis
            </button>
            <button
              onClick={() => handleNavClick('sobre')}
              className="text-left py-2 hover:text-amber-400 border-b border-white/10 uppercase tracking-wider text-xs"
            >
              👩‍💼 Sobre Rosana Demicheli
            </button>
            <button
              onClick={() => handleNavClick('orcamento')}
              className="text-left py-2 hover:text-amber-400 border-b border-white/10 uppercase tracking-wider text-xs"
            >
              📅 Solicitar Orçamento
            </button>
            <button
              onClick={() => handleNavClick('depoimentos')}
              className="text-left py-2 hover:text-amber-400 border-b border-white/10 uppercase tracking-wider text-xs"
            >
              ⭐ Depoimentos
            </button>
            <button
              onClick={() => handleNavClick('duvidas')}
              className="text-left py-2 hover:text-amber-400 border-b border-white/10 uppercase tracking-wider text-xs"
            >
              ❓ Dúvidas & Regras
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-left py-2 text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider text-xs flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>🔐 Área da Corretora (Gestão)</span>
            </button>
          </nav>

          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase rounded-xl shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Falar Diretamente com Rosana</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

