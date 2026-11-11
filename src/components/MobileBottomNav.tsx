import { useState, useEffect } from 'react';
import { Home, UtensilsCrossed, Tag, Users, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function MobileBottomNav({
  cartCount,
  onOpenCart,
}: MobileBottomNavProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'deals' | 'catering'>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const cateringEl = document.getElementById('catering');
      const dealsEl = document.getElementById('deals');
      const menuEl = document.getElementById('menu');

      if (cateringEl && scrollPos >= cateringEl.offsetTop) {
        setActiveTab('catering');
      } else if (dealsEl && scrollPos >= dealsEl.offsetTop) {
        setActiveTab('deals');
      } else if (menuEl && scrollPos >= menuEl.offsetTop) {
        setActiveTab('menu');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id?: string) => {
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveTab('home');
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-35 bg-white/95 dark:bg-[#181110]/95 backdrop-blur-md border-t border-[#E5DDD8] dark:border-[#3D2C2A] shadow-[0_-6px_25px_rgba(0,0,0,0.1)] px-2 py-1.5"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom, 0.375rem))' }}
    >
      <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => scrollTo()}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-xl transition-all active:scale-90 ${
            activeTab === 'home'
              ? 'text-[#991B1B] dark:text-[#F87171] font-bold'
              : 'text-[#6B5E5C] dark:text-[#AFA2A0] hover:text-[#1F1514] dark:hover:text-white font-medium'
          }`}
          aria-label="Go to Top"
        >
          <Home className={`w-5 h-5 transition-transform ${activeTab === 'home' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Home</span>
        </button>

        {/* Menu */}
        <button
          onClick={() => scrollTo('menu')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-xl transition-all active:scale-90 ${
            activeTab === 'menu'
              ? 'text-[#991B1B] dark:text-[#F87171] font-bold'
              : 'text-[#6B5E5C] dark:text-[#AFA2A0] hover:text-[#1F1514] dark:hover:text-white font-medium'
          }`}
          aria-label="View Food Menu"
        >
          <UtensilsCrossed className={`w-5 h-5 transition-transform ${activeTab === 'menu' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Menu</span>
        </button>

        {/* Deals */}
        <button
          onClick={() => scrollTo('deals')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-xl transition-all active:scale-90 ${
            activeTab === 'deals'
              ? 'text-[#991B1B] dark:text-[#F87171] font-bold'
              : 'text-[#6B5E5C] dark:text-[#AFA2A0] hover:text-[#1F1514] dark:hover:text-white font-medium'
          }`}
          aria-label="View Deals"
        >
          <Tag className={`w-5 h-5 transition-transform ${activeTab === 'deals' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Deals</span>
        </button>

        {/* Catering */}
        <button
          onClick={() => scrollTo('catering')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-xl transition-all active:scale-90 ${
            activeTab === 'catering'
              ? 'text-[#991B1B] dark:text-[#F87171] font-bold'
              : 'text-[#6B5E5C] dark:text-[#AFA2A0] hover:text-[#1F1514] dark:hover:text-white font-medium'
          }`}
          aria-label="Event Catering"
        >
          <Users className={`w-5 h-5 transition-transform ${activeTab === 'catering' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Catering</span>
        </button>

        {/* Basket */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-xl text-[#991B1B] dark:text-[#F87171] font-bold active:scale-90 transition-all"
          aria-label={`Open Basket with ${cartCount} items`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#F59E0B] text-black font-mono font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50 duration-200">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Basket</span>
        </button>
      </div>
    </nav>
  );
}
