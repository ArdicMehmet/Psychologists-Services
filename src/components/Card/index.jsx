import { useSelector } from "react-redux";
import FavLogo from "../Logos/FavLogo";
import StarLogo from "../Logos/StarLogo";
import { selectCurrentTheme } from "../../store/slices/user-slice/selectors";
import { THEME_COLORS } from "../../constants/theme";
import "./styles.css";
import Tag from "../Tag";
import { useState } from "react";
import Comment from "../Comment";
import { useUserOthersData } from "../../hooks/useUserOthersData";

const Card = ({ doctor = {}, favourite = false, handleViewAppointment }) => {
  const [showComments, setShowComments] = useState(false);
  const { updateFavouriteDoctors } = useUserOthersData();
  const theme = useSelector(selectCurrentTheme);

  const handleAddFavorite = async () => {
    await updateFavouriteDoctors(doctor);
  };

  const handleReadMore = async () => {
    console.log("Read more a basıldı");
    setShowComments((prev) => !prev);
  };

  return (
    <div className="card">
      <div
        className="image-container"
        style={{ borderColor: THEME_COLORS[theme].tertiary }}
      >
        <img src={doctor?.avatar_url || null} alt="img" />
        <div className="online-icon">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7" cy="7" r="7" fill="#FBFBFB" />
            <circle cx="6.99992" cy="7.00009" r="4.66667" fill="#38CD3E" />
          </svg>
        </div>
      </div>

      <div className="card-content-container">
        <div className="card-header">
          <div className="header-top">
            <div className="info-container">
              <p className="title">Psychologist</p>
              <p className="name">{doctor?.name || ""}</p>
            </div>
            <div className="stat-container">
              <div className="rating-container">
                <StarLogo />
                <p className="rating-text">Rating: {doctor?.rating || ""}</p>
              </div>
              <div className="vector">
                <svg
                  width="2"
                  height="16"
                  viewBox="0 0 2 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 0V16" stroke="#191A15" strokeOpacity="0.2" />
                </svg>
              </div>
              <div className="price-container">
                <p className="price-text">
                  Price / 1 hour:{" "}
                  <span className="price">{doctor?.price_per_hour || ""}$</span>
                </p>
              </div>
              <div className="favorite-container">
                <FavLogo
                  callback={handleAddFavorite}
                  fill={favourite ? THEME_COLORS[theme].primary : "white"}
                  stroke={THEME_COLORS[theme].primary}
                />
              </div>
            </div>
          </div>
          <div className="header-bottom">
            <div className="tag-container">
              <Tag
                tagName="Experience"
                tagContent={doctor?.experience || "0"}
              />
              <Tag tagName="License" tagContent={doctor?.license || ""} />
              <Tag
                tagName="Specialization"
                tagContent={doctor?.specialization || ""}
              />
              <Tag
                tagName="Initial_consultation"
                tagContent={doctor?.initial_consultation || ""}
              />
            </div>
          </div>
        </div>
        <div className="card-content">
          <p className="content clamp-text">{doctor.about}</p>
          {showComments && (
            <div className="comments-container">
              {doctor?.reviews.map((review, index) => (
                <Comment key={index} review={review} />
              ))}
              <button
                onClick={() => handleViewAppointment(true, doctor)}
                style={{
                  padding: "12px 24px",
                  backgroundColor: THEME_COLORS[theme].primary,
                  color: "white",
                  border: "1px solid transparent",
                  borderRadius: "30px",
                  fontSize: "16px",
                  cursor: "pointer",
                  width: "227px",
                  height: "48px",
                  marginTop: "15px",
                }}
              >
                Make an Appointment
              </button>
            </div>
          )}
          <p className="read-more" onClick={handleReadMore}>
            {!showComments ? "Read More" : "Hide Comments"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
