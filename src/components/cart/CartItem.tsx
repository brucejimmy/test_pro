import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem, toggleSelect } = useCartStore();
  const { product, quantity, selected, selectedSpecs } = item;

  const discount = Math.round((1 - product.flashPrice / product.originalPrice) * 100);

  return (
    <div className="flex gap-3 bg-white p-3 rounded-2xl shadow-sm">
      <button
        onClick={() => toggleSelect(product.id)}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-6 flex items-center justify-center transition-all ${
          selected
            ? 'border-primary bg-primary'
            : 'border-gray-300'
        }`}
      >
        {selected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm text-text_primary font-medium line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <div className="flex flex-wrap gap-1 mt-1">
          {Object.entries(selectedSpecs).map(([k, v]) => (
            <span
              key={k}
              className="text-[10px] text-text_secondary bg-gray-50 px-2 py-0.5 rounded"
            >
              {k}: {v}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-primary font-bold text-sm">
              ¥{product.flashPrice.toLocaleString()}
            </span>
            <span className="text-text_secondary text-[10px] line-through">
              ¥{product.originalPrice.toLocaleString()}
            </span>
            <span className="text-[10px] text-primary bg-primary/10 px-1 rounded">
              {discount}折
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-text_secondary hover:border-primary hover:text-primary transition-colors"
            >
              <Minus size={12} strokeWidth={2.5} />
            </button>
            <span className="text-sm font-medium w-5 text-center">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-text_secondary hover:border-primary hover:text-primary transition-colors"
            >
              <Plus size={12} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => removeItem(product.id)}
        className="self-start p-1 text-text_secondary hover:text-primary transition-colors mt-1"
      >
        <Trash2 size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
