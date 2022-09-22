import Link from "next/Link";
import React from "react";
import { Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";

const SubSlider = () => {
  return (
    <div>
      <Swiper slidesPerView={8} spaceBetween={10}>
        <SwiperSlide>
          <Link href={"/films/[slug]"} as={"/films/film1"}>
            <Card style={{ width: "10rem", cursor: "pointer" }}>
              <Card.Img src={"/assets/films/film1.jpg"} alt="image 1" />
            </Card>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/films/[slug]"} as={"/films/film2"}>
            <Card style={{ width: "10rem", cursor: "pointer" }}>
              <Card.Img src={"/assets/films/film2.jpg"} alt="image 1" />
            </Card>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/films/[slug]"} as={"/films/film3"}>
            <Card style={{ width: "10rem", cursor: "pointer" }}>
              <Card.Img src={"/assets/films/film3.jpg"} alt="image 1" />
            </Card>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/films/[slug]"} as={"/films/film4"}>
            <Card style={{ width: "10rem", cursor: "pointer" }}>
              <Card.Img src={"/assets/films/film4.jpg"} alt="image 1" />
            </Card>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/films/[slug]"} as={"/films/film5"}>
            <Card style={{ width: "10rem", cursor: "pointer" }}>
              <Card.Img src={"/assets/films/film5.jpg"} alt="image 1" />
            </Card>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/films/[slug]"} as={"/films/film6"}>
            <Card style={{ width: "10rem", cursor: "pointer" }}>
              <Card.Img src={"/assets/films/film1.jpg"} alt="image 1" />
            </Card>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/films/[slug]"} as={"/films/film7"}>
            <Card style={{ width: "10rem", cursor: "pointer" }}>
              <Card.Img src={"/assets/films/film6.jpg"} alt="image 1" />
            </Card>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/films/[slug]"} as={"/films/film8"}>
            <Card style={{ width: "10rem", cursor: "pointer" }}>
              <Card.Img src={"/assets/films/film5.jpg"} alt="image 1" />
            </Card>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/films/[slug]"} as={"/films/film9"}>
            <Card style={{ width: "10rem", cursor: "pointer" }}>
              <Card.Img src={"/assets/films/film1.jpg"} alt="image 1" />
            </Card>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/films/[slug]"} as={"/films/film10"}>
            <Card style={{ width: "10rem", cursor: "pointer" }}>
              <Card.Img src={"/assets/films/film1.jpg"} alt="image 1" />
            </Card>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/films/[slug]"} as={"/films/film11"}>
            <Card style={{ width: "10rem", cursor: "pointer" }}>
              <Card.Img src={"/assets/films/film5.jpg"} alt="image 1" />
            </Card>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SubSlider;
