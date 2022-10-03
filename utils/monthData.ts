import { chunk } from "lodash";
import moment from "moment";
import { DayData } from "../types";
import { NUM_DAYS_IN_WEEK, NUM_MONTHS } from "./constants";

const PADDING_DAY = {
  year: -1,
  month: -1,
  day: -1,
  data: false,
};

export const getMonthData = (year: number, month: number): DayData[][] => {
  const monthMoment = moment(new Date(year, month, 1));

  const daysBeforeMonth: DayData[] = Array.from(
    Array(monthMoment.weekday()),
    (_, i) => ({ ...PADDING_DAY })
  );

  const daysInMonth: DayData[] = Array.from(
    Array(monthMoment.daysInMonth()),
    (_, i) => ({
      year,
      month,
      day: i + 1,
      data: false, // TODO
    })
  );

  const daysAfterMonth: DayData[] = Array.from(
    Array(NUM_DAYS_IN_WEEK - (monthMoment.endOf("month").weekday() + 1)),
    (_, i) => ({ ...PADDING_DAY })
  );

  return chunk(
    [...daysBeforeMonth, ...daysInMonth, ...daysAfterMonth],
    NUM_DAYS_IN_WEEK
  );
};

export const getMonthLabels = (): string[] => {
  const startMoment = moment(new Date()).startOf("year");
  return Array.from(Array(NUM_MONTHS), (_, i) =>
    startMoment.month(i).format("MMMM")
  );
};
