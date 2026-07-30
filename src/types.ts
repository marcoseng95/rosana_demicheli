export interface SeasonalRates {
  lowSeason: number;     // Baixa temporada (R$/dia)
  midSeason: number;     // Média temporada (R$/dia)
  highSeason: number;    // Alta temporada (R$/dia)
  reveillon: number;     // Pacote Réveillon / Natal (R$/dia)
  cleaningFee: number;   // Taxa de limpeza (R$)
}

export interface BedLayout {
  type: string;          // e.g. "Suíte Máster", "Quarto 2", "Sótão"
  description: string;   // e.g. "1 Cama de Casal King + Ar Condicionado"
}

export interface Property {
  id: string;
  code: string;            // e.g. "REF-101"
  title: string;
  subtitle: string;
  category: 'Apartamento' | 'Cobertura' | 'Casa' | 'Sobrado';
  tag?: string;            // e.g. "Frente ao Mar", "Piso Superior", "Piscina Privativa"
  city: string;            // e.g. "Bombinhas", "Ubatuba", "Itapema"
  neighborhood: string;    // e.g. "Praia de Mariscal", "Praia Grande", "Meia Praia"
  distanceToBeach: string; // e.g. "Pé na Areia", "50 metros do mar", "100m da praia"
  maxGuests: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  areaM2: number;
  images: string[];
  description: string;
  amenities: string[];     // e.g. ["Piscina", "Ar Condicionado", "Wi-Fi", "Churrasqueira", "Vista Pro Mar", "Aceita Pets", "Elevador", "Varanda Gourmet", "Máquina de Lavar"]
  beds: BedLayout[];
  rates: SeasonalRates;
  rules: string[];
  featured?: boolean;
}

export interface InquiryForm {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  propertyCode?: string;
  notes: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  date: string;
  comment: string;
  rating: number;
  propertyCode: string;
  propertyName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
