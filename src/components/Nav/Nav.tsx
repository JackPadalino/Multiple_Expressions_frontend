import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import "./nav.css";

const Nav = () => {
  return (
    <Box component="nav" className="navMainContainer">
      <ul className="navList">
        <li className="navItem">
          <NavLink to="/home" className="navLink">
            Home
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink to="/auditory" className="navLink">
            Auditory
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink to="" className="navLink">
            Events
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink to="/live" className="navLink">
            Live
          </NavLink>
        </li>
      </ul>
    </Box>
  );
};

export default Nav;
