import React, { useState } from 'react';
import { 
  Users, BedDouble, Bath, Car, MapPin, 
  ChevronLeft, ChevronRight, MessageCircle, Eye, Sparkles, Check
} from 'lucide-react';
import { Property } from '../types';
import { buildPropertyWhatsAppMessage, buildWhatsAppLink } from '../data/brokerInfo';

interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelectProperty }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const whatsappMessage = buildPropertyWhatsAppMessage(property.code, property.title);
  const whatsappUrl = buildWhatsAppLink(whatsappMessage);

  return (
    <div 
      id={`property-card-${property.code.toLowerCase()}`}
      className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all duration-300 shadow-2xl flex flex-col overflow-hidden"
    >
      {/* Image Carousel Container */}
      <div className="relative aspect-4/3 w-full bg-[#070d14] overflow-hidden group/img cursor-pointer" onClick={() => onSelectProperty(property)}>
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500 opacity-90 group-hover/img:opacity-100"
          referrerPolicy="no-referrer"
        />

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-3 py-1 bg-[#0d1b2a]/90 border border-white/20 backdrop-blur-md text-amber-400 text-xs font-bold rounded-xl shadow-lg">
              {property.code}
            </span>
            {property.tag && (
              <span className="px-3 py-1 bg-amber-500/90 border border-amber-400/30 backdrop-blur-md text-slate-950 text-xs font-bold rounded-xl shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-slate-950" />
                {property.tag}
              </span>
            )}
          </div>

          <span className="px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium rounded-xl shadow-lg">
            {property.category}
          </span>
        </div>

        {/* Carousel Navigation Arrows */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 opacity-0 group-hover/img:opacity-100 transition-opacity z-20 cursor-pointer backdrop-blur-md border border-white/20"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 opacity-0 group-hover/img:opacity-100 transition-opacity z-20 cursor-pointer backdrop-blur-md border border-white/20"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
              {property.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Distance to beach badge overlay on bottom left */}
        <div className="absolute bottom-3 left-3 text-slate-200 text-xs font-medium flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/15">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{property.distanceToBeach}</span>
        </div>
      </div>

      {/* Card Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Location & Title */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-400 mb-1">
            {property.neighborhood} • {property.city}
          </p>
          <h2 
            onClick={() => onSelectProperty(property)}
            className="text-lg font-serif font-bold text-white leading-snug line-clamp-2 hover:text-amber-300 cursor-pointer transition-colors"
          >
            {property.title}
          </h2>
          <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
            {property.subtitle}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 my-4 py-3 px-3 bg-white/5 rounded-2xl border border-white/10 text-slate-200 text-xs font-medium backdrop-blur-md">
            <div className="flex flex-col items-center text-center">
              <Users className="w-4 h-4 text-amber-400 mb-1" />
              <span>{property.maxGuests} pes.</span>
            </div>
            <div className="flex flex-col items-center text-center border-l border-white/10">
              <BedDouble className="w-4 h-4 text-amber-400 mb-1" />
              <span>{property.bedrooms} qtos ({property.suites} suít.)</span>
            </div>
            <div className="flex flex-col items-center text-center border-l border-white/10">
              <Bath className="w-4 h-4 text-amber-400 mb-1" />
              <span>{property.bathrooms} banh.</span>
            </div>
            <div className="flex flex-col items-center text-center border-l border-white/10">
              <Car className="w-4 h-4 text-amber-400 mb-1" />
              <span>{property.parkingSpaces} vag.</span>
            </div>
          </div>

          {/* Quick Amenities Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {property.amenities.slice(0, 4).map((amenity, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg"
              >
                <Check className="w-3 h-3 text-amber-400" />
                {amenity}
              </span>
            ))}
            {property.amenities.length > 4 && (
              <span className="text-[11px] font-medium text-slate-400">
                +{property.amenities.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Diárias a partir de</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-serif font-bold text-amber-400">
                  R$ {property.rates.lowSeason.toLocaleString('pt-BR')}
                </span>
                <span className="text-xs text-slate-400 font-normal">/ dia</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Alta Temp.</span>
              <span className="text-xs font-semibold text-slate-200">
                R$ {property.rates.highSeason.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectProperty(property)}
              className="px-3 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase text-[10px] tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Detalhes</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold uppercase text-[10px] tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 text-center backdrop-blur-md"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Consultar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

