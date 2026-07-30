import React, { useState } from 'react';
import { 
  X, ChevronLeft, ChevronRight, MessageCircle, MapPin, Users, BedDouble, 
  Bath, Car, Maximize2, DollarSign, AlertCircle, Sparkles, Check, Calendar
} from 'lucide-react';
import { Property } from '../types';
import { buildPropertyWhatsAppMessage, buildWhatsAppLink } from '../data/brokerInfo';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onInquiryForProperty: (propertyCode: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ 
  property, 
  onClose,
  onInquiryForProperty
}) => {
  if (!property) return null;

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [fullscreenPhoto, setFullscreenPhoto] = useState<string | null>(null);

  const whatsappMessage = buildPropertyWhatsAppMessage(property.code, property.title);
  const whatsappUrl = buildWhatsAppLink(whatsappMessage);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#070d14]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-5xl bg-[#0d1b2a]/95 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-white/20 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-[#0d1b2a]/95 backdrop-blur-xl px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md">
              {property.code}
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white line-clamp-1">
                {property.title}
              </h3>
              <p className="text-xs text-slate-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {property.neighborhood}, {property.city} ({property.distanceToBeach})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer border border-white/10"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          {/* Main Active Photo & Thumbnails Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-16/9 w-full bg-[#070d14] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src={property.images[activePhotoIndex]}
                alt={`${property.title} - Foto ${activePhotoIndex + 1}`}
                className="w-full h-full object-cover object-center cursor-zoom-in"
                onClick={() => setFullscreenPhoto(property.images[activePhotoIndex])}
                referrerPolicy="no-referrer"
              />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActivePhotoIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer backdrop-blur-md border border-white/20"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActivePhotoIndex((prev) => (prev + 1) % property.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer backdrop-blur-md border border-white/20"
                    aria-label="Próxima"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 bg-black/70 text-slate-200 text-xs px-3 py-1 rounded-xl backdrop-blur-md font-medium border border-white/15">
                {activePhotoIndex + 1} de {property.images.length} fotos
              </div>
            </div>

            {/* Thumbnail selector strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activePhotoIndex === idx ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-slate-200 text-xs font-semibold">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-normal">Capacidade</span>
                <span>Até {property.maxGuests} pes.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                <BedDouble className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-normal">Quartos</span>
                <span>{property.bedrooms} ({property.suites} suítes)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                <Bath className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-normal">Banheiros</span>
                <span>{property.bathrooms} banheiros</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-normal">Garagem</span>
                <span>{property.parkingSpaces} vagas</span>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-normal">Área Útil</span>
                <span>{property.areaM2} m²</span>
              </div>
            </div>
          </div>

          {/* Description & Rates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Description, Beds & Amenities */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-lg font-serif font-bold text-white mb-2">Descrição do Imóvel</h4>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-normal">
                  {property.description}
                </p>
              </div>

              {/* Bed Arrangements */}
              {property.beds && property.beds.length > 0 && (
                <div>
                  <h4 className="text-lg font-serif font-bold text-white mb-3 flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-amber-400" />
                    <span>Disposição das Camas</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {property.beds.map((bed, idx) => (
                      <div key={idx} className="p-3 bg-white/5 rounded-2xl border border-white/10 text-xs">
                        <span className="font-bold text-amber-400 block">{bed.type}</span>
                        <span className="text-slate-300">{bed.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              <div>
                <h4 className="text-lg font-serif font-bold text-white mb-3">Comodidades &amp; Equipamentos</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-200 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              <div>
                <h4 className="text-lg font-serif font-bold text-white mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  <span>Regras da Casa</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {property.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Pricing Table & Booking Widget */}
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/15 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl space-y-5">
                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <span>Tabela de Diárias</span>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-white">Valores por Período</h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span className="text-slate-300">Baixa Temporada (Abr-Nov)</span>
                    <span className="font-serif font-bold text-amber-400 text-sm">R$ {property.rates.lowSeason.toLocaleString('pt-BR')}/dia</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span className="text-slate-300">Média Temporada (Dez/Mar)</span>
                    <span className="font-serif font-bold text-amber-400 text-sm">R$ {property.rates.midSeason.toLocaleString('pt-BR')}/dia</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span className="text-slate-300">Alta Temporada (Jan/Fev)</span>
                    <span className="font-serif font-bold text-amber-400 text-sm">R$ {property.rates.highSeason.toLocaleString('pt-BR')}/dia</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span className="text-slate-300">Pacote Réveillon / Natal</span>
                    <span className="font-serif font-bold text-amber-400 text-sm">R$ {property.rates.reveillon.toLocaleString('pt-BR')}/dia</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 text-slate-400">
                    <span>Taxa Única de Limpeza:</span>
                    <span className="font-semibold text-slate-200">R$ {property.rates.cleaningFee.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-xl shadow-amber-500/20 text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Reservar no WhatsApp ({property.code})</span>
                  </a>

                  <button
                    onClick={() => {
                      onClose();
                      onInquiryForProperty(property.code);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer backdrop-blur-md"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Solicitar Orçamento</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {fullscreenPhoto && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-xl"
          onClick={() => setFullscreenPhoto(null)}
        >
          <button
            onClick={() => setFullscreenPhoto(null)}
            className="absolute top-4 right-4 p-3 text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullscreenPhoto}
            alt="Foto Ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};

