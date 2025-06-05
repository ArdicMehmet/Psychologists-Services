import { useState } from "react";
import { X } from "lucide-react";
import TimePicker from "../TimePicker/index";
import "./styles.css";

const formSablon = {
  name: "",
  phone: "+380",
  email: "",
  comment: "",
  time: "",
};

export default function AppointmentModal({ isOpen, onClose, doctor }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "+380",
    email: "",
    comment: "",
    time: "",
  });

  const timeOptions = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({
      ...prev,
      time: time,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ ...formSablon });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="appointment-modal">
        <button className="close-button" onClick={onClose}>
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

        <form onSubmit={handleSubmit} className="appointment-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input full-width"
            required
          />

          <div className="form-row">
            <input
              type="tel"
              name="phone"
              placeholder="+380"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input half-width"
              required
            />

            <div className="time-picker-wrapper">
              <TimePicker
                timeOptions={timeOptions}
                callback={handleTimeSelect}
              />
            </div>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input full-width"
            required
          />

          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleInputChange}
            className="form-textarea"
            rows={4}
          />

          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
