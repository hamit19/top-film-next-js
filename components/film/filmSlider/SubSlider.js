import Link from "next/Link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideCard from "../../films/SliderCard/SlideCard";
import Styles from "./Slider.module.css";
import { ArrowRightOutlined } from "@ant-design/icons";

// import SwiperCore, { Autoplay } from "swiper";

const SubSlider = ({ data }) => {
  // SwiperCore.use([Autoplay]);

  const renderCardSliders = () => {
    return data.map((film) => (
      <SwiperSlide key={film.id} style={{ padding: ".5rem", width: "100%" }}>
        <SlideCard data={film} />
      </SwiperSlide>
    ));
  };

  return (
    <Swiper
      lazy={true}
      // modules={[Autoplay]}
      // autoplay={{ delay: 4000 }}
      className={Styles.sub_slider_wrapper}
      spaceBetween={2}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 2,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 2,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 2,
        },
        1228: {
          slidesPerView: 4,
          spaceBetween: 2,
        },
      }}
    >
      {renderCardSliders()}

      <SwiperSlide
        style={{
          padding: ".5rem",
          width: "200px",
          position: "relative",
          paddingTop: "363px",
        }}
        key={"redirect_slide"}
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
