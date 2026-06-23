import { useState, useEffect } from 'react';
import { banners } from '@/data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FlashSaleBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent((c) => (c + 1) % banners.length);

  return (
    <div className="relative w-full aspect-[750/300] rounded-2xl overflow-hidden shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="w-full h-full flex-shrink-0 relative"
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center px-6 py-4">
              <div className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                限时秒杀
              </div>
              <h2 className="text-white text-xl font-bold leading-tight">
                {banner.title}
              </h2>
              <p className="text-white/80 text-sm mt-1">{banner.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-text_primary hover:bg-white active:scale-95 transition-all shadow"
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-text_primary hover:bg-white active:scale-95 transition-all shadow"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
