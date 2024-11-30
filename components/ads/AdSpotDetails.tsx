'use client';

import { useParams } from 'next/navigation';
import { 
  MapPin, Share2, Heart, Send, UserCircle2, Flag, 
  Edit, Trash2, Bell, DollarSign, User 
} from 'lucide-react';
import { useState } from 'react';

// Données de test pour le spot publicitaire
const spotData = {
  id: 1,
  title: "Nouvelle Collection Été",
  author: {
    name: "Mode Élégante",
    followers: 1250,
    isFollowed: false
  },
  date: "15 Mars 2024",
  description: "Découvrez notre nouvelle collection été avec des pièces uniques et tendance.",
  media: {
    type: "image",
    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2000"
  },
  gallery: [
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800"
  ],
  likes: 156,
  location: "Paris, France",
  isOwner: true
};

// Données de test pour les commentaires
const initialComments = [
  {
    id: 1,
    author: "Sophie Martin",
    date: "Il y a 2 jours",
    content: "Superbe collection ! J'ai hâte de découvrir les nouveautés.",
    likes: 12
  },
  {
    id: 2,
    author: "Thomas Dubois",
    date: "Il y a 1 jour",
    content: "Les designs sont vraiment originaux. Bravo !",
    likes: 8
  },
  {
    id: 3,
    author: "Marie Lambert",
    date: "Il y a 5 heures",
    content: "Est-ce que la collection sera disponible en boutique ?",
    likes: 3
  }
];

export default function AdSpotDetails() {
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(spotData.author.isFollowed);
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
        title: spotData.title,
        text: spotData.description,
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
      <div className="max-w-7xl mx-auto">
        {/* Image principale */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="aspect-video relative">
            <img
              src={spotData.media.url}
              alt={spotData.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{spotData.title}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span>{spotData.location}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked
                      ? 'bg-red-500 text-white'
                      : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Heart size={20} fill={isLiked ? 'white' : 'none'} />
                  <span>{spotData.likes}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 mb-6">
              {spotData.isOwner ? (
                <>
                  <button
                    onClick={() => setShowSponsorModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <DollarSign size={20} />
                    <span>Sponsoriser</span>
                  </button>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Edit size={20} />
                    <span>Modifier</span>
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                    <span>Supprimer</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowReportModal(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Flag size={20} />
                  <span>Signaler</span>
                </button>
              )}
            </div>

            {/* Auteur */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-medium">{spotData.author.name}</h3>
                  <p className="text-sm text-gray-500">
                    {spotData.author.followers} abonnés
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isSubscribed
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Bell size={20} />
                <span>{isSubscribed ? 'Abonné' : "S'abonner"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Galerie */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {spotData.gallery.map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Commentaires */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
          <h2 className="text-xl font-bold mb-6">
            Commentaires ({comments.length})
          </h2>

          {/* Formulaire de commentaire */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <UserCircle2 size={24} />
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none min-h-[100px]"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300"
                  >
                    <Send size={20} />
                    <span>Publier</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Liste des commentaires */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCircle2 size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        {comment.date}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <button
                    onClick={() => handleCommentLike(comment.id)}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                  >
                    <Heart
                      size={16}
                      fill={likedComments.includes(comment.id) ? 'currentColor' : 'none'}
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