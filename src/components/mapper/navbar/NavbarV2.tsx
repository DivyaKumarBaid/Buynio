"use client";
import { useEffect, useState } from "react";
import { IoReorderThree } from "react-icons/io5";
import styles from "./navbar.module.css";
import styled from "styled-components";
import { NavbarProps } from "./Navbar.types";

const NavMain = styled.div<{ $bgColor: string; $headerFontColor: string }>`
  background: ${(props) => props.$bgColor};
  color: ${(props) => props.$headerFontColor};
`;
const NavBarLink = styled.a<{ $linkFontColor: string }>`
  color: ${(props) => props.$linkFontColor};
`;

export const NavbarV2 = (props: NavbarProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [_, setSideBar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const middleIndex = Math.ceil(props?.links.length / 2);
  const firstHalf = props?.links.slice(0, middleIndex);
  const secondHalf = props?.links.slice(middleIndex);

  return (
    <>
      <NavMain
        $bgColor={props.background}
        $headerFontColor={props.headerFontColor}
        className={`w-full top-0 z-10 ${
          props.isSticky && "fixed"
        } md:px-8 md:py-4 px-4 py-2 flex justify-between items-center`}
      >
        {!isMobile && (
          <div className="flex gap-6">
            {secondHalf.map((header) => {
              return (
                <div
                  key={header.link} // Added key prop for React
                  className={`flex flex-col gap-1 items-center mt-1 ${styles.navLinks}`}
                >
                  <NavBarLink
                    $linkFontColor={props.linkFontColor}
                    href={header.redirection}
                    className="text-lg opacity-60 hover:opacity-100 decoration-none no-underline"
                  >
                    {header.link}
                  </NavBarLink>
                  <div
                    className={`w-3/4 h-[2px] bg-secondary rounded-lg opacity-0 ${styles.navLinksBottomBorder}`}
                  ></div>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex gap-4 items-center">
          <img src={props.logo} alt="" width={25} className="self-center" />
          <span className="md:text-2xl text-xl font-bold opacity-[0.6]">
            {props.brandName}
          </span>
        </div>
        {isMobile ? (
          <IoReorderThree
            className="text-2xl"
            onClick={() => setSideBar(true)}
          />
        ) : (
          <div className="flex gap-6">
            {firstHalf.map((header) => {
              return (
                <div
                  key={header.link} // Added key prop for React
                  className={`flex flex-col gap-1 items-center mt-1 ${styles.navLinks}`}
                >
                  <NavBarLink
                    $linkFontColor={props.linkFontColor}
                    href={header.redirection}
                    className="text-lg opacity-60 hover:opacity-100 decoration-none no-underline"
                  >
                    {header.link}
                  </NavBarLink>
                  <div
                    className={`w-3/4 h-[2px] bg-secondary rounded-lg opacity-0 ${styles.navLinksBottomBorder}`}
                  ></div>
                </div>
              );
            })}
          </div>
        )}
      </NavMain>
    </>
  );
};
