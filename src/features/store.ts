import { type StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { createUiSlice, type UiSlice } from './ui/slice';
import { createCartSlice, type CartSlice } from './cart/slice';

export type AppState = UiSlice & CartSlice;
//* If have move slice use : UiSlice & UserSlice & CartSlice

export type AppSliceCreator<T> = StateCreator<
  AppState,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  T
>;

export const useAppStore = create<AppState>()(
  immer(
    devtools((...a) => ({
      ...createUiSlice(...a),
      ...createCartSlice(...a),
    })),
  ),
);
