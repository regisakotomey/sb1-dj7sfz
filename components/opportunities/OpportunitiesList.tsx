'use client';

import { Briefcase, MapPin, Calendar, User, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Données de test (à remplacer par des données réelles)
const opportunities = [
  {
    id: 1,
    title: "Développeur Full Stack",
    type: "Emploi",
    company: "Tech Solutions",
    location: "Paris, France",
    postedDate: "10 Mars 2024",
    contact: "recrutement@techsolutions.fr",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 2,
    title: "Stage Marketing Digital",
    type: "Stage",
    company: "Digital Agency",
    location: "Lyon, France",
    postedDate: "12 Mars 2024",
    contact: "stages@digitalagency.fr",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 3,
    title: "Investissement Startup",
    type: "Investissement",
    company: "Innovation Hub",
    location: "Marseille, France",
    postedDate: "15 Mars 2024",
    contact: "invest@innovhub.fr",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 4,
    title: "Partenariat E-commerce",
    type: "Partenariat",
    company: "Shop Connect",
    location: "Bordeaux, France",
    postedDate: "18 Mars 2024",
    contact: "partners@shopconnect.fr",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400&h=300"
  },
];

export default function OpportunitiesList() {
  const router = useRouter();

  const handleOpportunityClick = (id: number) => {
    router.push(`/opportunities/${id}`);
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
          Opportunités disponibles
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
        }}>
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              onClick={() => handleOpportunityClick(opportunity.id)}
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
                  src={opportunity.image}
                  alt={opportunity.title}
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
                  {opportunity.type}
                </div>
              </div>

              <div style={{ padding: '1rem' }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  color: '#1a1a1a'
                }}>
                  {opportunity.title}
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: '#666'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Briefcase size={14} />
                    <span>{opportunity.company}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={14} />
                    <span>{opportunity.location}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={14} />
                    <span>Publié le {opportunity.postedDate}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={14} />
                    <span>{opportunity.contact}</span>
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