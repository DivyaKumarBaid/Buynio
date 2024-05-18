"use client"
import { useState } from "react";
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


export const NavbarV1 = (props: NavbarProps) => {
  const [isMobile, _] = useState(false);

  return (
    <>
      <NavMain
        $bgColor={props.background}
        $headerFontColor={props.headerFontColor}
        className={`w-full top-0 z-10 ${
          props.isSticky && "fixed"
        } md:px-8 md:py-4 px-4 py-2 flex justify-between items-center`}
      >
        <div className="flex gap-4 items-center">
          <img
            src={props.logo}
            alt=""
            width={25}
            className="self-center"
          />
          <span className="text-xl font-bold opacity-[0.6]">
            {props.brandName}
          </span>
        </div>
        {!isMobile && (
          <div className="flex gap-4">
            {props.links.map((header) => {
              return (
                <div
                  className={`flex flex-col gap-1 items-center mt-1 ${styles.navLinks}`}
                  key={header.link} // Added key prop for React
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
