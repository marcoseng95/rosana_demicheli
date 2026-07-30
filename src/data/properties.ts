import { Property } from '../types';

export const PROPERTIES: Property[] = [
  {
    id: "prop-101",
    code: "REF-101",
    title: "Cobertura Duplex de Luxo com Vista Panorâmica para o Mar",
    subtitle: "Terraço privativo com jacuzzi, churrasqueira a carvão e vista espetacular para toda a orla.",
    category: "Cobertura",
    tag: "Frente ao Mar",
    city: "Bombinhas - SC",
    neighborhood: "Praia de Mariscal",
    distanceToBeach: "Pé na Areia (0m do mar)",
    maxGuests: 10,
    bedrooms: 4,
    suites: 3,
    bathrooms: 4,
    parkingSpaces: 3,
    areaM2: 220,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Espetacular cobertura duplex localizada no ponto mais nobre da Praia de Mariscal. O imóvel oferece acabamento de altíssimo padrão, área gourmet integrada com churrasqueira no piso superior, hidromassagem privativa com vista total para o mar, além de ambientes amplos e totalmente climatizados. Ideal para famílias exigentes que buscam conforto, privacidade e pé na areia.",
    amenities: [
      "Vista Panorâmica pro Mar",
      "Pé na Areia",
      "Hidromassagem / Jacuzzi",
      "Ar Condicionado em Todos Ambientes",
      "Churrasqueira a Carvão",
      "Wi-Fi de Alta Velocidade",
      "Varanda Gourmet",
      "Elevador Privativo",
      "Garagem Coberta (3 vagas)",
      "Máquina de Lavar e Secar",
      "Cozinha Completa equipada",
      "Smart TV 65'' na Sala e Suítes"
    ],
    beds: [
      { type: "Suíte Máster (Piso Sup.)", description: "1 Cama King Size + Varanda com Vista Mar + Closet + Ar" },
      { type: "Suíte 2", description: "1 Cama de Casal Queen + Ar Condicionado" },
      { type: "Suíte 3", description: "1 Cama de Casal Queen + Ar Condicionado" },
      { type: "Quarto 4", description: "2 Camas de Solteiro + 2 Cauxões Auxiliares + Ar Condicionado" }
    ],
    rates: {
      lowSeason: 850,
      midSeason: 1200,
      highSeason: 1950,
      reveillon: 2800,
      cleaningFee: 350
    },
    rules: [
      "Horário de Check-in: a partir das 14h00 | Check-out: até às 10h00",
      "Capacidade máxima permitida: 10 pessoas (incluindo crianças)",
      "Proibido festas, eventos com som alto ou aglomerações não autorizadas",
      "Proibido fumar no interior do imóvel",
      "Não aceita animais de estimação nesta unidade"
    ]
  },
  {
    id: "prop-102",
    code: "REF-102",
    title: "Casa Triplex de Alto Padrão com Piscina e Espaço Gourmet",
    subtitle: "Residência privativa a 50m da praia com piscina iluminada, churrasqueira e mesa de sinuca.",
    category: "Casa",
    tag: "Piscina Privativa",
    city: "Bombinhas - SC",
    neighborhood: "Praia de Bombas",
    distanceToBeach: "50 metros da praia",
    maxGuests: 12,
    bedrooms: 5,
    suites: 3,
    bathrooms: 5,
    parkingSpaces: 4,
    areaM2: 310,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Impressionante casa de praia triplex projetada para receber grandes famílias com total comodidade e segurança. Conta com uma ampla piscina no quintal privativo, salão de festas integrado com churrasqueira gourmet, salão de jogos com sinuca, cozinha americana equipada e localização privilegiada no centro de Bombas, pertinho do mar e do comércio.",
    amenities: [
      "Piscina Privativa Iluminada",
      "Apenas 50m do Mar",
      "Salão de Jogos com Sinuca",
      "Espaço Gourmet com Churrasqueira",
      "Ar Condicionado Split em 5 Quartos",
      "Wi-Fi Fibra Óptica 500 Mega",
      "Quintal Gramado e Arborizado",
      "Aceita Pets de Pequeno Porte",
      "Sistema de Câmeras e Alarme",
      "Garagem Fechada para 4 Carros",
      "Máquina de Lavar e Lava-Louças"
    ],
    beds: [
      { type: "Suíte 1 (Piso Superior)", description: "1 Cama Casal King + Sacada Privativa + Ar Split" },
      { type: "Suíte 2", description: "1 Cama Casal Queen + Ar Split" },
      { type: "Suíte 3", description: "1 Cama Casal Queen + Ar Split" },
      { type: "Quarto 4", description: "2 Camas de Solteiro + 1 Beliche + Ar Split" },
      { type: "Quarto 5", description: "1 Cama de Casal + Ar Split" }
    ],
    rates: {
      lowSeason: 1100,
      midSeason: 1600,
      highSeason: 2400,
      reveillon: 3500,
      cleaningFee: 400
    },
    rules: [
      "Check-in: 15h00 | Check-out: 10h00",
      "Permitido até 12 hóspedes confortavelmente",
      "Aceita 1 Pet de pequeno porte com aviso prévio na reserva",
      "Respeitar o horário de silêncio do bairro após as 22h00"
    ]
  },
  {
    id: "prop-204",
    code: "REF-204",
    title: "Apartamento Moderno Pé na Areia com Sacada Gourmet",
    subtitle: "Sacada envidraçada rebaixada com churrasqueira e vista frontal para o mar de Quatro Ilhas.",
    category: "Apartamento",
    tag: "Frente ao Mar",
    city: "Bombinhas - SC",
    neighborhood: "Praia de Quatro Ilhas",
    distanceToBeach: "Pé na Areia (Edifício Beira-Mar)",
    maxGuests: 8,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parkingSpaces: 2,
    areaM2: 135,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Lindo apartamento pé na areia com acesso direto ao calçadão e praia de Quatro Ilhas. Decoração contemporânea, móveis planejados de excelente qualidade, 3 suítes amplas e uma maravilhosa sacada com fechamento de vidro Reiki e churrasqueira para desfrutar o churrasco escutando o som das ondas.",
    amenities: [
      "Edifício Pé na Areia",
      "Sacada Gourmet Envidraçada",
      "Todas as 3 Acomodações são Suítes",
      "Churrasqueira a Carvão",
      "Ar Condicionado em Todas as Suítes",
      "Wi-Fi Fibra",
      "Elevador e Portaria 24h",
      "2 Vagas de Garagem Privativas",
      "Cadeiras de Praia e Guarda-Sol Incluídos"
    ],
    beds: [
      { type: "Suíte 1", description: "1 Cama Casal Queen + Vista Mar + Ar Split" },
      { type: "Suíte 2", description: "1 Cama Casal Queen + Ar Split" },
      { type: "Suíte 3", description: "2 Camas de Solteiro + 2 Camas Auxiliares + Ar Split" }
    ],
    rates: {
      lowSeason: 680,
      midSeason: 950,
      highSeason: 1550,
      reveillon: 2200,
      cleaningFee: 300
    },
    rules: [
      "Check-in: 14h00 | Check-out: 10h00",
      "Capacidade: 8 pessoas",
      "Uso obrigatório de pulseiras de identificação do condomínio",
      "Não aceita pets"
    ]
  },
  {
    id: "prop-305",
    code: "REF-305",
    title: "Sobrado Aconchegante a 100m da Praia com Pátio Privativo",
    subtitle: "Ótima opção familiar com churrasqueira privativa, pátio fechado e excelente custo-benefício.",
    category: "Sobrado",
    tag: "Ótimo Preço",
    city: "Bombinhas - SC",
    neighborhood: "Canto Grande (Mar de Dentro)",
    distanceToBeach: "100 metros da praia",
    maxGuests: 6,
    bedrooms: 2,
    suites: 1,
    bathrooms: 2,
    parkingSpaces: 2,
    areaM2: 95,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Sobrado aconchegante e funcional em rua tranquila no Canto Grande. Próximo ao Mar de Dentro (mar calmo sem ondas, perfeito para crianças) e também a poucos minutos da trilha do Morro do Macaco. Possui quintal fechado com espaço para veículos, churrasqueira e ar-condicionado nos quartos.",
    amenities: [
      "Apenas 100m do Mar de Dentro",
      "Churrasqueira Privativa",
      "Pátio Fechado e Seguro",
      "Ar Condicionado nos 2 Quartos",
      "Wi-Fi Gratuito",
      "Aceita Pets de Pequeno Porte",
      "Cozinha Equipada com Eletros",
      "Lavanderia com Máquina de Lavar"
    ],
    beds: [
      { type: "Suíte 1", description: "1 Cama Casal + Ar Split" },
      { type: "Quarto 2", description: "1 Cama Casal + 1 Beliche + Ar Split" }
    ],
    rates: {
      lowSeason: 420,
      midSeason: 600,
      highSeason: 980,
      reveillon: 1450,
      cleaningFee: 250
    },
    rules: [
      "Check-in: 14h00 | Check-out: 10h00",
      "Capacidade: 6 pessoas",
      "Pet friendly para animais educados",
      "Proibido som alto após as 22h"
    ]
  },
  {
    id: "prop-408",
    code: "REF-408",
    title: "Apartamento Elegante de 3 Suítes em Meia Praia",
    subtitle: "Edifício com área de lazer, sacada com churrasqueira e vaga dupla no coração de Itapema.",
    category: "Apartamento",
    tag: "Quadra do Mar",
    city: "Itapema - SC",
    neighborhood: "Meia Praia",
    distanceToBeach: "80 metros do mar (2ª quadra)",
    maxGuests: 8,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parkingSpaces: 2,
    areaM2: 150,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Excelente apartamento em localização privilegiada na badalada Meia Praia em Itapema. Imóvel com living em 2 ambientes, fino acabamento em gesso, sacada integrada com churrasqueira a carvão, ar condicionado em todas as 3 suítes e próximo de supermados, farmácias e shoppings.",
    amenities: [
      "Quadra do Mar (80m da Praia)",
      "3 Suítes Climatizadas",
      "Sacada com Churrasqueira a Carvão",
      "Wi-Fi de Alta Velocidade",
      "Cozinha com Forno e Micro-ondas",
      "Garagem Dupla Coberta",
      "Elevador e Acessibilidade",
      "Lavanderia Completa"
    ],
    beds: [
      { type: "Suíte 1", description: "1 Cama Casal King + Ar Split" },
      { type: "Suíte 2", description: "1 Cama Casal Queen + Ar Split" },
      { type: "Suíte 3", description: "2 Camas Solteiro + 2 Camas Auxiliares + Ar Split" }
    ],
    rates: {
      lowSeason: 650,
      midSeason: 890,
      highSeason: 1400,
      reveillon: 2100,
      cleaningFee: 280
    },
    rules: [
      "Check-in: 14h00 | Check-out: 10h00",
      "Capacidade: 8 pessoas",
      "Não aceita animais de estimação"
    ]
  },
  {
    id: "prop-510",
    code: "REF-510",
    title: "Casa Beira-Mar com Amplo Jardim e Espaço Gourmet",
    subtitle: "Sinta a brisa marítima no gramado privativo com acesso exclusivo à praia das Toninhas.",
    category: "Casa",
    tag: "Frente ao Mar",
    city: "Ubatuba - SP",
    neighborhood: "Praia das Toninhas",
    distanceToBeach: "Pé na Areia com portão direto",
    maxGuests: 10,
    bedrooms: 4,
    suites: 2,
    bathrooms: 3,
    parkingSpaces: 3,
    areaM2: 240,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Refúgio de praia paradisíaco em Ubatuba. Casa estilo rústico chique de frente para o mar na Praia das Toninhas. Possui varanda avarandada com redes de descanso, quiosque gourmet com churrasqueira e forno de pizza, e portão privativo que sai direto na areia. Experiência única de descanso em família.",
    amenities: [
      "Pé na Areia em Ubatuba",
      "Jardim Privativo de Frente para a Praia",
      "Churrasqueira e Forno a Lenha/Pizza",
      "Varanda com Redes",
      "Ar Condicionado nos Quartos",
      "Wi-Fi",
      "Aceita Pets",
      "3 Vagas Internas de Garagem"
    ],
    beds: [
      { type: "Suíte 1", description: "1 Cama Casal King + Vista Mar + Ar Split" },
      { type: "Suíte 2", description: "1 Cama Casal + Ar Split" },
      { type: "Quarto 3", description: "2 Camas Solteiro + 1 Cama Auxiliar + Fan" },
      { type: "Quarto 4", description: "1 Cama Casal + 1 Cama Solteiro + Ar Split" }
    ],
    rates: {
      lowSeason: 800,
      midSeason: 1150,
      highSeason: 1800,
      reveillon: 2600,
      cleaningFee: 350
    },
    rules: [
      "Check-in: 14h00 | Check-out: 11h00",
      "Máximo de 10 hóspedes",
      "Permitido animais de estimação sob responsabilidade do tutor"
    ]
  }
];
