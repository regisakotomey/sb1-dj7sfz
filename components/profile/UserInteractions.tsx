'use client';

import { Heart } from 'lucide-react';
import ContentSection from '@/components/profile/ContentSection';

interface UserInteractionsProps {
  interactions: {
    likedEvents: any[];
    likedPlaces: any[];
    likedProducts: any[];
  };
}

export default function UserInteractions({ interactions }: UserInteractionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold">Interactions</h2>
      </div>

      <div className="p-6">
        {interactions.likedEvents.length > 0 && (
          <ContentSection
            title="Événements aimés"
            icon={<Heart size={20} className="text-red-500" />}
            items={interactions.likedEvents}
            renderItem={(event) => ({
              title: event.title,
              subtitle: event.date,
              image: event.image
            })}
          />
        )}

        {interactions.likedPlaces.length > 0 && (
          <ContentSection
            title="Lieux aimés"
            icon={<Heart size={20} className="text-red-500" />}
            items={interactions.likedPlaces}
            renderItem={(place) => ({
              title: place.name,
              subtitle: place.type,
              image: place.image
            })}
          />
        )}

        {interactions.likedProducts.length > 0 && (
          <ContentSection
            title="Produits aimés"
            icon={<Heart size={20} className="text-red-500" />}
            items={interactions.likedProducts}
            renderItem={(product) => ({
              title: product.name,
              subtitle: product.price,
              image: product.image
            })}
          />
        )}
      </div>
    </div>
  );
}