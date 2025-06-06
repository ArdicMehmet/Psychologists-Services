import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../store/slices/user-slice/selectors";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
