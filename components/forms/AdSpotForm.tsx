'use client';

import { useState, useRef } from 'react';
import { X, ImageIcon } from 'lucide-react';

interface AdSpotFormProps {
  onClose: () => void;
}

interface MediaFile {
  file: File;
  type: 'image' | 'video';
  caption: string;
}

export default function AdSpotForm({ onClose }: AdSpotFormProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newMediaFiles = files.map(file => ({
      file,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      caption: ''
    }));
    
    if (mediaFiles.length + newMediaFiles.length <= 5) {
      setMediaFiles(prev => [...prev, ...newMediaFiles]);
    }
  };

  const removeFile = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const updateCaption = (index: number, caption: string) => {
    setMediaFiles(prev => prev.map((file, i) => 
      i === index ? { ...file, caption } : file
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
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Créer un spot publicitaire</h3>
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
            {/* Sélection des médias */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Médias ({mediaFiles.length}/5)
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,video/*"
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
                <span>Ajouter des images ou vidéos</span>
              </button>

              {mediaFiles.length > 0 && (
                <div style={{
                  marginTop: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {mediaFiles.map((media, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        padding: '1rem'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          width: '120px',
                          height: '120px',
                          position: 'relative',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}>
                          {media.type === 'image' ? (
                            <img
                              src={URL.createObjectURL(media.file)}
                              alt={`Media ${index + 1}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          ) : (
                            <video
                              src={URL.createObjectURL(media.file)}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          )}
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
                        <div style={{ flex: 1 }}>
                          <textarea
                            value={media.caption}
                            onChange={(e) => updateCaption(index, e.target.value)}
                            placeholder="Ajouter une légende..."
                            style={{
                              width: '100%',
                              height: '100%',
                              padding: '0.75rem',
                              borderRadius: '8px',
                              border: '1px solid #e0e0e0',
                              resize: 'none',
                              fontSize: '0.9rem',
                              fontFamily: 'inherit'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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