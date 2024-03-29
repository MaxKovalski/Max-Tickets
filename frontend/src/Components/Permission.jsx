export const userPermissions = {
  none: 0,
  client: 1,
  tech: 2,
  manager: 3,
  admin: 4,
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
    route: "/open-tickets",
    title: "Open-Tickets",
    permissions: [userPermissions.tech, userPermissions.admin],
  },
  {
    route: "/manage-tickets",
    title: "Manage-Tickets",
    permissions: [userPermissions.manager, userPermissions.admin],
  },
  {
    route: "/manager-dashboard",
    title: "DashBoard",
    permissions: [userPermissions.manager, userPermissions.admin],
  },
  {
    route: "/admin-tools",
    title: "Admin-Tools",
    permissions: [userPermissions.admin],
  },
];
