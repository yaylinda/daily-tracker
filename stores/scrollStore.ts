import create from "zustand";

interface ScrollStoreState {
  leftScroll: number;
  setLeftScroll: (leftScroll: number) => void;
}

const useScrollStore = create<ScrollStoreState>()((set, get) => ({
  leftScroll: 0,
  setLeftScroll: (leftScroll: number) => set({ leftScroll }),
}));

export default useScrollStore;
