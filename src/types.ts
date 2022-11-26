import { OAuthCredential, UserCredential } from "firebase/auth";
import { FieldValue } from "firebase/firestore";

export interface Auditable {
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
}

export interface SignInResult {
  oAuthCredential: OAuthCredential | null;
  userCredential: UserCredential;
}

export interface DayDate {
  year: number;
  month: number; // [0, 11] -> [Jan, Dec]
  day: number;
}

export interface DayInMonth extends DayDate {
  data?: DayData;
}

export interface DayData extends DayDate, Auditable {
  dataKeyId: string;
  value: boolean;
  dateKey: string;
}

export interface DataKey extends Auditable {
  id: string;
  label: string;
}

export type DataKeyDateMap = { [dataKeyId in string]: Set<string> };

/**
 * Example:
 * {
 *   true: {
 *     'abc123' : ['2021-01-01', '2021-01-03']
 *   },
 *   false: {
 *     'abc123' : ['2021-01-01', '2021-01-03']
 *   },
 * }
 */
export type YearData = {
  [valueStr in string]: DataKeyDateMap;
};

export type YearDataMap = {
  [year in number]: YearData;
};

export interface UserData {
  dataKeys: DataKey[];
  yearData: YearData;
}

export enum NavigationTab {
  TODAY = "Today",
  VARIABLES = "Variables",
  STATS = "Stats",
}
