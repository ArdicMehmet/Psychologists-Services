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

const Card = ({ doctor = {}, favorite = false }) => {
  const [showComments, setShowComments] = useState(false);
  const { updateFavouriteDoctors } = useUserOthersData();
  const theme = useSelector(selectCurrentTheme);
  const [favoriteCheck, setFavoriteCheck] = useState(favorite);
  const handleAddFavorite = () => {
    setFavoriteCheck((prev) => !prev);
    updateFavouriteDoctors(doctor);
  };
  const handleReadMore = async () => {
    console.log("Read more a basıldı");
    setShowComments((prev) => !prev);
  };
  return (
    <div className="card">
      <div className="image-container">
        <img src={doctor?.avatar_url || null} alt="img" />
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
                <p>Rating {doctor?.rating || ""}</p>
              </div>
              <div className="price-container">
                <p>Price / 1 hour: {doctor?.price_per_hour || ""}</p>
              </div>
              <div className="favorite-container">
                <FavLogo
                  callback={handleAddFavorite}
                  fill={favoriteCheck ? THEME_COLORS[theme].primary : "white"}
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
            </div>
          )}
          <button onClick={handleReadMore}>
            {!showComments ? "Read More" : "Hide Comments"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
