"use client";
import { SECTION_TYPE } from "@/types/mapper.types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavbarProps } from "./Navbar.types";

const NavMain = styled.div<{ $bgColor: string; $headerFontColor: string }>`
  background: ${(props) => props.$bgColor};
  color: ${(props) => props.$headerFontColor};
  border: ${(props) => `1px solid ${props.$bgColor}`}
`;

const NavBarLink = styled.a<{ $linkFontColor: string }>`
  color: ${(props) => props.$linkFontColor};
`;

export const NavbarV3 = (props: NavbarProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      {/* <Head>
        {props.metaTags?.map((tag, index) => (
          <meta key={index} name={tag.property} content={tag.content} />
        ))}
        {props.ogTags?.map((tag, index) => (
          <meta key={index} property={tag.property} content={tag.content} />
        ))}
      </Head> */}
      <div
        className={`w-full h-max top-10 z-10 ${
          props.isSticky && "fixed"
        } flex justify-center items-center`}
      >
        <NavMain
          $bgColor={props.background}
          $headerFontColor={props.headerFontColor}
          className={`md:w-3/4 w-[95%] shadow-[0px_0px_2px_rgba(36,36,36,0.5)] md:px-8 md:py-4 px-2 py-2 rounded-xl backdrop-blur-lg flex justify-between items-center border-[1px]  ${
            props.isSelectMode && "hover:border-[var(--card-border-hover-color)] duration-200"
          } ${props.isSelectMode && "cursor-pointer"} ${
            props.selected && "!border-[var(--text-secondary-color)]"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (props.isSelectMode && props.setSelectedElement) {
              props.setSelectedElement({
                type: SECTION_TYPE.NAV_BAR,
                subType: props.type,
              });
            }
          }}
        >
          <div className="flex gap-4 items-center">
            {props.logoVisibility && (
              <img
                src={props.logo}
                alt=""
                width={props.logoSize}
                className="self-center"
              />
            )}
            {props.headerVisibility && (
              <span className="md:text-xl text-xl font-bold opacity-[1]">
                {props.brandName}
              </span>
            )}
          </div>
          {!isMobile && (
            <div className="flex gap-4">
              {props.links?.map((header, index) => (
                <NavBarLink
                  $linkFontColor={props.linkFontColor}
                  key={index}
                  href={header.redirection}
                  className="md:text-lg text-sm opacity-60 hover:opacity-100 decoration-none no-underline"
                >
                  {header.link}
                </NavBarLink>
              ))}
            </div>
          )}
        </NavMain>
      </div>
    </>
  );
};
