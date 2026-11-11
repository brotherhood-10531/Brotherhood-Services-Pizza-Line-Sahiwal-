import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import DealsSection from './components/DealsSection';
import ChefsPicksSection from './components/ChefsPicksSection';
import CateringCalculatorSection from './components/CateringCalculatorSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import LocationContactSection from './components/LocationContactSection';
import Footer from './components/Footer';
import ItemDetailModal from './components/ItemDetailModal';
import CartDrawer from './components/CartDrawer';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import StickyBasketBar from './components/StickyBasketBar';
import MobileBottomNav from './components/MobileBottomNav';
import { MenuItem, CartItem, ComboDeal, buildWhatsAppUrl } from './data/biteBoxData';
import { ShoppingBag, MessageSquare, Check, X } from 'lucide-react';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bite_box_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('bite_box_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('bite_box_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Cart / Basket state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('bite_box_cart');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('bite_box_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Modal states
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderConfirmationData, setOrderConfirmationData] = useState<{
    orderId: string;
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    isDelivery: boolean;
    subtotal: number;
    deliveryFee: number;
    grandTotal: number;
    items: CartItem[];
  } | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  // Cart / Basket actions
  const handleAddToCart = (customized: {
    menuItem: MenuItem;
    quantity: number;
    extraCheese: boolean;
    extraJalapeno: boolean;
    upgradeMeal: boolean;
    specialInstructions: string;
  }) => {
    const existingIndex = cartItems.findIndex(
      (c) =>
        c.menuItem.id === customized.menuItem.id &&
        c.extraCheese === customized.extraCheese &&
        c.extraJalapeno === customized.extraJalapeno &&
        c.upgradeMeal === customized.upgradeMeal &&
        c.specialInstructions === customized.specialInstructions
    );

    if (existingIndex >= 0) {
      setCartItems((prev) => {
        const copy = [...prev];
        copy[existingIndex].quantity += customized.quantity;
        return copy;
      });
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        ...customized,
      };
      setCartItems((prev) => [...prev, newItem]);
    }

    showToast(`Added ${customized.quantity}x ${customized.menuItem.name} to your Basket!`);
  };

  const handleQuickAddToBasket = (item: MenuItem) => {
    handleAddToCart({
      menuItem: item,
      quantity: 1,
      extraCheese: false,
      extraJalapeno: false,
      upgradeMeal: false,
      specialInstructions: '',
    });
  };

  const handleAddDealToBasket = (deal: ComboDeal) => {
    const dealMenuItem: MenuItem = {
      id: `deal-${deal.id}`,
      name: deal.title,
      category: 'COMBOS',
      categoryLabel: 'Combo Deal',
      description: deal.itemsSummary,
      price: deal.dealPrice,
      image: deal.image,
      rating: 4.95,
      reviewCount: 210,
      calories: 'Feast Box',
    };
    handleAddToCart({
      menuItem: dealMenuItem,
      quantity: 1,
      extraCheese: false,
      extraJalapeno: false,
      upgradeMeal: false,
      specialInstructions: '',
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handlePlaceCODOrder = (orderDetails: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    isDelivery: boolean;
    subtotal: number;
    deliveryFee: number;
    grandTotal: number;
  }) => {
    const orderId = `#POS-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderConfirmationData({
      orderId,
      ...orderDetails,
      items: [...cartItems],
    });
    setCartItems([]);
    setIsCartOpen(false);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDeals = () => {
    const el = document.getElementById('deals');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatering = () => {
    const el = document.getElementById('catering');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-[#FDFBF7] dark:bg-[#181110] text-[#1F1514] dark:text-[#FAF1F0] selection:bg-[#991B1B] selection:text-white transition-colors duration-200 ${
      totalCartCount > 0 ? 'pb-36 sm:pb-28' : 'pb-24 sm:pb-20'
    }`}>
      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection
          onExploreMenu={scrollToMenu}
          onOpenQuickDeal={scrollToDeals}
        />

        <MenuSection
          onSelectItem={(item) => setSelectedItemForDetail(item)}
          onDirectOrder={(item) => {
            const msg = `Hi Pizza Line! I want to order 1x *${item.name}* (Rs. ${item.price}). Please confirm availability.`;
            window.open(buildWhatsAppUrl(msg), '_blank');
          }}
          onQuickAddToBasket={handleQuickAddToBasket}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
        />

        <DealsSection
          onOrderDealWhatsApp={(deal) => {
            const msg = `Hi Pizza Line! I want to order *${deal.title}* (${deal.itemsSummary}) for Rs. ${deal.dealPrice}.`;
            window.open(buildWhatsAppUrl(msg), '_blank');
          }}
          onCustomGatheringInquiry={scrollToCatering}
          onAddDealToBasket={handleAddDealToBasket}
        />

        <ChefsPicksSection
          onSelectItem={(item) => setSelectedItemForDetail(item)}
        />

        <CateringCalculatorSection />

        <GallerySection />

        <TestimonialsSection />

        <LocationContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Item Customization Modal */}
      <ItemDetailModal
        item={selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Basket & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onPlaceCODOrder={handlePlaceCODOrder}
        appliedCoupon={appliedCoupon}
        onSetAppliedCoupon={setAppliedCoupon}
      />

      {/* Order Confirmation & Receipt Modal */}
      <OrderConfirmationModal
        isOpen={orderConfirmationData !== null}
        onClose={() => setOrderConfirmationData(null)}
        orderData={orderConfirmationData}
      />

      {/* Persistent Sticky Basket Bar (Visible whenever items are in basket and drawer is closed) */}
      {!isCartOpen && totalCartCount > 0 && (
        <StickyBasketBar
          cartItems={cartItems}
          onOpenBasket={() => setIsCartOpen(true)}
          appliedCoupon={appliedCoupon}
        />
      )}

      {/* Dedicated Ergonomic Mobile Bottom Navigation Bar (< md viewports) */}
      <MobileBottomNav
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Floating WhatsApp Action Button (Safely offset above mobile bottom bar & sticky basket) */}
      <div
        className={`fixed z-25 transition-all duration-300 right-4 sm:right-6 ${
          totalCartCount > 0
            ? 'bottom-[124px] md:bottom-24'
            : 'bottom-[72px] md:bottom-6'
        }`}
      >
        <a
          href={buildWhatsAppUrl(
            'Hi Pizza Line! I want to order delicious food in Sahiwal.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
          title="Chat & Order on WhatsApp"
          aria-label="Order on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
        </a>
      </div>

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#181110] text-white text-xs font-bold shadow-2xl border border-[#3D2C2A] animate-in fade-in slide-in-from-top-3 duration-200 max-w-[90vw]">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:text-rose-400 ml-2 shrink-0 min-w-[28px] min-h-[28px] flex items-center justify-center"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
