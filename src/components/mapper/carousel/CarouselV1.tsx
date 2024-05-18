"use client"
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./carousel.module.css";
import { CarouselProps } from "./Carousel.types";
import styled from "styled-components";

const Indicator = styled.div<{ $bgColor: string; $opacity: string}>`
  background: ${(props) => props.$bgColor};
  opacity: ${(props) => props.$opacity};
`;

const CarouselLayout = styled.div<{$textColor:string}>`
  color: ${(props) => props.$textColor};
`;

export const CarouselV1 = (props: CarouselProps): JSX.Element => {
  const [index, setIndex] = React.useState<number>(0);
  const [change, setChange] = React.useState<boolean>(false); // change -> animation trigger
  const [direction, setDirection] = React.useState<boolean>(true); // false -> left arrow clicked for animation

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
    <CarouselLayout className="flex w-full flex-col items-center gap-4 md:my-2 my-[1rem]" $textColor={props.sliderBtnColor}>
      <div className="w-full min-h-[40vh] md:h-[60vh] h-[40vh] flex justify-between items-center md:gap-2 gap-0">
        <div
          className="md:ml-2 flex items-center justify-center rounded-[100%] md:p-2 p-0 duration-[0.3s] cursor-pointer transition-all"
          onClick={() => handleChange(-1)}
        >
          <IoIosArrowForward className="md:text-3xl text-md rotate-180" />
        </div>

        <a
          className={`w-full h-full rounded-lg !bg-no-repeat !bg-cover !bg-center ${
            change ? styles.change : styles.constant
          } ${direction ? styles.move_left : styles.move_right}`}
          style={{ background: `url('${props.images[index].src}')` }}
          href={props.images[index].redirection}
          target="_blank"
        />

        <div
          className="flex md:mr-2 items-center justify-center rounded-[100%] md:p-2 p-0 duration-[0.3s] cursor-pointer transition-all"
          onClick={() => handleChange(1)}
        >
          <IoIosArrowForward className="md:text-3xl text-md"/>
        </div>
      </div>
      <div className="flex gap-4 md:mb-4 mb-2">
        {props.images.map((_, i) => (
          <Indicator
            key={`imageButton${i}`}
            className={`cursor-pointer w-[8px] h-[8px] rounded-[100%] ${
              i == index ? "bg-secondary" : "bg-[rgba(36,36,36,0.1)]"
            } transition-all duration-300`}
            $bgColor={props.sliderBtnColor}
            $opacity={i==index ? "1.0" : "0.3"}
            onClick={() => handleChange(i - index)}
          />
        ))}
      </div>
    </CarouselLayout>
  );
};
