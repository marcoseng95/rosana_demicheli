import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { FAQS, buildGeneralWhatsAppMessage, buildWhatsAppLink } from '../data/brokerInfo';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const whatsappUrl = buildWhatsAppLink(buildGeneralWhatsAppMessage());

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="duvidas" className="py-16 sm:py-24 bg-[#0d1b2a] border-t border-white/10 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Tire Suas Dúvidas</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Perguntas Frequentes
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Tudo o que você precisa saber para planejar sua reserva por temporada com segurança.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-6 text-left font-serif font-bold text-white text-base sm:text-lg flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-white/10 pt-4 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/15 text-center space-y-4 shadow-2xl">
          <p className="text-white font-serif font-bold text-base sm:text-lg">
            Ficou com alguma dúvida específica sobre o imóvel ou datas?
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-xl shadow-amber-500/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com Rosana no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

