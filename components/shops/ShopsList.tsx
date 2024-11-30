'use client';

import { Store, Globe, MapPin, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Données de test (à remplacer par des données réelles)
const shops = [
  {
    id: 1,
    name: "Mode Élégante",
    type: "Mode et Vêtements",
    countries: ["France", "Belgique", "Suisse"],
    website: "www.modeelegante.fr",
    products: "Vêtements, Accessoires, Chaussures",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 2,
    name: "Tech Store",
    type: "Électronique",
    countries: ["France", "Allemagne", "Italie"],
    website: "www.techstore.fr",
    products: "Smartphones, Ordinateurs, Accessoires",
    logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 3,
    name: "Bio & Nature",
    type: "Alimentation",
    countries: ["France"],
    website: "www.bionature.fr",
    products: "Produits bio, Épicerie fine",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 4,
    name: "Beauté Pure",
    type: "Beauté et Cosmétiques",
    countries: ["France", "Espagne"],
    website: "www.beautepure.fr",
    products: "Cosmétiques, Soins, Parfums",
    logo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400&h=300"
  },
];

export default function ShopsList() {
  const router = useRouter();

  const handleShopClick = (id: number) => {
    router.push(`/shops/${id}`);
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
          Boutiques en ligne
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
        }}>
          {shops.map((shop) => (
            <div
              key={shop.id}
              onClick={() => handleShopClick(shop.id)}
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
                  src={shop.logo}
                  alt={shop.name}
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
                  {shop.type}
                </div>
              </div>

              <div style={{ padding: '1rem' }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  color: '#1a1a1a'
                }}>
                  {shop.name}
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: '#666'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Store size={14} />
                    <span>{shop.type}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={14} />
                    <span>{shop.countries.join(', ')}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShoppingBag size={14} />
                    <span>{shop.products}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={14} />
                    <span>{shop.website}</span>
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