import Link from "next/Link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideCard from "../../films/SliderCard/SlideCard";
import Styles from "./Slider.module.css";

const SubSlider = () => {
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    setScreenSize(window.innerWidth);

    const setScreenWith = (screenWith) => setScreenSize(screenWith);
    window.addEventListener("resize", () => setScreenWith(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () => setScreenWith());
    };
  }, []);

  return (
    <div style={{ marginBottom: "10rem" }}>
      <Swiper
        className={Styles.sub_slider_wrapper}
        slidesPerView={
          screenSize <= 500
            ? 1
            : screenSize > 500 && screenSize <= 767
            ? 1
            : screenSize > 767 && screenSize <= 968
            ? 2
            : screenSize > 968 && screenSize <= 1200
            ? 3
            : screenSize > 1200 && 4
        }
        spaceBetween={2}
      >
        <SwiperSlide style={{ padding: ".5rem" }}>
          <SlideCard />
        </SwiperSlide>
        <SwiperSlide style={{ padding: ".5rem" }}>
          <SlideCard />
        </SwiperSlide>
        <SwiperSlide style={{ padding: ".5rem" }}>
          <SlideCard />
        </SwiperSlide>
        <SwiperSlide style={{ padding: ".5rem" }}>
          <SlideCard />
        </SwiperSlide>
        <SwiperSlide style={{ padding: ".5rem" }}>
          <SlideCard />
        </SwiperSlide>
        <SwiperSlide style={{ padding: ".5rem" }}>
          <SlideCard />
        </SwiperSlide>
        <SwiperSlide style={{ padding: ".5rem" }}>
          <SlideCard />
        </SwiperSlide>
        <SwiperSlide style={{ padding: ".5rem" }}>
          <SlideCard />
        </SwiperSlide>
        <SwiperSlide style={{ padding: ".5rem" }}>
          <SlideCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SubSlider;
