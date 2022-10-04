import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Styles from "./Slider.module.css";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import classNames from "classnames";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/Link";

SwiperCore.use([Navigation]);

function Slider() {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = navigationPrevRef.current;
        swiper.params.navigation.nextEl = navigationNextRef.current;
      }}
      pagination={{ clickable: true }}
      className={Styles.headerSliderWrapper}
    >
      <SwiperSlide className={Styles.slider_cover}>
        <Image
          className={Styles.slide_img}
          src={"/assets/slider/slide6.jpg"}
          alt="Slider picture"
          layout="fill"
          objectFit="cover"
        />
        <div className={Styles.slider_actions_wrapper}>
          <h5 className={Styles.Slide_text}>House of The Dragon(2022)</h5>
          <p>The 7 episode have released </p>
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

      <SwiperSlide className={Styles.slider_cover}>
        <Image
          className={Styles.slide_img}
          src={"/assets/slider/slider8.jpg"}
          alt="Slider picture"
          layout="fill"
          objectFit="cover"
        />
        <div className={Styles.slider_actions_wrapper}>
          <h5 className={Styles.Slide_text}>Rings of Power(2022)</h5>
          <p>The 7 episode have released </p>
          <Link href="/films/[slug]" as="/films/film8">
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
          </Link>
        </div>
      </SwiperSlide>

      <div
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
      </div>
    </Swiper>
  );
}

export default Slider;
