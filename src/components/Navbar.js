import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const pathName =  useLocation().pathname;
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="flex justify-center  items-center flex-wrap">
            <div className="flex items-center">
              <AddBusinessIcon sx={{ display: { md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                FormFusion
              </Typography>
            </div>

            <Box sx={{  display: { xs: "flex" } }}>
              <Link
              to={"/"}
              className={`whitespace-nowrap  text-white my-2 mr-3 ${pathName==="/"? "border-b-2 font-bold":"font-semibold"}`}
               
              >
                Build Form
              </Link>
              <Link
              to={"/preview"}
              className={`whitespace-nowrap text-white  my-2  ${pathName==="/preview"? "border-b-2 font-bold":"font-semibold"}`}
                
              >
                Preview Form
              </Link>
            </Box>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
