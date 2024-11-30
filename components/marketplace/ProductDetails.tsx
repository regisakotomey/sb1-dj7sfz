'use client';

import { useParams } from 'next/navigation';
import { 
  ShoppingBag, Tag, Store, Share2, Heart, 
  Send, UserCircle2, Flag, Edit, Trash2, Bell, DollarSign,
  Plus, Minus, Star
} from 'lucide-react';
import { useState } from 'react';

// Données de test pour le produit
const productData = {
  id: 1,
  name: "Sneakers Urban Style",
  price: "89,99 €",
  shop: {
    name: "Mode Élégante",
    followers: 1250,
    isFollowed: false
  },
  category: "Chaussures",
  description: "Sneakers urbaines au design moderne et élégant. Fabriquées avec des matériaux de haute qualité pour un confort optimal tout au long de la journée.",
  features: [
    "Semelle en caoutchouc naturel",
    "Tissu respirant",
    "Design ergonomique",
    "Disponible en plusieurs tailles"
  ],
  mainImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2000",
  gallery: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&q=80&w=800"
  ],
  rating: 4.5,
  reviews: 128,
  stock: 15,
  isOwner: true
};

// Données de test pour les commentaires
const initialComments = [
  {
    id: 1,
    author: "Sophie Martin",
    date: "Il y a 2 jours",
    rating: 5,
    content: "Excellent produit ! La qualité est au rendez-vous et le confort est optimal.",
    likes: 12
  },
  {
    id: 2,
    author: "Thomas Dubois",
    date: "Il y a 1 jour",
    rating: 4,
    content: "Très satisfait de mon achat. Seul petit bémol : la livraison un peu longue.",
    likes: 8
  },
  {
    id: 3,
    author: "Marie Lambert",
    date: "Il y a 5 heures",
    rating: 5,
    content: "Ces sneakers sont parfaites ! Je recommande vivement.",
    likes: 3
  }
];

export default function ProductDetails() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(productData.shop.isFollowed);
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [comments, setComments] = useState(initialComments);
  const [likedComments, setLikedComments] = useState<number[]>([]);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= productData.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Vous",
        date: "À l'instant",
        rating: newRating,
        content: newComment,
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setNewRating(5);
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
        title: productData.name,
        text: productData.description,
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
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Galerie d'images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl overflow-hidden">
              <img
                src={productData.mainImage}
                alt={productData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productData.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={image}
                    alt={`${productData.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{productData.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Store size={18} />
                    <span>{productData.shop.name}</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg">
                  {productData.category}
                </span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl font-bold">{productData.price}</div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      fill={star <= productData.rating ? '#fbbf24' : 'none'}
                      stroke={star <= productData.rating ? '#fbbf24' : '#666'}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    ({productData.reviews} avis)
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity === 1}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity === productData.stock}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button className="flex-1 bg-gray-900 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                  <ShoppingBag size={20} />
                  Commander
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {productData.isOwner ? (
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
            </div>

            {/* Vendeur */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Store size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium">{productData.shop.name}</h3>
                    <p className="text-sm text-gray-500">
                      {productData.shop.followers} abonnés
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

            {/* Description */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-600 mb-6">{productData.description}</p>
              <h3 className="font-bold mb-2">Caractéristiques</h3>
              <ul className="space-y-2">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Commentaires */}
        <div className="mt-8 bg-white rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">
            Avis ({comments.length})
          </h2>

          {/* Formulaire de commentaire */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <UserCircle2 size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setNewRating(rating)}
                      className="p-1"
                    >
                      <Star
                        size={24}
                        fill={rating <= newRating ? '#fbbf24' : 'none'}
                        stroke={rating <= newRating ? '#fbbf24' : '#666'}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Donnez votre avis..."
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
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
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
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          fill={star <= comment.rating ? '#fbbf24' : 'none'}
                          stroke={star <= comment.rating ? '#fbbf24' : '#666'}
                        />
                      ))}
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