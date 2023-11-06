import { type AppSliceCreator } from '../store';

export interface CartSlice {
  cart: {
    count: number;
  };
  setCartCount: (n: CartSlice['cart']['count']) => void;
}

export const createCartSlice: AppSliceCreator<CartSlice> = (set, get) => {
  return {
    cart: {
      count: 0,
    },
    setCartCount: (n) => {
      set((state) => {
        state.cart.count = n;
      });
    },
  };
};
