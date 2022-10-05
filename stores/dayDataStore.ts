import create from "zustand";
import { DayData, DayDataMap } from "../types";

interface DayDataStoreState {
  dayDataMap: DayDataMap;
  init: () => void;
  addDayData: (
    dataKeyId: string,
    year: number,
    month: number,
    day: number
  ) => void;
}

const useDayDataStore = create<DayDataStoreState>()((set, get) => ({
  dayDataMap: {
    // TODO - delete this
    2022: {
      dk1: new Set(["2022_01_01", "2022_01_02"]),
      dk2: new Set(["2022_02_01", "2022_02_02"]),
    },
  },
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
