import { useSelector } from "react-redux";
import "./App.css";
import { useInitialAuth } from "./hooks/useInitialAuth";
import {
  selectCurrentTheme,
  selectCurrentUser,
} from "./store/slices/user-slice/selectors";
import { useEffect } from "react";
import useLogin from "./hooks/useLogin";
import useSignUp from "./hooks/useSignUp";
import useSignOut from "./hooks/useSignOut";
import useGetAllDoctors from "./hooks/useGetAllDoctors";
//import { useUserOthersData } from "./hooks/useUserOthersData";

function App() {
  const currentUser = useSelector(selectCurrentUser);
  const theme = useSelector(selectCurrentTheme);
  const { loading: initialLoading, error: initialError } = useInitialAuth();
  const { loading: loginLoading, error: loginError, login } = useLogin();
  const { loading: signUpLoading, error: signUpError, signUp } = useSignUp();
  const {
    loading: getAllDoctorsLoading,
    error: getAllDoctorsError,
    getAllDoctors,
  } = useGetAllDoctors();
  const {
    loading: signOutLoading,
    error: signOutError,
    signOut,
  } = useSignOut();
  //const { changeTheme } = useUserOthersData();
  useEffect(() => {
    getAllDoctors();
  }, []);
  if (initialLoading) {
    return <div>Loading</div>;
  }
  useSignUp;
  const handleLogin = async () => {
    const response = await login("dede12@gmail.com", "dede12");
    console.log("Login Response", response);
  };
  const handleSignUp = async () => {
    const response = await signUp("dede12@gmail.com", "dede12", "dede12");
    console.log("SignUp Response : ", response);
  };
  const handleSignOut = async () => {
    const response = await signOut();
    console.log("SignOut response ", response);
  };
  return (
    <>
      <div>
        <p>
          Current User: {currentUser?.displayName || "Display name cannot read"}
        </p>
        <p>Email: {currentUser?.email || ""}</p>
      </div>

      <p>Theme: {theme || "blue"}</p>
      <p>Login loading : {loginLoading ? "true" : "false"}</p>
      <p>Login error : {loginError ? "true" : "false"}</p>
      <p>SignUp loading : {signUpLoading ? "true" : "false"}</p>
      <p>SignUp error : {signUpError ? "true" : "false"}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignUp}>SignUp</button>
      <button onClick={handleSignOut}>Logout</button>
    </>
  );
}

export default App;
