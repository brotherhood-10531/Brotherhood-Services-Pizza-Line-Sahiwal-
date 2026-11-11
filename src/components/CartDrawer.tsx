import { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, Bike, Store, ArrowRight, Tag, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { CartItem, BITE_BOX_INFO, buildWhatsAppUrl } from '../data/biteBoxData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onPlaceCODOrder: (orderDetails: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    isDelivery: boolean;
    subtotal: number;
    deliveryFee: number;
    grandTotal: number;
  }) => void;
  appliedCoupon: string | null;
  onSetAppliedCoupon: (coupon: string | null) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceCODOrder,
  appliedCoupon,
  onSetAppliedCoupon,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [isDelivery, setIsDelivery] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [showSummaryPreview, setShowSummaryPreview] = useState(false);

  const calculateItemUnitPrice = (item: CartItem) => {
    let unit = item.menuItem.price;
    if (item.extraCheese) unit += 120;
    if (item.extraJalapeno) unit += 80;
    if (item.upgradeMeal) unit += 320;
    return unit;
  };

  const calculateItemTotal = (item: CartItem) => {
    return calculateItemUnitPrice(item) * item.quantity;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  const discountAmount = appliedCoupon ? Math.round(subtotal * 0.15) : 0;
  const deliveryFee =
    !isDelivery || subtotal === 0
      ? 0
      : subtotal >= BITE_BOX_INFO.freeDeliveryThreshold
      ? 0
      : BITE_BOX_INFO.deliveryFee;

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const totalItemCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toLowerCase();
    if (clean === 'pizza line' || clean === 'pizzaline' || clean === 'online pizza') {
      onSetAppliedCoupon('Pizza Line');
      setCouponError(null);
      setCouponInput('');
    } else {
      setCouponError('Invalid code. Use "Pizza Line" for 15% discount!');
    }
  };

  const generateWhatsAppMessage = () => {
    const lines = [
      '🍕 *New Order from Pizza Line*',
      '',
      `📋 *Fulfillment:* ${isDelivery ? 'Home Delivery in Sahiwal' : 'Takeaway (Sahiwal Kitchen Pickup)'}`,
      customerName.trim() ? `👤 *Customer Name:* ${customerName.trim()}` : '',
      customerPhone.trim() ? `📞 *Phone Number:* ${customerPhone.trim()}` : '',
      isDelivery && deliveryAddress.trim() ? `📍 *Delivery Address:* ${deliveryAddress.trim()}` : '',
      appliedCoupon ? `🏷️ *Coupon Applied:* ${appliedCoupon} (15% OFF)` : '',
      '',
      '*Itemized Basket Order:*',
    ];

    cartItems.forEach((item, index) => {
      const unitP = calculateItemUnitPrice(item);
      const lineTotal = calculateItemTotal(item);
      const extras: string[] = [];
      if (item.extraCheese) extras.push('Extra Molten Cheddar (+Rs. 120)');
      if (item.extraJalapeno) extras.push('Jalapeños (+Rs. 80)');
      if (item.upgradeMeal) extras.push('Combo Meal with Fries & Drink (+Rs. 320)');
      if (item.specialInstructions?.trim()) extras.push(`Note: "${item.specialInstructions.trim()}"`);

      const extrasStr = extras.length > 0 ? `\n    └ ${extras.join(' · ')}` : '';
      lines.push(`${index + 1}. ${item.quantity}x *${item.menuItem.name}* (Rs. ${unitP} ea) = *Rs. ${lineTotal}*${extrasStr}`);
    });

    lines.push('');
    lines.push(`Subtotal: Rs. ${subtotal}`);
    if (discountAmount > 0) {
      lines.push(`Coupon Discount (Pizza Line -15%): -Rs. ${discountAmount}`);
    }
    if (isDelivery) {
      lines.push(`Delivery Fee: ${deliveryFee === 0 ? 'FREE (Orders over Rs. 2,000)' : `Rs. ${deliveryFee}`}`);
    }
    lines.push(`*Final Grand Total: Rs. ${grandTotal}*`);
    lines.push('');
    lines.push('Please confirm my order and share preparation / delivery time in Sahiwal. Thank you!');

    return lines.filter((l) => l !== '').join('\n');
  };

  const handleFinalizeWhatsApp = () => {
    const message = generateWhatsAppMessage();
    window.open(buildWhatsAppUrl(message), '_blank');
  };

  const handleCODCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDelivery && !deliveryAddress.trim()) {
      alert('Please enter your delivery address in Sahiwal.');
      return;
    }

    onPlaceCODOrder({
      customerName: customerName.trim() || 'Guest',
      customerPhone: customerPhone.trim() || 'N/A',
      deliveryAddress: isDelivery ? deliveryAddress.trim() : 'Pickup at Sahiwal Kitchen',
      isDelivery,
      subtotal,
      deliveryFee,
      grandTotal,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs flex items-end sm:items-stretch justify-center sm:justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1E1514] h-[94vh] sm:h-full rounded-t-3xl sm:rounded-none shadow-2xl flex flex-col justify-between border-t sm:border-t-0 sm:border-l border-[#E5DDD8] dark:border-[#3D2C2A] animate-in slide-in-from-bottom sm:slide-in-from-right duration-300">
        {/* Mobile Pull Bar Indicator */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-[#FDFBF7] dark:bg-[#231A19]">
          <div className="w-12 h-1.5 bg-[#E5DDD8] dark:bg-[#3D2C2A] rounded-full" />
        </div>

        {/* Basket Header */}
        <div className="px-4 py-3.5 sm:p-5 border-b border-[#E5DDD8] dark:border-[#3D2C2A] flex items-center justify-between bg-[#FDFBF7] dark:bg-[#231A19] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#991B1B] text-white shadow-sm">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg sm:text-xl text-[#1F1514] dark:text-[#FAF1F0]">
                Your Basket
              </h3>
              <span className="text-[11px] sm:text-xs text-[#6B5E5C] dark:text-[#AFA2A0]">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} · Manage quantities
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="px-2.5 py-1.5 text-[#991B1B] hover:text-[#7F1D1D] hover:bg-[#FEE2E2] dark:hover:bg-[#991B1B]/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Clear all items from basket"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Empty Basket</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#1F1514] dark:text-[#FAF1F0]"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FEF3C7] dark:bg-[#78350F]/30 flex items-center justify-center text-[#991B1B]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#1F1514] dark:text-[#FAF1F0]">
                Your Basket is empty
              </h4>
              <p className="text-xs text-[#6B5E5C] dark:text-[#AFA2A0] max-w-xs mx-auto">
                Explore our gourmet burgers, crispy chicken, and loaded fries to add items to your basket!
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#991B1B] text-white font-bold text-xs hover:bg-[#7F1D1D] transition-colors"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <>
              {/* Items List with detailed Quantity and Price Management */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#6B5E5C] dark:text-[#AFA2A0]">
                  <span>Items in Basket</span>
                  <span>Unit Price / Total</span>
                </div>

                {cartItems.map((item) => {
                  const unitPrice = calculateItemUnitPrice(item);
                  const itemTotal = calculateItemTotal(item);
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-[#F6F1EA] dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] flex items-start gap-3 shadow-xs"
                    >
                      {/* Food Thumbnail */}
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-white dark:bg-[#2C2220] border border-[#E5DDD8] dark:border-[#3D2C2A]"
                        referrerPolicy="no-referrer"
                      />

                      {/* Info & Add-ons */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <h5 className="font-display font-bold text-sm text-[#1F1514] dark:text-[#FAF1F0] truncate">
                              {item.menuItem.name}
                            </h5>
                            <span className="text-[11px] font-mono text-[#6B5E5C] dark:text-[#AFA2A0]">
                              Rs. {unitPrice} each
                            </span>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#6B5E5C] hover:text-[#991B1B] p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Remove from basket"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Customizations Tag List */}
                        <div className="text-[11px] text-[#6B5E5C] dark:text-[#AFA2A0] space-y-0.5 mt-1">
                          {item.extraCheese && (
                            <span className="inline-block bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded text-[10px] mr-1">
                              + Molten Cheddar (+120)
                            </span>
                          )}
                          {item.extraJalapeno && (
                            <span className="inline-block bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded text-[10px] mr-1">
                              + Jalapeños (+80)
                            </span>
                          )}
                          {item.upgradeMeal && (
                            <span className="inline-block bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300 px-1.5 py-0.5 rounded text-[10px] font-semibold mr-1">
                              + Combo Meal (Fries & Drink) (+320)
                            </span>
                          )}
                          {item.specialInstructions && (
                            <p className="italic text-[10px] text-[#6B5E5C] dark:text-[#AFA2A0] pt-0.5">
                              Note: "{item.specialInstructions}"
                            </p>
                          )}
                        </div>

                        {/* Price & Quantity Stepper Controls */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E5DDD8]/60 dark:border-[#3D2C2A]/60">
                          <div>
                            <span className="text-[10px] text-[#6B5E5C] dark:text-[#AFA2A0] block">
                              Total Price
                            </span>
                            <span className="font-mono font-bold text-base text-[#991B1B] dark:text-[#F87171]">
                              Rs. {itemTotal}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 bg-white dark:bg-[#2C2220] px-2 py-1 rounded-xl border border-[#E5DDD8] dark:border-[#3D2C2A] shadow-xs">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-[#6B5E5C] hover:text-[#991B1B] active:scale-95 transition-all"
                              title="Decrease quantity"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-mono font-bold min-w-5 text-center text-[#1F1514] dark:text-[#FAF1F0]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#6B5E5C] hover:text-[#991B1B] active:scale-95 transition-all"
                              title="Increase quantity"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Fulfillment Type (Delivery vs Pickup) */}
              <div className="p-4 rounded-2xl bg-[#F6F1EA] dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#1F1514] dark:text-[#FAF1F0]">
                  Fulfillment Method
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsDelivery(true)}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isDelivery
                        ? 'bg-[#991B1B] text-white shadow-sm'
                        : 'bg-white dark:bg-[#2C2220] text-[#6B5E5C] dark:text-[#AFA2A0] border border-[#E5DDD8] dark:border-[#3D2C2A]'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Home Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDelivery(false)}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      !isDelivery
                        ? 'bg-[#991B1B] text-white shadow-sm'
                        : 'bg-white dark:bg-[#2C2220] text-[#6B5E5C] dark:text-[#AFA2A0] border border-[#E5DDD8] dark:border-[#3D2C2A]'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Sahiwal Pickup</span>
                  </button>
                </div>

                {/* Delivery Address Input */}
                {isDelivery ? (
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-semibold text-[#1F1514] dark:text-[#FAF1F0]">
                      Delivery Address in Sahiwal
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. House 14, Street 2, Farid Town, Sahiwal"
                      className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#2C2220] border border-[#E5DDD8] dark:border-[#3D2C2A] rounded-xl text-[#1F1514] dark:text-[#FAF1F0] placeholder-[#6B5E5C]/70 focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
                    />
                    {subtotal < BITE_BOX_INFO.freeDeliveryThreshold && (
                      <p className="text-[11px] text-[#6B5E5C] dark:text-[#AFA2A0]">
                        Add Rs. {BITE_BOX_INFO.freeDeliveryThreshold - subtotal} more for <span className="text-emerald-700 dark:text-emerald-400 font-bold">FREE Delivery</span>!
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-[#FEF3C7] dark:bg-[#78350F]/20 text-[11px] text-[#78350F] dark:text-[#FEF3C7] border border-[#FDE68A] dark:border-[#78350F]/40">
                    📍 Self-Pickup at Pizza Line Kitchen: {BITE_BOX_INFO.fullAddress}. Ready in ~15 minutes!
                  </div>
                )}
              </div>

              {/* Customer Contact Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1F1514] dark:text-[#FAF1F0] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Usman"
                    className="w-full px-3.5 py-2 text-xs bg-[#F6F1EA] dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] rounded-xl text-[#1F1514] dark:text-[#FAF1F0] placeholder-[#6B5E5C]/70 focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1F1514] dark:text-[#FAF1F0] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0319-XXXXXXX"
                    className="w-full px-3.5 py-2 text-xs bg-[#F6F1EA] dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] rounded-xl text-[#1F1514] dark:text-[#FAF1F0] placeholder-[#6B5E5C]/70 focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
                  />
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="p-4 rounded-2xl bg-[#F6F1EA] dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1F1514] dark:text-[#FAF1F0]">
                    <Tag className="w-3.5 h-3.5 text-[#991B1B]" />
                    <span>Apply Coupon Code</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    Code: Pizza Line
                  </span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Coupon "{appliedCoupon}" Applied (-15% OFF)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSetAppliedCoupon(null)}
                      className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError(null);
                      }}
                      placeholder="Enter 'Pizza Line'"
                      className="flex-1 px-3.5 py-2 text-xs bg-white dark:bg-[#2C2220] border border-[#E5DDD8] dark:border-[#3D2C2A] rounded-xl text-[#1F1514] dark:text-[#FAF1F0] placeholder-[#6B5E5C]/70 focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#991B1B] text-white text-xs font-bold hover:bg-[#7F1D1D] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                    {couponError}
                  </p>
                )}
              </div>

              {/* Message Preview Accordion */}
              <div className="border border-[#E5DDD8] dark:border-[#3D2C2A] rounded-xl overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setShowSummaryPreview(!showSummaryPreview)}
                  className="w-full p-3 flex items-center justify-between font-bold text-[#6B5E5C] dark:text-[#AFA2A0] hover:bg-[#F6F1EA] dark:hover:bg-[#2C2220]"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    Preview WhatsApp Message Format
                  </span>
                  {showSummaryPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showSummaryPreview && (
                  <div className="p-3 bg-[#FDFBF7] dark:bg-[#181110] border-t border-[#E5DDD8] dark:border-[#3D2C2A] font-mono text-[11px] whitespace-pre-wrap text-[#1F1514] dark:text-[#FAF1F0]">
                    {generateWhatsAppMessage()}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout & Finalize Controls */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E5DDD8] dark:border-[#3D2C2A] bg-[#FDFBF7] dark:bg-[#231A19] space-y-3 shrink-0" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' }}>
            {/* Price Calculations */}
            <div className="space-y-1 text-xs text-[#6B5E5C] dark:text-[#AFA2A0]">
              <div className="flex justify-between">
                <span>Items Subtotal ({totalItemCount} items)</span>
                <span className="font-mono font-bold text-[#1F1514] dark:text-[#FAF1F0]">
                  Rs. {subtotal}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Coupon Discount (15%)</span>
                  <span className="font-mono">-Rs. {discountAmount}</span>
                </div>
              )}
              {isDelivery && (
                <div className="flex justify-between">
                  <span>Delivery Charges (Sahiwal)</span>
                  <span className="font-mono font-bold text-[#1F1514] dark:text-[#FAF1F0]">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `Rs. ${deliveryFee}`
                    )}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#1F1514] dark:text-[#FAF1F0] pt-1.5 border-t border-[#E5DDD8] dark:border-[#3D2C2A]">
                <span>Grand Total</span>
                <span className="font-mono font-black text-xl text-[#991B1B] dark:text-[#F87171]">
                  Rs. {grandTotal}
                </span>
              </div>
            </div>

            {/* Finalize Button Embedded WhatsApp */}
            <button
              onClick={handleFinalizeWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all active:scale-98 group min-h-[48px]"
              title="Finalize your order and send via WhatsApp"
            >
              <MessageSquare className="w-5 h-5 fill-white text-[#25D366] group-hover:scale-110 transition-transform shrink-0" />
              <span>Finalize Order on WhatsApp · Rs. {grandTotal}</span>
              <ArrowRight className="w-4 h-4 ml-1 hidden xs:inline shrink-0" />
            </button>

            {/* Cash on Delivery Alternative */}
            <button
              onClick={handleCODCheckout}
              className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl border border-[#991B1B] text-[#991B1B] dark:text-[#F87171] hover:bg-[#FEE2E2] dark:hover:bg-[#7F1D1D]/20 text-xs font-bold transition-colors min-h-[42px]"
            >
              <span>Or Place Cash on Delivery (Get Printable Receipt)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
