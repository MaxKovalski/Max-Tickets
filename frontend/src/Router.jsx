import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login/Login.jsx";
import SignUp from "./pages/auth/Signup/SignUp.jsx";
import AdminTools from "./pages/admin/AdminTools.jsx";
import CreateTicket from "./pages/create_ticket/CreateTicket.jsx";
import { userPermissions } from "./Components/Permission.jsx";
import RouterGuard from "./Guard/RouterGuard.jsx";
import OpenTickets from "./pages/tech/OpenTickets.jsx";
import ManageTickets from "./pages/manager/ManageTickets.jsx";
import ArchiveTicket from "./pages/manager/ArchiveTicket.jsx";
import SinglePageWebSite from "./pages/webSite/SinglePageWebSite.jsx";
import About from "./pages/about/About.jsx";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<SinglePageWebSite />} />
      <Route path="/about" element={<About />} />
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
          <RouterGuard permission={[userPermissions.tech]}>
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
        path="/tickets"
        element={
          <RouterGuard
            permission={[userPermissions.manager, userPermissions.admin]}
          ></RouterGuard>
        }
      />
      <Route
        path="/archive"
        element={
          <RouterGuard
            permission={[userPermissions.manager, userPermissions.admin]}
          >
            <ArchiveTicket />
          </RouterGuard>
        }
      />
      <Route
        path="/admin-tools"
        element={
          <RouterGuard permission={[userPermissions.admin]}>
            <AdminTools />
          </RouterGuard>
        }
      />
    </Routes>
  );
}
