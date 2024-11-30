'use client';

import { useState } from 'react';
import { Search, MoreVertical, Send, Image, Smile, Phone, Video, User } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// Données de test pour les conversations
const conversations = [
  {
    id: 1,
    user: {
      name: 'Marie Laurent',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      online: true,
      lastSeen: 'En ligne'
    },
    lastMessage: {
      text: 'Bonjour, je suis intéressé par votre annonce...',
      time: '10:30',
      unread: true
    }
  },
  {
    id: 2,
    user: {
      name: 'Thomas Martin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      online: false,
      lastSeen: 'Il y a 2h'
    },
    lastMessage: {
      text: 'D\'accord, je vous envoie les détails par email.',
      time: 'Hier',
      unread: false
    }
  },
  {
    id: 3,
    user: {
      name: 'Sophie Bernard',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
      online: true,
      lastSeen: 'En ligne'
    },
    lastMessage: {
      text: 'Merci beaucoup !',
      time: 'Hier',
      unread: false
    }
  }
];

// Données de test pour les messages
const messages = [
  {
    id: 1,
    sender: 'them',
    text: 'Bonjour, je suis intéressé par votre annonce. Est-ce que l\'article est toujours disponible ?',
    time: '10:30'
  },
  {
    id: 2,
    sender: 'me',
    text: 'Bonjour ! Oui, l\'article est toujours disponible.',
    time: '10:31'
  },
  {
    id: 3,
    sender: 'them',
    text: 'Super ! Est-ce qu\'il serait possible d\'avoir plus de photos ?',
    time: '10:32'
  },
  {
    id: 4,
    sender: 'me',
    text: 'Bien sûr, je vous envoie ça tout de suite.',
    time: '10:33'
  }
];

export default function MessagingInterface() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Ici, vous ajouteriez la logique pour envoyer le message
      console.log('Message envoyé:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
       
      <main style={{
        flex: 1,
        paddingTop: '60px',
        marginLeft: '250px',
        display: 'flex',
      
      }}>
       
        {/* Liste des conversations */}
        <div style={{
          width: '350px',
          borderRight: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white'
        }}>
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <div style={{
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder="Rechercher une conversation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  paddingLeft: '2.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem'
                }}
              />
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#666'
                }}
              />
            </div>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto'
          }}>
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                style={{
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  cursor: 'pointer',
                  backgroundColor: selectedConversation.id === conversation.id ? '#f8f9fa' : 'transparent',
                  borderBottom: '1px solid #e0e0e0',
                  transition: 'background-color 0.2s'
                }}
              >
                <div style={{
                  position: 'relative'
                }}>
                  <img
                    src={conversation.user.avatar}
                    alt={conversation.user.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  {conversation.user.online && (
                    <div style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#22c55e',
                      borderRadius: '50%',
                      border: '2px solid white',
                      position: 'absolute',
                      bottom: 0,
                      right: 0
                    }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.25rem'
                  }}>
                    <span style={{
                      fontWeight: 500,
                      fontSize: '0.95rem'
                    }}>
                      {conversation.user.name}
                    </span>
                    <span style={{
                      fontSize: '0.8rem',
                      color: '#666'
                    }}>
                      {conversation.lastMessage.time}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '0.9rem',
                      color: conversation.lastMessage.unread ? '#1a1a1a' : '#666',
                      fontWeight: conversation.lastMessage.unread ? 500 : 400,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '200px'
                    }}>
                      {conversation.lastMessage.text}
                    </span>
                    {conversation.lastMessage.unread && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '50%'
                      }} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone de conversation */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white'
        }}>
          {/* En-tête de la conversation */}
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <img
                src={selectedConversation.user.avatar}
                alt={selectedConversation.user.name}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div>
                <div style={{
                  fontWeight: 500,
                  fontSize: '0.95rem'
                }}>
                  {selectedConversation.user.name}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: selectedConversation.user.online ? '#22c55e' : '#666'
                }}>
                  {selectedConversation.user.lastSeen}
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              
              <button style={{
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                backgroundColor: 'white',
                color: '#666',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '70%',
                  backgroundColor: message.sender === 'me' ? '#1a1a1a' : '#f0f0f0',
                  color: message.sender === 'me' ? 'white' : '#1a1a1a',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  borderBottomRightRadius: message.sender === 'me' ? '4px' : '12px',
                  borderBottomLeftRadius: message.sender === 'me' ? '12px' : '4px'
                }}>
                  <div style={{
                    marginBottom: '0.25rem',
                    fontSize: '0.95rem'
                  }}>
                    {message.text}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    opacity: 0.8,
                    textAlign: 'right'
                  }}>
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Zone de saisie */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: '1rem',
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            <button
              type="button"
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                backgroundColor: 'white',
                color: '#666',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image size={18} />
            </button>
            <button
              type="button"
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                backgroundColor: 'white',
                color: '#666',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Smile size={18} />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                fontSize: '0.95rem'
              }}
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: newMessage.trim() ? '#1a1a1a' : '#e0e0e0',
                color: 'white',
                cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}