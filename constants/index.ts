const protectedRoutes: string[] = [
  "/learn(.*)",
  "/courses(.*)",
  "/lesson(.*)",
  "/quests",
  "/leaderboard",
];

interface SidebarItems {
    label:string;
    href:string;
    imageSrc:string
}

const sidebarItems: SidebarItems[] = [
  {
    label: "Learn",
    href: "/learn",
    imageSrc: "/assets/learn.svg",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
    imageSrc: "/assets/leaderboard.svg",
  },
  {
    label: "Quests",
    href: "/quests",
    imageSrc: "/assets/quests.svg",
  },
  {
    label: "Shop",
    href: "/shop",
    imageSrc: "/assets/shop.svg",
  },
];

const POINTS_TO_REFILL = 10;

export {
    protectedRoutes,
    sidebarItems,
    POINTS_TO_REFILL
};