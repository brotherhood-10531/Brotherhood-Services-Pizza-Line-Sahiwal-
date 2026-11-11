import { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Mail, Navigation, Send, CheckCircle2, Instagram, Facebook } from 'lucide-react';
import { BITE_BOX_INFO, isStoreOpen, buildWhatsAppUrl } from '../data/biteBoxData';

export default function LocationContactSection() {
  const storeStatus = isStoreOpen();
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;

    const msg = `Hi Pizza Line Management!\n\nMessage from: ${feedbackName.trim() || 'A Customer'}\n"${feedbackMessage.trim()}"`;
    window.open(buildWhatsAppUrl(msg), '_blank');
    setFeedbackMessage('');
    setFeedbackName('');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <section id="location" className="py-14 sm:py-20 bg-white dark:bg-[#181110] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#991B1B] dark:text-[#F87171] mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Or Contact Us</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-[#1F1514] dark:text-[#FAF1F0] tracking-tight">
            Centrally Located in Sahiwal
          </h2>
          <p className="text-sm text-[#6B5E5C] dark:text-[#AFA2A0] mt-2 leading-relaxed">
            Stop by for takeaway or dine-in, or order for prompt delivery across Sahiwal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cafe Info & Quick Channels */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FDFBF7] dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display font-bold text-2xl text-[#991B1B] dark:text-[#F87171]">
                    {BITE_BOX_INFO.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#92400E] dark:text-amber-400">
                    {BITE_BOX_INFO.tagline}
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    storeStatus.open
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                  }`}
                >
                  {storeStatus.open ? 'OPEN NOW' : 'CLOSED'}
                </span>
              </div>

              {/* Detail Items */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#991B1B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1F1514] dark:text-[#FAF1F0] block">
                      Kitchen Address:
                    </span>
                    <span className="text-[#6B5E5C] dark:text-[#AFA2A0]">
                      {BITE_BOX_INFO.fullAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1F1514] dark:text-[#FAF1F0] block">
                      Operating Hours:
                    </span>
                    <span className="text-[#6B5E5C] dark:text-[#AFA2A0]">
                      {BITE_BOX_INFO.hours}
                    </span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block font-medium">
                      Dine-in, Takeaway & Home Delivery
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#991B1B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1F1514] dark:text-[#FAF1F0] block">
                      Order Line:
                    </span>
                    <a
                      href={`tel:${BITE_BOX_INFO.phone}`}
                      className="text-[#991B1B] dark:text-[#F87171] hover:underline font-mono font-bold"
                    >
                      {BITE_BOX_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1F1514] dark:text-[#FAF1F0] block">
                      WhatsApp Dispatch:
                    </span>
                    <a
                      href={buildWhatsAppUrl(
                        'Hi Pizza Line! I want to order or check menu items.'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1EBE5D] hover:underline font-mono font-bold"
                    >
                      {BITE_BOX_INFO.whatsappDisplay}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-[#E5DDD8] dark:border-[#3D2C2A]">
                <a
                  href={`tel:${BITE_BOX_INFO.phone}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-xs shadow-sm transition-colors min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>

                <a
                  href={buildWhatsAppUrl(
                    'Hi Pizza Line! I would like to order or ask a question.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-sm transition-colors min-h-[44px]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href={BITE_BOX_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E5DDD8] dark:border-[#3D2C2A] text-[#1F1514] dark:text-[#FAF1F0] hover:bg-black/5 dark:hover:bg-white/5 font-bold text-xs transition-colors min-h-[44px]"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#991B1B]" />
                  <span>Open Map</span>
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-4 rounded-xl bg-[#F6F1EA] dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] flex items-center justify-between">
              <span className="text-xs font-bold text-[#1F1514] dark:text-[#FAF1F0]">
                Follow Pizza Line:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white dark:bg-[#2C2220] hover:text-[#991B1B] text-[#6B5E5C] dark:text-[#AFA2A0] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white dark:bg-[#2C2220] hover:text-[#991B1B] text-[#6B5E5C] dark:text-[#AFA2A0] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Feedback Form & Newsletter */}
          <div className="lg:col-span-6 space-y-6">
            {/* Feedback / Inquiry Form */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#231A19] border border-[#E5DDD8] dark:border-[#3D2C2A] shadow-sm">
              <h3 className="font-display font-bold text-lg text-[#1F1514] dark:text-[#FAF1F0] mb-1">
                Direct Message to Management
              </h3>
              <p className="text-xs text-[#6B5E5C] dark:text-[#AFA2A0] mb-5">
                Have a query or feedback on your food? Send a note directly to our kitchen management on WhatsApp.
              </p>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F1514] dark:text-[#FAF1F0] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    placeholder="e.g. Ali Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F6F1EA] dark:bg-[#2C2220] border border-[#E5DDD8] dark:border-[#3D2C2A] text-[#1F1514] dark:text-[#FAF1F0] placeholder-[#6B5E5C]/70 focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F1514] dark:text-[#FAF1F0] mb-1">
                    Your Message / Review
                  </label>
                  <textarea
                    rows={3}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="Tell us about your experience or ask anything..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F6F1EA] dark:bg-[#2C2220] border border-[#E5DDD8] dark:border-[#3D2C2A] text-[#1F1514] dark:text-[#FAF1F0] placeholder-[#6B5E5C]/70 focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Club Newsletter */}
            <div className="p-6 rounded-2xl bg-[#FEF3C7] dark:bg-[#78350F]/20 border border-[#FDE68A] dark:border-[#78350F]/40">
              <h4 className="font-display font-bold text-base text-[#92400E] dark:text-[#FDE68A] mb-1">
                Join The Pizza Line Club
              </h4>
              <p className="text-xs text-[#78350F] dark:text-[#FEF3C7]/90 mb-4">
                Subscribe for weekly secret menu drops, 15% discount vouchers, and early access to new items in Sahiwal.
              </p>

              {newsletterSubscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You're subscribed! Use coupon code <strong>Pizza Line</strong> on your next order for 15% off.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-[#231A19] border border-[#FDE68A] dark:border-[#78350F]/60 text-[#1F1514] dark:text-[#FAF1F0] placeholder-[#6B5E5C]/70 focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#991B1B] text-white text-xs font-bold hover:bg-[#7F1D1D] transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
