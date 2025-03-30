import { createSvgIcon } from "@mui/material";

const ExternalLinkIcon = createSvgIcon(
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_433_10397)">
      <path
        d="M19 19H5V5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V12H19V19ZM14 3V5H17.59L7.76 14.83L9.17 16.24L19 6.41V10H21V3H14Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_433_10397">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>,
  "ExternalLink"
);

export default ExternalLinkIcon;
