import { DayDate, YearData } from "../types";
import { getDateKey } from "./dateUtil";

export const getDayData = (
  yearData: YearData,
  lifeVariableId: string,
  dayDate: DayDate
): { isTrue: boolean; isFalse: boolean } => {
  const trueDates = yearData?.[`${true}`][lifeVariableId] || new Set([]);
  const falseDates = yearData?.[`${false}`][lifeVariableId] || new Set([]);
  const dateKey = getDateKey(dayDate);

  return {
    isTrue: trueDates.has(dateKey),
    isFalse: falseDates.has(dateKey),
  };
};
