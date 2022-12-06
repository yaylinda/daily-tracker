import { OAuthCredential, UserCredential } from "firebase/auth";

export interface Auditable {
  createdAt: DayDate;
  updatedAt: DayDate;
  deletedAt: DayDate | null;
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

export interface DayData extends DayDate, Auditable {
  lifeVariableId: string;
  value: boolean;
  dateKey: string;
}

export interface LifeVariable extends Auditable {
  id: string;
  label: string;
}

export type LifeVariableDateMap = { [lifeVariableId in string]: Set<string> };

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
  [valueStr in string]: LifeVariableDateMap;
};

export type YearDataMap = {
  [year in number]: YearData;
};

export interface StarRating {
  dateKey: string;
  rating: number;
}

export type StarRatingDateMap = {
  [dateKey in string]: number;
};

export type YearStarRatingMap = {
  [year in number]: StarRatingDateMap;
};

export interface UserData {
  lifeVariables: LifeVariable[];
  yearData: YearData;
  starRatings: StarRatingDateMap;
}

export enum NavigationTab {
  TODAY = "Today",
  VARIABLES = "Variables",
}
