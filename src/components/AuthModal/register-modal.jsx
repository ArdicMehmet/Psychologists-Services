import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X, Eye, EyeOff } from "lucide-react";
import "./auth-modal.css";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../../store/slices/user-slice/selectors";
import { THEME_COLORS } from "../../constants/theme";
import { schemas } from "../../schemas";

// Yup validation schema for registration
const registerSchema = schemas.signUp;

export default function RegisterModal({ isOpen, onClose, onRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useSelector(selectCurrentTheme);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    if (onRegister) {
      onRegister(data);
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
          <h1 className="modal-title">Registration</h1>
          <p className="modal-subtitle">
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              className={`form-input ${errors.name ? "error" : ""}`}
              {...register("name")}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
