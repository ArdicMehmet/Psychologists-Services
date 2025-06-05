import { useState } from "react";
import { Clock } from "lucide-react";
import "./styles.css";

export default function TimePicker({ timeOptions, callback }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setIsOpen(false);
    callback(time);
  };

  return (
    <>
      <div className="timepicker-container">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`timepicker-button ${selectedTime ? "selected" : ""}`}
        >
          <span>{selectedTime || "00:00"}</span>
          <Clock size={20} color="#666" />
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-header">Meeting time</div>

            <div className="time-options custom-scrollbar">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTimeSelect(time)}
                  className={`time-option-button ${
                    selectedTime === time ? "active" : ""
                  }`}
                  onMouseEnter={(e) => {
                    if (selectedTime !== time) {
                      e.currentTarget.classList.add("hovered");
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedTime !== time) {
                      e.currentTarget.classList.remove("hovered");
                    }
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {isOpen && (
          <div className="backdrop" onClick={() => setIsOpen(false)} />
        )}
      </div>
    </>
  );
}
