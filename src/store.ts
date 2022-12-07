import { OAuthCredential, User } from "firebase/auth";
import produce, { enableMapSet } from "immer";
import moment from "moment";
import create from "zustand";
import {
  getOAuthCredentialFromTokens,
  signInAnon,
  signInWithGoogle,
  signOutAsync,
} from "./auth";
import {
  addLifeVariable,
  addDayData,
  deleteLifeVariable,
  fetchUserData,
} from "./database";
import {
  LifeVariable,
  DayDate,
  NavigationTab,
  SignInResult,
  YearData,
  YearDataMap,
} from "./types";
import { LOCAL_STORAGE_KEYS } from "./utils/constants";
import { getDateKey } from "./utils/dateUtil";

enableMapSet();
interface StoreState {
  loading: boolean;
  init: () => void;

  navigationTab: NavigationTab;
  setNavigationTab: (newTab: NavigationTab) => void;

  lifeVariables: LifeVariable[];
  addLifeVariable: (lifeVariableLabel: string) => void;
  deleteLifeVariable: (lifeVariableId: string) => void;

  yearDataMap: YearDataMap;
  addDayData: (
    lifeVariableId: string,
    dayDate: DayDate,
    value: boolean
  ) => Promise<void>;
  deleteDayData: (dayDataId: string) => void;
  clearData: () => void;

  idToken: string | null;
  accessToken: string | null;
  user: User | null;
  isAuthed: boolean;
  isAnon: boolean;
  signIn: (anon: boolean) => void;
  signOut: () => void;
  linkAnonymousUser: () => void;

  day: number;
  year: number;
  previousYear: () => void;
  nextYear: () => void;
  month: number;
  setMonth: (month: number) => void;
  setDisplayDate: (dayDate: DayDate) => void;

  showLoginDialog: boolean;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;

  showAddLifeVariableDialog: boolean;
  openAddLifeVariableDialog: () => void;
  closeAddLifeVariableDialog: () => void;

  showDayDataDialog: boolean;
  dayDataDialogProps: { lifeVariable: LifeVariable; dayDate: DayDate } | null;
  openDayDataDialog: (lifeVariable: LifeVariable, dayDate: DayDate) => void;
  closeDayDataDialog: () => void;

  showStarRatingDialog: boolean;
  openShowStarRatingDialog: () => void;
  closeShowStarRatingDialog: () => void;

  showConfirmLogoutDialog: boolean;
  openConfirmLogoutDialog: () => void;
  closeConfirmLogoutDialog: () => void;

  showConfirmClearDataDialog: boolean;
  openConfirmClearDataDialog: () => void;
  closeConfirmClearDataDialog: () => void;
}

const useStore = create<StoreState>()((set, get) => ({
  loading: true,

  navigationTab: NavigationTab.TODAY,
  setNavigationTab: (newTab: NavigationTab) => {
    set((state) => ({
      navigationTab: newTab,
    }));
  },

  lifeVariables: [],
  yearDataMap: {},
  init: async () => {
    // Try to get the user back from local storage
    const userStr = window.localStorage.getItem(LOCAL_STORAGE_KEYS.USER_KEY);
    let user: User | null = null;
    if (userStr) {
      user = JSON.parse(userStr);
    }

    // Try to get the tokens and oauth credentials from local storage
    let idToken =
      window.localStorage.getItem(LOCAL_STORAGE_KEYS.ID_TOKEN_KEY) || null;
    let accessToken =
      window.localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY) || null;
    let oAuthCredential: OAuthCredential | null = null;
    if (idToken || accessToken) {
      oAuthCredential = getOAuthCredentialFromTokens(idToken, accessToken);
    }
    if (oAuthCredential?.idToken) {
      idToken = oAuthCredential.idToken || null;
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.ID_TOKEN_KEY,
        oAuthCredential.idToken
      );
    }
    if (oAuthCredential?.accessToken) {
      accessToken = oAuthCredential.accessToken || null;
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY,
        oAuthCredential.accessToken
      );
    }

    let lifeVariables: LifeVariable[] = [];
    let yearData: YearData = { true: {}, false: {} };

    if (user?.uid) {
      // If the user exists, fetch user data
      const userData = await fetchUserData(user.uid, get().year);
      lifeVariables = userData.lifeVariables;
      yearData = userData.yearData;
    }

    // Update the state
    set(
      (state) =>
        ({
          loading: false,
          user,
          isAuthed: user != null,
          isAnon: user != null && idToken == null && accessToken == null,
          idToken,
          accessToken,
          lifeVariables,
          yearDataMap: {
            [get().year]: yearData,
          },
        } as StoreState)
    );
  },

  addLifeVariable: async (lifeVariableLabel: string) => {
    const lifeVariable = await addLifeVariable(
      get().user!.uid,
      lifeVariableLabel
    );

    set((state) => ({
      lifeVariables: [lifeVariable, ...state.lifeVariables],
      showAddLifeVariableDialog: false,
    }));
  },
  deleteLifeVariable: async (lifeVariableId: string) => {
    await deleteLifeVariable(get().user!.uid, lifeVariableId);
    // TODO - update state.lifeVariables
  },

  addDayData: async (
    lifeVariableId: string,
    dayDate: DayDate,
    value: boolean
  ) => {
    await addDayData(get().user!.uid, lifeVariableId, dayDate, value);
    set((state) => ({
      yearDataMap: {
        ...state.yearDataMap,
        [dayDate.year]: produce(state.yearDataMap[dayDate.year], (draft) => {
          const dateKey = getDateKey(dayDate);

          // Add the dateKey to the new value's map
          const newValueKey = `${value}`;
          if (!draft[newValueKey][lifeVariableId]) {
            draft[newValueKey][lifeVariableId] = new Set([]);
          }
          draft[newValueKey][lifeVariableId].add(dateKey);

          // Remove the dateKey from the old value's map (if it exists)
          const oldValueKey = `${!value}`;
          if (draft[oldValueKey][lifeVariableId]) {
            draft[oldValueKey][lifeVariableId].delete(dateKey);
          }
        }),
      },
    }));
  },
  deleteDayData: (dayDataId: string) => {
    // TODO - implement deleting from firebase
  },
  clearData: () => {

  },

  idToken: null,
  accessToken: null,
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

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.USER_KEY,
        JSON.stringify(result.userCredential.user)
      );
      if (result.oAuthCredential?.idToken) {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.ID_TOKEN_KEY,
          JSON.stringify(result.oAuthCredential?.idToken)
        );
      }
      if (result.oAuthCredential?.accessToken) {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY,
          JSON.stringify(result.oAuthCredential?.accessToken)
        );
      }

      // Update the state with user info
      set(
        (state) =>
          ({
            idToken: result.oAuthCredential?.idToken || null,
            accessToken: result.oAuthCredential?.accessToken || null,
            user: result.userCredential.user,
            isAuthed: true,
            isAnon: anon,
            showLoginDialog: false,
            loading: true,
          } as StoreState)
      );

      // Then try to fetch user data
      const { lifeVariables: lifeVariables, yearData } = await fetchUserData(
        result.userCredential.user.uid,
        get().year
      );

      set((state) => ({
        loading: false,
        lifeVariables,
        yearDataMap: {
          [get().year]: yearData,
        },
        navigationTab: NavigationTab.TODAY,
      }));
    } catch (e) {
      // TODO - handle error
      throw e;
    }
  },
  signOut: () => {
    signOutAsync();

    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_KEY);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ID_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY);

    set(
      (state) =>
        ({
          loading: false,
          lifeVariables: [] as LifeVariable[],
          yearDataMap: {},
          year: moment().year(),
          month: moment().month(),
          showLoginDialog: false,
          showAddLifeVariableDialog: false,
          idToken: null,
          accessToken: null,
          user: null,
          isAuthed: false,
          isAnon: false,
        } as StoreState)
    );
  },
  linkAnonymousUser: () => {
    if (!get().idToken && !get().accessToken) {
      return;
    }

    const oAuthCredential = getOAuthCredentialFromTokens(
      get().idToken,
      get().accessToken
    );

    if (oAuthCredential.idToken) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ID_TOKEN_KEY,
        JSON.stringify(oAuthCredential.idToken)
      );
    }
    if (oAuthCredential.accessToken) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY,
        JSON.stringify(oAuthCredential.accessToken)
      );
    }

    // TODO - update data from anon userId and update lifeVariable and dataMap
    set(
      (state) =>
        ({
          idToken: oAuthCredential.idToken,
          accessToken: oAuthCredential.accessToken,
          isAuthed: true,
          isAnon: false,
        } as StoreState)
    );
  },

  day: moment().date(),
  year: moment().year(),
  previousYear: () => {
    // TODO - fetch data for new year
    set((state) => ({ year: state.year - 1 } as StoreState));
  },
  nextYear: () => {
    // TODO - fetch data for new year
    set((state) => ({ year: state.year + 1 } as StoreState));
  },
  month: moment().month(),
  setMonth: (month) => {
    set({ month });
  },
  setDisplayDate({ year, month, day }: DayDate) {
    set({ year, month, day });
  },

  showLoginDialog: false,
  openLoginDialog: () =>
    set((state) => ({ showLoginDialog: true } as StoreState)),
  closeLoginDialog: () =>
    set((state) => ({ showLoginDialog: false } as StoreState)),

  showAddLifeVariableDialog: false,
  openAddLifeVariableDialog: () =>
    set((state) => ({ showAddLifeVariableDialog: true } as StoreState)),
  closeAddLifeVariableDialog: () =>
    set((state) => ({ showAddLifeVariableDialog: false } as StoreState)),

  showDayDataDialog: false,
  dayDataDialogProps: null,
  openDayDataDialog: (lifeVariable: LifeVariable, dayDate: DayDate) => {
    set(() => ({
      showDayDataDialog: true,
      dayDataDialogProps: { lifeVariable, dayDate },
    }));
  },
  closeDayDataDialog: () =>
    set(() => ({ showDayDataDialog: false, dayDataDialogProps: null })),

  showStarRatingDialog: false,
  openShowStarRatingDialog: () =>
    set((state) => ({ showStarRatingDialog: true } as StoreState)),
  closeShowStarRatingDialog: () =>
    set((state) => ({ showStarRatingDialog: false } as StoreState)),

  showConfirmLogoutDialog: false,
  openConfirmLogoutDialog: () =>
    set((state) => ({ showConfirmLogoutDialog: true } as StoreState)),
  closeConfirmLogoutDialog: () =>
    set((state) => ({ showConfirmLogoutDialog: false } as StoreState)),

  showConfirmClearDataDialog: false,
  openConfirmClearDataDialog: () =>
    set((state) => ({ showConfirmClearDataDialog: true } as StoreState)),
  closeConfirmClearDataDialog: () =>
    set((state) => ({ showConfirmClearDataDialog: false } as StoreState)),
}));

export default useStore;
