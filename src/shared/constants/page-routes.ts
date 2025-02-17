export const pageRoutes = {
  home: "/",
  posts: "/posts",
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
];
