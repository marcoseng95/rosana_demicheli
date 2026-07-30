import React from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { Home, Sparkles, MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppMessage, buildWhatsAppLink } from '../data/brokerInfo';

interface PropertyGridProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onInquiryClick: () => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ 
  properties, 
  onSelectProperty,
  onInquiryClick
}) => {
  const whatsappUrl = buildWhatsAppLink(buildGeneralWhatsAppMessage());

  return (
    <section id="imoveis" className="py-16 sm:py-24 bg-[#0d1b2a] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span>Catálogo por Temporada</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Imóveis Selecionados para Suas Férias
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Conheça abaixo nossas casas, coberturas e apartamentos para locação de temporada. Clique em qualquer imóvel para ver a galeria completa de fotos e diárias por período.
          </p>
        </div>

        {/* Property Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelectProperty={onSelectProperty}
            />
          ))}
        </div>

        {/* Bottom Custom Date Consultation Banner */}
        <div className="mt-20 bg-white/5 border border-white/15 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Atendimento Exclusivo</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Não encontrou o período ou imóvel desejado?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Fale diretamente com Rosana Demicheli no WhatsApp. Recebemos novas opções para temporada frequentemente e oferecemos a indicação perfeita para sua família.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onInquiryClick}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-all text-center cursor-pointer whitespace-nowrap backdrop-blur-md"
            >
              Formulário de Datas
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-full transition-all text-center inline-flex items-center justify-center gap-2 whitespace-nowrap shadow-xl shadow-amber-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

