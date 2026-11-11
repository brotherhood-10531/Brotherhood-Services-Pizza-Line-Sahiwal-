import { MessageSquare, ArrowDown, Sparkles, Clock, Flame, ShieldCheck, Heart } from 'lucide-react';
import { BITE_BOX_INFO, buildWhatsAppUrl, isStoreOpen } from '../data/biteBoxData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOpenQuickDeal: () => void;
}

export default function HeroSection({ onExploreMenu, onOpenQuickDeal }: HeroSectionProps) {
  const storeStatus = isStoreOpen();

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Decorative subtle radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#FEE2E2]/60 via-transparent to-transparent dark:from-[#991B1B]/15 dark:via-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#991B1B] dark:text-[#F87171] uppercase mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#991B1B] dark:bg-[#F87171]" />
              <span>{BITE_BOX_INFO.tagline}</span>
              <span className="text-[#6B5E5C] dark:text-[#AFA2A0]">·</span>
              <span className="text-[#6B5E5C] dark:text-[#AFA2A0]">Sahiwal, Pakistan</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#1F1514] dark:text-[#FAF1F0] tracking-tight leading-[1.12] mb-5 text-balance">
              Where Every Bite <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#F59E0B]">
                Counts & Sizzles.
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-[#6B5E5C] dark:text-[#AFA2A0] leading-relaxed max-w-2xl mb-8">
              Sahiwal's premier artisanal food kitchen. Crafted with 100% daily fresh halal beef smash patties, 14-hour marinated crispy zingers, house-baked brioche, and molten loaded fries delivered steaming hot to your doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
              <a
                href={buildWhatsAppUrl(
                  "Hi Pizza Line! I want to order from today's menu. Please share the fastest available delivery items."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 whitespace-nowrap min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-sm shadow-md transition-all active:scale-98 whitespace-nowrap min-h-[48px]"
              >
                <span>View Full Menu</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuickDeal}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-[#E5DDD8] dark:border-[#3D2C2A] bg-white dark:bg-[#231A19] hover:bg-slate-50 dark:hover:bg-[#2C2220] text-[#1F1514] dark:text-[#FAF1F0] text-sm font-semibold transition-colors min-h-[48px]"
              >
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Daily Combos</span>
              </button>
            </div>

            {/* Quick Trust Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E5DDD8] dark:border-[#3D2C2A] text-xs text-[#6B5E5C] dark:text-[#AFA2A0]">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#991B1B] shrink-0" />
                <span>100% Prime Halal Beef</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>12-Min Fast Service</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fresh Brioche Buns</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#DC2626] shrink-0" />
                <span>Sahiwal's Top Rated</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E5DDD8] dark:border-[#3D2C2A] bg-white dark:bg-[#231A19] group">
              {/* Image */}
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src="/images/img_hero_burger.jpg"
                  alt="Pizza Line Double Smashed Beef Burger and Loaded Fries"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#F59E0B] text-black text-xs font-black tracking-wide shadow-sm">
                    CHEF'S SIGNATURE
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-medium text-amber-300 mb-1">
                    Prime Smashed Double Beef Burger
                  </p>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-white">
                      Double Beef with Molten Cheddar
                    </h3>
                    <span className="font-mono font-bold text-xl text-amber-400">
                      Rs. 850
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Pill Strip Below Photo */}
              <div className="p-4 bg-white dark:bg-[#231A19] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-[#1F1514] dark:text-[#FAF1F0]">
                    Kitchen Active in Sahiwal
                  </span>
                </div>
                <span className="text-[#6B5E5C] dark:text-[#AFA2A0]">
                  {storeStatus.message}
                </span>
              </div>
            </div>

            {/* Accent Floating Card for Social Proof */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 items-center gap-3 p-3.5 bg-white dark:bg-[#2C2220] rounded-xl shadow-xl border border-[#E5DDD8] dark:border-[#3D2C2A] max-w-xs">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] dark:bg-[#78350F]/50 flex items-center justify-center text-[#92400E] dark:text-amber-300 font-bold shrink-0">
                4.9★
              </div>
              <div>
                <p className="text-xs font-bold text-[#1F1514] dark:text-[#FAF1F0]">
                  Over 1,200+ Happy Foodies
                </p>
                <p className="text-[11px] text-[#6B5E5C] dark:text-[#AFA2A0]">
                  Rated #1 smash burger in Sahiwal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
