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
  {
    route: "/",
    title: "Home",
    permissions: [userPermissions.none],
  },
  {
    route: "/about",
    title: "About",
    permissions: [userPermissions.none],
  },
  { route: "/login", title: "Login", permissions: [userPermissions.none] },
  { route: "/signup", title: "Signup", permissions: [userPermissions.none] },

  {
    route: "/create-ticket",
    title: "Create Ticket",
    permissions: [userPermissions.client, userPermissions.admin],
  },
  {
    route: "/open-tickets",
    title: "Open-Tickets",
    permissions: [userPermissions.tech],
  },
  {
    route: "/manage-tickets",
    title: "Manage-Tickets",
    permissions: [userPermissions.manager, userPermissions.admin],
  },
  {
    route: "/archive",
    title: "Archive",
    permissions: [userPermissions.manager, userPermissions.admin],
  },
  {
    route: "/admin-tools",
    title: "Admin-Tools",
    permissions: [userPermissions.admin],
  },
];
