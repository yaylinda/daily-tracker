import { chunk } from "lodash";
import moment from "moment";
import { DayDate } from "../types";
import { NUM_DAYS_IN_WEEK } from "./constants";

const PADDING_DAY = {
  year: -1,
  month: -1,
  day: -1,
};

/**
 *
 * @param year
 * @returns
 */
export const getWeekChunksForYearGrid = (year: number): DayDate[][] => {
  const yearMoment = moment(new Date(year, 0, 1)).startOf("year");

  const daysBeforeYear: DayDate[] = Array.from(
    Array(yearMoment.weekday()),
    (_, i) => ({ ...PADDING_DAY })
  );

  const daysAfterYear: DayDate[] = Array.from(
    Array(NUM_DAYS_IN_WEEK - (yearMoment.endOf("year").weekday() + 1)),
    (_, i) => ({ ...PADDING_DAY })
  );

  const daysInYear: DayDate[] = [];
  let iterYearMoment = yearMoment.startOf("year").clone();
  while (iterYearMoment.year() === year) {
    daysInYear.push(getDayDateFromMoment(iterYearMoment));
    iterYearMoment = iterYearMoment.add(1, "day");
  }

  const chunks = chunk(
    [...daysBeforeYear, ...daysInYear, ...daysAfterYear],
    NUM_DAYS_IN_WEEK
  );

  return chunks;
};

/**
 *
 * @param param0
 * @returns
 */
export const getDateKey = ({ year, month, day }: DayDate): string => {
  const monthStr = month <= 9 ? `0${month}` : month;
  const dayStr = day <= 9 ? `0${day}` : day;
  return `${year}_${monthStr}_${dayStr}`;
};

/**
 *
 * @param param0
 * @returns
 */
export const getMomentFromDayDate = ({
  year,
  month,
  day,
}: DayDate): moment.Moment => {
  return moment(new Date(year, month, day));
};

/**
 *
 * @param input
 * @returns
 */
export const getDayDateFromMoment = (input: moment.Moment): DayDate => {
  return { year: input.year(), month: input.month(), day: input.date() };
};

/**
 *
 * @param param0
 * @returns
 */
export const isToday = ({ year, month, day }: DayDate): boolean => {
  const inputMoment = getMomentFromDayDate({ year, month, day });
  return inputMoment.isSame(moment(), "D");
};

/**
 *
 * @param param0
 * @returns
 */
export const isYesterday = ({ year, month, day }: DayDate): boolean => {
  const inputMoment = getMomentFromDayDate({ year, month, day });
  return inputMoment.isSame(moment().add(-1, "day"), "day");
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
