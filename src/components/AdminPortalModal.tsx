import React, { useState, useRef } from 'react';
import { 
  Lock, Key, Plus, Edit, Trash2, X, Save, RotateCcw, Check, 
  Sparkles, Home, Image as ImageIcon, DollarSign, ShieldCheck, 
  AlertCircle, CheckSquare, Square, RefreshCw, UploadCloud, Camera,
  Upload, Star, Loader2, Link as LinkIcon
} from 'lucide-react';
import { Property } from '../types';
import { PROPERTIES } from '../data/properties';

const compressImageFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1600;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        } else {
          resolve(e.target?.result as string || '');
        }
      };
      img.onerror = () => {
        resolve(e.target?.result as string || '');
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onUpdateProperties: (updated: Property[]) => void;
}

const COMMON_AMENITIES = [
  "Ar Condicionado",
  "Wi-Fi de Alta Velocidade",
  "Piscina Privativa",
  "Piscina no Condomínio",
  "Churrasqueira a Carvão",
  "Sacada Gourmet",
  "Vista Panorâmica pro Mar",
  "Pé na Areia",
  "Garagem Coberta (2 vagas)",
  "Elevador",
  "Aceita Animais (Pet Friendly)",
  "Máquina de Lavar Louça",
  "Máquina de Lavar Roupa",
  "Cozinha Completa Equipada",
  "Portaria 24h & Segurança"
];

const CATEGORIES: Property['category'][] = ['Apartamento', 'Cobertura', 'Casa', 'Sobrado'];

const DEFAULT_PIN = "rosana1234";

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  properties,
  onUpdateProperties
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Editing state
  const [editingProperty, setEditingProperty] = useState<Partial<Property> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInputs, setShowUrlInputs] = useState(false);

  const handleDeviceFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !editingProperty) return;

    setIsUploading(true);
    try {
      const uploadPromises: Promise<string>[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          uploadPromises.push(compressImageFile(file));
        }
      }

      const newImageUrls = await Promise.all(uploadPromises);
      if (newImageUrls.length > 0) {
        const existing = editingProperty.images || [];
        setEditingProperty({
          ...editingProperty,
          images: [...existing, ...newImageUrls]
        });
        showNotification(`${newImageUrls.length} foto(s) adicionada(s) com sucesso!`);
      }
    } catch (err) {
      console.error('Erro ao processar imagens:', err);
      alert('Ocorreu um erro ao carregar as imagens do dispositivo.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleMakeCoverPhoto = (idx: number) => {
    if (!editingProperty || !editingProperty.images) return;
    const images = [...editingProperty.images];
    const [selected] = images.splice(idx, 1);
    images.unshift(selected);
    setEditingProperty({ ...editingProperty, images });
    showNotification('Foto definida como capa do imóvel!');
  };

  const handleRemovePhoto = (idx: number) => {
    if (!editingProperty || !editingProperty.images) return;
    const images = editingProperty.images.filter((_, i) => i !== idx);
    setEditingProperty({ ...editingProperty, images });
  };

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const input = pinInput.trim();
    if (input === DEFAULT_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleCreateNew = () => {
    const nextRefNum = properties.length + 101;
    const newProp: Property = {
      id: `prop-${Date.now()}`,
      code: `REF-${nextRefNum}`,
      title: "Novo Imóvel de Temporada",
      subtitle: "Excelente opção no Litoral",
      category: "Apartamento",
      tag: "Lançamento",
      city: "Bombinhas",
      neighborhood: "Praia de Mariscal",
      distanceToBeach: "100m do mar",
      maxGuests: 8,
      bedrooms: 3,
      suites: 1,
      bathrooms: 2,
      parkingSpaces: 2,
      areaM2: 110,
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Ache o imóvel ideal para desfrutar de férias inesquecíveis com total conforto e segurança no litoral.",
      amenities: ["Ar Condicionado", "Wi-Fi de Alta Velocidade", "Churrasqueira a Carvão", "Cozinha Completa Equipada"],
      beds: [
        { type: "Suíte Principal", description: "1 Cama de Casal King + Ar Condicionado" },
        { type: "Quarto 2", description: "2 Camas de Solteiro + Ar Condicionado" }
      ],
      rates: {
        lowSeason: 550,
        midSeason: 850,
        highSeason: 1400,
        reveillon: 1900,
        cleaningFee: 350
      },
      rules: [
        "Proibido festas ou eventos barulhentos",
        "Respeitar o horário de silêncio do condomínio (22h às 08h)",
        "Check-in às 14h / Check-out até às 10h"
      ],
      featured: false
    };

    setEditingProperty(newProp);
    setIsNew(true);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(JSON.parse(JSON.stringify(property)));
    setIsNew(false);
  };

  const handleDelete = (id: string, code: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o imóvel ${code}?`)) {
      const updated = properties.filter(p => p.id !== id);
      onUpdateProperties(updated);
      showNotification(`Imóvel ${code} excluído com sucesso!`);
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm("Deseja restaurar a lista padrão de imóveis originais? Suas alterações salvas localmente serão substituídas.")) {
      onUpdateProperties(PROPERTIES);
      showNotification("Catálogo restaurado para a versão padrão!");
    }
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty || !editingProperty.code || !editingProperty.title) return;

    const propToSave = editingProperty as Property;
    let updated: Property[];

    if (isNew) {
      updated = [propToSave, ...properties];
    } else {
      updated = properties.map(p => p.id === propToSave.id ? propToSave : p);
    }

    onUpdateProperties(updated);
    setEditingProperty(null);
    showNotification(isNew ? "Novo imóvel cadastrado e publicado!" : "Alterações salvas com sucesso!");
  };

  const toggleAmenity = (amenity: string) => {
    if (!editingProperty) return;
    const current = editingProperty.amenities || [];
    const exists = current.includes(amenity);
    const updated = exists 
      ? current.filter(a => a !== amenity)
      : [...current, amenity];
    setEditingProperty({ ...editingProperty, amenities: updated });
  };

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-5xl bg-[#0d1b2a] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-white/20 text-slate-100">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-[#070d14]/90 backdrop-blur-xl px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                Área de Gestão da Corretora
                {isAuthenticated && (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 text-[10px] font-sans font-bold uppercase rounded-md">
                    Sessão Ativa
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400">Rosana Demicheli • Gerenciador de Hospedagens</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer border border-white/10"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/30 text-emerald-300 px-6 py-2.5 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Body Container */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">

          {/* 1. LOGIN SCREEN IF NOT AUTHENTICATED */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto shadow-2xl">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-serif font-bold text-white">Acesso Restrito</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Digite a senha exclusiva para acessar o painel de cadastro e alteração de hospedagens.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left bg-white/5 p-6 rounded-2xl border border-white/10">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Senha da Corretora
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="password"
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setPinError(false);
                      }}
                      placeholder="Digite a senha..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 text-sm focus:border-amber-400 outline-none"
                      autoFocus
                    />
                  </div>
                  {pinError && (
                    <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Senha incorreta! Digite a senha: rosana1234
                    </p>
                  )}
                </div>
               
                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Acessar Painel de Gestão</span>
                </button>
              </form>
            </div>
          ) : editingProperty ? (

            /* 2. CREATE / EDIT PROPERTY FORM */
            <form onSubmit={handleSaveProperty} className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                    {isNew ? '➕ Cadastrar Novo Imóvel' : '✏️ Editar Imóvel Existente'}
                  </span>
                  <h4 className="text-xl font-serif font-bold text-white">
                    {editingProperty.title || 'Novo Imóvel'}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold uppercase rounded-xl transition-colors text-slate-300"
                >
                  Cancelar
                </button>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Código de Referência</label>
                  <input
                    type="text"
                    required
                    value={editingProperty.code || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, code: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                    placeholder="Ex: REF-105"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Categoria do Imóvel</label>
                  <select
                    value={editingProperty.category || 'Apartamento'}
                    onChange={(e) => setEditingProperty({ ...editingProperty, category: e.target.value as Property['category'] })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1b2a] border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Destaque / Tag</label>
                  <input
                    type="text"
                    value={editingProperty.tag || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, tag: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                    placeholder="Ex: Frente ao Mar, Piscina Privativa"
                  />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Título do Imóvel</label>
                  <input
                    type="text"
                    required
                    value={editingProperty.title || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                    placeholder="Ex: Cobertura Duplex Vista Total pro Mar"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Subtítulo / Resumo</label>
                  <input
                    type="text"
                    value={editingProperty.subtitle || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                    placeholder="Ex: Luxo, conforto e spa privativo na sacada"
                  />
                </div>
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Cidade / Praia</label>
                  <input
                    type="text"
                    required
                    value={editingProperty.city || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                    placeholder="Ex: Bombinhas"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Bairro / Praia Específica</label>
                  <input
                    type="text"
                    required
                    value={editingProperty.neighborhood || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, neighborhood: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                    placeholder="Ex: Praia de Mariscal"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Distância do Mar</label>
                  <input
                    type="text"
                    value={editingProperty.distanceToBeach || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, distanceToBeach: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                    placeholder="Ex: Pé na Areia / 50m do mar"
                  />
                </div>
              </div>

              {/* Capacities & Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Hóspedes Máx.</label>
                  <input
                    type="number"
                    min="1"
                    value={editingProperty.maxGuests || 6}
                    onChange={(e) => setEditingProperty({ ...editingProperty, maxGuests: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Dormitórios</label>
                  <input
                    type="number"
                    min="1"
                    value={editingProperty.bedrooms || 2}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bedrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Suítes</label>
                  <input
                    type="number"
                    min="0"
                    value={editingProperty.suites || 1}
                    onChange={(e) => setEditingProperty({ ...editingProperty, suites: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Banheiros</label>
                  <input
                    type="number"
                    min="1"
                    value={editingProperty.bathrooms || 2}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bathrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Vagas Garagem</label>
                  <input
                    type="number"
                    min="0"
                    value={editingProperty.parkingSpaces || 2}
                    onChange={(e) => setEditingProperty({ ...editingProperty, parkingSpaces: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Área (m²)</label>
                  <input
                    type="number"
                    min="20"
                    value={editingProperty.areaM2 || 100}
                    onChange={(e) => setEditingProperty({ ...editingProperty, areaM2: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              {/* Seasonal Daily Rates */}
              <div className="space-y-3">
                <h5 className="text-xs font-serif font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span>Tabela de Tarifas Diárias (R$)</span>
                </h5>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Baixa Temporada</label>
                    <input
                      type="number"
                      value={editingProperty.rates?.lowSeason || 500}
                      onChange={(e) => setEditingProperty({
                        ...editingProperty,
                        rates: { ...editingProperty.rates!, lowSeason: Number(e.target.value) }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Média Temporada</label>
                    <input
                      type="number"
                      value={editingProperty.rates?.midSeason || 800}
                      onChange={(e) => setEditingProperty({
                        ...editingProperty,
                        rates: { ...editingProperty.rates!, midSeason: Number(e.target.value) }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Alta Temporada</label>
                    <input
                      type="number"
                      value={editingProperty.rates?.highSeason || 1300}
                      onChange={(e) => setEditingProperty({
                        ...editingProperty,
                        rates: { ...editingProperty.rates!, highSeason: Number(e.target.value) }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Pacote Réveillon</label>
                    <input
                      type="number"
                      value={editingProperty.rates?.reveillon || 1800}
                      onChange={(e) => setEditingProperty({
                        ...editingProperty,
                        rates: { ...editingProperty.rates!, reveillon: Number(e.target.value) }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Taxa de Limpeza</label>
                    <input
                      type="number"
                      value={editingProperty.rates?.cleaningFee || 350}
                      onChange={(e) => setEditingProperty({
                        ...editingProperty,
                        rates: { ...editingProperty.rates!, cleaningFee: Number(e.target.value) }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Fotos do Imóvel com Upload do Dispositivo */}
              <div className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <h5 className="text-xs font-serif font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                      <Camera className="w-4 h-4 text-amber-400" />
                      <span>Fotos do Imóvel (Upload do Dispositivo)</span>
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Envie fotos salvas no seu celular ou computador. A primeira foto será usada como capa principal.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowUrlInputs(!showUrlInputs)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-amber-400 transition-colors self-start sm:self-auto cursor-pointer"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>{showUrlInputs ? 'Ocultar links por URL' : 'Adicionar por Link URL'}</span>
                  </button>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  onChange={(e) => handleDeviceFileUpload(e.target.files)}
                  className="hidden"
                  id="device-photo-upload-input"
                />

                {/* Upload Dropzone / Button */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDeviceFileUpload(e.dataTransfer.files);
                  }}
                  className="border-2 border-dashed border-amber-400/40 hover:border-amber-400 bg-amber-500/5 hover:bg-amber-500/10 p-6 rounded-2xl text-center transition-all cursor-pointer group flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {isUploading ? (
                      <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                    ) : (
                      <UploadCloud className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>{isUploading ? 'Processando fotos...' : 'Clique para Selecionar Fotos do Seu Dispositivo'}</span>
                    </span>
                    <p className="text-xs text-slate-400 mt-1">
                      Compatível com celular (Galeria e Câmera) e computador (JPG, PNG, WEBP). Pode selecionar várias fotos.
                    </p>
                  </div>
                </div>

                {/* Grid of Uploaded Photos */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-3 font-semibold">
                    <span>Fotos do Imóvel (Total: {(editingProperty.images || []).length})</span>
                    <span className="text-[11px] text-amber-400 font-normal">★ A 1ª imagem é a Capa</span>
                  </div>

                  {(editingProperty.images || []).length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {(editingProperty.images || []).map((imgUrl, idx) => (
                        <div 
                          key={idx} 
                          className="relative group rounded-xl overflow-hidden bg-slate-950 border border-white/10 aspect-video shadow-md hover:border-amber-400/60 transition-all"
                        >
                          <img 
                            src={imgUrl} 
                            alt={`Foto ${idx + 1}`} 
                            className="w-full h-full object-cover" 
                          />

                          {/* Cover Badge */}
                          {idx === 0 ? (
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase rounded-md shadow flex items-center gap-1 z-10">
                              <Star className="w-3 h-3 fill-slate-950" />
                              <span>Capa</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleMakeCoverPhoto(idx)}
                              className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 px-2 py-0.5 bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-[10px] uppercase rounded-md transition-all z-10 cursor-pointer"
                              title="Tornar esta foto a capa principal"
                            >
                              Tornar Capa
                            </button>
                          )}

                          {/* Delete Action Button */}
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="absolute top-2 right-2 p-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg opacity-80 hover:opacity-100 transition-all z-10 cursor-pointer shadow"
                            title="Remover Foto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 pointer-events-none">
                            <span className="text-[10px] text-slate-300 font-mono">Foto #{idx + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-white/5 rounded-xl border border-white/5 text-slate-400 text-xs">
                      Nenhuma foto cadastrada ainda. Clique na área acima para carregar fotos salvas no seu aparelho.
                    </div>
                  )}
                </div>

                {/* Optional Manual URL list */}
                {showUrlInputs && (
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <span className="text-[11px] font-bold text-slate-300 uppercase block">
                      URLs Diretas de Imagem da Web
                    </span>
                    {(editingProperty.images || []).map((imgUrl, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="url"
                          value={imgUrl}
                          onChange={(e) => {
                            const newImgs = [...(editingProperty.images || [])];
                            newImgs[idx] = e.target.value;
                            setEditingProperty({ ...editingProperty, images: newImgs });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:border-amber-400 outline-none"
                          placeholder="https://..."
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newImgs = [...(editingProperty.images || []), "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"];
                        setEditingProperty({ ...editingProperty, images: newImgs });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 py-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar Link de Imagem</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Amenities Checkboxes */}
              <div className="space-y-3">
                <h5 className="text-xs font-serif font-bold text-amber-400 uppercase tracking-widest">
                  Comodidades & Diferenciais
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-4 bg-white/5 rounded-2xl border border-white/10">
                  {COMMON_AMENITIES.map((item) => {
                    const isChecked = (editingProperty.amenities || []).includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAmenity(item)}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs text-left transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold' 
                            : 'bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400'
                        }`}
                      >
                        {isChecked ? <CheckSquare className="w-4 h-4 text-amber-400 shrink-0" /> : <Square className="w-4 h-4 text-slate-500 shrink-0" />}
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Descrição Completa</label>
                <textarea
                  rows={4}
                  value={editingProperty.description || ''}
                  onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-amber-400 outline-none"
                  placeholder="Escreva os detalhes, vistas e comodidades do imóvel..."
                />
              </div>

              {/* Submit Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar e Publicar Imóvel</span>
                </button>
              </div>
            </form>

          ) : (

            /* 3. LIST OF PROPERTIES TABLE / CARDS */
            <div className="space-y-6">
              {/* Top Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por código, título ou cidade..."
                  className="w-full sm:w-72 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:border-amber-400 outline-none"
                />

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleResetCatalog}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Restaurar catálogo original de exemplo"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Restaurar Padrão</span>
                  </button>

                  <button
                    onClick={handleCreateNew}
                    className="flex-1 sm:flex-initial px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Novo Imóvel</span>
                  </button>
                </div>
              </div>

              {/* Property Count */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Total de {filteredProperties.length} imóvel(is) cadastrado(s)</span>
                <span className="text-amber-400">💡 Clique em Editar para alterar preços, fotos ou dados</span>
              </div>

              {/* Table / List */}
              <div className="space-y-3">
                {filteredProperties.map((prop) => (
                  <div key={prop.id} className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-amber-400/40 transition-all">
                    
                    <div className="flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-white/10">
                        <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                      </div>

                      {/* Meta Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-400/30 text-amber-400 font-bold text-[10px] uppercase rounded">
                            {prop.code}
                          </span>
                          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                            {prop.category} • {prop.city}
                          </span>
                        </div>

                        <h5 className="font-serif font-bold text-white text-sm sm:text-base mt-0.5 line-clamp-1">
                          {prop.title}
                        </h5>

                        <p className="text-xs text-slate-400 font-normal">
                          Até {prop.maxGuests} pes. • {prop.bedrooms} dorm. • R$ {prop.rates.highSeason}/dia (Alta Temp.)
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => handleEdit(prop)}
                        className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-400/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>

                      <button
                        onClick={() => handleDelete(prop.id, prop.code)}
                        className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-xl transition-all border border-rose-400/20 cursor-pointer"
                        title="Excluir Imóvel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}

                {filteredProperties.length === 0 && (
                  <div className="text-center py-12 text-slate-400 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-sm font-semibold text-slate-300">Nenhum imóvel encontrado.</p>
                    <p className="text-xs text-slate-500 mt-1">Clique em "Novo Imóvel" acima para cadastrar a primeira hospedagem.</p>
                  </div>
                )}
              </div>
            </div>

          )}

        </div>

      </div>
    </div>
  );
};
