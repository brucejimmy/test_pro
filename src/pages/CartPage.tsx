import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCartStore } from '@/store/cartStore';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const selectAll = useCartStore((s) => s.selectAll);
  const [showSuccess, setShowSuccess] = useState(false);

  const allSelected = items.length > 0 && items.every((i) => i.selected);
  const hasItems = items.length > 0;

  const handleCheckout = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-bg_main pb-36">
      <Header title="购物车" />

      <main className="pt-14 px-4">
        {hasItems ? (
          <>
            <div className="flex items-center justify-between py-3">
              <button
                onClick={selectAll}
                className="flex items-center gap-2 text-sm text-text_secondary"
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    allSelected
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  }`}
                >
                  {allSelected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                全选
              </button>
              <span className="text-sm text-text_secondary">
                共 {items.length} 件商品
              </span>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <CartItem key={`${item.productId}-${JSON.stringify(item.selectedSpecs)}`} item={item} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={36} className="text-gray-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-text_primary mb-1">
              购物车是空的
            </h3>
            <p className="text-sm text-text_secondary mb-6">
              快去挑选心仪的商品吧
            </p>
            <Link
              to="/"
              className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors"
            >
              去抢购
            </Link>
          </div>
        )}

        {hasItems && (
          <>
            <div className="my-4 border-t border-gray-200" />
            <div className="py-3">
              <h3 className="text-sm font-semibold text-text_primary mb-3">为你推荐</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {['潮流好物', '美妆护肤', '数码科技'].map((tag) => (
                  <span
                    key={tag}
                    className="flex-shrink-0 px-4 py-2 bg-white rounded-full text-xs text-text_secondary border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {hasItems && <CartSummary onCheckout={handleCheckout} />}

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white px-8 py-6 rounded-2xl flex flex-col items-center gap-3 shadow-2xl animate-[fadeIn_0.2s_ease]">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-semibold text-base text-text_primary">订单提交成功！</p>
            <p className="text-text_secondary text-xs">模拟支付，无需真实付款</p>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
