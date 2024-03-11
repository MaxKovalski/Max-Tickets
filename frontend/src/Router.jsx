import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login/Login.jsx";
import SignUp from "./pages/auth/Signup/SignUp.jsx";
import Admin from "./pages/auth/Admin.jsx";
import CreateTicket from "./pages/create_ticket/CreateTicket.jsx";
import { userPermissions } from "./Components/Permission.jsx";
import RouterGuard from "../Guard/RouterGuard.jsx";
import OpenTickets from "./pages/tech/OpenTickets.jsx";
import ManageTickets from "./pages/manager/ManageTickets.jsx";
import DashBoard from "./pages/manager/DashBoard.jsx";
export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/create-ticket"
        element={
          <RouterGuard
            permission={[userPermissions.client, userPermissions.admin]}
          >
            <CreateTicket />
          </RouterGuard>
        }
      />
      <Route
        path="/open-tickets"
        element={
          <RouterGuard
            permission={[userPermissions.tech, userPermissions.admin]}
          >
            <OpenTickets />
          </RouterGuard>
        }
      />
      <Route
        path="/manage-tickets"
        element={
          <RouterGuard
            permission={[userPermissions.manager, userPermissions.admin]}
          >
            <ManageTickets />
          </RouterGuard>
        }
      />
      <Route
        path="/manager-dashboard"
        element={
          <RouterGuard
            permission={[userPermissions.manager, userPermissions.admin]}
          >
            <DashBoard />
          </RouterGuard>
        }
      />
      <Route
        path="/admin-tools"
        element={
          <RouterGuard permission={[userPermissions.admin]}>
            <Admin />
          </RouterGuard>
        }
      />
    </Routes>
  );
}
