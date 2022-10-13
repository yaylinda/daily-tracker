import { DayDate, YearData } from "../types";
import { getDateKey } from "./dateUtil";

export const getDayData = (
  yearData: YearData,
  dataKeyId: string,
  dayDate: DayDate
): { isTrue: boolean; isFalse: boolean } => {
  const trueDates = yearData[`${true}`][dataKeyId] || new Set([]);
  const falseDates = yearData[`${false}`][dataKeyId] || new Set([]);
  const dateKey = getDateKey(dayDate);

  return {
    isTrue: trueDates.has(dateKey),
    isFalse: falseDates.has(dateKey),
  };
};
