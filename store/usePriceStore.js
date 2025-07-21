import { create } from 'zustand';

export const usePriceStore = create((set) => ({
  priceData: null,
  setPriceData: (data) => set({ priceData: data }),
}));
