"use client";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./carousel.module.css";
import styled from "styled-components";
import { CarouselProps } from "./Carousel.types";

const Indicator = styled.div<{ $bgColor: string; $opacity: string }>`
  background: ${(props) => props.$bgColor};
  opacity: ${(props) => props.$opacity};
`;

const CarouselLayout = styled.div<{ $textColor: string }>`
  color: ${(props) => props.$textColor};
`;

export const CarouselV2 = (props: CarouselProps): JSX.Element => {
  const [index, setIndex] = React.useState<number>(0);
  const [change, setChange] = React.useState<boolean>(false); // change -> animation trigger
  const [direction, setDirection] = React.useState<boolean>(false); // false -> left arrow clicked for animation

  const handleChange = (inc: number) => {
    setChange(true);
    if (inc < 0) {
      setDirection(false);
    } else {
      setDirection(true);
    }

    let intervalId: any;

    if (!change) {
      intervalId = setInterval(() => {
        setChange(false);
        setIndex((prevIndex) =>
          prevIndex + inc < 0
            ? props.images.length - 1
            : (prevIndex + inc) % props.images.length
        );
        clearInterval(intervalId);
      }, 200);
    }
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      handleChange(1);
    }, props.interval);

    // Clean up the interval when the component unmounts or when count reaches a certain value
    return () => clearInterval(intervalId);
  }, []);

  return (
    <CarouselLayout className="flex w-full flex-col items-center gap-4 md:pt-12 md:pb-8 pt-4 pb-2" $textColor={props.sliderBtnColor}>
      <div className="w-full min-h-[40vh] md:h-[70vh] h-[40vh] flex justify-between items-center md:gap-2 gap-0 relative">
        <div
          className={`w-full h-full rounded-lg !bg-no-repeat !bg-cover !bg-center ${
            change ? styles.change : styles.constant
          } ${
            direction ? styles.move_left : styles.move_right
          } flex items-center justify-between`}
          style={{ background: `url('${props.images[index].src}')` }}
        />
        <div className="w-full h-full absolute flex justify-between items-center">
          <div
            className="h-full flex items-center justify-center hover:bg-[rgba(36,36,36,0.1)] hover:backdrop-blur-md rounded-l-lg duration-[0.3s] p-4 cursor-pointer transition-all"
            onClick={() => handleChange(-1)}
          >
            <IoIosArrowForward className="md:text-4xl text-md rotate-180" />
          </div>
          <div
            className="flex h-full items-center justify-center hover:bg-[rgba(36,36,36,0.1)] hover:backdrop-blur-md rounded-r-lg duration-[0.3s] p-4 cursor-pointer transition-all"
            onClick={() => handleChange(1)}
          >
            <IoIosArrowForward className="md:text-4xl text-md" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-2 mb-4">
        {props.images.map((_, i) => (
          <Indicator
            key={`imageButton${i}`}
            className={`cursor-pointer w-[8px] h-[8px] rounded-[100%] transition-all duration-300`}
            onClick={() => handleChange(i - index)}
            $bgColor={props.sliderBtnColor}
            $opacity={i == index ? "1.0" : "0.3"}
          />
        ))}
      </div>
    </CarouselLayout>
  );
};
