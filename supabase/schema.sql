-- =======================================================
-- SUPABASE SCHEMA & SEED DATA
-- Project: Rosana Demicheli - Imóveis por Temporada
-- Execute this entire file in your Supabase SQL Editor
-- (https://supabase.com/dashboard/project/_/sql)
-- =======================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Table: Properties (Imóveis)
CREATE TABLE IF NOT EXISTS public.properties (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('Apartamento', 'Cobertura', 'Casa', 'Sobrado')),
  tag TEXT,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  distance_to_beach TEXT DEFAULT '',
  max_guests INT NOT NULL DEFAULT 1,
  bedrooms INT NOT NULL DEFAULT 1,
  suites INT NOT NULL DEFAULT 0,
  bathrooms INT NOT NULL DEFAULT 1,
  parking_spaces INT NOT NULL DEFAULT 0,
  area_m2 INT DEFAULT 0,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  description TEXT DEFAULT '',
  amenities JSONB NOT NULL DEFAULT '[]'::jsonb,
  beds JSONB NOT NULL DEFAULT '[]'::jsonb,
  rates JSONB NOT NULL DEFAULT '{"lowSeason": 0, "midSeason": 0, "highSeason": 0, "reveillon": 0, "cleaningFee": 0}'::jsonb,
  rules JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Table: Inquiries (Solicitações de Orçamento)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INT NOT NULL DEFAULT 1,
  property_code TEXT,
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'booked', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Table: Broker Info (Informações da Corretora)
CREATE TABLE IF NOT EXISTS public.broker_info (
  id TEXT PRIMARY KEY DEFAULT 'rosana_demicheli',
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  creci TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  email TEXT NOT NULL,
  instagram TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Table: Testimonials (Depoimentos)
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  date DATE NOT NULL,
  comment TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  property_code TEXT,
  property_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =======================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =======================================================

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broker_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Properties Policies
DROP POLICY IF EXISTS "Public Read Access Properties" ON public.properties;
CREATE POLICY "Public Read Access Properties" ON public.properties FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Properties" ON public.properties;
CREATE POLICY "Public Insert Properties" ON public.properties FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Properties" ON public.properties;
CREATE POLICY "Public Update Properties" ON public.properties FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public Delete Properties" ON public.properties;
CREATE POLICY "Public Delete Properties" ON public.properties FOR DELETE USING (true);

-- Inquiries Policies
DROP POLICY IF EXISTS "Public Insert Inquiries" ON public.inquiries;
CREATE POLICY "Public Insert Inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Inquiries" ON public.inquiries;
CREATE POLICY "Public Read Inquiries" ON public.inquiries FOR SELECT USING (true);

-- Broker Info Policies
DROP POLICY IF EXISTS "Public Read Broker Info" ON public.broker_info;
CREATE POLICY "Public Read Broker Info" ON public.broker_info FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Manage Broker Info" ON public.broker_info;
CREATE POLICY "Public Manage Broker Info" ON public.broker_info FOR ALL USING (true);

-- Testimonials Policies
DROP POLICY IF EXISTS "Public Read Testimonials" ON public.testimonials;
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (true);

-- =======================================================
-- SEED DATA (INITIAL PROPERTIES & BROKER INFORMATION)
-- =======================================================

INSERT INTO public.broker_info (id, name, title, creci, phone, whatsapp_number, email, instagram, bio, highlights)
VALUES (
  'rosana_demicheli',
  'Rosana Demicheli',
  'Corretora de Imóveis por Temporada',
  'CRECI/SC 48.291-F',
  '(12) 99719-6397',
  '5512997196397',
  'rosanademicheli.temporada@gmail.com',
  '@rosanademicheli.temporada',
  'Especialista em locação por temporada de alto padrão no litoral. Meu compromisso é proporcionar férias inesquecíveis para a sua família com transparência, segurança jurídica nos contratos, imóveis rigorosamente vistoriados e atendimento humanizado antes, durante e após a sua estadia.',
  '[
    {"title": "Contratos Seguros", "description": "Documentação transparente com emissão de recibos e garantias legais."},
    {"title": "Vistoria Prévia", "description": "Imóveis higienizados, equipados e prontos para receber sua família."},
    {"title": "Check-in Presencial", "description": "Recepção dedicada com entrega de chaves e orientações da região."},
    {"title": "Suporte 24h", "description": "Assistência direta para emergências e dúvidas durante a sua estadia."}
  ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.properties (
  id, code, title, subtitle, category, tag, city, neighborhood, distance_to_beach,
  max_guests, bedrooms, suites, bathrooms, parking_spaces, area_m2, featured,
  images, description, amenities, beds, rates, rules
) VALUES 
(
  'prop-101',
  'REF-101',
  'Cobertura Duplex de Luxo com Vista Panorâmica para o Mar',
  'Terraço privativo com jacuzzi, churrasqueira a carvão e vista espetacular para toda a orla.',
  'Cobertura',
  'Frente ao Mar',
  'Bombinhas - SC',
  'Praia de Mariscal',
  'Pé na Areia (0m do mar)',
  10, 4, 3, 4, 3, 220, true,
  '[
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
  ]'::jsonb,
  'Espetacular cobertura duplex localizada no ponto mais nobre da Praia de Mariscal. O imóvel oferece acabamento de altíssimo padrão, área gourmet integrada com churrasqueira no piso superior, hidromassagem privativa com vista total para o mar, além de ambientes amplos e totalmente climatizados. Ideal para famílias exigentes que buscam conforto, privacidade e pé na areia.',
  '[
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
    "Smart TV 65'''' na Sala e Suítes"
  ]'::jsonb,
  '[
    {"type": "Suíte Máster (Piso Sup.)", "description": "1 Cama King Size + Varanda com Vista Mar + Closet + Ar"},
    {"type": "Suíte 2", "description": "1 Cama de Casal Queen + Ar Condicionado"},
    {"type": "Suíte 3", "description": "1 Cama de Casal Queen + Ar Condicionado"},
    {"type": "Quarto 4", "description": "2 Camas de Solteiro + 2 Cauxões Auxiliares + Ar Condicionado"}
  ]'::jsonb,
  '{"lowSeason": 850, "midSeason": 1200, "highSeason": 1950, "reveillon": 2800, "cleaningFee": 350}'::jsonb,
  '[
    "Horário de Check-in: a partir das 14h00 | Check-out: até às 10h00",
    "Capacidade máxima permitida: 10 pessoas (incluindo crianças)",
    "Proibido festas, eventos com som alto ou aglomerações não autorizadas",
    "Proibido fumar no interior do imóvel",
    "Não aceita animais de estimação nesta unidade"
  ]'::jsonb
),
(
  'prop-102',
  'REF-102',
  'Casa Triplex de Alto Padrão com Piscina e Espaço Gourmet',
  'Residência privativa a 50m da praia com piscina iluminada, churrasqueira e mesa de sinuca.',
  'Casa',
  'Piscina Privativa',
  'Bombinhas - SC',
  'Praia de Bombas',
  '50 metros da praia',
  12, 5, 3, 5, 4, 310, true,
  '[
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"
  ]'::jsonb,
  'Impressionante casa de praia triplex projetada para receber grandes famílias com total comodidade e segurança. Conta com uma ampla piscina no quintal privativo, salão de festas integrado com churrasqueira gourmet, salão de jogos com sinuca, cozinha americana equipada e localização privileged no centro de Bombas, pertinho do mar e do comércio.',
  '[
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
  ]'::jsonb,
  '[
    {"type": "Suíte 1 (Térreo)", "description": "1 Cama Queen + Ar Condicionado (Acessível)"},
    {"type": "Suíte Máster", "description": "1 Cama King + Hidro + Varanda + Ar"},
    {"type": "Suíte 3", "description": "1 Cama de Casal + Ar"},
    {"type": "Quarto 4", "description": "2 Camas de Solteiro + Ar"},
    {"type": "Quarto 5", "description": "2 Camas de Solteiro + 2 Beliches + Ar"}
  ]'::jsonb,
  '{"lowSeason": 1100, "midSeason": 1600, "highSeason": 2400, "reveillon": 3500, "cleaningFee": 400}'::jsonb,
  '[
    "Check-in: a partir das 15h00 | Check-out: até às 10h00",
    "Capacidade máxima: 12 pessoas",
    "Respeitar a lei do silêncio no bairro após as 22h",
    "Aceita 1 Pet de pequeno porte com taxa extra de higienização"
  ]'::jsonb
),
(
  'prop-204',
  'REF-204',
  'Apartamento Moderno Pé na Areia com Sacada Gourmet',
  'Sacada envidraçada rebaixada com churrasqueira e vista frontal para o mar de Quatro Ilhas.',
  'Apartamento',
  'Frente ao Mar',
  'Bombinhas - SC',
  'Praia de Quatro Ilhas',
  'Pé na Areia (Edifício Beira-Mar)',
  8, 3, 3, 4, 2, 135, true,
  '[
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
  ]'::jsonb,
  'Lindo apartamento pé na areia com acesso direto ao calçadão e praia de Quatro Ilhas. Decoração contemporânea, móveis planejados de excelente qualidade, 3 suítes amplas e maravilhosa sacada envidraçada com churrasqueira frente ao mar.',
  '[
    "Edifício Pé na Areia",
    "Sacada Gourmet Envidraçada",
    "3 Suítes Climatizadas",
    "Churrasqueira a Carvão",
    "Wi-Fi Fibra",
    "Elevador e Portaria 24h",
    "2 Vagas de Garagem Privativas",
    "Cozinha Gourmet com Ilha"
  ]'::jsonb,
  '[
    {"type": "Suíte 1 Frente Mar", "description": "1 Cama Queen + Ar + Sacada"},
    {"type": "Suíte 2", "description": "1 Cama de Casal + Ar"},
    {"type": "Suíte 3", "description": "2 Camas de Solteiro + 2 Camas Auxiliares + Ar"}
  ]'::jsonb,
  '{"lowSeason": 680, "midSeason": 950, "highSeason": 1550, "reveillon": 2200, "cleaningFee": 300}'::jsonb,
  '[
    "Check-in: 14h00 | Check-out: 10h00",
    "Limite máximo de 8 hóspedes no condomínio",
    "Não é permitido animais pelo regulamento do edifício"
  ]'::jsonb
),
(
  'prop-305',
  'REF-305',
  'Sobrado Aconchegante a 100m da Praia com Pátio Privativo',
  'Ótima opção familiar com churrasqueira privativa, pátio fechado e excelente custo-benefício.',
  'Sobrado',
  'Ótimo Preço',
  'Bombinhas - SC',
  'Canto Grande (Mar de Dentro)',
  '100 metros da praia',
  6, 2, 1, 2, 2, 95, false,
  '[
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
  ]'::jsonb,
  'Sobrado aconchegante e funcional em rua tranquila no Canto Grande. Próximo ao Mar de Dentro (mar calmo sem ondas, perfeito para crianças). Possui quintal fechado com espaço para veículos e varanda acolhedora.',
  '[
    "Apenas 100m do Mar de Dentro",
    "Churrasqueira Privativa",
    "Pátio Fechado e Seguro",
    "Ar Condicionado nos Quartos",
    "Wi-Fi Gratuito",
    "Aceita Pets de Pequeno Porte"
  ]'::jsonb,
  '[
    {"type": "Quarto 1 (Superior)", "description": "1 Cama de Casal + Ar Condicionado"},
    {"type": "Quarto 2 (Superior)", "description": "2 Camas de Solteiro + 2 Colchões + Ar"}
  ]'::jsonb,
  '{"lowSeason": 420, "midSeason": 600, "highSeason": 980, "reveillon": 1450, "cleaningFee": 250}'::jsonb,
  '[
    "Check-in: 14h00 | Check-out: 10h00",
    "Capacidade máxima: 6 pessoas",
    "Permitido 1 pet de pequeno porte"
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  rates = EXCLUDED.rates,
  updated_at = NOW();
