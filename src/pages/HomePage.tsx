import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import FlashSaleBanner from '@/components/product/FlashSaleBanner';
import ProductCard from '@/components/product/ProductCard';
import CountdownTimer from '@/components/product/CountdownTimer';
import { useFlashSaleStore } from '@/store/flashSaleStore';
import { Product } from '@/data/mockData';
import { Zap, Clock, ChevronRight } from 'lucide-react';

export default function Home() {
  const { activeSales, products, updateTime } = useFlashSaleStore();
  const [flashProducts, setFlashProducts] = useState<Product[]>([]);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      updateTime();
    }, 1000);
    return () => clearInterval(timer);
  }, [updateTime]);

  useEffect(() => {
    setTimeout(() => {
      const active = products.filter((p) => p.flashSaleId === 'fs-1');
      const others = products.filter((p) => !p.flashSaleId || p.flashSaleId !== 'fs-1');
      setFlashProducts(active);
      setOtherProducts(others);
      setLoading(false);
    }, 800);
  }, [products]);

  const activeSale = activeSales.find((s) => s.status === 'active');
  const upcomingSales = activeSales.filter((s) => s.status === 'upcoming');

  return (
    <div className="min-h-screen bg-bg_main pb-20">
      <Header title="秒杀专场" />

      <main className="pt-14">
        {/* Banner */}
        <div className="px-4 pt-4">
          <FlashSaleBanner />
        </div>

        {/* Flash Sale Section */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-base font-bold text-text_primary">限时秒杀</h2>
            </div>
            {activeSale && (
              <CountdownTimer
                targetTime={activeSale.endTime}
                size="sm"
              />
            )}
          </div>

          {/* Upcoming sales tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-4 px-4">
            {activeSale && (
              <div className="flex-shrink-0 px-3 py-1.5 bg-primary/10 rounded-full text-xs font-semibold text-primary border border-primary/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                {activeSale.title} 抢购中
              </div>
            )}
            {upcomingSales.map((sale) => (
              <div
                key={sale.id}
                className="flex-shrink-0 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-text_secondary border border-gray-200 flex items-center gap-1"
              >
                <Clock size={10} />
                {sale.title} 即将开始
              </div>
            ))}
          </div>

          {/* Flash products horizontal scroll */}
          {!loading && flashProducts.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {flashProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-36">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {loading && (
            <div className="flex gap-3 overflow-hidden">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-shrink-0 w-36 h-64 bg-gray-200 animate-pulse rounded-2xl" />
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-4 my-4 border-t border-gray-200" />

        {/* More Products */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-text_primary">精选推荐</h2>
            <button className="flex items-center gap-0.5 text-text_secondary text-xs">
              查看更多
              <ChevronRight size={14} />
            </button>
          </div>

          {!loading && (
            <div className="grid grid-cols-2 gap-3">
              {otherProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  animationDelay={i * 100}
                />
              ))}
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-2xl" />
              ))}
            </div>
          )}
        </div>

        <div className="h-8" />
      </main>

      <BottomNav />
    </div>
  );
}
