import { useState, useMemo } from 'react';
import { Search, X, Star, Flame, MessageSquare, Plus, Minus, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import { MenuItem, CartItem, MENU_ITEMS, buildWhatsAppUrl } from '../data/biteBoxData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onDirectOrder: (item: MenuItem) => void;
  onQuickAddToBasket: (item: MenuItem) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
}

type CategoryFilter = 'ALL' | 'BURGERS' | 'WRAPS' | 'LOADED_FRIES' | 'COMBOS' | 'DESSERTS';

export default function MenuSection({
  onSelectItem,
  onDirectOrder,
  onQuickAddToBasket,
  cartItems,
  onUpdateQuantity,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'ALL', label: 'All Items' },
    { key: 'BURGERS', label: 'Gourmet Burgers' },
    { key: 'WRAPS', label: 'Wraps' },
    { key: 'LOADED_FRIES', label: 'Loaded Fries' },
    { key: 'DESSERTS', label: 'Desserts & Shakes' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'ALL' || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-14 sm:py-20 bg-white dark:bg-[#181110] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#991B1B] dark:text-[#F87171] mb-2">
              <span>Fresh Off The Sizzle</span>
              <span className="text-[#6B5E5C]">·</span>
              <span>Sahiwal Kitchen</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#1F1514] dark:text-[#FAF1F0] tracking-tight">
              Artisanal Fast Food Menu
            </h2>
            <p className="text-sm text-[#6B5E5C] dark:text-[#AFA2A0] mt-1 max-w-xl">
              Freshly prepared with prime beef patties, hand-breaded chicken, and artisan brioche buns. Add directly to your basket or customize toppings with ease.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5E5C] dark:text-[#AFA2A0]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search burgers, fries, shakes..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F6F1EA] dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] text-[#1F1514] dark:text-[#FAF1F0] placeholder-[#6B5E5C]/70 focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5E5C] hover:text-[#1F1514] dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#991B1B] text-white shadow-sm'
                    : 'bg-[#F6F1EA] dark:bg-[#231A19] text-[#6B5E5C] dark:text-[#AFA2A0] hover:text-[#1F1514] dark:hover:text-white hover:bg-[#FEE2E2] dark:hover:bg-[#2C2220]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#F6F1EA] dark:bg-[#231A19] rounded-2xl border border-dashed border-[#E5DDD8] dark:border-[#3D2C2A]">
            <p className="text-base font-semibold text-[#1F1514] dark:text-[#FAF1F0] mb-2">
              No menu items found matching "{searchQuery}"
            </p>
            <p className="text-xs text-[#6B5E5C] dark:text-[#AFA2A0] mb-4">
              Try searching for "Zinger", "Beef", "Fries", or "Cake"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('ALL');
              }}
              className="px-4 py-2 rounded-lg bg-[#991B1B] text-white text-xs font-bold hover:bg-[#7F1D1D]"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              // Find matching cart item if already in basket
              const itemInCart = cartItems.find((c) => c.menuItem.id === item.id);
              const quantityInBasket = itemInCart ? itemInCart.quantity : 0;

              return (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between rounded-2xl overflow-hidden bg-white dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Food Photo Container */}
                    <div
                      onClick={() => onSelectItem(item)}
                      className="relative aspect-[16/10] w-full overflow-hidden cursor-pointer bg-[#F6F1EA] dark:bg-[#2C2220]"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />

                      {/* Gradient scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Badge */}
                      {item.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#F59E0B] text-black text-[11px] font-black tracking-wide shadow-sm">
                          {item.badge}
                        </span>
                      )}

                      {/* Calories metadata */}
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#F59E0B]" />
                        <span>{item.calories}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#991B1B] dark:text-[#F87171]">
                          {item.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-semibold text-[#1F1514] dark:text-[#FAF1F0]">
                          <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                          <span>{item.rating}</span>
                          <span className="text-[#6B5E5C] dark:text-[#AFA2A0] text-[11px]">
                            ({item.reviewCount})
                          </span>
                        </div>
                      </div>

                      <h3
                        onClick={() => onSelectItem(item)}
                        className="font-display font-bold text-lg text-[#1F1514] dark:text-[#FAF1F0] hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors cursor-pointer mb-2"
                      >
                        {item.name}
                      </h3>

                      <p className="text-xs text-[#6B5E5C] dark:text-[#AFA2A0] leading-relaxed line-clamp-2 mb-4">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Price & Basket Management Controls */}
                  <div className="px-5 pb-5 pt-3 border-t border-[#E5DDD8]/60 dark:border-[#3D2C2A]/60 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] text-[#6B5E5C] dark:text-[#AFA2A0] block">
                        Price
                      </span>
                      <span className="font-mono font-bold text-lg text-[#991B1B] dark:text-[#F87171]">
                        Rs. {item.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Quantity Stepper if already in basket */}
                      {quantityInBasket > 0 && itemInCart ? (
                        <div className="flex items-center bg-[#FEE2E2] dark:bg-[#991B1B]/30 px-1.5 py-1 rounded-xl border border-[#991B1B]/30">
                          <button
                            onClick={() => onUpdateQuantity(itemInCart.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-[#991B1B] dark:text-[#F87171] hover:scale-110 active:scale-95 transition-transform"
                            title="Decrease quantity"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono font-black text-xs px-1.5 text-[#991B1B] dark:text-[#FAF1F0] min-w-5 text-center">
                            {quantityInBasket}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(itemInCart.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#991B1B] dark:text-[#F87171] hover:scale-110 active:scale-95 transition-transform"
                            title="Increase quantity"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        /* Direct Add to Basket Button */
                        <button
                          onClick={() => onQuickAddToBasket(item)}
                          title="Quick add to basket"
                          className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs font-bold bg-[#991B1B] hover:bg-[#7F1D1D] text-white transition-all shadow-xs active:scale-95 min-h-[40px]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Basket</span>
                        </button>
                      )}

                      {/* Customize Button */}
                      <button
                        onClick={() => onSelectItem(item)}
                        title="Customize toppings & add to basket"
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-xs font-bold border border-[#E5DDD8] dark:border-[#3D2C2A] text-[#1F1514] dark:text-[#FAF1F0] hover:bg-[#F6F1EA] dark:hover:bg-[#2C2220] active:scale-95 transition-all shrink-0"
                        aria-label={`Customize ${item.name}`}
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#F87171]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
