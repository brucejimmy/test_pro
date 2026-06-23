import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/data/mockData';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, selectedSpecs: Record<string, string>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelect: (productId: string) => void;
  selectAll: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, selectedSpecs) => {
        const existing = get().items.find(
          (item) =>
            item.productId === product.id &&
            JSON.stringify(item.selectedSpecs) === JSON.stringify(selectedSpecs)
        );
        if (existing) {
          set((state) => ({
            items: state.items.map((item) =>
              item.productId === product.id &&
              JSON.stringify(item.selectedSpecs) === JSON.stringify(selectedSpecs)
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
        } else {
          set((state) => ({
            items: [
              ...state.items,
              {
                productId: product.id,
                product,
                quantity: 1,
                selected: true,
                selectedSpecs,
              },
            ],
          }));
        }
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      toggleSelect: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, selected: !item.selected }
              : item
          ),
        })),

      selectAll: () => {
        const allSelected = get().items.every((item) => item.selected);
        set((state) => ({
          items: state.items.map((item) => ({
            ...item,
            selected: !allSelected,
          })),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'flash-sale-cart',
    }
  )
);

export const useCartTotal = () => {
  const items = useCartStore((s) => s.items);
  return items
    .filter((i) => i.selected)
    .reduce((sum, i) => sum + i.product.flashPrice * i.quantity, 0);
};

export const useCartOriginalTotal = () => {
  const items = useCartStore((s) => s.items);
  return items
    .filter((i) => i.selected)
    .reduce((sum, i) => sum + i.product.originalPrice * i.quantity, 0);
};

export const useCartCount = () => {
  const items = useCartStore((s) => s.items);
  return items.reduce((sum, i) => sum + i.quantity, 0);
};
