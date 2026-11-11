import { useState } from 'react';
import { X, Star, Flame, Check, Plus, Minus, MessageSquare, ShoppingBag, Sparkles } from 'lucide-react';
import { MenuItem, buildWhatsAppUrl } from '../data/biteBoxData';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (customizedItem: {
    menuItem: MenuItem;
    quantity: number;
    extraCheese: boolean;
    extraJalapeno: boolean;
    upgradeMeal: boolean;
    specialInstructions: string;
  }) => void;
}

export default function ItemDetailModal({
  item,
  onClose,
  onAddToCart,
}: ItemDetailModalProps) {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraJalapeno, setExtraJalapeno] = useState(false);
  const [upgradeMeal, setUpgradeMeal] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const CHEESE_PRICE = 120;
  const JALAPENO_PRICE = 80;
  const MEAL_UPGRADE_PRICE = 320;

  const unitPrice =
    item.price +
    (extraCheese ? CHEESE_PRICE : 0) +
    (extraJalapeno ? JALAPENO_PRICE : 0) +
    (upgradeMeal ? MEAL_UPGRADE_PRICE : 0);

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      menuItem: item,
      quantity,
      extraCheese,
      extraJalapeno,
      upgradeMeal,
      specialInstructions,
    });
    onClose();
  };

  const buildCustomWhatsAppMessage = () => {
    const extras: string[] = [];
    if (extraCheese) extras.push('Extra Molten Cheddar (+Rs. 120)');
    if (extraJalapeno) extras.push('Pickled Jalapeño Slices (+Rs. 80)');
    if (upgradeMeal) extras.push('Meal Combo Upgrade (Fries + Drink) (+Rs. 320)');
    if (specialInstructions.trim()) extras.push(`Note: "${specialInstructions.trim()}"`);

    const extrasText = extras.length > 0 ? `\n- Customizations: ${extras.join(', ')}` : '';
    const msg = `Hi Pizza Line! I would like to order:\n${quantity}x *${item.name}* (Rs. ${totalPrice})${extrasText}\n\nPlease confirm availability and prep time.`;
    return buildWhatsAppUrl(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-2xl overflow-hidden bg-white dark:bg-[#231A19] border-t sm:border border-[#E5DDD8] dark:border-[#3D2C2A] shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Mobile Pull Bar Indicator */}
        <div className="sm:hidden pt-2 pb-1 bg-[#181110] flex justify-center">
          <div className="w-12 h-1.5 bg-white/40 rounded-full" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-[#181110] shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {item.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#F59E0B] text-black text-xs font-black shadow-md">
              {item.badge}
            </span>
          )}

          <div className="absolute bottom-3 left-4 right-4 text-white flex items-end justify-between">
            <div className="min-w-0 pr-2">
              <span className="text-[11px] uppercase font-bold text-amber-300 block">
                {item.categoryLabel}
              </span>
              <h3 className="font-display font-bold text-lg sm:text-2xl text-white truncate">
                {item.name}
              </h3>
            </div>
            <span className="font-mono font-bold text-lg sm:text-xl text-amber-400 shrink-0">
              Rs. {item.price}
            </span>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Metadata Row */}
          <div className="flex items-center gap-4 text-xs text-[#6B5E5C] dark:text-[#AFA2A0] pb-2 border-b border-[#E5DDD8] dark:border-[#3D2C2A]">
            <div className="flex items-center gap-1 font-semibold text-[#1F1514] dark:text-[#FAF1F0]">
              <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              <span>{item.rating}</span>
              <span>({item.reviewCount} verified reviews)</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-[#991B1B]" />
              <span>{item.calories}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#1F1514] dark:text-[#FAF1F0] leading-relaxed">
            {item.description}
          </p>

          {/* Chef Story Callout */}
          {item.story && (
            <div className="p-3.5 rounded-xl bg-[#FEF3C7] dark:bg-[#78350F]/20 border border-[#FDE68A] dark:border-[#78350F]/40 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#92400E] dark:text-[#FDE68A] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chef's Craft Story</span>
              </div>
              <p className="text-[#78350F] dark:text-[#FEF3C7]/90 leading-relaxed italic">
                "{item.story}"
              </p>
            </div>
          )}

          {/* Customization Options */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1514] dark:text-[#FAF1F0]">
              Customize Your Bite
            </h4>

            {/* Extra Cheese */}
            <label className="flex items-center justify-between p-3 rounded-xl border border-[#E5DDD8] dark:border-[#3D2C2A] hover:bg-[#F6F1EA] dark:hover:bg-[#2C2220] cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={extraCheese}
                  onChange={(e) => setExtraCheese(e.target.checked)}
                  className="w-4 h-4 accent-[#991B1B] rounded"
                />
                <span className="text-xs sm:text-sm font-medium text-[#1F1514] dark:text-[#FAF1F0]">
                  Extra Molten Cheddar Lava
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#991B1B] dark:text-[#F87171]">
                +Rs. {CHEESE_PRICE}
              </span>
            </label>

            {/* Extra Jalapeño */}
            <label className="flex items-center justify-between p-3 rounded-xl border border-[#E5DDD8] dark:border-[#3D2C2A] hover:bg-[#F6F1EA] dark:hover:bg-[#2C2220] cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={extraJalapeno}
                  onChange={(e) => setExtraJalapeno(e.target.checked)}
                  className="w-4 h-4 accent-[#991B1B] rounded"
                />
                <span className="text-xs sm:text-sm font-medium text-[#1F1514] dark:text-[#FAF1F0]">
                  Pickled Jalapeño Coins (Spicy)
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#991B1B] dark:text-[#F87171]">
                +Rs. {JALAPENO_PRICE}
              </span>
            </label>

            {/* Meal Upgrade */}
            <label className="flex items-center justify-between p-3 rounded-xl border-2 border-[#F59E0B]/60 dark:border-[#F59E0B]/40 bg-[#FEF3C7]/40 dark:bg-[#78350F]/15 hover:bg-[#FEF3C7]/70 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={upgradeMeal}
                  onChange={(e) => setUpgradeMeal(e.target.checked)}
                  className="w-4 h-4 accent-[#991B1B] rounded"
                />
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#1F1514] dark:text-[#FAF1F0] block">
                    Upgrade to Combo Meal
                  </span>
                  <span className="text-[11px] text-[#6B5E5C] dark:text-[#AFA2A0]">
                    Includes hot crinkle fries & chilled soda can
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#991B1B] dark:text-[#F87171]">
                +Rs. {MEAL_UPGRADE_PRICE}
              </span>
            </label>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-semibold text-[#1F1514] dark:text-[#FAF1F0] mb-1.5">
              Special Instructions (optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra spicy sauce, no onions, well done..."
              className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F6F1EA] dark:bg-[#2C2220] border border-[#E5DDD8] dark:border-[#3D2C2A] text-[#1F1514] dark:text-[#FAF1F0] placeholder-[#6B5E5C]/70 focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-bold text-[#1F1514] dark:text-[#FAF1F0]">
              Quantity
            </span>
            <div className="flex items-center gap-3 bg-[#F6F1EA] dark:bg-[#2C2220] px-3 py-1.5 rounded-xl border border-[#E5DDD8] dark:border-[#3D2C2A]">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1 hover:text-[#991B1B] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono font-bold text-sm min-w-4 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-1 hover:text-[#991B1B] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 bg-[#F6F1EA] dark:bg-[#1E1514] border-t border-[#E5DDD8] dark:border-[#3D2C2A] space-y-2.5 shrink-0" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' }}>
          {/* Add to Order Button */}
          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-98 min-h-[48px]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Order · Rs. {totalPrice}</span>
          </button>

          {/* Direct WhatsApp Order */}
          <a
            href={buildCustomWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl border border-[#25D366] text-[#1EBE5D] hover:bg-[#25D366]/10 font-bold text-xs sm:text-sm transition-colors min-h-[44px]"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>Order Customized via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
