import { memo } from "react";
import { LinearProgress } from "@mui/material";

const AbsoluteProgressView = memo(() => {
  return (
    <LinearProgress
      style={{
        position: "fixed",
        width: "100%",
        top: 64,
        left: 0,
      }}
    />
  );
});

AbsoluteProgressView.displayName = "AbsoluteProgressView";

export default AbsoluteProgressView;
