import { Testimonial, FAQItem } from '../types';

export const BROKER_INFO = {
  name: "Rosana Demicheli",
  title: "Corretora de Imóveis por Temporada",
  creci: "CRECI/SC 48.291-F",
  phone: "(12) 99719-6397",
  whatsappNumber: "5512997196397", // Formatted for WhatsApp API link
  whatsappFormatted: "(12) 99719-6397",
  email: "rosanademicheli.temporada@gmail.com",
  instagram: "@rosanademicheli.temporada",
  address: "Av. Ver. Manoel José dos Santos, 1200 - Centro, Bombinhas - SC",
  regions: ["Bombinhas", "Mariscal", "Quatro Ilhas", "Canto Grande", "Zimbros", "Itapema / Meia Praia", "Ubatuba"],
  experienceYears: "Mais de 12 anos",
  bio: "Especialista em locação por temporada de alto padrão no litoral. Meu compromisso é proporcionar férias inesquecíveis para a sua família com transparência, segurança jurídica nos contratos, imóveis rigorosamente vistoriados e atendimento humanizado antes, durante e após a sua estadia.",
  highlights: [
    { title: "Contratos Seguros", description: "Documentação transparente com emissão de recibos e garantias legais." },
    { title: "Vistoria Prévia", description: "Imóveis higienizados, equipados e prontos para receber sua família." },
    { title: "Check-in Presencial", description: "Recepção dedicada com entrega de chaves e orientações da região." },
    { title: "Suporte 24h", description: "Assistência direta para emergências e dúvidas durante a sua estadia." }
  ]
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Carolina & Família",
    city: "Curitiba / PR",
    date: "Janeiro de 2026",
    comment: "A Rosana foi impecável! O apartamento na Praia de Mariscal era exatamente como nas fotos, limpíssimo e super bem localizado. O check-in foi rápido e ela nos deu ótimas dicas de restaurantes. Voltaremos com certeza!",
    rating: 5,
    propertyCode: "REF-101",
    propertyName: "Cobertura Duplex Vista Mar"
  },
  {
    id: "t2",
    name: "Marcelo Siqueira",
    city: "São Paulo / SP",
    date: "Dezembro de 2025",
    comment: "Fechamos o pacote de Réveillon para 10 pessoas na casa com piscina. Tudo muito organizado e sem surpresas. A Rosana passa muita segurança desde o primeiro contato no WhatsApp até a entrega das chaves.",
    rating: 5,
    propertyCode: "REF-102",
    propertyName: "Casa Triplex com Piscina"
  },
  {
    id: "t3",
    name: "Fernanda & Ricardo",
    city: "Porto Alegre / RS",
    date: "Fevereiro de 2026",
    comment: "Excelente atendimento! Viajamos com crianças pequenas e idosos e o imóvel era 100% acessível, perto da praia e super confortável. Recomendo a todos alugar por temporada com a Rosana Demicheli.",
    rating: 5,
    propertyCode: "REF-204",
    propertyName: "Apartamento Pé na Areia 3 Suítes"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Como funciona o processo de reserva por temporada?",
    answer: "Após escolher o imóvel e confirmar a disponibilidade de datas com a Rosana Demicheli pelo WhatsApp, enviamos o contrato de locação por temporada. A garantia da reserva é feita mediante sinal de 30% a 50% via PIX ou transferência, e o saldo restante é quitado na entrega das chaves no check-in."
  },
  {
    question: "Quais são os horários padrão de check-in e check-out?",
    answer: "O horário padrão de Check-in é a partir das 14:00h e o Check-out até as 10:00h. Caso necessite de flexibilidade (early check-in ou late check-out), consulte previamente a disponibilidade com a Rosana."
  },
  {
    question: "Os imóveis oferecem roupa de cama e banho?",
    answer: "A maioria dos nossos imóveis disponibiliza travesseiros e protetores de colchão. Quanto aos jogos de cama e toalhas de banho, alguns imóveis oferecem como cortesia e outros sob consulta de taxa. Sempre informamos detalhadamente no momento do orçamento."
  },
  {
    question: "Como funciona a taxa de limpeza?",
    answer: "A taxa de limpeza é única por estadia e é destinada ao serviço de higienização profissional do imóvel após o seu check-out, garantindo que o próximo hóspede encontre a residência em perfeitas condições."
  },
  {
    question: "É permitido levar animais de estimação (pets)?",
    answer: "Alguns dos nossos imóveis são Pet Friendly para animais de pequeno e médio porte! Essa informação consta nas especificações de cada imóvel no site. Por gentileza, informe a presença do seu pet ao consultar a disponibilidade."
  }
];

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BROKER_INFO.whatsappNumber}?text=${encoded}`;
}

export function buildPropertyWhatsAppMessage(propertyCode: string, propertyTitle: string): string {
  return `Olá Rosana! Gostaria de consultar a disponibilidade e valores para locação por temporada do imóvel ${propertyCode} - ${propertyTitle}. Como podemos prosseguir?`;
}

export function buildGeneralWhatsAppMessage(): string {
  return `Olá Rosana Demicheli! Vi seu site de imóveis por temporada e gostaria de verificar opções disponíveis para as minhas férias. Pode me ajudar?`;
}
