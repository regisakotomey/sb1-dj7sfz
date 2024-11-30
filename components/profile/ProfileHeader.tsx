'use client';

import { Edit, DollarSign, MapPin, Image as ImageIcon, Bell } from 'lucide-react';

interface ProfileHeaderProps {
  user: any;
  onSponsor: () => void;
}

export default function ProfileHeader({ user, onSponsor }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-gray-800 to-gray-900 relative">
        <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-lg px-4 py-2 text-sm backdrop-blur-sm transition flex items-center gap-2">
          <ImageIcon size={18} />
          Modifier la couverture
        </button>
      </div>

      <div className="px-8 pb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start relative">
          {/* Profile Image */}
          <div className="relative -mt-20">
            <div className="w-32 h-32 rounded-xl overflow-hidden ring-4 ring-white">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <ImageIcon size={18} />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 pt-4 md:pt-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span>{user.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <Bell size={18} />
                  <span>Suivre</span>
                </button>

                <button
                  onClick={onSponsor}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <DollarSign size={18} />
                  <span>Sponsoriser</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg transition-colors">
                  <Edit size={18} />
                  <span>Modifier</span>
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-6 max-w-2xl">{user.bio}</p>

            <div className="flex gap-6 flex-wrap">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-lg font-semibold">{user.followers}</span>
                <span className="text-sm text-gray-600">Abonnés</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-lg font-semibold">{user.following}</span>
                <span className="text-sm text-gray-600">Abonnements</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}