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
  displayName: string;
}
