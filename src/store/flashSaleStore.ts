import { create } from 'zustand';
import { products, flashSales } from '@/data/mockData';
import { Product, FlashSale } from '@/data/mockData';

interface FlashSaleState {
  activeSales: FlashSale[];
  products: Product[];
  currentTime: Date;
  updateTime: () => void;
}

export const useFlashSaleStore = create<FlashSaleState>((set) => ({
  activeSales: flashSales,
  products: products,
  currentTime: new Date(),
  updateTime: () => set({ currentTime: new Date() }),
}));

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getFlashSaleProducts = (saleId: string): Product[] => {
  return products.filter((p) => p.flashSaleId === saleId);
};
