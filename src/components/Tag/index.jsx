import "./styles.css";
const Tag = ({ tagName = "Experience", tagContent = "" }) => {
  return (
    <div className="tag">
      <p>
        <span className="tag-name">{tagName}</span> :{" "}
        <span className="tag-content">{tagContent}</span>
      </p>
    </div>
  );
};

export default Tag;
