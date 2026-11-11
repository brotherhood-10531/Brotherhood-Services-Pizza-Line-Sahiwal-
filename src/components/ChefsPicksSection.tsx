import { Sparkles, Star, Flame, SlidersHorizontal, MessageSquare } from 'lucide-react';
import { MENU_ITEMS, MenuItem, buildWhatsAppUrl } from '../data/biteBoxData';

interface ChefsPicksProps {
  onSelectItem: (item: MenuItem) => void;
}

export default function ChefsPicksSection({ onSelectItem }: ChefsPicksProps) {
  const chefPicks = MENU_ITEMS.filter((item) => item.isChefPick);

  return (
    <section id="chef-picks" className="py-14 sm:py-20 bg-white dark:bg-[#181110] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#991B1B] dark:text-[#F87171] mb-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Curated Heritage Flavors</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-[#1F1514] dark:text-[#FAF1F0] tracking-tight">
            The Chef's Signature Craft
          </h2>
          <p className="text-sm text-[#6B5E5C] dark:text-[#AFA2A0] mt-2 leading-relaxed">
            Every morning in our Sahiwal kitchen, our team bakes fresh butter brioche and prepares prime cuts from scratch. These three flagship creations defined Pizza Line as a city favorite.
          </p>
        </div>

        {/* 3 Featured Signature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {chefPicks.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-[#FDFBF7] dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div
                  onClick={() => onSelectItem(item)}
                  className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer group bg-[#181110]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#F59E0B] text-black text-xs font-black tracking-wide shadow-md">
                    #{index + 1} LEGENDARY
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-xl text-white">
                        {item.name}
                      </h3>
                      <span className="font-mono font-black text-xl text-amber-400">
                        Rs. {item.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body & Story */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#6B5E5C] dark:text-[#AFA2A0]">
                    <div className="flex items-center gap-1 font-semibold text-[#1F1514] dark:text-[#FAF1F0]">
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                      <span>{item.rating}</span>
                      <span>({item.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono">
                      <Flame className="w-3.5 h-3.5 text-[#991B1B]" />
                      <span>{item.calories}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1F1514] dark:text-[#FAF1F0] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Behind-The-Kitchen Story Note */}
                  {item.story && (
                    <div className="p-3.5 rounded-xl bg-[#FEF3C7] dark:bg-[#78350F]/20 border border-[#FDE68A] dark:border-[#78350F]/40 text-xs">
                      <span className="font-bold text-[#92400E] dark:text-[#FDE68A] block mb-1">
                        Behind The Sizzle:
                      </span>
                      <p className="text-[#78350F] dark:text-[#FEF3C7]/90 leading-relaxed italic">
                        "{item.story}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => onSelectItem(item)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold border border-[#991B1B] text-[#991B1B] hover:bg-[#FEE2E2] dark:hover:bg-[#7F1D1D]/30 transition-colors min-h-[44px]"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </button>

                <a
                  href={buildWhatsAppUrl(
                    `Hi Pizza Line! I want to order 1x *${item.name}* (Rs. ${item.price}) from Chef's Picks. Please confirm.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors shadow-sm min-h-[44px]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Order Now</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
