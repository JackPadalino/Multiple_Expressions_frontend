import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import "./nav.css";

const Nav = () => {
  return (
    <Box className="navMainContainer">
      <NavLink to="/home" className="navLink">
        Home
      </NavLink>
      <NavLink to="/auditory" className="navLink">
        Auditory
      </NavLink>
      <NavLink to="/live" className="navLink">
        Live
      </NavLink>
    </Box>
  );
};

export default Nav;
