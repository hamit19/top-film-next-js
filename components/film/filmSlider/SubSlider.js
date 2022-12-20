import Link from "next/Link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideCard from "../../films/SliderCard/SlideCard";
import Styles from "./Slider.module.css";
import { ArrowRightOutlined } from "@ant-design/icons";

import { Autoplay } from "swiper";

const SubSlider = ({ data, autoPlay }) => {
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    setScreenSize(window.innerWidth);

    const setScreenWith = (screenWith) => setScreenSize(screenWith);
    window.addEventListener("resize", () => setScreenWith(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () => setScreenWith());
    };
  }, []);

  const renderCardSliders = () => {
    return data.map((film) => (
      <>
        <SwiperSlide style={{ padding: ".5rem", width: "100%" }}>
          <SlideCard data={film} />
        </SwiperSlide>
      </>
    ));
  };

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ ...autoPlay }}
      className={Styles.sub_slider_wrapper}
      slidesPerView={
        screenSize <= 500
          ? 1
          : screenSize > 620 && screenSize <= 767
          ? 2
          : screenSize > 767 && screenSize <= 968
          ? 2
          : screenSize > 968 && screenSize <= 1200
          ? 3
          : screenSize > 1200 && 4
      }
      spaceBetween={2}
    >
      {renderCardSliders()}

      <SwiperSlide
        style={{
          padding: ".5rem",
          width: "200px",
          position: "relative",
          paddingTop: "363px",
        }}
      >
        <Link href={"/films/"} as={"/films/"}>
          <div className={Styles.show_more_wrapper}>
            <ArrowRightOutlined className={Styles.arrow_icon} />
            <h5>Click for show more</h5>
          </div>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default SubSlider;
