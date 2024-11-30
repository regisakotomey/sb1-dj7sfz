'use client';

import { MapPin, Phone, Clock, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Données de test (à remplacer par des données réelles)
const places = [
  {
    id: 1,
    name: "Le Café Parisien",
    type: "Restaurant",
    address: "Paris, France",
    phone: "+33 1 23 45 67 89",
    hours: "09:00 - 22:00",
    website: "www.lecafeparisien.fr",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 2,
    name: "Galerie d'Art Moderne",
    type: "Galerie",
    address: "Lyon, France",
    phone: "+33 4 56 78 90 12",
    hours: "10:00 - 18:00",
    website: "www.galeriemoderne.fr",
    image: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 3,
    name: "Le Sport Club",
    type: "Salle de sport",
    address: "Marseille, France",
    phone: "+33 4 91 23 45 67",
    hours: "06:00 - 23:00",
    website: "www.lesportclub.fr",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 4,
    name: "Librairie Ancienne",
    type: "Librairie",
    address: "Bordeaux, France",
    phone: "+33 5 56 78 90 12",
    hours: "09:30 - 19:00",
    website: "www.librairieancienne.fr",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400&h=300"
  },
];

export default function PlacesList() {
  const router = useRouter();

  return (
    <main style={{
      flex: 1,
      paddingTop: '76px',
      margin: '0 auto',
      width: '100%',
      maxWidth: '550px',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        padding: '1rem',
        boxSizing: 'border-box',
        width: '100%',
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          color: '#1a1a1a'
        }}>
          Lieux à découvrir
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
        }}>
          {places.map((place) => (
            <div
              key={place.id}
              onClick={() => router.push(`/places/${place.id}`)}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{
                width: '100%',
                height: '160px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img
                  src={place.image}
                  alt={place.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem'
                }}>
                  {place.type}
                </div>
              </div>

              <div style={{ padding: '1rem' }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  color: '#1a1a1a'
                }}>
                  {place.name}
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: '#666'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={14} />
                    <span>{place.address}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={14} />
                    <span>{place.phone}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={14} />
                    <span>{place.hours}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={14} />
                    <span>{place.website}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}