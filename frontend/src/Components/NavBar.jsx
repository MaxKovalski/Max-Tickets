import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GeneralContext } from "../App";
import {
  userPermissions,
  pagesPerUser,
  checkPermissions,
} from "../Components/Permission.jsx";
export default function NavBar() {
  const { setUserData, setUserPermission, userPermission } =
    React.useContext(GeneralContext);
  const navStyle = {
    backgroundColor: "#333",
    color: "white",
    padding: "10px",
    fontFamily: "Arial",
  };

  const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
  };

  // Filter pages based on the current user's permissions
  const allowedPages = pagesPerUser.filter((page) =>
    checkPermissions(page.permissions, userPermission)
  );

  return (
    <nav style={navStyle}>
      <h1>Logo</h1>
      <ul style={{ listStyleType: "none", display: "flex" }}>
        {allowedPages.map((page) => (
          <li key={page.route}>
            <Link to={page.route} style={navLinkStyle}>
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
