import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppMessage, buildWhatsAppLink } from '../data/brokerInfo';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = buildWhatsAppLink(buildGeneralWhatsAppMessage());

  return (
    <a
      id="floating-whatsapp-btn"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 bg-emerald-500/90 hover:bg-emerald-400 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-2xl shadow-emerald-500/30 border border-emerald-400/40 backdrop-blur-xl hover:scale-105 active:scale-95 transition-all group cursor-pointer"
      aria-label="Atendimento via WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 fill-white/20" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full" />
      </div>
      <span className="hidden sm:inline font-bold">Alugue no WhatsApp</span>
    </a>
  );
};

