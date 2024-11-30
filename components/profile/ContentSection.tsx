'use client';

import { ReactNode } from 'react';

interface ContentSectionProps {
  title: string;
  icon: ReactNode;
  items: any[];
  renderItem: (item: any) => {
    title: string;
    subtitle: string;
    image: string;
  };
}

export default function ContentSection({ title, icon, items, renderItem }: ContentSectionProps) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
        {icon}
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, index) => {
          const { title, subtitle, image } = renderItem(item);
          return (
            <div
              key={index}
              className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-900 transition">
                  {title}
                </h4>
                <div className="text-sm text-gray-600">
                  {subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}