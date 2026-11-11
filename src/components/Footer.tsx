import { Phone, MessageSquare, MapPin, Clock, Mail, Heart } from 'lucide-react';
import { BITE_BOX_INFO, buildWhatsAppUrl } from '../data/biteBoxData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#181110] text-[#FAF1F0] pt-16 pb-12 border-t border-[#3D2C2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3D2C2A]">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#991B1B] overflow-hidden flex items-center justify-center border-2 border-[#991B1B]">
                <img
                  src="/images/app_icon_fg.jpg"
                  alt="Pizza Line"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-display font-black text-2xl text-white tracking-tight block">
                  Pizza Line
                </span>
                <span className="text-xs font-semibold text-amber-400">
                  {BITE_BOX_INFO.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#AFA2A0] leading-relaxed max-w-sm">
              Sahiwal's premier artisanal food kitchen. Serving 100% daily fresh halal beef smash patties, crispy chicken zingers, and loaded fries with lightning-fast delivery.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-[#AFA2A0]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                12:00 PM – 12:00 AM Daily
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#AFA2A0]">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  Artisanal Menu
                </a>
              </li>
              <li>
                <a href="#deals" className="hover:text-amber-400 transition-colors">
                  Daily Combo Deals
                </a>
              </li>
              <li>
                <a href="#chef-picks" className="hover:text-amber-400 transition-colors">
                  Chef's Signature Picks
                </a>
              </li>
              <li>
                <a href="#catering" className="hover:text-amber-400 transition-colors">
                  Catering & Event Orders
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  Food Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  Location & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Dispatch */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Order Hotline & Location
            </h4>
            <div className="space-y-2.5 text-xs text-[#AFA2A0]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#991B1B] shrink-0 mt-0.5" />
                <span>{BITE_BOX_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${BITE_BOX_INFO.phone}`} className="hover:text-white font-mono font-bold">
                  {BITE_BOX_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={buildWhatsAppUrl('Hi Pizza Line! I want to order.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-mono font-bold text-[#25D366]"
                >
                  WhatsApp: {BITE_BOX_INFO.whatsappDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#AFA2A0] shrink-0" />
                <a href={`mailto:${BITE_BOX_INFO.email}`} className="hover:text-white font-mono">
                  {BITE_BOX_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={buildWhatsAppUrl('Hi Pizza Line! I want to place an order.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Quick WhatsApp Order</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#AFA2A0]/80">
          <p>
            © {currentYear} {BITE_BOX_INFO.name}. All Rights Reserved. Sahiwal, Punjab, Pakistan.
          </p>
          <p className="flex items-center gap-1">
            Fresh fast food crafted with care in Sahiwal.
          </p>
        </div>
      </div>
    </footer>
  );
}
