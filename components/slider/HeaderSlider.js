import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import Styles from "./Slider.module.css";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import classNames from "classnames";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/Link";
import { useState } from "react";

const slidersInfo = [
  {
    id: 1,
    slideImage: "/assets/slider/slide6.jpg",
    name: "House of The Dragon",
    releaseDate: "2022",
    content: "The 7 episode have released",
    media: {
      media1: "/assets/videos/film.mp4",
      media2: "/assets/videos/The-Rings-of-power.mp4",
      media3: "/assets/videos/film.mp4",
      media4: "/assets/videos/The-Rings-of-power.mp4",
    },
  },
  {
    id: 2,
    slideImage: "/assets/slider/slider8.jpg",
    name: "Rings of Power",
    releaseDate: "2022",
    content: "The 7 episode have released",
    media: {
      media1: "/assets/videos/film.mp4",
      media2: "/assets/videos/The-Rings-of-power.mp4",
      media3: "/assets/videos/film.mp4",
      media4: "/assets/videos/The-Rings-of-power.mp4",
    },
  },
  {
    id: 3,
    slideImage: "/assets/slider/slide1.jpg",
    name: "Rings of Power 2",
    releaseDate: "2020",
    content: "The 7 episode have released",
    media: {
      media1: "/assets/videos/film.mp4",
      media2: "/assets/videos/The-Rings-of-power.mp4",
      media3: "/assets/videos/film.mp4",
      media4: "/assets/videos/The-Rings-of-power.mp4",
    },
  },
  {
    id: 4,
    slideImage: "/assets/slider/slide2.jpg",
    name: "Rings of Power",
    releaseDate: "2021",
    content: "The 7 episode have released",
    media: {
      media1: "/assets/videos/film.mp4",
      media2: "/assets/videos/The-Rings-of-power.mp4",
      media3: "/assets/videos/film.mp4",
      media4: "/assets/videos/The-Rings-of-power.mp4",
    },
  },
];

function Slider({ autoPlay }) {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const renderSlides = () => {
    return slidersInfo.map((slide, i) => (
      <SwiperSlide className={Styles.slider_cover} key={i}>
        <Image
          className={Styles.slide_img}
          src={slide.slideImage}
          alt={slide.name}
          layout="fill"
          objectFit="cover"
        />
        <div className={Styles.slider_actions_wrapper}>
          <h5 className={Styles.Slide_text}>
            {slide.name}({slide.releaseDate})
          </h5>
          <p> {slide.content} </p>
          <Button
            style={{
              padding: ".5rem 1.3rem",
              backgroundColor: "#8b5cf6",
              borderColor: "#8b5cf6",
            }}
            variant="success"
          >
            Watch Now
          </Button>
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <div className={Styles.mainSlidersWrapper}>
      <Swiper
        lazy={true}
        loop={true}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        effect="fade"
        autoplay={{ ...autoPlay }}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className={Styles.headerSliderWrapper}
      >
        {renderSlides()}
        {/* <div
          ref={navigationPrevRef}
          className={classNames(Styles.slider_navigation, Styles.nav_prev)}
        >
          <IoIosArrowBack color={"#fff"} />
        </div>

        <div
          ref={navigationNextRef}
          className={classNames(Styles.slider_navigation, Styles.nav_next)}
        >
          <IoIosArrowForward color={"#fff"} />
        </div> */}
      </Swiper>
    </div>
  );
}

export default Slider;
