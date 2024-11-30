'use client';

import { useParams } from 'next/navigation';
import { 
  MapPin, Phone, Mail, Globe, Share2, Heart, 
  Send, UserCircle2, Flag, Edit, Trash2, Bell, DollarSign,
  Briefcase, User
} from 'lucide-react';
import { useState } from 'react';

// Données de test pour l'opportunité
const opportunityData = {
  id: 1,
  title: "Développeur Full Stack",
  type: "Emploi",
  company: "Tech Solutions",
  description: "Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe dynamique. Le candidat idéal aura une solide expérience en développement web moderne et une passion pour les nouvelles technologies.",
  requirements: [
    "5+ ans d'expérience en développement web",
    "Maîtrise de React, Node.js et TypeScript",
    "Expérience avec les bases de données SQL et NoSQL",
    "Excellentes capacités de communication"
  ],
  location: "Paris, France",
  salary: "45-65k€",
  contractType: "CDI",
  postedDate: "10 Mars 2024",
  deadline: "10 Avril 2024",
  contact: {
    name: "Marie Dubois",
    phone: "+33 1 23 45 67 89",
    email: "recrutement@techsolutions.fr",
    website: "www.techsolutions.fr"
  },
  mainImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=2000",
  gallery: [
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800"
  ],
  interestedCount: 45,
  owner: {
    name: "Tech Solutions",
    followers: 1250,
    isFollowed: false
  },
  isOwner: true
};

// Données de test pour les commentaires
const initialComments = [
  {
    id: 1,
    author: "Jean Martin",
    date: "Il y a 2 jours",
    content: "Cette opportunité semble très intéressante ! Est-ce que le télétravail est possible ?",
    likes: 8
  },
  {
    id: 2,
    author: "Sophie Bernard",
    date: "Il y a 1 jour",
    content: "Quelle est la taille de l'équipe actuelle ?",
    likes: 5
  },
  {
    id: 3,
    author: "Lucas Petit",
    date: "Il y a 5 heures",
    content: "Je viens de postuler, j'espère avoir un retour rapidement !",
    likes: 3
  }
];

export default function OpportunityDetails() {
  const params = useParams();
  const [isInterested, setIsInterested] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(opportunityData.owner.isFollowed);
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(initialComments);
  const [likedComments, setLikedComments] = useState<number[]>([]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Vous",
        date: "À l'instant",
        content: newComment,
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleCommentLike = (commentId: number) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter(id => id !== commentId));
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes - 1 }
          : comment
      ));
    } else {
      setLikedComments([...likedComments, commentId]);
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ));
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: opportunityData.title,
        text: opportunityData.description,
        url: window.location.href
      });
    } else {
      setShowShareOptions(true);
    }
  };

  return (
    <main style={{
      flex: 1,
      paddingTop: '76px',
      margin: '0 auto',
      width: '100%',
      maxWidth: '800px',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        padding: '1rem',
        boxSizing: 'border-box',
        width: '100%',
      }}>
        {/* Image principale et informations de base */}
        <div style={{
          width: '100%',
          height: '400px',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '1rem',
          position: 'relative'
        }}>
          <img
            src={opportunityData.mainImage}
            alt={opportunityData.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2rem 1rem 1rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            color: 'white'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div>
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>
                  {opportunityData.title}
                </h1>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '0.9rem'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Briefcase size={16} />
                    {opportunityData.company}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} />
                    {opportunityData.location}
                  </span>
                </div>
              </div>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                {opportunityData.type}
              </div>
            </div>
          </div>
        </div>

        {/* Actions principales */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setIsInterested(!isInterested)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: isInterested ? '#1a1a1a' : 'white',
                color: isInterested ? 'white' : '#666',
                border: `1px solid ${isInterested ? '#1a1a1a' : '#e0e0e0'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              <Heart size={18} fill={isInterested ? 'white' : 'none'} />
              {isInterested ? 'Intéressé' : `S'intéresser`} ({opportunityData.interestedCount})
            </button>
            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                color: '#666',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              <Share2 size={18} />
              Partager
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {opportunityData.isOwner ? (
              <>
                <button
                  onClick={() => setShowSponsorModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#4c1d95',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  <DollarSign size={18} />
                  Sponsoriser
                </button>
                <button
                  onClick={() => setShowEditModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  <Edit size={18} />
                  Modifier
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  <Trash2 size={18} />
                  Supprimer
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowReportModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'white',
                  color: '#666',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                <Flag size={18} />
                Signaler
              </button>
            )}
          </div>
        </div>

        {/* Informations du propriétaire */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <User size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, marginBottom: '0.25rem' }}>{opportunityData.owner.name}</h3>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  {opportunityData.owner.followers} abonnés
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsSubscribed(!isSubscribed)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: isSubscribed ? '#1a1a1a' : 'white',
                color: isSubscribed ? 'white' : '#666',
                border: `1px solid ${isSubscribed ? '#1a1a1a' : '#e0e0e0'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              <Bell size={18} />
              {isSubscribed ? 'Abonné' : `S'abonner`}
            </button>
          </div>
        </div>

        {/* Description et détails */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              Description
            </h2>
            <p style={{
              lineHeight: 1.6,
              color: '#666',
              marginBottom: '1.5rem'
            }}>
              {opportunityData.description}
            </p>

            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              Prérequis
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {opportunityData.requirements.map((requirement, index) => (
                <li
                  key={index}
                  style={{
                    padding: '0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#666'
                  }}
                >
                  <span style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '50%',
                    flexShrink: 0
                  }} />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
          }}>
            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <MapPin size={20} />
                <strong>Localisation</strong>
              </div>
              <p>{opportunityData.location}</p>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Phone size={20} />
                <strong>Téléphone</strong>
              </div>
              <p>{opportunityData.contact.phone}</p>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Mail size={20} />
                <strong>Email</strong>
              </div>
              <p>{opportunityData.contact.email}</p>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Globe size={20} />
                <strong>Site web</strong>
              </div>
              <p>{opportunityData.contact.website}</p>
            </div>
          </div>
        </div>

        {/* Galerie photos */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            Galerie photos
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {opportunityData.gallery.map((image, index) => (
              <div
                key={index}
                style={{
                  width: '100%',
                  paddingTop: '75%',
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section commentaires */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            Commentaires ({comments.length})
          </h2>

          {/* Formulaire de commentaire */}
          <form 
            onSubmit={handleCommentSubmit}
            style={{
              marginBottom: '2rem',
              display: 'flex',
              gap: '1rem'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <UserCircle2 size={24} />
            </div>
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  resize: 'vertical',
                  minHeight: '80px',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: newComment.trim() ? '#1a1a1a' : '#e0e0e0',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                    fontSize: '0.9rem'
                  }}
                >
                  <Send size={16} />
                  Publier
                </button>
              </div>
            </div>
          </form>

          {/* Liste des commentaires */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid #e0e0e0'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <UserCircle2 size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <div>
                      <span style={{
                        fontWeight: 500,
                        marginRight: '0.5rem'
                      }}>
                        {comment.author}
                      </span>
                      <span style={{
                        color: '#666',
                        fontSize: '0.9rem'
                      }}>
                        {comment.date}
                      </span>
                    </div>
                  </div>
                  <p style={{
                    marginBottom: '0.75rem',
                    lineHeight: 1.5,
                    color: '#1a1a1a'
                  }}>
                    {comment.content}
                  </p>
                  <button
                    onClick={() => handleCommentLike(comment.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'none',
                      border: 'none',
                      color: likedComments.includes(comment.id) ? '#ff4b4b' : '#666',
                      cursor: 'pointer',
                      padding: '0.25rem 0',
                      fontSize: '0.9rem'
                    }}
                  >
                    <Heart
                      size={16}
                      fill={likedComments.includes(comment.id) ? '#ff4b4b' : 'none'}
                    />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}