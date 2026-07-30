import React from 'react';
import { Star, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data/brokerInfo';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="depoimentos" className="py-16 sm:py-24 bg-[#0d1b2a] border-t border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
            <span>Depoimentos Reais</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Quem Já Alugou Recomenda
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-normal">
            A experiência de famílias que escolheram nossos imóveis para viver momentos inesquecíveis.
          </p>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between space-y-6 hover:border-amber-400/30 transition-all"
            >
              <div className="space-y-4">
                {/* 5-star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-200 text-sm italic leading-relaxed font-normal">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="font-serif font-bold text-white block text-sm">{item.name}</span>
                  <span className="text-slate-400">{item.city}</span>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-400 font-bold rounded-lg text-[10px] uppercase tracking-wider">
                    {item.propertyCode}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

