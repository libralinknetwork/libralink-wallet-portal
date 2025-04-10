import { createSvgIcon } from "@mui/material";

const FilterIcon = createSvgIcon(
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_406_1682)">
      <path
        d="M4.25 5.66C4.35 5.79 9.99 12.99 9.99 12.99V19C9.99 19.55 10.44 20 11 20H13.01C13.56 20 14.02 19.55 14.02 19V12.98C14.02 12.98 19.51 5.96 19.77 5.64C20.03 5.32 20 5 20 5C20 4.45 19.55 4 18.99 4H5.01C4.4 4 4 4.48 4 5C4 5.2 4.06 5.44 4.25 5.66Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_406_1682">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>,
  "Filter"
);

export default FilterIcon;
