import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc
} from "firebase/firestore";
import app from "./firebase";
import {
  LifeVariable,
  DayData,
  DayDate,
  StarRating,
  StarRatingDateMap,
  UserData,
  YearData
} from "./types";
import { getDateKey } from "./utils/dateUtil";

// The firestore db object
const db = getFirestore(app);

/**************************************
 * FETCH USER DATA
 **************************************/

/**
 *
 * @param userId
 * @param year
 */
export const fetchUserData = async (
  userId: string,
  year: number
): Promise<UserData> => {
  const lifeVariables = await getLifeVariables(userId);
  const yearData = await getYearData(userId, year);
  const starRatings = await getStarRatings(userId, year);
  return { lifeVariables, yearData, starRatings};
};

/**************************************
 * DATA KEYS
 **************************************/

function getLifeVariableCollection(userId: string) {
  return collection(db, `${userId}_life_variables`);
}

/**
 *
 * @param userId
 * @returns
 */
export const getLifeVariables = async (userId: string): Promise<LifeVariable[]> => {
  const querySnapshot = await getDocs(
    query(getLifeVariableCollection(userId), orderBy("createdAt"))
  );

  const lifeVariables: LifeVariable[] = [];
  
  querySnapshot.forEach((doc) => {
    lifeVariables.push({
      ...(doc.data() as Omit<LifeVariable, "id">),
      id: doc.id,
    });
  });

  return lifeVariables;
};

/**
 *
 * @param userId
 * @param lifeVariableLabel
 * @returns
 */
export const addLifeVariable = async (
  userId: string,
  lifeVariableLabel: string
): Promise<LifeVariable> => {
  const inputLifeVariable: Omit<LifeVariable, "id"> = {
    label: lifeVariableLabel,
    createdAt: Timestamp.now().seconds,
    updatedAt: Timestamp.now().seconds,
    deletedAt: null,
  };
  const newLifeVariable = await addDoc(getLifeVariableCollection(userId), inputLifeVariable);
  return {
    ...inputLifeVariable,
    id: newLifeVariable.id,
  };
};

/**
 *
 * @param lifeVariableId
 * @returns
 */
export const deleteLifeVariable = async (userId: string, lifeVariableId: string) => {
  const docRef = doc(getLifeVariableCollection(userId), lifeVariableId);
  return await updateDoc(docRef, { deletedAt: serverTimestamp() });
};

/**************************************
 * DAY DATA
 **************************************/

function getUserDayDataCollection(userId: string, year: number) {
  return collection(db, `${userId}_${year}`);
}

/**
 *
 * @param userId
 * @returns
 */
export const getYearData = async (
  userId: string,
  year: number
): Promise<YearData> => {
  const dayDataQuerySnapshot = await getDocs(
    getUserDayDataCollection(userId, year)
  );

  const dayData: DayData[] = [];
  dayDataQuerySnapshot.forEach((doc) => {
    dayData.push(doc.data() as DayData);
  });

  return dayData.reduce(
    (prev, curr) => {
      if (curr.value == null) {
        return prev;
      }
      if (!prev[`${curr.value}`][curr.lifeVariableId]) {
        prev[`${curr.value}`][curr.lifeVariableId] = new Set([]);
      }
      prev[`${curr.value}`][curr.lifeVariableId].add(curr.dateKey);
      return prev;
    },
    { true: {}, false: {} } as YearData
  );
};

/**
 *
 * @param userId
 * @param lifeVariableId
 * @param dayDate
 * @returns
 */
export const addDayData = async (
  userId: string,
  lifeVariableId: string,
  dayDate: DayDate,
  value: boolean
) => {
  const dateKey = getDateKey(dayDate);
  const docRef = doc(
    getUserDayDataCollection(userId, dayDate.year),
    `${lifeVariableId}_${dateKey}`
  );
  const dayData: DayData = {
    ...dayDate,
    lifeVariableId,
    value,
    dateKey,
    createdAt: Timestamp.now().seconds,
    updatedAt: Timestamp.now().seconds,
    deletedAt: null,
  };
  await setDoc(docRef, dayData);
};

/**************************************
 * DAY STAR RATINGS
 **************************************/

function getUserStarRatingsCollection(userId: string, year: number) {
  return collection(db, `${userId}_${year}_stars`);
}

/**
 * 
 * @param userId 
 * @param year 
 * @returns 
 */
export const getStarRatings = async (
  userId: string,
  year: number
): Promise<StarRatingDateMap> => {
  const starQuerySnapshot = await getDocs(
    getUserStarRatingsCollection(userId, year)
  );

  const starData: StarRating[] = [];
  starQuerySnapshot.forEach((doc) => {
    starData.push(doc.data() as StarRating);
  });

  return starData.reduce((prev, curr) => {
    prev[curr.dateKey] = prev[curr.rating];
    return prev;
  }, {} as StarRatingDateMap);
};

/**
 * 
 * @param userId 
 * @param dayDate 
 * @param rating 
 */
export const setStarRating = async (
  userId: string,
  dayDate: DayDate,
  rating: number
) => {
  const dateKey = getDateKey(dayDate);
  const docRef = doc(
    getUserStarRatingsCollection(userId, dayDate.year),
    dateKey
  );
  await setDoc(docRef, { dateKey, rating });
};
