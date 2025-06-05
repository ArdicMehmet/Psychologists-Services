import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Eye, EyeOff } from "lucide-react";
import "./auth-modal.css";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../../store/slices/user-slice/selectors";
import { THEME_COLORS } from "../../constants/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemas } from "../../schemas";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useSelector(selectCurrentTheme);
  const loginSchema = schemas.login;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(loginSchema) });
  yupResolver;
  const onSubmit = (data) => {
    if (onLogin) {
      onLogin(data);
    }
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="auth-modal">
        <button className="close-button" onClick={handleClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h1 className="modal-title">Log In</h1>
          <p className="modal-subtitle">
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              className={`form-input ${errors.email ? "error" : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="input-group">
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`form-input ${errors.password ? "error" : ""}`}
                {...register("password")}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            style={{ backgroundColor: THEME_COLORS[theme].primary }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
