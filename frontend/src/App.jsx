import React from "react";
import Router from "./Router.jsx";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { userPermissions } from "./Components/Permission.jsx";
import NavBar from "./Components/NavBar.jsx";
import { jwtDecode } from "jwt-decode";
import { ActivityCheck } from "./assets/ManageLocalStorage.jsx";
export const GeneralContext = React.createContext();
function App() {
  const [userData, setUserData] = React.useState();
  const [userPermission, setUserPermission] = React.useState(
    userPermissions.none
  );
  const navigate = useNavigate();
  React.useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      const userAuth = jwtDecode(auth);
      setUserPermission(userAuth.permission);
    }
    const cleanUserActivity = ActivityCheck();
    const logoutNavigate = () => navigate("/login");
    document.addEventListener("logout", logoutNavigate);
    return () => {
      cleanUserActivity();
      document.removeEventListener("logout", logoutNavigate);
    };
  }, [navigate]);
  return (
    <GeneralContext.Provider
      value={{
        userData,
        setUserData,
        userPermission,
        setUserPermission,
      }}
    >
      <NavBar></NavBar>

      <Router />
    </GeneralContext.Provider>
  );
}

export default App;
