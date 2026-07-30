import React, { useState } from 'react';
import { MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppLink } from '../data/brokerInfo';
import { PROPERTIES } from '../data/properties';

interface DirectInquirySectionProps {
  initialPropertyCode?: string;
}

export const DirectInquirySection: React.FC<DirectInquirySectionProps> = ({ initialPropertyCode = '' }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('6');
  const [propertyCode, setPropertyCode] = useState(initialPropertyCode);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = `Olá Rosana Demicheli! Gostaria de solicitar um orçamento para locação por temporada:\n\n`;
    message += `👤 *Nome:* ${name || 'Não informado'}\n`;
    message += `📱 *WhatsApp:* ${phone || 'Não informado'}\n`;
    message += `📅 *Check-in:* ${checkIn ? new Date(checkIn).toLocaleDateString('pt-BR') : 'A definir'}\n`;
    message += `📅 *Check-out:* ${checkOut ? new Date(checkOut).toLocaleDateString('pt-BR') : 'A definir'}\n`;
    message += `👥 *Quantidade de Hóspedes:* ${guests} pessoas\n`;

    if (propertyCode) {
      const matched = PROPERTIES.find(p => p.code === propertyCode);
      message += `🏡 *Imóvel de Interesse:* ${propertyCode}${matched ? ` (${matched.title})` : ''}\n`;
    } else {
      message += `🏡 *Imóvel:* Aberto a sugestões de opções disponíveis\n`;
    }

    if (notes) {
      message += `📝 *Observações/Preferências:* ${notes}\n`;
    }

    const link = buildWhatsAppLink(message);
    window.open(link, '_blank');
  };

  return (
    <section id="orcamento" className="py-16 sm:py-24 bg-[#0d1b2a] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white/5 border border-white/15 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle background blur shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column Text */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Atendimento Personalizado</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                Solicite o seu orçamento para as <span className="text-amber-400 italic">suas férias</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Informe as datas da viagem e a quantidade de pessoas. Rosana Demicheli verificará a disponibilidade exata e enviará as melhores opções diretamente no seu WhatsApp!
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Respostas rápidas sem compromisso</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Valores atualizados de alta e baixa temporada</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Contratos de locação transparentes e seguros</span>
                </div>
              </div>
            </div>

            {/* Right Column Form */}
            <div className="lg:col-span-7 bg-[#0d1b2a]/90 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Maria Oliveira"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm text-white placeholder-slate-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Seu WhatsApp / Telefone
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: (47) 99999-8888"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm text-white placeholder-slate-400 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm text-white transition-all [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm text-white transition-all [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Hóspedes
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0d1b2a] border border-white/20 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm text-white transition-all"
                    >
                      <option value="2">2 pessoas</option>
                      <option value="4">4 pessoas</option>
                      <option value="6">6 pessoas</option>
                      <option value="8">8 pessoas</option>
                      <option value="10">10 pessoas</option>
                      <option value="12">12+ pessoas</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Imóvel Específico de Interesse (Opcional)
                  </label>
                  <select
                    value={propertyCode}
                    onChange={(e) => setPropertyCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1b2a] border border-white/20 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm text-white transition-all"
                  >
                    <option value="">-- Sugestões de todos os imóveis disponíveis --</option>
                    {PROPERTIES.map(p => (
                      <option key={p.id} value={p.code}>
                        {p.code} - {p.title} ({p.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Preferências / Dúvidas (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Preferimos frente ao mar, temos crianças e gostamos de sacada com churrasqueira..."
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm text-white placeholder-slate-400 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Solicitação no WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

