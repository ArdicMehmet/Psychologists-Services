import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import Psychologists from "./pages/Psychologists";
import { useInitialAuth } from "./hooks/useInitialAuth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginModal from "./components/AuthModal/login-modal";
import RegisterModal from "./components/AuthModal/register-modal";
import useLogin from "./hooks/useLogin";
import useSignUp from "./hooks/useSignUp";
import Favourites from "./pages/Favorites";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoadingScreen from "./components/LoadingScreen";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useUserOthersData } from "./hooks/useUserOthersData";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { loading: authInitalLoading, error: authInitialError } =
    useInitialAuth();
  const { loading: loginLoading, loginError, login } = useLogin();
  const { loading: signUpLoading, error: signUpError, signUp } = useSignUp();
  const { changeTheme } = useUserOthersData();
  const handleThemeChange = async (theme) => {
    const response = await changeTheme(theme);
    if (!response) {
      toast.error("Please login to change Theme", {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  const handleLogin = async (data) => {
    const response = await login(data.email, data.password);
    if (response) {
      toast.success("Login is successfully", {
        style: {
          background: "green",
          color: "white",
        },
      });
      setIsLoginModalOpen(false);
    } else {
      toast.error("Username or password is incorrect", {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  const handleRegister = async (data) => {
    const response = await signUp(data.email, data.password, data.name);
    if (response) {
      toast.success("Registiration is successfully", {
        style: {
          background: "green",
          color: "white",
        },
      });
      setIsRegisterModalOpen(false);
    } else {
      toast.error("Email address is in use", {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  return authInitalLoading ? (
    <LoadingScreen />
  ) : (
    <Router>
      <div className="app">
        <Navbar
          openLoginModal={setIsLoginModalOpen}
          openRegisterModal={setIsRegisterModalOpen}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/psychologists" element={<Psychologists />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/favorites" element={<Favourites />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
          onLoading={loginLoading}
        />

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onRegister={handleRegister}
          onLoading={signUpLoading}
        />

        <ThemeSwitcher onThemeChange={handleThemeChange} />

        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />
      </div>
    </Router>
  );
}

export default App;

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import "./App.css";
// import { Bounce, ToastContainer, toast } from "react-toastify";
// import { useState } from "react";
// import Psychologists from "./pages/Psychologists";
// import { useInitialAuth } from "./hooks/useInitialAuth";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import LoginModal from "./components/AuthModal/login-modal";
// import RegisterModal from "./components/AuthModal/register-modal";
// import useLogin from "./hooks/useLogin";
// import useSignUp from "./hooks/useSignUp";
// import Favourites from "./pages/Favorites";
// import ProtectedRoutes from "./components/ProtectedRoutes";
// import LoadingScreen from "./components/LoadingScreen";
// function App() {
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
//   const { loading: authInitalLoading, error: authInitialError } =
//     useInitialAuth();
//   const { loading: loginLoading, loginError, login } = useLogin();
//   const { loading: signUpLoading, error: signUpError, signUp } = useSignUp();
//   const handleLogin = async (data) => {
//     const response = await login(data.email, data.password);
//     if (response) {
//       toast.success("Login is successfully", {
//         style: {
//           background: "green",
//           color: "white",
//         },
//       });
//       setIsLoginModalOpen(false);
//     } else {
//       toast.error("Username or password is incorrect", {
//         style: {
//           background: "red",
//           color: "white",
//         },
//       });
//     }
//   };

//   const handleRegister = async (data) => {
//     const response = await signUp(data.email, data.password, data.name);
//     if (response) {
//       toast.success("Registiration is successfully", {
//         style: {
//           background: "green",
//           color: "white",
//         },
//       });
//       setIsRegisterModalOpen(false);
//     } else {
//       toast.error("Email address is in use", {
//         style: {
//           background: "red",
//           color: "white",
//         },
//       });
//     }
//   };
//   return authInitalLoading ? (
//     <LoadingScreen />
//   ) : (
//     <Router>
//       <div className="app">
//         <Navbar
//           openLoginModal={setIsLoginModalOpen}
//           openRegisterModal={setIsRegisterModalOpen}
//         />
//         <main className="main-content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/psychologists" element={<Psychologists />} />
//             <Route element={<ProtectedRoutes />}>
//               <Route path="/favorites" element={<Favourites />} />
//             </Route>
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </main>
//         <LoginModal
//           isOpen={isLoginModalOpen}
//           onClose={() => setIsLoginModalOpen(false)}
//           onLogin={handleLogin}
//           onLoading={loginLoading}
//         />

//         <RegisterModal
//           isOpen={isRegisterModalOpen}
//           onClose={() => setIsRegisterModalOpen(false)}
//           onRegister={handleRegister}
//           onLoading={signUpLoading}
//         />
//         <ToastContainer
//           position="bottom-right"
//           autoClose={2000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick={false}
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover={false}
//           theme="light"
//           transition={Bounce}
//         />
//       </div>
//     </Router>
//   );
// }

// export default App;
