import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Styles from "./Slider.module.css";
import Image from "next/image";

function Slider() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      className={Styles.headerSliderWrapper}
    >
      <SwiperSlide>
        <Image
          className={Styles.slide_img}
          src={"/assets/slider/slide1.jpg"}
          width="100%"
          height="100%"
          alt="Slider picture"
          layout="fill"
        />
        <span className={Styles.Slide_text}>This is a text for test!</span>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className={Styles.slide_img}
          src={"/assets/slider/slide2.jpg"}
          width="100%"
          height="100%"
          alt="Slider picture"
          layout="fill"
        />
        <span className={Styles.Slide_text}>This is a text for test!</span>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className={Styles.slide_img}
          src={"/assets/slider/slide3.jpg"}
          width="100%"
          height="100%"
          alt="Slider picture"
          layout="fill"
        />
        <span className={Styles.Slide_text}>This is a text for test!</span>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className={Styles.slide_img}
          src={"/assets/slider/slide4.jpg"}
          width="100%"
          height="100%"
          alt="Slider picture"
          layout="fill"
        />
        <span className={Styles.Slide_text}>This is a text for test!</span>
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider;
