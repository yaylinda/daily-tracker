import {
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "./firebase";
import { DataKey, DataKeys, DayDate, UserData, YearData } from "./types";
import { getDateKey } from "./utils/monthGridUtil";

// The firestore db object
const db = getFirestore(app);

const DATA_KEYS_COLLECTION = "data_keys";

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
  const dataKeysRef = doc(db, userId, DATA_KEYS_COLLECTION);
  const dataKeys = await fetchDocFromRef<DataKeys>(dataKeysRef);

  const yearDataRef = doc(db, userId, `${year}`);
  const yearData = await fetchDocFromRef<YearData>(yearDataRef);

  return { dataKeys, yearData };
};

const fetchDocFromRef = async <T>(
  ref: DocumentReference
): Promise<T | null> => {
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as T;
};

/**************************************
 * DATA KEYS: ADD / DELETE
 **************************************/

/**
 *
 * @param userId
 * @param dataKey
 * @returns
 */
export const addDataKey = async (userId: string, dataKey: DataKey) => {
  const ref = doc(db, userId, DATA_KEYS_COLLECTION, dataKey.id);
  return await setDoc(ref, dataKey);
};

/**
 *
 * @param userId
 * @param dataKeyId
 * @returns
 */
export const deleteDataKey = async (userId: string, dataKeyId: string) => {
  const ref = doc(db, userId, DATA_KEYS_COLLECTION, dataKeyId);
  return await deleteDoc(ref);
};

/**************************************
 * DAY DATA: ADD / DELETE
 **************************************/

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
  dayDate: DayDate
) => {
  const ref = doc(
    db,
    userId,
    `${dayDate.year}`,
    dataKeyId,
    getDateKey(dayDate)
  );
  return await setDoc(ref, { value: true });
};

/**
 *
 * @param userId
 * @param dataKeyId
 * @param dayDate
 * @returns
 */
export const deleteDayData = async (
  userId: string,
  dataKeyId: string,
  dayDate: DayDate
) => {
  const ref = doc(
    db,
    userId,
    `${dayDate.year}`,
    dataKeyId,
    getDateKey(dayDate)
  );
  return await deleteDoc(ref);
};
