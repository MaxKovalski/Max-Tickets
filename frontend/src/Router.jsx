import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/Signup/SignUp.jsx";
export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
