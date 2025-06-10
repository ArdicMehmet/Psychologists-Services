import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { X } from "lucide-react";
import TimePicker from "../TimePicker/index";
import "./styles.css";
import { timeOptions } from "../../constants/times";
import { schemas } from "../../schemas";
import { toast } from "react-toastify";
import { THEME_COLORS } from "../../constants/theme";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../../store/slices/user-slice/selectors";
const defaultValues = {
  name: "",
  phone: "+90",
  email: "",
  comment: "",
  time: "",
};

export default function AppointmentModal({ isOpen, onClose, doctor }) {
  const theme = useSelector(selectCurrentTheme);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schemas.appointmentSchema),
    defaultValues,
    mode: "onChange",
  });

  const watchedTime = watch("time");

  const handleTimeSelect = (time) => {
    setValue("time", time, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      toast.success("Send Message", {
        style: {
          background: "green",
          color: "white",
        },
      });
      reset(defaultValues);
      onClose();
    } catch (error) {
      toast.error("Cannot sending message", {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="appointment-modal">
        <button className="close-button" onClick={handleClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h1 className="modal-title">
            Make an appointment with a psychologists
          </h1>
          <p className="modal-subtitle">
            You are on the verge of changing your life for the better. Fill out
            the short form below to book your personal appointment with a
            professional psychologist. We guarantee confidentiality and respect
            for your privacy.
          </p>
        </div>

        <div className="psychologist-info">
          <div className="psychologist-avatar">
            <img src={doctor?.avatar_url || ""} alt={doctor?.name || ""} />
          </div>
          <div className="psychologist-details">
            <span className="psychologist-label">Your psychologists</span>
            <span className="psychologist-name">{doctor?.name}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="appointment-form">
          <div className="form-field">
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className={`form-input full-width ${errors.name ? "error" : ""}`}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-field half-width">
              <input
                {...register("phone")}
                type="tel"
                placeholder="+380"
                className={`form-input half-width ${
                  errors.phone ? "error" : ""
                }`}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>

            <div className="form-field half-width">
              <div className="time-picker-wrapper">
                <TimePicker
                  timeOptions={timeOptions}
                  callback={handleTimeSelect}
                  selectedTime={watchedTime}
                />
                <input
                  {...register("time")}
                  type="hidden"
                  value={watchedTime}
                />
              </div>
              {errors.time && (
                <span className="error-message">{errors.time.message}</span>
              )}
            </div>
          </div>

          <div className="form-field">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className={`form-input full-width ${errors.email ? "error" : ""}`}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-field">
            <textarea
              {...register("comment")}
              placeholder="Comment"
              className={`form-textarea ${errors.comment ? "error" : ""}`}
              rows={4}
            />
            {errors.comment && (
              <span className="error-message">{errors.comment.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            style={{ backgroundColor: THEME_COLORS[theme].primary }}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
