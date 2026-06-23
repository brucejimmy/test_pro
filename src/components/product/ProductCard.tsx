import { Link } from 'react-router-dom';
import { Product } from '@/data/mockData';
import Badge from '@/components/common/Badge';
import { Flame, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
  animationDelay?: number;
}

export default function ProductCard({ product, animationDelay = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSpecs: Record<string, string> = {};
    product.specs.forEach((spec) => {
      defaultSpecs[spec.name] = spec.options[0];
    });
    addItem(product, defaultSpecs);
  };

  const discount = Math.round((1 - product.flashPrice / product.originalPrice) * 100);
  const isLowStock = product.stock <= 5;

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
      style={{
        animation: `fadeInUp 0.4s ease ${animationDelay}ms both`,
      }}
    >
      <div className="relative aspect-square bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Badge text={`${discount}折`} variant="gold" />
          {isLowStock && (
            <Badge text="仅剩" variant="primary" />
          )}
        </div>
        {product.tags && product.tags[0] && (
          <div className="absolute top-2 right-2">
            <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5">
              <Flame size={10} />
              {product.tags[0]}
            </span>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm text-text_primary font-medium line-clamp-2 leading-snug flex-1">
          {product.name}
        </h3>

        <div className="mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-primary font-bold text-base">
              ¥{product.flashPrice.toLocaleString()}
            </span>
            <span className="text-text_secondary text-xs line-through">
              ¥{product.originalPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <div className="h-1.5 bg-gray-100 rounded-full flex-1 max-w-[80px] overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (product.soldCount / (product.soldCount + product.stock)) * 100)}%`,
                  }}
                />
              </div>
              <span className="text-[10px] text-text_secondary">
                {product.stock > 0 ? `剩${product.stock}` : '已售罄'}
              </span>
            </div>

            <button
              onClick={handleAddCart}
              className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-dark active:scale-90 transition-all shadow-sm"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={13} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
