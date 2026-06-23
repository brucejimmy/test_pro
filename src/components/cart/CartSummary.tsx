import { useCartStore, useCartTotal, useCartOriginalTotal } from '@/store/cartStore';

interface CartSummaryProps {
  onCheckout?: () => void;
}

export default function CartSummary({ onCheckout }: CartSummaryProps) {
  const items = useCartStore((s) => s.items);
  const total = useCartTotal();
  const originalTotal = useCartOriginalTotal();
  const selectedCount = items.filter((i) => i.selected).reduce((s, i) => s + i.quantity, 0);
  const discount = originalTotal - total;

  if (items.length === 0) return null;

  return (
    <div className="bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] p-4 pb-6">
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-text_secondary">原价</span>
          <span className="text-text_secondary line-through">
            ¥{originalTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text_secondary">已省</span>
          <span className="text-green-500 font-semibold">
            -¥{discount.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-baseline pt-1 border-t border-gray-100">
          <span className="text-text_primary font-medium">合计</span>
          <div className="flex items-baseline gap-1">
            <span className="text-primary font-bold text-xl">
              ¥{total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={selectedCount === 0}
        className={`w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-200 ${
          selectedCount > 0
            ? 'bg-primary text-white hover:bg-primary-dark active:scale-[0.98] shadow-lg shadow-primary/30'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        去结算 ({selectedCount})
      </button>
    </div>
  );
}
