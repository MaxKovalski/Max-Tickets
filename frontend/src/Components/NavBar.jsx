import React from "react";
import { useNavigate } from "react-router-dom";
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
  let navigate = useNavigate();

  const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
  };

  const allowedPages = pagesPerUser.filter((page) => {
    if (userPermission > userPermissions.none) {
      return (
        checkPermissions(page.permissions, userPermission) &&
        !["/login", "/signup"].includes(page.route)
      );
    } else {
      return checkPermissions(page.permissions, userPermission);
    }
  });
  const handleLogout = () => {
    localStorage.clear("token");
    setUserData(null);
    setUserPermission(userPermissions.none);
    navigate("/Login");
  };

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
        {userPermission > userPermissions.none && (
          <li style={{ marginLeft: "auto" }}>
            <button
              onClick={handleLogout}
              style={{
                ...navLinkStyle,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
