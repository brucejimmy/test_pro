import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, ShoppingCart, User } from 'lucide-react';
import { useCartCount } from '@/store/cartStore';

const tabs = [
  { path: '/', label: '首页', icon: Home },
  { path: '/category', label: '分类', icon: Grid3X3 },
  { path: '/cart', label: '购物车', icon: ShoppingCart },
  { path: '/profile', label: '我的', icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const cartCount = useCartCount();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {tabs.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          const showBadge = path === '/cart' && cartCount > 0;

          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 ${
                isActive ? 'text-primary' : 'text-text_secondary'
              }`}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-transform duration-200"
                />
                {showBadge && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-0.5 font-medium transition-all duration-200 ${
                  isActive ? 'font-semibold' : ''
                }`}
              >
                {label}
              </span>
              {isActive && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
