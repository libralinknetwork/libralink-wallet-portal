import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

import Header from "./Header";

const LoginLayout = () => {
  return (
    <>
      <Header />
      <Container
        disableGutters
        component="main"
        maxWidth={false}
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <Outlet />
      </Container>
    </>
  );
};

export default LoginLayout;
