import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <Container
        disableGutters
        component="main"
        maxWidth={false}
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          width: "100%",
          pl: "144px",
        }}
      >
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
