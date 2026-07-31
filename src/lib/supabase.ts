import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Property, InquiryForm } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project'));

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!supabaseClient && supabaseUrl && supabaseAnonKey) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
}

export interface DbPropertyRow {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: string;
  tag?: string;
  city: string;
  neighborhood: string;
  distance_to_beach: string;
  max_guests: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parking_spaces: number;
  area_m2: number;
  images: string[];
  description: string;
  amenities: string[];
  beds: any[];
  rates: any;
  rules: string[];
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export function mapDbToProperty(row: DbPropertyRow): Property {
  return {
    id: row.id,
    code: row.code,
    title: row.title,
    subtitle: row.subtitle || '',
    category: row.category as Property['category'],
    tag: row.tag || undefined,
    city: row.city,
    neighborhood: row.neighborhood,
    distanceToBeach: row.distance_to_beach || '',
    maxGuests: Number(row.max_guests) || 1,
    bedrooms: Number(row.bedrooms) || 0,
    suites: Number(row.suites) || 0,
    bathrooms: Number(row.bathrooms) || 0,
    parkingSpaces: Number(row.parking_spaces) || 0,
    areaM2: Number(row.area_m2) || 0,
    images: Array.isArray(row.images) ? row.images : [],
    description: row.description || '',
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    beds: Array.isArray(row.beds) ? row.beds : [],
    rates: row.rates || { lowSeason: 0, midSeason: 0, highSeason: 0, reveillon: 0, cleaningFee: 0 },
    rules: Array.isArray(row.rules) ? row.rules : [],
    featured: Boolean(row.featured),
  };
}

export function mapPropertyToDb(p: Property): Partial<DbPropertyRow> {
  return {
    id: p.id,
    code: p.code,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    tag: p.tag,
    city: p.city,
    neighborhood: p.neighborhood,
    distance_to_beach: p.distanceToBeach,
    max_guests: p.maxGuests,
    bedrooms: p.bedrooms,
    suites: p.suites,
    bathrooms: p.bathrooms,
    parking_spaces: p.parkingSpaces,
    area_m2: p.areaM2,
    images: p.images,
    description: p.description,
    amenities: p.amenities,
    beds: p.beds,
    rates: p.rates,
    rules: p.rules,
    featured: p.featured ?? false,
    updated_at: new Date().toISOString(),
  };
}

export async function fetchPropertiesFromSupabase(): Promise<Property[] | null> {
  const client = getSupabase();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase] Error fetching properties:', error.message);
      return null;
    }

    if (data && Array.isArray(data)) {
      return data.map(mapDbToProperty);
    }
    return null;
  } catch (err) {
    console.error('[Supabase] Unexpected error:', err);
    return null;
  }
}

export async function savePropertyToSupabase(p: Property): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    const row = mapPropertyToDb(p);
    const { error } = await client
      .from('properties')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.error('[Supabase] Upsert error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Save error:', err);
    return false;
  }
}

export async function deletePropertyFromSupabase(id: string): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[Supabase] Delete error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Delete error:', err);
    return false;
  }
}

export async function saveInquiryToSupabase(inquiry: InquiryForm): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client.from('inquiries').insert([
      {
        name: inquiry.name,
        phone: inquiry.phone,
        check_in: inquiry.checkIn,
        check_out: inquiry.checkOut,
        guests: inquiry.guests,
        property_code: inquiry.propertyCode || null,
        notes: inquiry.notes || '',
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('[Supabase] Inquiry save error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Save inquiry error:', err);
    return false;
  }
}
