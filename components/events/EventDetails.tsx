'use client';

import { useParams } from 'next/navigation';
import { 
  Calendar, MapPin, Clock, User, Phone, Mail, Globe, Share2, Heart, 
  Send, UserCircle2, Flag, AlertTriangle, Edit, Ban, DollarSign, Bell
} from 'lucide-react';
import { useState } from 'react';

// Données de test pour l'événement
const eventData = {
  id: 1,
  title: "Festival de Musique",
  date: "15 Mars 2024",
  time: "14:00 - 23:00",
  location: "Paris, France",
  organizer: {
    name: "Association Musicale",
    followers: 1250,
    isFollowed: false
  },
  description: "Un festival de musique unique qui réunit les meilleurs artistes de la scène contemporaine. Venez vivre une expérience musicale inoubliable !",
  phone: "+33 1 23 45 67 89",
  email: "contact@festival.fr",
  website: "www.festival.fr",
  mainImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=2000",
  gallery: [
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800"
  ],
  interestedCount: 156,
  isOwner: true // Pour simuler que l'utilisateur est le propriétaire
};

// Données de test pour les commentaires
const initialComments = [
  {
    id: 1,
    author: "Marie Dubois",
    date: "Il y a 2 jours",
    content: "Super événement ! J'ai déjà réservé mes billets. Quelqu'un d'autre y va ?",
    likes: 12
  },
  {
    id: 2,
    author: "Thomas Martin",
    date: "Il y a 1 jour",
    content: "J'y étais l'année dernière, c'était vraiment génial. Je recommande !",
    likes: 8
  },
  {
    id: 3,
    author: "Sophie Bernard",
    date: "Il y a 5 heures",
    content: "Est-ce qu'il y a des réductions pour les étudiants ?",
    likes: 3
  }
];

export default function EventDetails() {
  const params = useParams();
  const [isInterested, setIsInterested] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(eventData.organizer.isFollowed);
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
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
        title: eventData.title,
        text: eventData.description,
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
        {/* Image principale et actions rapides */}
        <div style={{
          width: '100%',
          height: '400px',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '1rem',
          position: 'relative'
        }}>
          <img
            src={eventData.mainImage}
            alt={eventData.title}
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
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 600,
              marginBottom: '0.5rem'
            }}>
              {eventData.title}
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.9rem'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} />
                {eventData.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} />
                {eventData.time}
              </span>
            </div>
          </div>
        </div>

        {/* Barre d'actions principale */}
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
                backgroundColor: isInterested ? '#ff4b4b' : 'white',
                color: isInterested ? 'white' : '#666',
                border: `1px solid ${isInterested ? '#ff4b4b' : '#e0e0e0'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              <Heart size={18} fill={isInterested ? 'white' : 'none'} />
              {isInterested ? 'Intéressé' : `S'intéresser`} ({eventData.interestedCount})
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
            {eventData.isOwner ? (
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
                  onClick={() => setShowCancelModal(true)}
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
                  <Ban size={18} />
                  Annuler
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

        {/* Informations de l'organisateur */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
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
              <h3 style={{ margin: 0, marginBottom: '0.25rem' }}>{eventData.organizer.name}</h3>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>{eventData.organizer.followers} abonnés</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: isFollowing ? '#1a1a1a' : 'white',
                color: isFollowing ? 'white' : '#666',
                border: `1px solid ${isFollowing ? '#1a1a1a' : '#e0e0e0'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              <Bell size={18} />
              {isFollowing ? 'Abonné' : `S'abonner`}
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
              À propos de l'événement
            </h2>
            <p style={{
              lineHeight: 1.6,
              color: '#666'
            }}>
              {eventData.description}
            </p>
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
                <strong>Lieu</strong>
              </div>
              <p>{eventData.location}</p>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Phone size={20} />
                <strong>Contact</strong>
              </div>
              <p>{eventData.phone}</p>
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
              <p>{eventData.email}</p>
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
              <p>{eventData.website}</p>
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
            {eventData.gallery.map((image, index) => (
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