import React from 'react';
import { Home, ShieldCheck, MapPin, Phone, Instagram, MessageCircle, Lock } from 'lucide-react';
import { BROKER_INFO, buildGeneralWhatsAppMessage, buildWhatsAppLink } from '../data/brokerInfo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const whatsappUrl = buildWhatsAppLink(buildGeneralWhatsAppMessage());

  return (
    <footer className="bg-[#070d14] text-slate-300 pt-16 pb-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & CRECI */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shadow-lg">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-lg font-serif font-bold text-white tracking-tight leading-none">
                  Rosana Demicheli
                </span>
                <span className="text-[11px] uppercase tracking-widest text-amber-400 font-medium">
                  Imóveis por Temporada
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Atendimento profissional para locação por temporada de imóveis selecionados. Transparência, contratos seguros e suporte presencial no litoral.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-amber-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{BROKER_INFO.creci}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-widest">Navegação</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-normal">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('imoveis')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Catálogo de Imóveis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sobre')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Sobre Rosana Demicheli
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('orcamento')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Solicitar Orçamento
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('depoimentos')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Depoimentos de Hóspedes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('duvidas')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Perguntas Frequentes
                </button>
              </li>
              {onOpenAdmin && (
                <li className="pt-2">
                  <button 
                    onClick={onOpenAdmin} 
                    className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5 font-bold"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Área Restrita do Corretor</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Covered Regions */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-widest">Regiões Atendidas</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-normal">
              {BROKER_INFO.regions.map((region, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>{region}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-widest">Atendimento Direto</h4>
            <div className="space-y-2.5 text-xs text-slate-300 font-normal">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>{BROKER_INFO.whatsappFormatted} (WhatsApp)</span>
              </a>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{BROKER_INFO.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{BROKER_INFO.instagram}</span>
              </div>

              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{BROKER_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 font-normal">
          <p>© {new Date().getFullYear()} Rosana Demicheli - Corretora de Imóveis por Temporada. Todos os direitos reservados.</p>
          <p className="text-slate-400">Bombinhas, Itapema &amp; Litoral Catarinense</p>
        </div>
      </div>
    </footer>
  );
};

