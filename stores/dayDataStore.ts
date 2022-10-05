import create from "zustand";
import { DayData } from "../types";

interface DayDataStoreState {
  dayData: DayData[];
  init: () => void;
  addDayData: (
    dataKeyId: string,
    year: number,
    month: number,
    day: number
  ) => void;
}

const useDayDataStore = create<DayDataStoreState>()((set, get) => ({
  dayData: [],
  init: () => {
    // TODO - implement fetching from firebase
  },
  addDayData: (dataKeyId: string, year: number, month: number, day: number) => {
    // TODO - implement saving to firebase
  },
  deleteDayData: (dayDataId: string) => {
    // TODO - implement deleting from firebase
  },
}));

export default useDayDataStore;
