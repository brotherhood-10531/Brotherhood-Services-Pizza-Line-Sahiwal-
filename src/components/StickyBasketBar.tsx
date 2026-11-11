import { ShoppingBag, MessageSquare, ArrowRight, ChevronUp } from 'lucide-react';
import { CartItem, buildWhatsAppUrl, BITE_BOX_INFO } from '../data/biteBoxData';

interface StickyBasketBarProps {
  cartItems: CartItem[];
  onOpenBasket: () => void;
  appliedCoupon: string | null;
}

export default function StickyBasketBar({
  cartItems,
  onOpenBasket,
  appliedCoupon,
}: StickyBasketBarProps) {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  if (totalItems === 0) return null;

  const calculateItemTotal = (item: CartItem) => {
    let unit = item.menuItem.price;
    if (item.extraCheese) unit += 120;
    if (item.extraJalapeno) unit += 80;
    if (item.upgradeMeal) unit += 320;
    return unit * item.quantity;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  const discountAmount = appliedCoupon ? Math.round(subtotal * 0.15) : 0;
  const deliveryFee = subtotal >= BITE_BOX_INFO.freeDeliveryThreshold ? 0 : BITE_BOX_INFO.deliveryFee;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleQuickFinalizeWhatsApp = () => {
    const lines = [
      '🍕 *New Order from Pizza Line Website*',
      '',
      `📋 *Order Type:* Home Delivery / Takeaway`,
      appliedCoupon ? `🏷️ *Coupon Applied:* ${appliedCoupon} (-15% discount)` : '',
      '',
      '*Items in Basket:*',
    ];

    cartItems.forEach((item, index) => {
      const itemTot = calculateItemTotal(item);
      const extras: string[] = [];
      if (item.extraCheese) extras.push('Extra Cheddar (+120)');
      if (item.extraJalapeno) extras.push('Jalapeños (+80)');
      if (item.upgradeMeal) extras.push('Meal Combo (+320)');
      if (item.specialInstructions?.trim()) extras.push(`Note: "${item.specialInstructions.trim()}"`);

      const extrasStr = extras.length > 0 ? ` (${extras.join(', ')})` : '';
      lines.push(`${index + 1}. ${item.quantity}x *${item.menuItem.name}* — Rs. ${itemTot}${extrasStr}`);
    });

    lines.push('');
    lines.push(`Subtotal: Rs. ${subtotal}`);
    if (discountAmount > 0) {
      lines.push(`Discount: -Rs. ${discountAmount}`);
    }
    lines.push(`*Estimated Total: Rs. ${grandTotal}*`);
    lines.push('');
    lines.push('Please confirm my order and send estimated delivery time to Sahiwal. Thank you!');

    const message = lines.filter((l) => l !== '').join('\n');
    window.open(buildWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="fixed bottom-[56px] md:bottom-0 left-0 right-0 z-30 px-3 py-2.5 sm:px-4 sm:py-3.5 bg-white/95 dark:bg-[#181110]/95 backdrop-blur-md border-t border-[#E5DDD8] dark:border-[#3D2C2A] shadow-[0_-8px_30px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6">
        {/* Basket Info & Manage Click */}
        <button
          onClick={onOpenBasket}
          className="flex items-center gap-3 text-left group hover:opacity-90 transition-opacity"
        >
          <div className="relative p-2.5 rounded-xl bg-[#991B1B] text-white shrink-0 shadow-sm">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#F59E0B] text-black font-black text-[11px] px-1.5 py-0.2 rounded-full min-w-5 text-center shadow-xs">
              {totalItems}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xs sm:text-sm text-[#1F1514] dark:text-[#FAF1F0]">
                Your Basket
              </span>
              <span className="hidden xs:inline-flex items-center text-[10px] font-semibold text-[#991B1B] dark:text-[#F87171] bg-[#FEE2E2] dark:bg-[#991B1B]/30 px-2 py-0.5 rounded-md">
                Manage Items
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#6B5E5C] dark:text-[#AFA2A0]">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
              <span className="text-[#6B5E5C]">·</span>
              <span className="font-mono font-bold text-sm sm:text-base text-[#991B1B] dark:text-[#F87171]">
                Rs. {grandTotal}
              </span>
            </div>
          </div>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Manage Basket Button */}
          <button
            onClick={onOpenBasket}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E5DDD8] dark:border-[#3D2C2A] bg-[#F6F1EA] dark:bg-[#231A19] hover:bg-[#E5DDD8] dark:hover:bg-[#2C2220] text-[#1F1514] dark:text-[#FAF1F0] text-xs font-bold transition-colors"
          >
            <span>Edit Basket</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>

          {/* Finalize on WhatsApp Button */}
          <button
            onClick={handleQuickFinalizeWhatsApp}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap min-h-[40px]"
            title="Finalize order and send to WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-[#25D366] shrink-0" />
            <span className="hidden xs:inline">Finalize on WhatsApp</span>
            <span className="xs:hidden">WhatsApp Order</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>
        </div>
      </div>
    </div>
  );
}
