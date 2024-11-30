'use client';

import { MessageSquare, Bell, UserCircle2, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from '@/lib/storage';
import { theme } from '@/lib/theme';

export default function Header() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSearchVisible(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Check authentication status
    const checkAuth = () => {
      const userData = getUserData();
      setIsAuthenticated(!!userData?.id && userData?.isVerified === true && userData?.isAnonymous === false);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleProtectedRoute = (path: string) => {
    const userData = getUserData();
    if (!!userData?.id && userData?.isVerified === true && userData?.isAnonymous === false) {
      router.push(path);
    } else {
      router.push('/auth/login');
    }
  };

  const handleLogin = () => {
    router.push('/auth');
  };

  return (
    <header className="w-full h-[60px] bg-primary text-white fixed top-0 left-0 flex justify-between items-center px-4 shadow-sm z-[1000]">
      <div className="flex items-center gap-4">
        <div className={`text-${isMobile ? 'base' : 'xl'} font-bold tracking-wide whitespace-nowrap`}>
          {theme.name}
        </div>
      </div>
      
      {(!isMobile || isSearchVisible) && (
        <div className={`${isMobile ? 'fixed left-0 right-0 top-[60px] bg-primary p-4 shadow-md border-t border-white/10' : 'relative flex-1 max-w-sm mx-12'}`}>
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              type="search"
              placeholder="Rechercher..."
              className="w-full py-3 pl-10 pr-4 rounded-full border-none bg-white/10 text-white placeholder:text-white/50 focus:bg-white/15 focus:ring-1 focus:ring-white/10 text-sm transition-all"
            />
          </div>
        </div>
      )}

      <nav className="flex items-center">
        {isMobile && (
          <button
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="p-2 hover:bg-white/10 rounded-lg mr-2 transition-colors"
          >
            <Search size={20} />
          </button>
        )}
        
        {isAuthenticated ? (
          <ul className="flex gap-4 items-center text-sm">
            <li>
              <button
                onClick={() => handleProtectedRoute('/messages')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <MessageSquare size={20} />
              </button>
            </li>
            <li>
              <button
                onClick={() => handleProtectedRoute('/notifications')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Bell size={20} />
              </button>
            </li>
            <li>
              <button
                onClick={() => handleProtectedRoute('/profile')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <UserCircle2 size={20} />
              </button>
            </li>
          </ul>
        ) : (
          <button
            onClick={handleLogin}
            className="px-6 py-2 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Connexion
          </button>
        )}
      </nav>
    </header>
  );
}