export type CarouselProps = {
    interval: number;
    images: {
        title: string,
        redirection: string,
        src: string
    }[];
    sliderBtnColor: string;
  };