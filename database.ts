import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import app from "./firebase";
import { DataKey, DayDate, UserData, UserYearData } from "./types";
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

  const yearDataRef = doc(db, userId, `${year}`);
  const userYearData = await fetchDocFromRef<UserYearData>(yearDataRef);

  return { dataKeys, userYearData };
};

const fetchDocFromRef = async <T>(
  ref: DocumentReference
): Promise<T | null> => {
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    console.log("snapshot doesnt exist");
    return null;
  }

  return snapshot.data() as T;
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
 * @param userId
 * @param dataKeyId
 * @returns
 */
export const deleteDataKey = async (dataKeyId: string) => {
  return await deleteDoc(doc(dataKeysCollection, dataKeyId));
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
