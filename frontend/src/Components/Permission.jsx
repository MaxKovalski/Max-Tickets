export const userPermissions = {
  none: "none",
  client: "client",
  tech: "tech",
  manager: "manager",
  admin: "admin",
};

export const checkPermissions = (permissions, userPermissions) => {
  return permissions.includes(userPermissions);
};
export const pagesPerUser = [
  { route: "/login", title: "Login", permissions: [userPermissions.none] },
  { route: "/signup", title: "Signup", permissions: [userPermissions.none] },
  {
    route: "/",
    title: "Home",
    permissions: [
      userPermissions.none,
      userPermissions.client,
      userPermissions.tech,
      userPermissions.manager,
      userPermissions.admin,
    ],
  },
  {
    route: "/create-ticket",
    title: "Create Ticket",
    permissions: [userPermissions.client, userPermissions.admin],
  },
  {
    route: "/it-support",
    title: "Open-Tickets",
    permissions: [userPermissions.tech, userPermissions.admin],
  },
  {
    route: "/manager-dashboard",
    title: "DashBoard",
    permissions: [userPermissions.manager, userPermissions.admin],
  },
  {
    route: "/admin-dashboard",
    title: "Admin DashBoard",
    permissions: [userPermissions.admin],
  },
];
