import { useState } from 'react';
import { Users, Calendar, MapPin, MessageSquare, Truck, ShieldCheck, Flame } from 'lucide-react';
import { CATERING_PACKAGES, BITE_BOX_INFO, buildWhatsAppUrl } from '../data/biteBoxData';

export default function CateringCalculatorSection() {
  const [guestCount, setGuestCount] = useState(30);
  const [selectedEventType, setSelectedEventType] = useState('Birthday Party');
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(1);
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('Farid Town, Sahiwal');

  const eventTypes = [
    'Birthday Party',
    'Corporate Lunch',
    'Game Night / Match Screening',
    'College Gathering',
  ];

  const currentPackage = CATERING_PACKAGES[selectedPackageIndex];
  const estimatedTotal = guestCount * currentPackage.pricePerPerson;

  const handleWhatsAppQuote = () => {
    const msg = [
      '🍕 *Pizza Line Catering & Event Meals Request*',
      '',
      `🎉 *Event Type:* ${selectedEventType}`,
      `👥 *Estimated Guests:* ${guestCount} Pax`,
      `📦 *Package Selected:* ${currentPackage.name} (Rs. ${currentPackage.pricePerPerson}/pax)`,
      eventDate ? `📅 *Date & Time:* ${eventDate}` : '',
      `📍 *Location:* ${eventLocation}`,
      `💰 *Estimated Budget:* Rs. ${estimatedTotal.toLocaleString()}`,
      '',
      'Please provide availability, menu customization, and formal booking details. Thank you!',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(buildWhatsAppUrl(msg), '_blank');
  };

  return (
    <section id="catering" className="py-14 sm:py-20 bg-[#F6F1EA] dark:bg-[#1E1514] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] dark:bg-[#991B1B]/30 border border-[#FCA5A5] dark:border-[#991B1B]/50 text-xs font-bold text-[#991B1B] dark:text-[#F87171] mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Event Meals & Bulk Orders</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-[#1F1514] dark:text-[#FAF1F0] tracking-tight">
            Make Your Event Sizzle
          </h2>
          <p className="text-sm text-[#6B5E5C] dark:text-[#AFA2A0] mt-2 leading-relaxed">
            From boardroom lunches to birthday celebrations across Sahiwal. Hot gourmet boxes and loaded fry bars delivered fresh with dedicated event coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Calculator Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#231A19] rounded-2xl border border-[#E5DDD8] dark:border-[#3D2C2A] p-6 sm:p-8 shadow-sm">
            <h3 className="font-display font-bold text-xl text-[#1F1514] dark:text-[#FAF1F0] mb-1">
              Instant Catering Budget Calculator
            </h3>
            <p className="text-xs text-[#6B5E5C] dark:text-[#AFA2A0] mb-6">
              Adjust guest count and package tiers to see real-time cost estimates.
            </p>

            <div className="space-y-6">
              {/* Event Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1514] dark:text-[#FAF1F0] mb-2">
                  1. Event Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedEventType(type)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                        selectedEventType === type
                          ? 'bg-[#991B1B] text-white shadow-sm'
                          : 'bg-[#F6F1EA] dark:bg-[#2C2220] text-[#6B5E5C] dark:text-[#AFA2A0] hover:text-[#1F1514] dark:hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1F1514] dark:text-[#FAF1F0]">
                    2. Estimated Guests
                  </label>
                  <span className="font-mono font-bold text-base text-[#991B1B] dark:text-[#F87171] px-2.5 py-0.5 rounded-md bg-[#FEE2E2] dark:bg-[#991B1B]/20">
                    {guestCount} People
                  </span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={200}
                  step={5}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#991B1B] h-2 bg-[#E5DDD8] dark:bg-[#3D2C2A] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#6B5E5C] dark:text-[#AFA2A0] mt-1 font-mono">
                  <span>Min: 15 pax</span>
                  <span>100 pax</span>
                  <span>Max: 200+ pax</span>
                </div>
              </div>

              {/* Package Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1514] dark:text-[#FAF1F0] mb-2">
                  3. Select Catering Tier
                </label>
                <div className="space-y-2.5">
                  {CATERING_PACKAGES.map((pkg, idx) => {
                    const isSelected = selectedPackageIndex === idx;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageIndex(idx)}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'border-[#991B1B] bg-[#FEE2E2]/30 dark:bg-[#991B1B]/15'
                            : 'border-[#E5DDD8] dark:border-[#3D2C2A] hover:bg-[#F6F1EA] dark:hover:bg-[#2C2220]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-sm text-[#1F1514] dark:text-[#FAF1F0]">
                              {pkg.name}
                            </span>
                            {pkg.popular && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#F59E0B] text-black">
                                MOST POPULAR
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6B5E5C] dark:text-[#AFA2A0] mt-0.5">
                            {pkg.description}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono font-bold text-base text-[#991B1B] dark:text-[#F87171] block">
                            Rs. {pkg.pricePerPerson}
                          </span>
                          <span className="text-[10px] text-[#6B5E5C] dark:text-[#AFA2A0]">
                            per person
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date & Location Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F1514] dark:text-[#FAF1F0] mb-1">
                    Date & Time
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#6B5E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      placeholder="e.g. Next Saturday, 7:30 PM"
                      className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#F6F1EA] dark:bg-[#2C2220] border border-[#E5DDD8] dark:border-[#3D2C2A] text-[#1F1514] dark:text-[#FAF1F0] placeholder-[#6B5E5C]/70 focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F1514] dark:text-[#FAF1F0] mb-1">
                    Event Venue / Sector
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#6B5E5C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="e.g. Farid Town, Civil Lines, Sahiwal"
                      className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#F6F1EA] dark:bg-[#2C2220] border border-[#E5DDD8] dark:border-[#3D2C2A] text-[#1F1514] dark:text-[#FAF1F0] placeholder-[#6B5E5C]/70 focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
                    />
                  </div>
                </div>
              </div>

              {/* Estimate Calculation & WhatsApp CTA */}
              <div className="pt-4 border-t border-[#E5DDD8] dark:border-[#3D2C2A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#6B5E5C] dark:text-[#AFA2A0] block">
                    Estimated Package Total
                  </span>
                  <span className="font-mono font-black text-2xl sm:text-3xl text-[#991B1B] dark:text-[#F87171]">
                    Rs. {estimatedTotal.toLocaleString()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 min-h-[48px]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Quote on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: The Pizza Line Catering Standards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-[#231A19] rounded-2xl border border-[#E5DDD8] dark:border-[#3D2C2A] p-6 shadow-sm">
              <h4 className="font-display font-bold text-lg text-[#1F1514] dark:text-[#FAF1F0] mb-4">
                The Pizza Line Catering Guarantee
              </h4>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#FEF3C7] dark:bg-[#78350F]/40 text-[#92400E] dark:text-amber-300 shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#1F1514] dark:text-[#FAF1F0]">
                      Thermal Double-Insulated Food Boxes
                    </h5>
                    <p className="text-xs text-[#6B5E5C] dark:text-[#AFA2A0] mt-0.5">
                      Hot burgers with crispy, un-soggy loaded fries delivered to your venue in specialized thermal catering transport boxes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#FEE2E2] dark:bg-[#991B1B]/30 text-[#991B1B] dark:text-[#F87171] shrink-0">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#1F1514] dark:text-[#FAF1F0]">
                      Live Loaded Fry Bar (50+ Pax)
                    </h5>
                    <p className="text-xs text-[#6B5E5C] dark:text-[#AFA2A0] mt-0.5">
                      Optional on-site live fry station with flowing molten cheddar lava, jalapeño toppings, and spicy sauce bars for large parties.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#1F1514] dark:text-[#FAF1F0]">
                      Dedicated Kitchen Coordinator
                    </h5>
                    <p className="text-xs text-[#6B5E5C] dark:text-[#AFA2A0] mt-0.5">
                      Direct WhatsApp connection with head chef from booking through dispatch, ensuring punctual setup and exact headcounts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Catering Support Note */}
            <div className="rounded-2xl p-5 bg-[#FDFBF7] dark:bg-[#281E1C] border border-[#E5DDD8] dark:border-[#3D2C2A] flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#1F1514] dark:text-[#FAF1F0]">
                  Custom Menu Requirements?
                </p>
                <p className="text-[#6B5E5C] dark:text-[#AFA2A0]">
                  Call our event team: {BITE_BOX_INFO.phoneDisplay}
                </p>
              </div>
              <a
                href={`tel:${BITE_BOX_INFO.phone}`}
                className="px-3 py-2 rounded-lg bg-[#991B1B] text-white font-bold hover:bg-[#7F1D1D] transition-colors"
              >
                Call Chef
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
