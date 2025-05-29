import { get, ref } from "firebase/database";
import { db } from "./firebase";

export const doGetAllDoctors = async () => {
  try {
    const doctorsRef = ref(db, "psychologyDoctors");
    const snapshot = await get(doctorsRef);
    if (snapshot.exists()) {
      const doctorsData = snapshot.val();
      return {
        status: true,
        data: [...doctorsData],
        error: null,
      };
    } else {
      console.log(" psychologyDoctors yolunda veri bulunamadı.");
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
