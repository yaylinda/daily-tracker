import moment from "moment";
import create from "zustand";

interface ViewStoreState {
  year: number;
  showLoginDialog: boolean;
  previousYear: () => void;
  nextYear: () => void;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
}

const useViewStore = create<ViewStoreState>()((set, get) => ({
  year: moment().year(),
  showLoginDialog: false,
  previousYear: () => set((state) => ({ ...state, year: state.year - 1 })),
  nextYear: () => set((state) => ({ ...state, year: state.year + 1 })),
  openLoginDialog: () => set((state) => ({ ...state, showLoginDialog: true })),
  closeLoginDialog: () =>
    set((state) => ({ ...state, showLoginDialog: false })),
}));

export default useViewStore;
