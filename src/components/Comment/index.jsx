import AvatarPlaceholder from "../Icons/AvatarPlaceholder";
import "./styles.css";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../../store/slices/user-slice/selectors";
import StarLogo from "../Logos/StarLogo";
const Comment = ({ review = {} }) => {
  const theme = useSelector(selectCurrentTheme);
  return (
    <div className="comment-container">
      <div className="comment-header">
        <div className="img-container">
          <AvatarPlaceholder text={review?.reviewer[0] || ""} theme={theme} />
        </div>
        <div className="header-info">
          <p className="name">{review?.reviewer || ""}</p>
          <div className="rating-container">
            <StarLogo />
            <p className="rating-text"> {review?.rating || ""}</p>
          </div>
        </div>
      </div>
      <div className="content">
        <p className="content-text">{review?.comment || ""}</p>
      </div>
    </div>
  );
};

export default Comment;
