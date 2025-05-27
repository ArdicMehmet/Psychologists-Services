import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  /*sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,*/
} from "firebase/auth";
import { get, ref, set } from "firebase/database";
export const doCreateUserWithEmailAndPassword = async (
  email,
  password,
  displayName
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      const userRef = ref(db, "users/" + user.uid);
      await set(userRef, {
        theme: "blue",
        favouriteDoctors: [],
      });
      await updateProfile(user, {
        displayName,
      });
      console.log(
        "Kullanıcı oluşturuldu, varsayılan tema ve doktorlar kaydedildi:",
        user.uid
      );
    }
    return { success: true, data: userCredential };
  } catch (error) {
    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
};
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential) {
      const user = userCredential.user;
      const userRef = ref(db, "users/" + user.uid);
      const userData = (await get(userRef)).val();
      const theme = userData?.theme || "blue";
      const favoriteDoctors = userData?.favoriteDoctors
        ? Object.values(userData.favoriteDoctors)
        : [];
      return {
        success: true,
        user: { ...userCredential, theme, favoriteDoctors },
      };
    }
  } catch (error) {
    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  //const result.user
  return result;
};

export const doSignOut = async () => {
  return auth.signOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };
