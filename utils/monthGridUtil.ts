import { chunk } from "lodash";
import moment from "moment";
import { DayDate, DayInMonth } from "../types";
import { NUM_DAYS_IN_WEEK, NUM_MONTHS } from "./constants";

const PADDING_DAY = {
  year: -1,
  month: -1,
  day: -1,
};

/**
 *
 * @param year
 * @param month
 * @returns
 */
export const getDaysInMonth = (year: number, month: number): DayInMonth[][] => {
  const monthMoment = moment(new Date(year, month, 1));

  const daysBeforeMonth: DayInMonth[] = Array.from(
    Array(monthMoment.weekday()),
    (_, i) => ({ ...PADDING_DAY })
  );

  const daysInMonth: DayInMonth[] = Array.from(
    Array(monthMoment.daysInMonth()),
    (_, i) => ({
      year,
      month,
      day: i + 1,
    })
  );

  const daysAfterMonth: DayInMonth[] = Array.from(
    Array(NUM_DAYS_IN_WEEK - (monthMoment.endOf("month").weekday() + 1)),
    (_, i) => ({ ...PADDING_DAY })
  );

  return chunk(
    [...daysBeforeMonth, ...daysInMonth, ...daysAfterMonth],
    NUM_DAYS_IN_WEEK
  );
};

/**
 *
 * @returns
 */
export const getMonthLabels = (): string[] => {
  const startMoment = moment(new Date()).startOf("year");
  return Array.from(Array(NUM_MONTHS), (_, i) =>
    startMoment.month(i).format("MMMM")
  );
};

/**
 *
 * @returns
 */
export const getDayOfWeekLabels = (): string[] => {
  const startMoment = moment(new Date()).startOf("week");
  return Array.from(
    Array(NUM_DAYS_IN_WEEK),
    (_, i) => startMoment.weekday(i).format("dd")[0]
  );
};

/**
 *
 * @param param0
 * @returns
 */
export const getDateKey = ({ year, month, day }: DayDate): string =>
  `${year}_${month}_${day}`;
