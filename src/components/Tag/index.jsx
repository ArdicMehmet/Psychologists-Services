const Tag = ({ tagName = "Experience", tagContent = "999" }) => {
  return (
    <div>
      <p>
        {tagName} : {tagContent}
      </p>
    </div>
  );
};

export default Tag;
