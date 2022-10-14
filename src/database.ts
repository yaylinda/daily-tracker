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
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import { DataKey, DayData, DayDate, UserData, YearData } from "./types";
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
  const dataKeys = await getDataKeys(userId);
  const yearData = await getYearData(userId, year);
  return { dataKeys, yearData };
};

/**************************************
 * DATA KEYS
 **************************************/

function getDataKeyCollection(userId: string) {
  return collection(db, `${userId}_data_keys`);
}

/**
 *
 * @param userId
 * @returns
 */
export const getDataKeys = async (userId: string): Promise<DataKey[]> => {
  const dataKeysQuerySnapshot = await getDocs(
    query(getDataKeyCollection(userId), orderBy("createdAt"))
  );

  const dataKeys: DataKey[] = [];
  dataKeysQuerySnapshot.forEach((doc) => {
    dataKeys.push({
      ...(doc.data() as Omit<DataKey, "id">),
      id: doc.id,
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
export const addDataKey = async (
  userId: string,
  dataKeyLabel: string
): Promise<DataKey> => {
  const inputDataKey: Omit<DataKey, "id"> = {
    label: dataKeyLabel,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    deletedAt: null,
  };
  const newDataKey = await addDoc(getDataKeyCollection(userId), inputDataKey);
  return {
    ...inputDataKey,
    id: newDataKey.id,
  };
};

/**
 *
 * @param dataKeyId
 * @returns
 */
export const deleteDataKey = async (userId: string, dataKeyId: string) => {
  const docRef = doc(getDataKeyCollection(userId), dataKeyId);
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
      if (!prev[`${curr.value}`][curr.dataKeyId]) {
        prev[`${curr.value}`][curr.dataKeyId] = new Set([]);
      }
      prev[`${curr.value}`][curr.dataKeyId].add(curr.dateKey);
      return prev;
    },
    { true: {}, false: {} } as YearData
  );
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
  const dateKey = getDateKey(dayDate);
  const docRef = doc(
    getUserDayDataCollection(userId, dayDate.year),
    `${dataKeyId}_${dateKey}`
  );
  const dayData: DayData = {
    ...dayDate,
    dataKeyId,
    value,
    dateKey,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    deletedAt: null,
  };
  await setDoc(docRef, dayData);
};
