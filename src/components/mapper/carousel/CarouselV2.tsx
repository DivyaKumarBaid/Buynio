"use client"
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./carousel.module.css";
import { carouselData, picsData } from "./carouselData";

export const CarouselV2 = (): JSX.Element => {
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
            ? picsData.length - 1
            : (prevIndex + inc) % picsData.length
        );
        clearInterval(intervalId);
      }, 200);
    }
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      handleChange(1);
    }, carouselData.interval);

    // Clean up the interval when the component unmounts or when count reaches a certain value
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-4 md:p-[1rem] p-[1rem]">
      <div className="w-full min-h-[40vh] md:h-[60vh] h-[40vh] flex justify-between items-center md:gap-2 gap-0 relative">
        <div
          className={`w-full h-full rounded-lg !bg-no-repeat !bg-cover !bg-center ${
            change ? styles.change : styles.constant
          } ${
            direction ? styles.move_left : styles.move_right
          } flex items-center justify-between`}
          style={{ background: `url('${picsData[index].src}')` }}
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
      <div className="flex gap-4">
        {picsData.map((_, i) => (
          <div
            key={`imageButton${i}`}
            className={`cursor-pointer w-[8px] h-[8px] rounded-[100%] ${
              i == index ? "bg-secondary" : "bg-[rgba(36,36,36,0.1)]"
            } transition-all duration-300`}
            onClick={() => handleChange(i - index)}
          />
        ))}
      </div>
    </div>
  );
};
