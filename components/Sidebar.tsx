'use client';

import { 
  Home, 
  Settings, 
  HelpCircle, 
  MessageSquare,
  MapPin,
  Calendar,
  Store,
  Megaphone,
  Briefcase,
  ShoppingCart,
  MoreHorizontal
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const menuItems = [
  { icon: <Home size={24} />, label: 'Accueil', path: '/' },
  { icon: <Calendar size={24} />, label: 'Événements', path: '/events' },
  { icon: <MapPin size={24} />, label: 'Lieux', path: '/places' },
  { icon: <Briefcase size={24} />, label: 'Opportunités', path: '/opportunities' },
  { icon: <ShoppingCart size={24} />, label: 'Marketplace', path: '/marketplace' },
  { icon: <Store size={24} />, label: 'Boutiques', path: '/shops' },
  { icon: <Megaphone size={24} />, label: 'Spots publicitaires', path: '/ads' },
  { type: 'separator' },
  { icon: <Settings size={24} />, label: 'Paramètres', path: '/settings' },
  { icon: <HelpCircle size={24} />, label: 'Aide', path: '/help' },
  { icon: <MessageSquare size={24} />, label: 'Contactez-nous', path: '/contact' }
];

const mobileMenuItems = menuItems.slice(0, 5);
const moreMenuItems = menuItems.slice(5);

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    setShowMoreMenu(false);
  };

  const renderNavItem = (item: any) => {
    if (item.type === 'separator') {
      return (
        <div
          key={`separator-${Math.random()}`}
          className="h-px bg-gray-200 my-2"
        />
      );
    }

    return (
      <button
        key={item.path}
        onClick={() => handleNavigation(item.path)}
        className="flex items-center gap-4 w-full p-3 hover:bg-gray-100 rounded-xl transition-colors"
      >
        {item.icon}
        <span>{item.label}</span>
      </button>
    );
  };

  if (isMobile) {
    return (
      <>
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 py-1">
          <div className="flex justify-around items-center">
            {mobileMenuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="flex flex-col items-center gap-1 p-2 text-gray-700"
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="flex flex-col items-center gap-1 p-2 text-gray-700"
            >
              <MoreHorizontal size={24} />
              <span className="text-xs">Plus</span>
            </button>
          </div>
        </nav>

        {showMoreMenu && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40" 
              onClick={() => setShowMoreMenu(false)} 
            />
            <div className="fixed bottom-[80px] left-0 right-0 bg-white rounded-t-2xl z-50 p-4">
              <div className="flex flex-col gap-2">
                {moreMenuItems.map((item) => renderNavItem(item))}
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <aside className="w-[250px] h-[calc(100vh-60px)] bg-white fixed top-[60px] left-0 py-6 px-4 shadow-sm z-[900] overflow-y-auto">
      <nav className="space-y-1">
        {menuItems.map((item) => renderNavItem(item))}
      </nav>
    </aside>
  );
}