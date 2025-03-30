import { createSvgIcon } from "@mui/material";

const UploadIcon = createSvgIcon(
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_761_11915)">
      <path
        d="M19 12V19H5V12H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V12H19Z"
        fill="currentColor"
      />
      <path
        d="M15.59 9.41L13 6.83V16.5H11V6.83L8.41 9.41L7 8L12 3L17 8L15.59 9.41Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_761_11915">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>,
  "Upload"
);

export default UploadIcon;
