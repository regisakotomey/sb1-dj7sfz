'use client';

import { useState, useRef } from 'react';
import { X, ImageIcon, Phone, Mail, Globe, User } from 'lucide-react';

interface ShopFormProps {
  onClose: () => void;
}

export default function ShopForm({ onClose }: ShopFormProps) {
  const [businessType, setBusinessType] = useState('');
  const [shopName, setShopName] = useState('');
  const [products, setProducts] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [newCountry, setNewCountry] = useState('');
  const [promoterPhone, setPromoterPhone] = useState('');
  const [promoterEmail, setPromoterEmail] = useState('');
  const [promoterWebsite, setPromoterWebsite] = useState('');
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  const addCountry = () => {
    if (newCountry && !countries.includes(newCountry)) {
      setCountries([...countries, newCountry]);
      setNewCountry('');
    }
  };

  const removeCountry = (countryToRemove: string) => {
    setCountries(countries.filter(country => country !== countryToRemove));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <div style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          padding: '1rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1
        }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Ajouter une boutique</h3>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '1rem' }}>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Domaine d'activité */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Domaine d'activité
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem'
                }}
              >
                <option value="">Sélectionner un domaine</option>
                <option value="fashion">Mode et Vêtements</option>
                <option value="electronics">Électronique</option>
                <option value="food">Alimentation</option>
                <option value="beauty">Beauté et Cosmétiques</option>
                <option value="health">Santé et Bien-être</option>
                <option value="home">Maison et Décoration</option>
                <option value="sports">Sports et Loisirs</option>
                <option value="books">Livres et Médias</option>
                <option value="toys">Jouets et Jeux</option>
                <option value="art">Art et Artisanat</option>
                <option value="other">Autre</option>
              </select>
            </div>

            {/* Logo */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Logo (facultatif)
              </label>
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoSelect}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <ImageIcon size={20} />
                <span>Ajouter un logo</span>
              </button>

              {logo && (
                <div style={{
                  marginTop: '1rem',
                  position: 'relative',
                  width: '100px',
                  height: '100px',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={URL.createObjectURL(logo)}
                    alt="Logo"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <button
                    onClick={removeLogo}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <X size={14} color="white" />
                  </button>
                </div>
              )}
            </div>

            {/* Nom de la boutique */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Nom de la boutique
              </label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="Nom de votre boutique"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Articles fournis */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Articles fournis
              </label>
              <textarea
                value={products}
                onChange={(e) => setProducts(e.target.value)}
                placeholder="Listez les articles que vous proposez..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem',
                  minHeight: '150px',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Pays desservis */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Pays desservis
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  placeholder="Ajouter un pays"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    fontSize: '0.9rem'
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCountry();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addCountry}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Ajouter
                </button>
              </div>

              {countries.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {countries.map((country, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: '#f0f0f0',
                        padding: '0.5rem 1rem',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span style={{ fontSize: '0.9rem' }}>{country}</span>
                      <button
                        onClick={() => removeCountry(country)}
                        style={{
                          border: 'none',
                          background: 'none',
                          padding: '0',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '16px',
                          height: '16px'
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact du promoteur */}
            <div>
              <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
                <User size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Contact du promoteur
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={20} />
                  <input
                    type="tel"
                    value={promoterPhone}
                    onChange={(e) => setPromoterPhone(e.target.value)}
                    placeholder="Numéro de téléphone"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={20} />
                  <input
                    type="email"
                    value={promoterEmail}
                    onChange={(e) => setPromoterEmail(e.target.value)}
                    placeholder="Adresse email"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Globe size={20} />
                  <input
                    type="url"
                    value={promoterWebsite}
                    onChange={(e) => setPromoterWebsite(e.target.value)}
                    placeholder="Site web"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem',
              position: 'sticky',
              bottom: 0,
              backgroundColor: 'white',
              padding: '1rem 0',
              borderTop: '1px solid #e0e0e0'
            }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Annuler
              </button>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Publier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}