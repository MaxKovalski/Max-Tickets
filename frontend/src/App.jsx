import React from "react";
import Router from "./Router.jsx";
import "./App.css";
import { userPermissions } from "./Components/Permission.jsx";
import NavBar from "./Components/NavBar.jsx";
import { jwtDecode } from "jwt-decode";
export const GeneralContext = React.createContext();
function App() {
  const [userData, setUserData] = React.useState();
  const [userPermission, setUserPermission] = React.useState(
    userPermissions.none
  );
  React.useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      const userAuth = jwtDecode(auth);
      setUserPermission(userAuth.permission);
    }
  }, []);
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
