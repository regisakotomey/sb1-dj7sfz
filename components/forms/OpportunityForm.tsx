'use client';

import { useState, useRef } from 'react';
import { X, ImageIcon, Phone, Mail, Globe, MapPin, User } from 'lucide-react';

interface OpportunityFormProps {
  onClose: () => void;
}

export default function OpportunityForm({ onClose }: OpportunityFormProps) {
  const [opportunityType, setOpportunityType] = useState('');
  const [opportunityName, setOpportunityName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [promoterPhone, setPromoterPhone] = useState('');
  const [promoterEmail, setPromoterEmail] = useState('');
  const [promoterWebsite, setPromoterWebsite] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedFiles.length <= 5) {
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
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
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Ajouter une opportunité</h3>
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
            {/* Type d'opportunité */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Type d'opportunité
              </label>
              <select
                value={opportunityType}
                onChange={(e) => setOpportunityType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem'
                }}
              >
                <option value="">Sélectionner un type</option>
                <option value="job">Emploi</option>
                <option value="internship">Stage</option>
                <option value="freelance">Freelance</option>
                <option value="partnership">Partenariat</option>
                <option value="investment">Investissement</option>
                <option value="other">Autre</option>
              </select>
            </div>

            {/* Nom de l'opportunité */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Nom de l'opportunité
              </label>
              <input
                type="text"
                value={opportunityName}
                onChange={(e) => setOpportunityName(e.target.value)}
                placeholder="Titre de l'opportunité"
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

            {/* Description */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Description de l'opportunité
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez l'opportunité en détail..."
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

            {/* Images */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Images ({selectedFiles.length}/5)
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
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

              {selectedFiles.length > 0 && (
                <div style={{
                  marginTop: '1rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: '0.5rem'
                }}>
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        position: 'relative',
                        aspectRatio: '1',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Image ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <button
                        onClick={() => removeFile(index)}
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