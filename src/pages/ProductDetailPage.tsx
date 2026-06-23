import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import SpecSelector from '@/components/product/SpecSelector';
import CountdownTimer from '@/components/product/CountdownTimer';
import Badge from '@/components/common/Badge';
import { useCartStore } from '@/store/cartStore';
import { useFlashSaleStore } from '@/store/flashSaleStore';
import {
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ArrowLeft,
  Heart,
  Share2,
  CheckCircle,
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useFlashSaleStore((s) => s.products.find((p) => p.id === id));
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({});
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text_secondary">商品不存在</p>
      </div>
    );
  }

  // Init default specs
  if (Object.keys(selectedSpecs).length === 0 && product.specs.length > 0) {
    const defaultSpecs: Record<string, string> = {};
    product.specs.forEach((spec) => {
      defaultSpecs[spec.name] = spec.options[0];
    });
    // Only set once
    if (Object.keys(selectedSpecs).length === 0) {
      setSelectedSpecs(defaultSpecs);
    }
  }

  const handleSpecChange = (name: string, value: string) => {
    setSelectedSpecs((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = () => {
    addItem(product, selectedSpecs);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discount = Math.round((1 - product.flashPrice / product.originalPrice) * 100);
  const saleEndTime = new Date(Date.now() + 2 * 3600000); // mock 2h from now

  return (
    <div className="min-h-screen bg-bg_main pb-28">
      <Header title="" />

      {/* Hero Image */}
      <div className="relative bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute top-12 left-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>
        </div>
        <div className="absolute top-12 right-3 flex gap-2">
          <button className="w-9 h-9 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <Heart size={18} strokeWidth={2} />
          </button>
          <button className="w-9 h-9 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <Share2 size={18} strokeWidth={2} />
          </button>
        </div>
        {product.tags && product.tags[0] && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
              {product.tags[0]}
            </span>
          </div>
        )}
      </div>

      {/* Price & Timer Section */}
      <div className="bg-gradient-to-r from-primary to-primary-light px-4 py-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-3xl font-bold">
                ¥{product.flashPrice.toLocaleString()}
              </span>
              <span className="text-white/60 text-sm line-through">
                ¥{product.originalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge text={`${discount}折`} variant="gold" />
              <span className="text-white/80 text-xs">限量抢购</span>
            </div>
          </div>
          <div className="text-right">
            <CountdownTimer targetTime={saleEndTime} size="lg" />
          </div>
        </div>
      </div>

      {/* Stock & Sold */}
      <div className="px-4 py-3 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-text_secondary">剩余库存</span>
          <span className={`text-sm font-bold ${product.stock <= 5 ? 'text-primary' : 'text-green-500'}`}>
            {product.stock} 件
          </span>
          {product.stock <= 5 && (
            <Badge text="库存紧张" variant="primary" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text_secondary">已抢购</span>
          <span className="text-sm font-bold text-text_primary">{product.soldCount} 件</span>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <span className="text-xs text-text_secondary">{product.category}</span>
      </div>

      {/* Product Info */}
      <div className="px-4 py-4 bg-white mt-2">
        <h1 className="text-base font-bold text-text_primary leading-snug">
          {product.name}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={14}
              className={i <= 4 ? 'text-gold fill-gold' : 'text-gray-300'}
              strokeWidth={1.5}
            />
          ))}
          <span className="text-xs text-text_secondary ml-1">4.8 (326条评价)</span>
        </div>
      </div>

      {/* Spec Selector */}
      <div className="px-4 py-4 bg-white mt-2">
        <h3 className="text-sm font-semibold text-text_primary mb-3">选择规格</h3>
        <SpecSelector
          specs={product.specs}
          selected={selectedSpecs}
          onChange={handleSpecChange}
        />
      </div>

      {/* Product Detail */}
      <div className="px-4 py-4 bg-white mt-2">
        <h3 className="text-sm font-semibold text-text_primary mb-3">商品详情</h3>
        <p className="text-sm text-text_secondary leading-relaxed">
          {product.description}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={`https://picsum.photos/seed/${product.id}-${i}/400/400`}
              alt="detail"
              className="w-full aspect-square rounded-xl bg-gray-50"
            />
          ))}
        </div>
      </div>

      {/* Service Icons */}
      <div className="px-4 py-4 bg-white mt-2 mb-4">
        <div className="flex justify-around">
          {[
            { icon: Truck, label: '急速发货' },
            { icon: ShieldCheck, label: '正品保障' },
            { icon: RotateCcw, label: '7天退换' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon size={20} className="text-primary" strokeWidth={2} />
              <span className="text-[10px] text-text_secondary">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 z-40">
        <button
          onClick={() => navigate('/cart')}
          className="relative w-12 h-12 flex flex-col items-center justify-center rounded-xl border border-gray-200 text-text_secondary hover:border-primary hover:text-primary transition-colors"
        >
          <ShoppingCart size={20} strokeWidth={2} />
        </button>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`flex-1 py-3.5 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
            addedToCart
              ? 'bg-green-500 text-white'
              : product.stock === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-dark active:scale-[0.98] shadow-lg shadow-primary/30'
          }`}
        >
          {addedToCart ? (
            <>
              <CheckCircle size={18} strokeWidth={2.5} />
              已加入购物车
            </>
          ) : product.stock === 0 ? (
            '已售罄'
          ) : (
            <>
              <ShoppingCart size={18} strokeWidth={2.5} />
              加入购物车
            </>
          )}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
