import React, { useState } from "react";
import "./styles.css";
const EyeIcon = ({ stroke, fill, callback }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
    setShowPassword((prev) => !prev);
    callback(!showPassword);
  };
  return (
    <div className="clickable" onClick={handleClick}>
      {!showPassword ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_42_2444)">
            <path
              d="M0.833984 10C0.833984 10 4.16732 3.33334 10.0007 3.33334C15.834 3.33334 19.1673 10 19.1673 10C19.1673 10 15.834 16.6667 10.0007 16.6667C4.16732 16.6667 0.833984 10 0.833984 10Z"
              stroke={stroke}
              fill={fill}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
              stroke={stroke}
              fill={fill}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_42_2444">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_42_2441)">
            <path
              d="M14.9507 14.95C13.5261 16.0358 11.7916 16.6374 10.0007 16.6667C4.16732 16.6667 0.833984 10 0.833984 10C1.87056 8.06825 3.30826 6.38051 5.05065 5.05M8.25065 3.53333C8.82426 3.39907 9.41154 3.33195 10.0007 3.33333C15.834 3.33333 19.1673 10 19.1673 10C18.6615 10.9463 18.0582 11.8373 17.3673 12.6583M11.7673 11.7667C11.5384 12.0123 11.2624 12.2093 10.9558 12.3459C10.6491 12.4826 10.3181 12.556 9.98239 12.562C9.64672 12.5679 9.31329 12.5061 9.00199 12.3804C8.6907 12.2547 8.40792 12.0675 8.17052 11.8301C7.93313 11.5927 7.74598 11.31 7.62024 10.9987C7.49451 10.6874 7.43276 10.3539 7.43868 10.0183C7.4446 9.68258 7.51808 9.35154 7.65472 9.04487C7.79136 8.73821 7.98836 8.46221 8.23399 8.23333"
              stroke={stroke}
              fill={fill}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0.833984 0.833336L19.1673 19.1667"
              stroke={stroke}
              fill={fill}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_42_2441">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default EyeIcon;
