import create from "zustand";
import { DataKey } from "../types";

interface DataKeyStoreState {
  dataKeys: DataKey[];
  init: () => void;
  addDataKey: (displayName: string) => void;
}

const useDataKeyStore = create<DataKeyStoreState>()((set, get) => ({
  dataKeys: [
    // TODO - delete this
    { id: "dk1", label: "Data Key 1" },
    { id: "dk2", label: "Data Key 2" },
  ],
  init: () => {
    // TODO - implement fetching from firebase
  },
  addDataKey: (displayName: string) => {
    // TODO - implement saving to firebase
  },
  deleteDataKey: (dataKeyId: string) => {
    // TODO - implement deleting from firebase
  },
}));

export default useDataKeyStore;
