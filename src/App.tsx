import React, { useState, useEffect } from 'react';
import { Property } from './types';
import { PROPERTIES } from './data/properties';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyGrid } from './components/PropertyGrid';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { DirectInquirySection } from './components/DirectInquirySection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminPortalModal } from './components/AdminPortalModal';
import { fetchPropertiesFromSupabase, savePropertyToSupabase, deletePropertyFromSupabase, isSupabaseConfigured } from './lib/supabase';

export default function App() {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('rosana_properties_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading properties from local storage', e);
    }
    return PROPERTIES;
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [inquiryPropertyCode, setInquiryPropertyCode] = useState<string>('');
  const [adminOpen, setAdminOpen] = useState(false);

  // Load live properties from Supabase if configured
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let isMounted = true;
    fetchPropertiesFromSupabase().then((supabaseProps) => {
      if (isMounted && supabaseProps && supabaseProps.length > 0) {
        setProperties(supabaseProps);
        try {
          localStorage.setItem('rosana_properties_v1', JSON.stringify(supabaseProps));
        } catch (e) {
          console.error('Error saving properties to local storage', e);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateProperties = (updatedProperties: Property[]) => {
    // Detect added/modified or deleted properties and update Supabase
    if (isSupabaseConfigured) {
      const currentIds = new Set(updatedProperties.map(p => p.id));
      properties.forEach(oldProp => {
        if (!currentIds.has(oldProp.id)) {
          deletePropertyFromSupabase(oldProp.id);
        }
      });
      updatedProperties.forEach(p => {
        savePropertyToSupabase(p);
      });
    }

    setProperties(updatedProperties);
    try {
      localStorage.setItem('rosana_properties_v1', JSON.stringify(updatedProperties));
    } catch (e) {
      console.error('Error saving properties to local storage', e);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquiryForProperty = (propertyCode: string) => {
    setInquiryPropertyCode(propertyCode);
    scrollToSection('orcamento');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar 
        onNavigate={scrollToSection} 
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Hero Header Section */}
      <Hero 
        onExploreClick={() => scrollToSection('imoveis')}
        onInquiryClick={() => scrollToSection('orcamento')}
      />

      {/* Main Property Showcase Grid */}
      <PropertyGrid
        properties={properties}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onInquiryClick={() => scrollToSection('orcamento')}
      />

      {/* Direct Date Quotation & Inquiry Form Section */}
      <DirectInquirySection initialPropertyCode={inquiryPropertyCode} />

      {/* About Broker Rosana Demicheli Section */}
      <AboutSection />

      {/* Guest Reviews & Testimonials */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Site Footer */}
      <Footer 
        onNavigate={scrollToSection} 
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Property Detail Gallery Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onInquiryForProperty={handleInquiryForProperty}
      />

      {/* Exclusive Broker Admin Management Portal */}
      <AdminPortalModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        properties={properties}
        onUpdateProperties={handleUpdateProperties}
      />
    </div>
  );
}
