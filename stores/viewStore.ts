import moment from "moment";
import create from "zustand";

interface ViewStoreState {
  year: number;
  previousYear: () => void;
  nextYear: () => void;
}

const useViewStore = create<ViewStoreState>()((set, get) => ({
  year: moment().year(),
  previousYear: () => set((state) => ({ ...state, year: state.year - 1 })),
  nextYear: () => set((state) => ({ ...state, year: state.year + 1 })),
}));

export default useViewStore;
