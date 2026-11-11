import { useState } from 'react';
import { ZoomIn, X, RotateCcw, MessageSquare, Tag } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem, buildWhatsAppUrl } from '../data/biteBoxData';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const categories = ['All', 'Burgers', 'Sides', 'Combos', 'Desserts'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleOpenLightbox = (item: GalleryItem) => {
    setLightboxItem(item);
    setZoomLevel(1);
  };

  const handleCloseLightbox = () => {
    setLightboxItem(null);
    setZoomLevel(1);
  };

  return (
    <section id="gallery" className="py-14 sm:py-20 bg-white dark:bg-[#181110] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#991B1B] dark:text-[#F87171] mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Sizzle in High-Res</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#1F1514] dark:text-[#FAF1F0] tracking-tight">
              Food & Cafe Gallery
            </h2>
            <p className="text-sm text-[#6B5E5C] dark:text-[#AFA2A0] mt-1 max-w-xl">
              Tap any food photo to open our interactive zoom lightbox and order directly via WhatsApp.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#991B1B] text-white'
                    : 'bg-[#F6F1EA] dark:bg-[#231A19] text-[#6B5E5C] dark:text-[#AFA2A0] hover:text-[#1F1514] dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#181110] cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E5DDD8] dark:border-[#3D2C2A]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Zoom Affordance Icon */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#F59E0B] text-black mb-1">
                  {item.category}
                </span>
                <h4 className="font-display font-bold text-sm sm:text-base text-white truncate">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center">
            {/* Top Bar with actions */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-2">
              <span className="px-3 py-1 rounded-full bg-[#F59E0B] text-black text-xs font-black">
                {lightboxItem.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((z) => (z >= 2.5 ? 1 : z + 0.5))}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="Toggle Zoom"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                {zoomLevel > 1 && (
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                    title="Reset Zoom"
                    aria-label="Reset zoom"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleCloseLightbox}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Lightbox Image Viewport */}
            <div className="relative w-full max-h-[65vh] overflow-hidden rounded-2xl flex items-center justify-center bg-black/50">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                style={{ transform: `scale(${zoomLevel})` }}
                className="max-h-[65vh] w-auto max-w-full object-contain transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom Caption & Order CTA */}
            <div className="w-full mt-4 p-4 rounded-xl bg-black/60 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  {lightboxItem.title}
                </h3>
                <p className="text-xs text-white/80 max-w-xl">
                  {lightboxItem.caption}
                </p>
              </div>

              <a
                href={buildWhatsAppUrl(
                  `Hi Pizza Line! I loved the photo of *${lightboxItem.title}* from your gallery. How can I order this item?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
