"use client";
import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import styles from "./carousel.module.css";
import { CarouselProps } from "./Carousel.types";
import { SECTION_TYPE } from "@/types/mapper.types"; // Import SECTION_TYPE for element identification
import { useSwipeable } from "react-swipeable";

const Indicator = styled.div<{ $bgColor: string; $opacity: string }>`
  background: ${(props) => props.$bgColor};
  opacity: ${(props) => props.$opacity};
`;

const CarouselLayout = styled.div<{ $textColor: string }>`
  color: ${(props) => props.$textColor};
`;

export const CarouselV1 = (props: CarouselProps): JSX.Element => {
  const [index, setIndex] = React.useState<number>(0);
  const [change, setChange] = React.useState<boolean>(false); // change -> animation trigger
  const [direction, setDirection] = React.useState<boolean>(true); // false -> left arrow clicked for animation
  const [images, setImages] = React.useState<Record<string, string>[]>(
    props.config.slideImages
  );

  useEffect(() => {
    setImages(props.config.slideImages);
  }, [props.config.slideImages]);

  const handleChange = (inc: number) => {
    setChange(true);
    setDirection(inc >= 0);
    let intervalId: any;

    if (!change) {
      intervalId = setInterval(() => {
        setChange(false);
        setIndex((prevIndex) =>
          prevIndex + inc < 0
            ? images.length - 1
            : (prevIndex + inc) % images.length
        );
        clearInterval(intervalId);
      }, 200);
    }
  };

  React.useEffect(() => {
    if (props.config.autoplay) {
      const intervalId = setInterval(() => {
        handleChange(1);
      }, props.config.autoplaySpeed || 3000);

      // Clean up the interval when the component unmounts or when count reaches a certain value
      return () => clearInterval(intervalId);
    }
  }, [props.config.autoplay, props.config.autoplaySpeed, props.config.slideImages]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleChange(1),
    onSwipedRight: () => handleChange(-1),
    trackMouse: true,
  });

  return (
    <CarouselLayout
      className="flex w-full flex-col items-center gap-4 md:pt-12 md:pb-4 pt-4 pb-2"
      $textColor={props.config.sliderBtnColor}
      onClick={(e) => {
        if (props.isSelectMode && props.setSelectedElement) {
          e.stopPropagation();
          props.setSelectedElement({
            type: SECTION_TYPE.CAROUSEL,
            subType: props.subType,
          });
        }
      }}
      {...swipeHandlers}
    >
      <div className="w-full min-h-[40vh] md:h-[70vh] h-[40vh] flex justify-between items-center md:gap-2 gap-0">
        <div
          className="md:ml-2 flex items-center justify-center rounded-[100%] md:p-2 p-0 duration-[0.3s] cursor-pointer transition-all"
          onClick={() => handleChange(-1)}
        >
          <IoIosArrowForward className="md:text-3xl text-md rotate-180" />
        </div>

        <a
          className={`w-full h-full rounded-lg !bg-no-repeat !bg-cover !bg-center cursor-pointer ${
            change ? styles.change : styles.constant
          } ${direction ? styles.move_left : styles.move_right}`}
          style={{
            background: `url('${images[index].src}')`,
          }}
          href={
            props.isSelectMode
              ? undefined
              : images[index].redirection
          }
          onClick={(e) => {
            if (props.isSelectMode) {
              e.preventDefault();
            }
          }}
          target="_blank"
        />

        <div
          className="flex md:mr-2 items-center justify-center rounded-[100%] md:p-2 p-0 duration-[0.3s] cursor-pointer transition-all"
          onClick={() => handleChange(1)}
        >
          <IoIosArrowForward className="md:text-3xl text-md" />
        </div>
      </div>
      <div className="flex gap-4 md:mb-4 mb-2">
        {images.map((_, i) => (
          <Indicator
            key={`imageButton${i}`}
            className={`cursor-pointer w-[8px] h-[8px] rounded-[100%] transition-all duration-300`}
            $bgColor={props.config.sliderBtnColor}
            $opacity={i === index ? "1.0" : "0.3"}
            onClick={() => handleChange(i - index)}
          />
        ))}
      </div>
    </CarouselLayout>
  );
};
