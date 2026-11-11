import { CheckCircle2, Clock, MapPin, Printer, MessageSquare, X, ShoppingBag } from 'lucide-react';
import { BITE_BOX_INFO, buildWhatsAppUrl, CartItem } from '../data/biteBoxData';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderId: string;
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    isDelivery: boolean;
    subtotal: number;
    deliveryFee: number;
    grandTotal: number;
    items: CartItem[];
  } | null;
}

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  orderData,
}: OrderConfirmationModalProps) {
  if (!isOpen || !orderData) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppNotify = () => {
    const msg = `Hi Pizza Line! I just placed Cash on Delivery Order *${orderData.orderId}* on your website for Rs. ${orderData.grandTotal} (${orderData.isDelivery ? 'Delivery' : 'Takeaway'}). Please confirm receipt.`;
    window.open(buildWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-t-3xl sm:rounded-2xl bg-white dark:bg-[#231A19] border-t sm:border border-[#E5DDD8] dark:border-[#3D2C2A] shadow-2xl p-5 sm:p-8 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6B5E5C] hover:text-[#1F1514] dark:hover:text-white rounded-full min-h-[40px] min-w-[40px] flex items-center justify-center"
          aria-label="Close confirmation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center pb-6 border-b border-[#E5DDD8] dark:border-[#3D2C2A]">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-display font-black text-2xl text-[#1F1514] dark:text-[#FAF1F0]">
            Order Confirmed!
          </h3>
          <p className="text-xs text-[#6B5E5C] dark:text-[#AFA2A0] mt-1">
            Order Reference: <span className="font-mono font-bold text-[#991B1B] dark:text-[#F87171]">{orderData.orderId}</span>
          </p>
        </div>

        {/* Order Details & Timing */}
        <div className="py-5 space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#F6F1EA] dark:bg-[#2C2220]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F59E0B]" />
              <div>
                <span className="text-[11px] text-[#6B5E5C] dark:text-[#AFA2A0] block">
                  Est. Delivery Time
                </span>
                <span className="font-bold text-[#1F1514] dark:text-[#FAF1F0]">
                  {BITE_BOX_INFO.avgDeliveryTime}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#991B1B]" />
              <div>
                <span className="text-[11px] text-[#6B5E5C] dark:text-[#AFA2A0] block">
                  {orderData.isDelivery ? 'Delivery To' : 'Pickup At'}
                </span>
                <span className="font-bold text-[#1F1514] dark:text-[#FAF1F0] truncate block">
                  {orderData.isDelivery ? orderData.deliveryAddress : 'Sahiwal Kitchen'}
                </span>
              </div>
            </div>
          </div>

          {/* Itemized Receipt */}
          <div className="border border-[#E5DDD8] dark:border-[#3D2C2A] rounded-xl p-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#1F1514] dark:text-[#FAF1F0] mb-3">
              Receipt Summary
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {orderData.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-[#1F1514] dark:text-[#FAF1F0]">
                    {item.quantity}x {item.menuItem.name}
                  </span>
                  <span className="font-mono text-[#6B5E5C] dark:text-[#AFA2A0]">
                    Rs.{' '}
                    {(item.menuItem.price +
                      (item.extraCheese ? 120 : 0) +
                      (item.extraJalapeno ? 80 : 0) +
                      (item.upgradeMeal ? 320 : 0)) *
                      item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 mt-3 border-t border-[#E5DDD8] dark:border-[#3D2C2A] space-y-1 text-xs">
              <div className="flex justify-between text-[#6B5E5C] dark:text-[#AFA2A0]">
                <span>Subtotal</span>
                <span className="font-mono">Rs. {orderData.subtotal}</span>
              </div>
              {orderData.isDelivery && (
                <div className="flex justify-between text-[#6B5E5C] dark:text-[#AFA2A0]">
                  <span>Delivery</span>
                  <span className="font-mono">
                    {orderData.deliveryFee === 0 ? 'FREE' : `Rs. ${orderData.deliveryFee}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-[#1F1514] dark:text-[#FAF1F0] pt-1">
                <span>Total to Pay (Cash on Delivery)</span>
                <span className="font-mono text-[#991B1B] dark:text-[#F87171]">
                  Rs. {orderData.grandTotal}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={handleWhatsAppNotify}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Notify Kitchen on WhatsApp</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#E5DDD8] dark:border-[#3D2C2A] text-xs font-semibold text-[#1F1514] dark:text-[#FAF1F0] hover:bg-[#F6F1EA]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-[#991B1B] text-white text-xs font-bold hover:bg-[#7F1D1D]"
            >
              Done & Browse Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
