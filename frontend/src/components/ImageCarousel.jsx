import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const ImageCarousel = ({ images, title, price, weather }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Fallback if no images are valid
    const validImages = images?.filter(img => img && typeof img === 'string' && img.length > 0);
    const displayImages = validImages && validImages.length > 0
        ? validImages
        : [`https://placehold.co/800x600/1a1a1a/white?text=${encodeURIComponent(title || 'Image')}`];

    return (
        <div className="relative group rounded-3xl overflow-hidden shadow-2xl h-[400px] w-full">
            {/* Scroll Buttons */}
            {displayImages.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); scroll('left'); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); scroll('right'); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Images */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory h-full w-full scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {displayImages.map((img, idx) => (
                    <div key={idx} className="min-w-full h-full snap-center relative">
                        <img
                            src={img}
                            alt={`${title} - view ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    </div>
                ))}
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-10 pointer-events-none">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2 text-shadow">{title}</h2>
                        <div className="flex items-center gap-2 text-white/90">
                            <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                            <span className="text-sm font-medium tracking-wide">Destination</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Badge */}
            <div className="absolute top-4 right-4 z-10">
                {/* Can insert generic badge here if needed, but components are flexible */}
            </div>
        </div>
    );
};

export default ImageCarousel;
