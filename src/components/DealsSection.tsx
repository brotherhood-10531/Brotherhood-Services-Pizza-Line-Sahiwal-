import { MessageSquare, Tag, Users, Plus, ShoppingBag } from 'lucide-react';
import { COMBO_DEALS, ComboDeal, buildWhatsAppUrl } from '../data/biteBoxData';

interface DealsSectionProps {
  onOrderDealWhatsApp: (deal: ComboDeal) => void;
  onCustomGatheringInquiry: () => void;
  onAddDealToBasket: (deal: ComboDeal) => void;
}

export default function DealsSection({
  onOrderDealWhatsApp,
  onCustomGatheringInquiry,
  onAddDealToBasket,
}: DealsSectionProps) {
  return (
    <section id="deals" className="py-14 sm:py-20 bg-[#F6F1EA] dark:bg-[#1E1514] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] dark:bg-[#78350F]/40 border border-[#FDE68A] dark:border-[#78350F]/60 text-xs font-bold text-[#92400E] dark:text-[#FDE68A] mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>High-Value Feast Bundles</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-[#1F1514] dark:text-[#FAF1F0] tracking-tight mb-3">
            Daily Curated Combo Deals
          </h2>
          <p className="text-sm text-[#6B5E5C] dark:text-[#AFA2A0] leading-relaxed">
            Save up to 30% with bundled meals designed for solo feasts, couples, office squads, and midnight cravings. Add deals to your basket or order directly on WhatsApp.
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {COMBO_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#181110]">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                  {/* Savings Tag */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#991B1B] text-white font-black text-xs tracking-wider shadow-md">
                    {deal.discountTag}
                  </span>

                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-1">
                      {deal.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-300">
                      {deal.itemsSummary}
                    </p>
                  </div>
                </div>

                {/* Deal Body Description */}
                <div className="p-6">
                  <p className="text-sm text-[#6B5E5C] dark:text-[#AFA2A0] leading-relaxed">
                    {deal.description}
                  </p>
                </div>
              </div>

              {/* Deal Footer: Prices, Add to Basket & WhatsApp CTA */}
              <div className="p-6 pt-3 border-t border-[#E5DDD8]/60 dark:border-[#3D2C2A]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FDFBF7] dark:bg-[#281E1C]/60">
                <div>
                  <span className="text-xs line-through text-[#6B5E5C] dark:text-[#AFA2A0] block font-mono">
                    Regular: Rs. {deal.originalPrice}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-[#991B1B] dark:text-[#F87171]">
                      Deal:
                    </span>
                    <span className="font-mono font-black text-2xl text-[#991B1B] dark:text-[#F87171]">
                      Rs. {deal.dealPrice}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => onAddDealToBasket(deal)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-[#991B1B] text-[#991B1B] dark:text-[#F87171] hover:bg-[#FEE2E2] dark:hover:bg-[#7F1D1D]/20 font-bold text-xs transition-colors min-h-[44px]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Basket</span>
                  </button>

                  <a
                    href={buildWhatsAppUrl(
                      `Hi Pizza Line! I want to order the *${deal.title}* (${deal.itemsSummary}) for Rs. ${deal.dealPrice}. Please confirm availability and delivery time.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md transition-all active:scale-95 whitespace-nowrap min-h-[44px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Order Now</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Group & Party Combos Banner */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-4 h-4" />
              <span>Hosting a Gathering in Sahiwal?</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
              Need a Custom Meal Deal for 10 to 50+ People?
            </h3>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Whether it's an office sprint, party, or family gathering in Sahiwal, our kitchen will prepare customized food boxes and loaded fry platters with bulk savings.
            </p>
          </div>

          <button
            onClick={onCustomGatheringInquiry}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-black font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap"
          >
            Inquire for Group Combos
          </button>
        </div>
      </div>
    </section>
  );
}
