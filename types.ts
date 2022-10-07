import { OAuthCredential, UserCredential } from "firebase/auth";

export interface DayDate {
  year: number;
  month: number;
  day: number;
}

export interface DayInMonth extends DayDate {
  data?: DayData;
}

export interface DayData extends DayDate {
  id: string;
  dataKeyId: string;
  value: boolean | number | string;
}

export interface DataKey {
  id: string;
  label: string;
}

/**
 * Example:
 * {
 *   2022: { 'abc123' : Set(['2022-01-01', '2022-01-03']) }
 * }
 */
export type DayDataMap = {
  [year in number]: { [dataKeyId in string]: Set<string> };
};

/**
 *
 */
export interface SignInResult {
  oAuthCredential: OAuthCredential | null;
  userCredential: UserCredential;
}
