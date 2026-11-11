import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/biteBoxData';

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#F6F1EA] dark:bg-[#1E1514]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#991B1B] dark:text-[#F87171] mb-2">
            <span>Verified Sahiwal Foodies</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-[#1F1514] dark:text-[#FAF1F0] tracking-tight mb-2">
            What Sahiwal Foodies Say
          </h2>
          <p className="text-sm text-[#6B5E5C] dark:text-[#AFA2A0]">
            From late-night takeaways to lunchtime orders in Farid Town, Civil Lines, and across Sahiwal.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#991B1B]/20 dark:text-[#F87171]/20" />
                </div>

                <p className="text-xs sm:text-sm text-[#1F1514] dark:text-[#FAF1F0] leading-relaxed mb-4 italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author & Area Info */}
              <div className="pt-4 border-t border-[#E5DDD8]/60 dark:border-[#3D2C2A]/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#1F1514] dark:text-[#FAF1F0]">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  <span className="text-[11px] text-[#6B5E5C] dark:text-[#AFA2A0]">
                    {t.area}
                  </span>
                </div>
                <span className="text-[10px] text-[#6B5E5C] dark:text-[#AFA2A0]">
                  {t.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
