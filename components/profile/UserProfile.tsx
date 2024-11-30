'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ProfileHeader from '@/components/profile/ProfileHeader';
import UserContent from '@/components/profile/UserContent';
import UserInteractions from '@/components/profile/UserInteractions';
import { userData } from '@/lib/profile-data';

export default function UserProfile() {
  const [showSponsorModal, setShowSponsorModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <main className="flex-1 pt-[76px] ml-[250px] p-6">
        <div className="max-w-[1200px] mx-auto">
          <ProfileHeader 
            user={userData} 
            onSponsor={() => setShowSponsorModal(true)} 
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <UserContent content={userData.content} />
            </div>
            <div className="lg:col-span-1">
              <UserInteractions interactions={userData.interactions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}