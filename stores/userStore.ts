import create from "zustand";
import { OAuthCredential, UserCredential } from "firebase/auth";
import {
  linkAnonymousUser,
  signInAnon,
  signInWithGoogle,
  signOutAsync,
} from "../auth";
import { SignInResult } from "../types";

interface UserStoreState {
  oAuthCredential: OAuthCredential | null;
  userCredential: UserCredential | null;
  isAuthed: boolean;
  isAnon: boolean;
  signIn: (anon: boolean) => void;
  signOut: () => void;
  linkAnonymousUser: () => void;
}

const useUserStore = create<UserStoreState>()((set, get) => ({
  oAuthCredential: null,
  userCredential: null,
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
        userCredential: result.userCredential,
        isAuthed: true,
        isAnon: anon,
      }));
    } catch (e) {
      console.log(`SIGN IN ERROR: ${JSON.stringify(e)}`);
      // TODO
    }
  },

  signOut: () => {
    signOutAsync();
    set((state) => ({
      ...state,
      oAuthCredential: null,
      userCredential: null,
      isAuthed: false,
      isAnon: false,
    }));
  },

  linkAnonymousUser: () => {
    if (!get().oAuthCredential) {
      return;
    }

    const oAuthCredential = linkAnonymousUser(get().oAuthCredential!);

    set((state) => ({
      ...state,
      oAuthCredential,
      isAuthed: true,
      isAnon: false,
    }));
  },
}));

export default useUserStore;
