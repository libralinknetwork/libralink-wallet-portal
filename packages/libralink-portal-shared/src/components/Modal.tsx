import { FC, ReactNode } from "react";
import { Box, Modal as MUIModal, Paper } from "@mui/material";

import { ClearIcon } from "icons";

type Props = {
  open: boolean;
  onClose: () => void;
  width?: number;
  children: ReactNode;
};
const Modal: FC<Props> = ({ open, onClose, width, children }) => {
  return (
    <MUIModal open={open} onClose={onClose}>
      <Paper
        elevation={0}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: width || 400,
          p: 10,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            top: 24,
            right: 24,
            cursor: "pointer",
            color: "#525B65",
          }}
          onClick={onClose}
        >
          <ClearIcon />
        </Box>
        {children}
      </Paper>
    </MUIModal>
  );
};

export default Modal;
