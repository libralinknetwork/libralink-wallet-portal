import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Typography, Box } from "@mui/material";

import { routes } from "config/routes";

const NotFoundView = () => {
  return (
    <div>
      <Helmet title="Page not found">
        <meta name="robots" content="noindex" />
      </Helmet>

      <div>
        <Typography variant="h3">Page not found</Typography>
        <Box mt={2}>
          <Link to={routes.index}>
            <Typography variant="h5">Go to main page</Typography>
          </Link>
        </Box>
      </div>
    </div>
  );
};

export default NotFoundView;
