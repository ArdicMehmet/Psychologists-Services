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
import { DEFAULT_THEME } from "../constants/theme";
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
        theme: DEFAULT_THEME,
        favouriteDoctors: [],
      });
      await updateProfile(user, {
        displayName,
      });
      await user.reload();

      const updatedUser = auth.currentUser;

      return {
        success: true,
        data: {
          user: {
            id: updatedUser?.uid || "",
            email: updatedUser?.email || "",
            displayName: updatedUser?.displayName || "",
            phoneNumber: updatedUser?.phoneNumber || "",
            photoUrl: updatedUser?.photoURL || "",
          },
          theme: DEFAULT_THEME,
          favouriteDoctors: [],
        },
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
      const snapshot = await get(userRef);
      const userData = snapshot.val();
      const theme = userData?.theme || DEFAULT_THEME;
      const favouriteDoctors = [...(userData?.psychologyDoctors || [])];

      return {
        success: true,
        user: { ...userCredential, theme, favouriteDoctors },
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
