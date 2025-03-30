import { createSvgIcon } from "@mui/material";

const WarningIcon = createSvgIcon(
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_914_11797)">
      <path
        d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_914_11797">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>,
  "Warning"
);

export default WarningIcon;
