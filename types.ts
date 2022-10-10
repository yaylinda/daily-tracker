import { OAuthCredential, UserCredential } from "firebase/auth";

export interface SignInResult {
  oAuthCredential: OAuthCredential | null;
  userCredential: UserCredential;
}

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
 *   'abc123' : ['2021-01-01', '2021-01-03']
 * }
 */
export type YearData = { [dataKeyId in string]: string[] };

/**
 * Example:
 * {
 *   2022: { 'abc123' : ['2022-01-01', '2022-01-03'] }
 *   2021: { 'abc123' : ['2021-01-01', '2021-01-03'] }
 * }
 */
export type YearDataMap = {
  [year in number]: YearData;
};

/**************************************
 * Firestore Types
 *************************************/

export interface UserData {
  dataKeys: DataKey[];
  userYearData: UserYearData | null;
}

export type UserYearData = {
  [dataKeyId in string]: { [dateKey in string]: { value: boolean } };
};
