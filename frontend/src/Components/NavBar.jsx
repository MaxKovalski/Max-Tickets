import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GeneralContext } from "../App";
import {
  userPermissions,
  pagesPerUser,
  checkPermissions,
} from "../Components/Permission.jsx";
import styles from "./Css/navbar.module.css";
import logoImage from "../image/Logo/Logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
  const { setUserData, setUserPermission, userPermission } =
    useContext(GeneralContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let navigate = useNavigate();

  const allowedPages = pagesPerUser.filter(
    (page) =>
      checkPermissions(page.permissions, userPermission) &&
      (userPermission > userPermissions.none
        ? !["/login", "/signup", "/"].includes(page.route)
        : true)
  );

  const handleLogout = () => {
    localStorage.clear();
    setUserData(null);
    setUserPermission(userPermissions.none);
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <img src={logoImage} alt="Logo" className={styles.logo} />
      <div
        className={styles.hamburger}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul
        className={`${styles.navMenu} ${isMenuOpen ? styles.menuActive : ""}`}
      >
        {" "}
        {allowedPages.map((page) => (
          <li key={page.route}>
            <Link
              to={page.route}
              className={styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
      {userPermission > userPermissions.none && (
        <li className={styles.navItem}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </li>
      )}
    </nav>
  );
}
