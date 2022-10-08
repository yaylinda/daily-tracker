import { OAuthCredential, User } from "firebase/auth";
import moment from "moment";
import create from "zustand";
import {
  linkAnonymousUser,
  signInAnon,
  signInWithGoogle,
  signOutAsync,
} from "./auth";
import { DataKey, DayDataMap, SignInResult } from "./types";

interface StoreState {
  init: () => void;

  dataKeys: DataKey[];
  addDataKey: (displayName: string) => void;
  deleteDataKey: (dataKeyId: string) => void;

  dayDataMap: DayDataMap;
  addDayData: (
    dataKeyId: string,
    year: number,
    month: number,
    day: number
  ) => void;
  deleteDayData: (dayDataId: string) => void;

  leftScroll: number;
  setLeftScroll: (leftScroll: number) => void;

  oAuthCredential: OAuthCredential | null;
  user: User | null;
  isAuthed: boolean;
  isAnon: boolean;
  signIn: (anon: boolean) => void;
  signOut: () => void;
  linkAnonymousUser: () => void;

  year: number;
  previousYear: () => void;
  nextYear: () => void;

  showLoginDialog: boolean;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
}

const useStore = create<StoreState>()((set, get) => ({
  init: () => {
    // TODO - implement fetching from firebase
  },

  dataKeys: [
    // TODO - delete this
    { id: "dk1", label: "Data Key 1" },
    { id: "dk2", label: "Data Key 2" },
  ],
  addDataKey: (displayName: string) => {
    // TODO - implement saving to firebase
  },
  deleteDataKey: (dataKeyId: string) => {
    // TODO - implement deleting from firebase
  },

  dayDataMap: {
    // TODO - delete this
    2022: {
      dk1: new Set(["2022_01_01", "2022_01_02"]),
      dk2: new Set(["2022_02_01", "2022_02_02"]),
    },
  },
  addDayData: (dataKeyId: string, year: number, month: number, day: number) => {
    // TODO - implement saving to firebase
  },
  deleteDayData: (dayDataId: string) => {
    // TODO - implement deleting from firebase
  },

  leftScroll: 0,
  setLeftScroll: (leftScroll: number) => set({ leftScroll }),

  oAuthCredential: null,
  user: null,
  isAuthed: false,
  isAnon: false,
  signIn: async (anon: boolean) => {
    try {
      let result: SignInResult;

      if (anon) {
        result = await signInAnon();
      } else {
        result = await signInWithGoogle();
      }

      set((state) => ({
        ...state,
        oAuthCredential: result.oAuthCredential,
        user: result.userCredential.user,
        isAuthed: true,
        isAnon: anon,
        showLoginDialog: false,
      }));
    } catch (e) {
      console.log(`SIGN IN ERROR: ${JSON.stringify(e)}`);
      // TODO - implement showing error message
    }
  },
  signOut: () => {
    signOutAsync();
    set((state) => ({
      ...state,
      oAuthCredential: null,
      user: null,
      isAuthed: false,
      isAnon: false,
    }));
  },
  linkAnonymousUser: () => {
    if (!get().oAuthCredential) {
      return;
    }

    const oAuthCredential = linkAnonymousUser(get().oAuthCredential!);

    // TODO - update data from anon userId and update dataKey and dataMap
    set((state) => ({
      ...state,
      oAuthCredential,
      isAuthed: true,
      isAnon: false,
    }));
  },

  year: moment().year(),
  previousYear: () => set((state) => ({ ...state, year: state.year - 1 })),
  nextYear: () => set((state) => ({ ...state, year: state.year + 1 })),

  showLoginDialog: false,
  openLoginDialog: () => set((state) => ({ ...state, showLoginDialog: true })),
  closeLoginDialog: () =>
    set((state) => ({ ...state, showLoginDialog: false })),
}));

export default useStore;
