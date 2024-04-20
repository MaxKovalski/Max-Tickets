import React from "react";
import Router from "./Router.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { userPermissions } from "./Components/Permission.jsx";
import NavBar from "./Components/NavBar.jsx";
import { jwtDecode } from "jwt-decode";
import { ResetTokenExpiration } from "./assets/ManageLocalStorage.jsx";
import FooterSection from "./Components/FooterSection.jsx";
export const GeneralContext = React.createContext();
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = React.useState();
  const [userPermission, setUserPermission] = React.useState(
    userPermissions.none
  );
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setUserPermission(decoded.permission);

          ResetTokenExpiration();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [navigate]);
  return (
    <GeneralContext.Provider
      value={{ userData, setUserData, userPermission, setUserPermission }}
    >
      <div key={location.pathname}>
        <NavBar />
        <Router />
        {location.pathname === "/home" ? null : <FooterSection />}
      </div>
    </GeneralContext.Provider>
  );
}

export default App;
