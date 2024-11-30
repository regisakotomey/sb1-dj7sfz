'use client';

import { Calendar, MapPin, Store, ShoppingBag, Briefcase } from 'lucide-react';
import ContentSection from '@/components/profile/ContentSection';

interface UserContentProps {
  content: {
    events: any[];
    places: any[];
    shops: any[];
    products: any[];
    opportunities: any[];
  };
}

export default function UserContent({ content }: UserContentProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold">Contenu ajouté</h2>
      </div>

      <div className="p-6">
        {content.events.length > 0 && (
          <ContentSection
            title="Événements"
            icon={<Calendar size={20} />}
            items={content.events}
            renderItem={(event) => ({
              title: event.title,
              subtitle: event.date,
              image: event.image
            })}
          />
        )}

        {content.places.length > 0 && (
          <ContentSection
            title="Lieux"
            icon={<MapPin size={20} />}
            items={content.places}
            renderItem={(place) => ({
              title: place.name,
              subtitle: place.type,
              image: place.image
            })}
          />
        )}

        {content.shops.length > 0 && (
          <ContentSection
            title="Boutiques"
            icon={<Store size={20} />}
            items={content.shops}
            renderItem={(shop) => ({
              title: shop.name,
              subtitle: shop.type,
              image: shop.image
            })}
          />
        )}

        {content.products.length > 0 && (
          <ContentSection
            title="Produits"
            icon={<ShoppingBag size={20} />}
            items={content.products}
            renderItem={(product) => ({
              title: product.name,
              subtitle: product.price,
              image: product.image
            })}
          />
        )}

        {content.opportunities.length > 0 && (
          <ContentSection
            title="Opportunités"
            icon={<Briefcase size={20} />}
            items={content.opportunities}
            renderItem={(opportunity) => ({
              title: opportunity.title,
              subtitle: opportunity.type,
              image: opportunity.image
            })}
          />
        )}
      </div>
    </div>
  );
}