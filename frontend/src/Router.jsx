import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login/Login.jsx";
import SignUp from "./pages/auth/Signup/SignUp.jsx";
import Admin from "./pages/auth/Admin.jsx";
import Client from "./pages/client/Client.jsx";
export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/create-ticket" element={<Client />} />
      <Route path="/admin-dashboard" element={<Admin />} />
    </Routes>
  );
}
