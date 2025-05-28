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
//import { useUserOthersData } from "./hooks/useUserOthersData";

function App() {
  const currentUser = useSelector(selectCurrentUser);
  const theme = useSelector(selectCurrentTheme);
  const { loading: initialLoading, error: initialError } = useInitialAuth();
  const { loading: loginLoading, error: loginError, login } = useLogin();
  const { loading: signUpLoading, error: signUpError, signUp } = useSignUp();
  const {
    loading: signOutLoading,
    error: signOutError,
    signOut,
  } = useSignOut();
  //const { changeTheme } = useUserOthersData();
  useEffect(() => {
    console.log("Current User : ", currentUser);
  }, []);
  if (initialLoading) {
    return <div>Loading</div>;
  }
  useSignUp;
  const handleLogin = async () => {
    const response = await login("email", "password");
    console.log("Login Response", response);
  };
  const handleSignUp = async () => {
    const response = await signUp("email", "password", "displayName");
    console.log("SignUp Response : ", response);
  };
  const handleSignOut = async () => {
    const response = await signOut();
    console.log("SignOut response ", response);
  };
  return (
    <>
      {!signUpLoading ? (
        <div>
          <p>
            Current User:{" "}
            {currentUser?.displayName || "Display name cannot read"}
          </p>
          <p>Email: {currentUser?.email || ""}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
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
