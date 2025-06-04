import React from "react";

const CheckLogo = ({ fill, stroke }) => {
  return (
    <div
      style={{
        marginTop: "3px",
        backgroundColor: "transparent",
        width: "30px",
        height: "30px",
      }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 12.5L5 15L12.5 22.5L25 10L22.5 7.5L12.5 17.5L7.5 12.5Z"
          fill={fill}
          stroke={stroke}
        />
      </svg>
    </div>
  );
};

export default CheckLogo;
