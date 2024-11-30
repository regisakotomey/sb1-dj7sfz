'use client';

import { useState, useRef } from 'react';
import { X, ImageIcon, Phone, Mail, Globe, MapPin, Clock, User } from 'lucide-react';

interface PlaceFormProps {
  onClose: () => void;
}

interface OpeningHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export default function PlaceForm({ onClose }: PlaceFormProps) {
  const [placeType, setPlaceType] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [services, setServices] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [promoterPhone, setPromoterPhone] = useState('');
  const [promoterEmail, setPromoterEmail] = useState('');
  const [promoterWebsite, setPromoterWebsite] = useState('');
  const [openingHours, setOpeningHours] = useState<OpeningHours[]>([
    { day: 'Lundi', isOpen: false, openTime: '', closeTime: '' },
    { day: 'Mardi', isOpen: false, openTime: '', closeTime: '' },
    { day: 'Mercredi', isOpen: false, openTime: '', closeTime: '' },
    { day: 'Jeudi', isOpen: false, openTime: '', closeTime: '' },
    { day: 'Vendredi', isOpen: false, openTime: '', closeTime: '' },
    { day: 'Samedi', isOpen: false, openTime: '', closeTime: '' },
    { day: 'Dimanche', isOpen: false, openTime: '', closeTime: '' }
  ]);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const additionalImagesInputRef = useRef<HTMLInputElement>(null);

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
    }
  };

  const handleMainImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleAdditionalImagesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + additionalImages.length <= 5) {
      setAdditionalImages(prev => [...prev, ...files]);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  const removeMainImage = () => {
    setMainImage(null);
    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = '';
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleLocationChoice = (choice: 'current' | 'manual') => {
    if (choice === 'current') {
      setUseCurrentLocation(true);
      setShowManualLocation(false);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords);
          },
          (error) => {
            console.error('Erreur de géolocalisation:', error);
            setUseCurrentLocation(false);
          }
        );
      }
    } else {
      setUseCurrentLocation(false);
      setShowManualLocation(true);
    }
  };

  const updateOpeningHours = (index: number, field: keyof OpeningHours, value: string | boolean) => {
    setOpeningHours(prev => prev.map((hour, i) => 
      i === index ? { ...hour, [field]: value } : hour
    ));
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
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Ajouter un lieu</h3>
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
            {/* Type de lieu */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Type de lieu
              </label>
              <select
                value={placeType}
                onChange={(e) => setPlaceType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem'
                }}
              >
                <option value="">Sélectionner un type</option>
                <option value="restaurant">Restaurant</option>
                <option value="hotel">Hôtel</option>
                <option value="bar">Bar</option>
                <option value="cafe">Café</option>
                <option value="shop">Boutique</option>
                <option value="culture">Lieu culturel</option>
                <option value="sport">Installation sportive</option>
                <option value="other">Autre</option>
              </select>
            </div>

            {/* Nom du lieu */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Nom du lieu (facultatif)
              </label>
              <input
                type="text"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                placeholder="Nom de votre établissement"
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

            {/* Descriptions */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Courte description
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Résumé en quelques mots"
                maxLength={100}
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

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Description détaillée
              </label>
              <textarea
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                placeholder="Description complète du lieu"
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

            {/* Services */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Services / Produits fournis
              </label>
              <textarea
                value={services}
                onChange={(e) => setServices(e.target.value)}
                placeholder="Liste des services et produits disponibles"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem',
                  minHeight: '100px',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Images Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Logo */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                  Logo
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

              {/* Image principale */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                  Image principale
                </label>
                <input
                  type="file"
                  ref={mainImageInputRef}
                  onChange={handleMainImageSelect}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => mainImageInputRef.current?.click()}
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
                  <span>Ajouter l'image principale</span>
                </button>

                {mainImage && (
                  <div style={{
                    marginTop: '1rem',
                    position: 'relative',
                    width: '100%',
                    height: '200px',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={URL.createObjectURL(mainImage)}
                      alt="Image principale"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <button
                      onClick={removeMainImage}
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

              {/* Images additionnelles */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                  Images additionnelles (facultatif) - {additionalImages.length}/5
                </label>
                <input
                  type="file"
                  ref={additionalImagesInputRef}
                  onChange={handleAdditionalImagesSelect}
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => additionalImagesInputRef.current?.click()}
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
                  <span>Ajouter des images</span>
                </button>

                {additionalImages.length > 0 && (
                  <div style={{
                    marginTop: '1rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: '0.5rem'
                  }}>
                    {additionalImages.map((image, index) => (
                      <div
                        key={index}
                        style={{
                          position: 'relative',
                          width: '100%',
                          paddingBottom: '100%'
                        }}
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index + 1}`}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                        <button
                          onClick={() => removeAdditionalImage(index)}
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
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Localisation */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                <MapPin size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Localisation
              </label>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <button
                  type="button"
                  onClick={() => handleLocationChoice('current')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: useCurrentLocation ? '#f0f0f0' : 'white',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Utiliser ma position actuelle
                </button>
                <button
                  type="button"
                  onClick={() => handleLocationChoice('manual')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: showManualLocation ? '#f0f0f0' : 'white',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Définir manuellement
                </button>
              </div>

              {showManualLocation && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                      Pays
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
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
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                </div>
              )}
            </div>

            {/* Horaires d'ouverture */}
            <div>
              <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
                <Clock size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Horaires d'ouverture
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {openingHours.map((day, index) => (
                  <div key={day.day} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                  }}>
                    <div style={{ width: '100px' }}>{day.day}</div>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={day.isOpen}
                        onChange={(e) => updateOpeningHours(index, 'isOpen', e.target.checked)}
                        style={{ margin: 0 }}
                      />
                      <span style={{ fontSize: '0.9rem' }}>Ouvert</span>
                    </label>
                    {day.isOpen && (
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flex: 1 }}>
                        <input
                          type="time"
                          value={day.openTime}
                          onChange={(e) => updateOpeningHours(index, 'openTime', e.target.value)}
                          style={{
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #e0e0e0',
                            fontSize: '0.9rem'
                          }}
                        />
                        <span>à</span>
                        <input
                          type="time"
                          value={day.closeTime}
                          onChange={(e) => updateOpeningHours(index, 'closeTime', e.target.value)}
                          style={{
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #e0e0e0',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
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