import { get, ref, query, orderByKey, limitToFirst } from "firebase/database";
import { db } from "./firebase";

export const doGetAllDoctors = async (pageSize, pageIndex) => {
  try {
    const doctorsRef = ref(db, "psychologyDoctors");
    const firstLimitedQuery = query(
      doctorsRef,
      orderByKey(),
      limitToFirst(pageSize * (pageIndex + 1))
    );
    const snapshot = await get(firstLimitedQuery);
    if (snapshot.exists()) {
      const doctorsData = snapshot.val();
      return {
        status: true,
        data: [...doctorsData],
        error: null,
      };
    } else {
      return {
        status: false,
        data: [],
        error: "Doctors data not found",
      };
    }
  } catch (e) {
    return {
      status: false,
      data: [],
      error: e?.message || "Something went wrong",
    };
  }
};
