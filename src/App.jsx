import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import { selectCurrentTheme } from "./store/slices/theme-slice/selectors";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/firebase";
import { ref, onValue } from "firebase/database";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
} from "./firebase/auth";
import { setTheme } from "./store/slices/theme-slice/slice";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useSelector(selectCurrentTheme);
  const dispatch = useDispatch();
  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, initializeUser);
    const doctorData = ref(db, "/");

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
      if (user) {
        console.log("User authenticated");
        setLoggedIn(true);
        setError(null);
        setCurrentUser({ ...user });
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

  const handleSignIn = async () => {
    try {
      setError(null);
      const response = await doCreateUserWithEmailAndPassword(
        "email",
        "password",
        "name"
      );
      if (!response.success) {
        console.log("Hata:", response.errorMessage);
        setError(response.errorMessage);
        return;
      }
      console.log("Kayıt başarılı:", response.data);
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
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    }
  };

  const hangleChangeTheme = async () => {
    if (!currentUser) return;
    const newTheme = currentUser.theme === "blue" ? "green" : "blue";
    try {
      setCurrentUser((prev) => ({ ...prev, theme: newTheme }));
      dispatch(setTheme(newTheme));
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
      <p>Theme: {theme}</p>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <button onClick={hangleChangeTheme} disabled={!currentUser}>
        Theme i değiştir
      </button>
      <button onClick={handleSignIn}>Üye Ol</button>
      <button onClick={handleLogIn}>Giriş Yap</button>
      <button onClick={handleSignOut} disabled={!currentUser}>
        Kullanıcıyı Temizle
      </button>
      {loading && <p>Loading...</p>}
    </>
  );
}

export default App;
