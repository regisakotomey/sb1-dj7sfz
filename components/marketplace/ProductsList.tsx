'use client';

import { ShoppingBag, Tag, Store } from 'lucide-react';
import { useRouter } from 'next/navigation';

const products = [
  {
    id: 1,
    name: "Sneakers Urban Style",
    price: "89,99 €",
    shop: "Mode Élégante",
    category: "Chaussures",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 2,
    name: "Smartphone X2000",
    price: "699,99 €",
    shop: "Tech Store",
    category: "Électronique",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 3,
    name: "Thé Bio Détox",
    price: "12,99 €",
    shop: "Bio & Nature",
    category: "Alimentation",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 4,
    name: "Crème Hydratante",
    price: "24,99 €",
    shop: "Beauté Pure",
    category: "Cosmétiques",
    image: "https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?auto=format&fit=crop&q=80&w=300&h=300"
  }
];

export default function ProductsList() {
  const router = useRouter();

  const handleProductClick = (id: number) => {
    router.push(`/marketplace/${id}`);
  };

  return (
    <main className="flex-1 pt-[76px] px-4 bg-gray-50 min-h-screen lg:ml-[250px] pb-20 lg:pb-4">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900">
          Marketplace
        </h1>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer flex flex-col"
            >
              <div className="relative pt-[100%]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {product.category}
                </div>
              </div>

              <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-1 sm:line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Tag size={14} />
                    <span className="text-gray-900 font-semibold text-base sm:text-lg">
                      {product.price}
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-2">
                    <Store size={14} />
                    <span>{product.shop}</span>
                  </div>

                  <button className="mt-auto w-full bg-gray-900 text-white rounded-lg p-2 sm:p-3 flex items-center justify-center gap-2 text-sm">
                    <ShoppingBag size={16} />
                    <span className="hidden sm:inline">
                      Ajouter au panier
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}