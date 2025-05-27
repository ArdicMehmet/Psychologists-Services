import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import { selectCurrentTheme } from "./store/slices/user-slice/selectors";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/firebase";
import { ref, onValue, get, update } from "firebase/database";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
} from "./firebase/auth";
import { setTheme } from "./store/slices/user-slice/slice";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useSelector(selectCurrentTheme);
  const dispatch = useDispatch();
  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, initializeUser);
    const doctorData = ref(db, "/psychologyDoctors");

    const dbUnSub = onValue(doctorData, (snapshot) => {
      const data = snapshot.val(); // Verinin JSON halini alın
      // Veriyi UI'da gösterin veya işleyin
      console.log(data);
    });
    return () => {
      authUnsub();
      dbUnSub();
    };
  }, []);

  const initializeUser = async (user) => {
    try {
      let updatedUser = null;
      if (user) {
        updatedUser = {
          id: user?.uid || "",
          displayName: user?.displayName || "",
          email: user?.email || "",
          emailVerified: user?.emailVerified || false,
          phoneNumber: user?.phoneNumber || "",
          photoURL: user?.photoURL || "",
          theme: "blue", //default theme
          psychologyDoctors: [],
        };
        console.log("User authenticated");
        const userProfileRef = ref(db, "users/" + user.uid);
        const snapshot = await get(userProfileRef);

        if (snapshot.exists()) {
          // Veri bulundu! Snapshot'ın değeri kullanıcının RTDB'deki objesi
          const userData = snapshot.val();
          const theme = userData?.theme || "blue";
          const psychologyDoctors = userData?.psychologyDoctors || [];
          updatedUser = { ...updatedUser, theme, psychologyDoctors };
        } else {
          // O UID ile /users altında veri yok
          console.log("'/users/" + user.uid + "' yolunda veri bulunamadı.");
          // Belki bu yeni bir kullanıcıdır ve ilk defa profil oluşturulacaktır.
        }

        console.log("uptated user : ", updatedUser);
        setLoggedIn(true);
        setError(null);
        setCurrentUser({ ...updatedUser });
      } else {
        console.log("No authenticated user");
        setCurrentUser(null);
        setLoggedIn(false);
      }
    } catch (err) {
      console.error("Error in initializeUser:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setError(null);
      const response = await doCreateUserWithEmailAndPassword(
        "email",
        "password",
        "displayName"
      );
      if (!response.success) {
        console.log("Hata:", response.errorMessage);
        setError(response.errorMessage);
        return;
      }
      console.log("Kayıt başarılı:", response.data);
      setCurrentUser({ ...response.data.user });
    } catch (err) {
      console.error("Sign in error:", err);
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await doSignOut();
      setError(null);
    } catch (err) {
      console.error("Sign out error:", err);
      setError(err.message);
    }
  };

  const handleLogIn = async () => {
    try {
      setError(null);
      const response = await doSignInWithEmailAndPassword("email", "password");
      if (!response.success) {
        console.log("Hata:", response.errorMessage);
        setError(response.errorMessage);
        return;
      }
      console.log("Giriş başarılı", response.user);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    }
  };

  const hangleChangeTheme = async () => {
    if (!currentUser) return;
    const newTheme =
      currentUser.theme === "blue"
        ? "green"
        : currentUser.theme === "green"
        ? "purple"
        : "blue";
    try {
      const userRef = ref(db, "users/" + currentUser.id);
      update(userRef, {
        psychologyDoctors: currentUser?.psychologyDoctors || [],
        theme: newTheme,
      })
        .then(() => {
          console.log("Kullanıcı theması başarıyla güncellendi!");
          setCurrentUser((prev) => ({ ...prev, theme: newTheme }));
          dispatch(setTheme(newTheme));
        })
        .catch((error) => {
          console.error("Kullanıcı themasını güncellerken hata oluştu:", error);
        });

      console.log("Tema güncellendi:", newTheme);
    } catch (err) {
      console.error("Tema güncelleme hatası:", err);
      setError(err.message);
    }
  };

  return (
    <>
      <p>Current User: {currentUser?.displayName || "Not logged in"}</p>
      <p>Email: {currentUser?.email || ""}</p>
      <p>Theme: {currentUser?.theme || "blue"}</p>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <button onClick={hangleChangeTheme} disabled={!currentUser}>
        Theme i değiştir
      </button>
      <button onClick={handleSignUp}>Üye Ol</button>
      <button onClick={handleLogIn}>Giriş Yap</button>
      <button onClick={handleSignOut} disabled={!currentUser}>
        Kullanıcıyı Temizle
      </button>
      {loading && <p>Loading...</p>}
    </>
  );
}

export default App;
