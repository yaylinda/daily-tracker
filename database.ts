import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import app from "./firebase";
import { DataKey, DayData, DayDate, UserData, UserYearData } from "./types";
import { getDateKey } from "./utils/monthGridUtil";

// The firestore db object
const db = getFirestore(app);

const dataKeysCollection = collection(db, "data_keys");

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
  const dataKeys = await getDataKeys(userId);
  const userYearData = await getDayData(userId, year);
  return { dataKeys, userYearData };
};

/**************************************
 * DATA KEYS
 **************************************/

/**
 *
 * @param userId
 * @returns
 */
export const getDataKeys = async (userId: string): Promise<DataKey[]> => {
  const dataKeysQuery = query(
    dataKeysCollection,
    where("userId", "==", userId)
  );
  const dataKeysQuerySnapshot = await getDocs(dataKeysQuery);

  const dataKeys: DataKey[] = [];
  dataKeysQuerySnapshot.forEach((doc) => {
    dataKeys.push({
      id: doc.id,
      label: doc.data().label,
    });
  });

  return dataKeys;
};

/**
 *
 * @param userId
 * @param dataKeyLabel
 * @returns
 */
export const addDataKey = async (userId: string, dataKeyLabel: string) => {
  const newDataKey = await addDoc(dataKeysCollection, {
    userId,
    label: dataKeyLabel,
  });
  return newDataKey.id;
};

/**
 *
 * @param dataKeyId
 * @returns
 */
export const deleteDataKey = async (dataKeyId: string) => {
  return await deleteDoc(doc(dataKeysCollection, dataKeyId));
};

/**************************************
 * DAY DATA
 **************************************/

/**
 *
 * @param userId
 * @returns
 */
export const getDayData = async (
  userId: string,
  year: number
): Promise<UserYearData> => {
  const userCollection = collection(db, userId);
  const dayDataQuery = query(userCollection, where("year", "==", year));
  const dayDataQuerySnapshot = await getDocs(dayDataQuery);

  const dayData: DayData[] = [];
  dayDataQuerySnapshot.forEach((doc) => {
    dayData.push(doc.data() as DayData);
  });

  return dayData.reduce((prev, curr) => {
    if (!prev[curr.dataKeyId]) {
      prev[curr.dataKeyId] = {};
    }
    // NOTE: For now, we only care about where days is true
    if (curr.value) {
      prev[curr.dataKeyId][curr.dateKey] = { value: curr.value };
    }
    return prev;
  }, {} as UserYearData);
};

/**
 *
 * @param userId
 * @param dataKeyId
 * @param dayDate
 * @returns
 */
export const addDayData = async (
  userId: string,
  dataKeyId: string,
  dayDate: DayDate,
  value: boolean
) => {
  const userCollection = collection(db, userId);
  const dateKey = getDateKey(dayDate);
  const docRef = doc(userCollection, `${dataKeyId}_${dateKey}`);
  const dayData: DayData = {
    ...dayDate,
    dataKeyId,
    value,
    dateKey,
  };
  await setDoc(docRef, dayData);
};
