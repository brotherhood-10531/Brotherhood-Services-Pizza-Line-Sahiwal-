import { useState, useEffect } from 'react';
import { ShoppingBag, Phone, MessageSquare, Sun, Moon, Menu as MenuIcon, X, MapPin } from 'lucide-react';
import { BITE_BOX_INFO, isStoreOpen, buildWhatsAppUrl } from '../data/biteBoxData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  isDark,
  onToggleTheme,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const storeStatus = isStoreOpen();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Deals', href: '#deals' },
    { name: "Chef's Picks", href: '#chef-picks' },
    { name: 'Catering', href: '#catering' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#181110]/95 backdrop-blur-md shadow-md border-b border-[#E5DDD8] dark:border-[#3D2C2A] py-3'
          : 'bg-white/80 dark:bg-[#181110]/80 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-8">
          {/* Zone 1: Brand Wordmark & Location */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 shrink-0 group min-w-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#991B1B] bg-[#991B1B] shadow-sm flex items-center justify-center shrink-0">
              <img
                src="/images/app_icon_fg.jpg"
                alt="Pizza Line Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display font-bold text-sm xs:text-base sm:text-xl lg:text-2xl tracking-tight text-[#991B1B] dark:text-[#F87171] truncate max-w-[130px] xs:max-w-[180px] sm:max-w-none">
                  Pizza Line
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                    storeStatus.open
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                  }`}
                >
                  {storeStatus.open ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-[#6B5E5C] dark:text-[#AFA2A0] flex items-center gap-1 truncate">
                <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#991B1B] dark:text-[#F87171] inline shrink-0" />
                <span className="truncate">Sahiwal, Pakistan</span>
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Clean, Single-line) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#1F1514] dark:text-[#FAF1F0]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors whitespace-nowrap shrink-0"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Quick Contacts, Theme & Cart CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Call Now */}
            <a
              href={`tel:${BITE_BOX_INFO.phone}`}
              title="Call Pizza Line"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A] dark:bg-[#78350F]/40 dark:text-[#FDE68A] transition-colors whitespace-nowrap min-h-[40px]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us</span>
            </a>

            {/* WhatsApp Direct */}
            <a
              href={buildWhatsAppUrl(
                'Hi Pizza Line! I would like to place an order from Sahiwal.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp Instant Order"
              className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-lg bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors whitespace-nowrap shadow-sm min-h-[40px] min-w-[40px]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 sm:p-2 text-[#6B5E5C] dark:text-[#AFA2A0] hover:text-[#1F1514] dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Basket Button */}
            <button
              onClick={onOpenCart}
              title="View & Manage Basket"
              className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-lg bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-xs shadow-sm transition-all active:scale-95 whitespace-nowrap min-h-[40px]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Basket</span>
              <span className="bg-[#F59E0B] text-black text-[11px] font-extrabold px-1.5 py-0.2 rounded-full min-w-5 text-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1F1514] dark:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-[#E5DDD8] dark:border-[#3D2C2A] space-y-3 pb-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-[#FEE2E2] dark:hover:bg-[#3D2C2A] text-[#1F1514] dark:text-[#FAF1F0]"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-[#E5DDD8] dark:border-[#3D2C2A]">
              <a
                href={`tel:${BITE_BOX_INFO.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-bold dark:bg-[#78350F]/40 dark:text-[#FDE68A]"
              >
                <Phone className="w-3.5 h-3.5" />
                Call {BITE_BOX_INFO.phoneDisplay}
              </a>
              <a
                href={BITE_BOX_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-lg border border-[#E5DDD8] dark:border-[#3D2C2A] text-xs font-semibold text-[#1F1514] dark:text-white flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#991B1B]" />
                Map
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
