export const pageRoutes = {
  home: "/",
  posts: "/posts",
  logs: "/logs",
} as const;

interface NavigationRoute {
  text: string;
  path: (typeof pageRoutes)[keyof typeof pageRoutes];
  matcher: (currentPath: string | null) => boolean;
}

export const navigationRoutes: NavigationRoute[] = [
  {
    text: "Home",
    path: pageRoutes.home,
    matcher: (currentPath) => currentPath === pageRoutes.home,
  },
  {
    text: "Posts",
    path: pageRoutes.posts,
    matcher: (currentPath) => !!currentPath?.includes(pageRoutes.posts),
  },
  {
    text: "Logs",
    path: pageRoutes.logs,
    matcher: (currentPath) => currentPath === pageRoutes.logs,
  },
];
