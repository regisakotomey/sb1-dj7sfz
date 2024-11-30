'use client';

import { Play, User, Calendar, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Données de test pour les spots publicitaires
const adSpots = [
  {
    id: 1,
    title: "Nouvelle Collection Été",
    author: "Mode Élégante",
    date: "15 Mars 2024",
    description: "Découvrez notre nouvelle collection été avec des pièces uniques et tendance.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600&h=400"
    },
    likes: 156
  },
  {
    id: 2,
    title: "Promotion Spéciale",
    author: "Tech Store",
    date: "14 Mars 2024",
    description: "Profitez de -30% sur tous nos smartphones pendant une semaine !",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600&h=400"
    },
    likes: 89
  },
  {
    id: 3,
    title: "Nouveau Restaurant",
    author: "Le Café Parisien",
    date: "13 Mars 2024",
    description: "Ouverture de notre nouveau restaurant au cœur de Paris. Venez découvrir notre cuisine raffinée.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600&h=400"
    },
    likes: 234
  },
  {
    id: 4,
    title: "Festival de Musique",
    author: "Event Organizer",
    date: "12 Mars 2024",
    description: "Le plus grand festival de musique de l'année arrive bientôt. Réservez vos places !",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600&h=400"
    },
    likes: 412
  }
];

export default function AdSpotsList() {
  const router = useRouter();

  const handleAdSpotClick = (id: number) => {
    router.push(`/ads/${id}`);
  };
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
          Spots publicitaires
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
        }}>
          {adSpots.map((spot) => (
            <div
              key={spot.id}
              onClick={() => router.push(`/ads/${spot.id}`)}
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
                height: '200px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img
                  src={spot.media.url}
                  alt={spot.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {spot.media.type === 'video' && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Play size={24} color="white" />
                  </div>
                )}
              </div>

              <div style={{ padding: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <User size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{spot.author}</div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8rem',
                      color: '#666'
                    }}>
                      <Calendar size={12} />
                      {spot.date}
                    </div>
                  </div>
                </div>

                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#1a1a1a'
                }}>
                  {spot.title}
                </h3>

                <p style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {spot.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  <Heart size={16} />
                  <span>{spot.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}