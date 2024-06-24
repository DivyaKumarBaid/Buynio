"use client";
import { hideSidebarPaths, hideSidebarPathsWithParam } from "@/lib/constants";
import { dela, shadow } from "@/lib/Fonts";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { IoIosContact, IoIosFlash, IoLogoDesignernews } from "react-icons/io";
import { LuChevronsRight } from "react-icons/lu";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { RiLoginBoxLine } from "react-icons/ri";
import { SiAzuredataexplorer } from "react-icons/si";
import { TbLayoutGridAdd } from "react-icons/tb";
import styled from "styled-components";

const subCategories = ["general", "hop", "user", "unauthorized"];

const navigations = [
  {
    icon: (isSelected: boolean) => (
      <HiHome
        className={`md:text-[26px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Home",
    key: "home",
    route: "/home/",
    subcategory: "general",
    visible: true,
  },
  {
    icon: (isSelected: boolean) => (
      <TbLayoutGridAdd
        className={`md:text-[26px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Brew",
    key: "brew",
    route: "/home/hop/create",
    subcategory: "hop",
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
    visible: true,
  },
  {
    icon: (isSelected: boolean) => (
      <IoIosFlash
        className={`md:text-[26px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
      />
    ),
    name: "Trending",
    key: "trending",
    route: "/home/trending",
    subcategory: "general",
    visible: true,
  },
  {
    icon: (isSelected: boolean) => (
      <IoLogoDesignernews
        className={`md:text-[26px] text-[var(--text-secondary-low-color)] group-hover/tab:!text-[var(--text-primary-color)] ${isSelected && "!text-[var(--text-primary-color)]"}`}
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

const MovableSidebar = styled.div<{$ismovable: string }>`
  transform: ${(props) => (props.$ismovable === "true" ? "translateX(-10vw)" : "")};
`;

const restrictedSubCategory = ["user", "hop"];
const unauthenticatedCategory = ["unauthorized"];

const groupedTabs = subCategories.map((category) =>
  navigations.filter((sidebarTab) => sidebarTab.subcategory === category)
);

const Sidebar = ({ canHide }: { canHide: boolean }) => {
  const path = usePathname();
  const { data: session, status } = useSession();
  if (hideSidebarPaths.includes(path) || hideSidebarPathsWithParam.find(pathWithParam => path.startsWith(pathWithParam))) return null;

  return (
    <div className="fixed top-0 left-0 w-max flex group justify-center items-center z-[101]">
      <MovableSidebar
        $ismovable={canHide.toString()}
        className={`${shadow.className} top-0 left-0 w-max md:min-w-[100px] min-w-full md:h-[100vh] h-max bg-[var(--background-color)] flex md:flex-col flex-row md:py-6 p-2 items-center justify-start shadow-[3px_3px_16px_rgba(0,0,0,0.3)] border-r-[1px] border-r-[var(--card-border-color)] group/sidebar z-[10] duration-500 md:w-[5vw] group-hover:translate-x-0`}
      >
        <div
          className={`${dela.className} md:visible md:flex hidden flex-col items-center justify-center gap-4 md:mb-12 w-full`}
        >
          <Image
            src="/light_logo.png"
            alt={""}
            width={40}
            height={35}
            className="opacity-[0.6] group-hover/sidebar:opacity-100 duration-500"
          />
          <div className="opacity-50 group-hover/sidebar:opacity-100 duration-700 text-xs break-keep text-bold tracking-wider">
            Headhop
          </div>
        </div>
        <div className="flex md:flex-col justify-between md:h-full md:w-max w-full">
          {groupedTabs.map((group, i) => {
            return (
              <div
                className="flex md:flex-col justify-between gap-2"
                key={i + "tabGroup"}
              >
                {group.map((tab) => {
                  const isSelected = path === tab.route;

                  // if the user is not logged in then they wont be able to access this
                  if (
                    (status == "loading" || !session?.user.refresh_token) &&
                    restrictedSubCategory.includes(tab.subcategory)
                  )
                    return null;

                  if (
                    (status == "loading" || !!session?.user.refresh_token) &&
                    unauthenticatedCategory.includes(tab.subcategory)
                  )
                    return null;

                  return (
                    <Link href={tab.route} key={tab.key}>
                      <div
                        className={`flex flex-col items-center justify-center gap-2 w-full group/tab md:p-4 cursor-pointer h-full`}
                      >
                        {tab.icon(isSelected)}
                        <span
                          className={`text-[var(--text-secondary-low-color)] group-hover/sidebar:text-[var(--text-secondary-color)] group-hover/tab:!text-[var(--text-primary-color)] duration-700 md:text-md text-xs break-keep text-bold tracking-wider ${isSelected && "!text-[var(--text-primary-color)]"}`}
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
      </MovableSidebar>
      <LuChevronsRight className="bg-[var(--background-color)] text-4xl p-2  text-[var(--text-secondary-color)] absolute left-0 rounded-r-[50%] group-hover:translate-x-[-40px] duration-500 shadow-[2px_2px_8px_rgba(0,0,0,0.4)] cursor-pointer" />
    </div>
  );
};

export default Sidebar;
