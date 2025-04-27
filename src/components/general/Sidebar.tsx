"use client";
import {
  hideSidebarPaths,
  hideSidebarPathsWithParam,
  SiteName,
} from "@/lib/constants";
import { fragmentMono, tomorrow } from "@/lib/Fonts";
import {
  IconBoltFilled,
  IconBrandItch,
  IconHomeFilled,
  IconLogout2,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgWebsite } from "react-icons/cg";
import { IoIosContact, IoLogoDesignernews } from "react-icons/io";
import { LuChevronsRight } from "react-icons/lu";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { RiLoginBoxLine } from "react-icons/ri";
import { SiAzuredataexplorer } from "react-icons/si";
import styled from "styled-components";

const subCategories = ["general", "hop", "editor", "user", "unauthorized"];

const navigations = [
  {
    icon: (isSelected: boolean) => (
      <IconHomeFilled
        className={`md:text-[26px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Home",
    key: "home",
    route: "/home",
    subcategory: "general",
    visible: true,
  },
  {
    icon: (isSelected: boolean) => (
      <IconBrandItch
        className={`md:text-[26px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Register",
    key: "brew",
    route: "/home/hop/create",
    subcategory: "hop",
    visible: true,
  },
  {
    icon: (isSelected: boolean) => (
      <CgWebsite
        className={`md:text-[26px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Editor",
    key: "editor",
    route: "/home/hop",
    subcategory: "editor",
    visible: true,
  },
  {
    icon: (isSelected: boolean) => (
      <SiAzuredataexplorer
        className={`md:text-[18px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Categories",
    key: "categories",
    route: "/home/categories",
    subcategory: "general",
    visible: false,
  },
  {
    icon: (isSelected: boolean) => (
      <IconBoltFilled
        className={`md:text-[26px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Trending",
    key: "trending",
    route: "/home/trending",
    subcategory: "general",
    visible: false,
  },
  {
    icon: (isSelected: boolean) => (
      <IoLogoDesignernews
        className={`md:text-[28px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Brands",
    key: "brand",
    route: "/home/brands",
    subcategory: "general",
    visible: true,
  },
  {
    icon: (isSelected: boolean) => (
      <PiShoppingCartSimpleFill
        className={`md:text-[26px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Cart",
    key: "cart",
    route: "/home/cart",
    subcategory: "user",
    visible: false,
  },
  {
    icon: (isSelected: boolean) => (
      <IoIosContact
        className={`md:text-[26px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Profile",
    key: "profile",
    route: "/home/me",
    subcategory: "user",
    visible: false,
  },
  {
    icon: (isSelected: boolean) => (
      <IconLogout2
        className={`md:text-[26px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Logout",
    key: "logout",
    route: "/home/logout",
    subcategory: "user",
    visible: true,
  },
  {
    icon: (isSelected: boolean) => (
      <RiLoginBoxLine
        className={`md:text-[26px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Login",
    key: "login",
    route: "/home/login",
    subcategory: "unauthorized",
    visible: true,
  },
];

const MovableSidebar = styled.div<{ $ismovable: string }>`
  transform: ${(props) =>
    props.$ismovable === "true" ? "translateX(-100px)" : ""};
`;

const restrictedSubCategory = ["user", "hop", "editor"];

// const noBrandRender = ["hop"];
// const ifBrandRender = ["editor"];
const unauthenticatedCategory = ["unauthorized"];

const groupedTabs = subCategories.map((category) =>
  navigations.filter(
    (sidebarTab) => sidebarTab.subcategory === category && sidebarTab.visible
  )
);

const Sidebar = ({
  canHide,
  isAbsolute,
}: {
  canHide: boolean;
  isAbsolute?: boolean;
}) => {
  const path = usePathname();
  const { data: session, status } = useSession();
  if (
    hideSidebarPaths.includes(path) ||
    hideSidebarPathsWithParam.find((pathWithParam) =>
      path.startsWith(pathWithParam)
    )
  )
    return null;

  return (
    <MovableSidebar
      $ismovable={canHide.toString()}
      className={` ${isAbsolute ? "z-[101] fixed" : "sticky"} top-0 left-0 w-max flex group justify-center items-center`}
    >
      <div
        className={`${fragmentMono.className} top-0 left-0 m-2 rounded-xl border-[0.5px] border-[var(--card-border-color)] w-max md:min-w-[100px] min-w-full md:h-[calc(100vh-8px)] h-max flex md:flex-col flex-row md:py-6 p-0 items-center justify-start group/sidebar z-[10] duration-500 bg-[var(--side-bar-bg-color)] ${canHide && "group-hover:translate-x-[100px]"}`}
      >
        <div
          className={`${tomorrow.className} md:visible md:flex hidden flex-col items-center justify-center gap-4 md:mb-12 w-full `}
        >
          <Image
            src="/logoLight.png"
            alt={""}
            width={40}
            height={35}
            className="opacity-[0.6] group-hover/sidebar:opacity-100 duration-500"
          />
          <div className="opacity-50 group-hover/sidebar:opacity-100 duration-700 text-md break-keep text-bold tracking-wider">
            {SiteName}
          </div>
        </div>
        <div className="flex md:flex-col justify-between md:h-full md:w-max w-full">
          {groupedTabs.map((group, i) => {
            const tabs = group.filter((tab) => {
              if (
                (status == "loading" || !session?.user.refresh_token) &&
                restrictedSubCategory.includes(tab.subcategory)
              ) {
                return false;
              }

              if (
                (status == "loading" || !!session?.user.refresh_token) &&
                unauthenticatedCategory.includes(tab.subcategory)
              )
                return false;
              if (
                (session?.user?.brand?.length || 0) > 0 &&
                tab.subcategory == "hop"
              ) {
                return false;
              }
              return true;
            });
            if (tabs.length == 0) return null;
            return (
              <div
                className="flex md:flex-col justify-between gap-2"
                key={i + "tabGroup"}
              >
                {tabs.map((tab) => {
                  const isSelected = path === tab.route;

                  // if the user is not logged in then they wont be able to access this
                  if (
                    (status == "loading" || !session?.user.refresh_token) &&
                    restrictedSubCategory.includes(tab.subcategory)
                  ) {
                    return null;
                  }
                  if (
                    (session?.user?.brand?.length || 0) > 0 &&
                    tab.subcategory == "hop"
                  ) {
                    return null;
                  }

                  if (
                    (status == "loading" || !!session?.user.refresh_token) &&
                    unauthenticatedCategory.includes(tab.subcategory)
                  )
                    return null;

                  return (
                    <Link href={tab.route} key={tab.key}>
                      <div
                        className={`flex flex-col items-center justify-center gap-2 w-full group/tab md:p-4 rounded-xl cursor-pointer h-full hover:!bg-[var(--card-bg-hover-color)] hover:!shadow-md`}
                      >
                        {tab.icon(isSelected)}
                        <span
                          className={`text-[var(--text-secondary-low-color)] group-hover/sidebar:text-[var(--text-secondary-color)] group-hover/tab:!text-[var(--text-primary-color)] duration-700 text-[10px] break-keep text-bold tracking-wider ${isSelected && "!text-[var(--text-primary-color)]"}`}
                        >
                          {tab.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <LuChevronsRight
        className={`text-4xl p-2 bg-[var(--background-color)] border-r-[1px]  text-[var(--text-secondary-color)] left-0 rounded-r-[50%] group-hover:translate-x-[-40px] duration-500 shadow-[2px_2px_8px_rgba(0,0,0,0.4)] cursor-pointer ${!canHide && "hidden"}`}
      />
    </MovableSidebar>
  );
};

export default Sidebar;
