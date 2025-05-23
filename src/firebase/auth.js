import { auth } from "./firebase";
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
    await updateProfile(userCredential.user, {
      displayName: displayName,
    });
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
    return { success: true, data: userCredential };
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
