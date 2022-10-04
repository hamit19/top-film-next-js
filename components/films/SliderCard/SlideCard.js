import Image from "next/image";
import Link from "next/Link";
import React from "react";
import Styles from "./SlideCard.module.css";

function SlideCard() {
  return (
    <Link href={"/films/[slug]"} as={"/films/film1"}>
      <div className={Styles.film_card_grid}>
        <div className={Styles.responsive_wrapper}>
          <div className={Styles.main_content}>
            <div className={Styles.img_car_wrapper}>
              <Image
                src="/assets/films/film7.jpg"
                alt="film1"
                width="300"
                height="400"
                style={{ borderRadius: ".5rem" }}
                className={Styles.film_image}
              />
            </div>
            <div className={Styles.card_description}>
              <div className={Styles.card_title}>
                <h5>
                  House of the Dragon{" "}
                  <span className={Styles.span_purple}> (2022)</span>{" "}
                </h5>
              </div>

              <button className={Styles.download_btn}>Download</button>
            </div>
          </div>
          <div className={Styles.footer_card}>
            <div className={Styles.card_film_description}>
              <p>
                <span className={Styles.span_purple}>Synopsis:</span> the series
                tells the story of the Targaryen family and takes place 200
                years before the events of the Game of Thrones series...
              </p>
            </div>
          </div>
        </div>
        <div className={Styles.sidebar_card}>
          <div className={Styles.circle_wrapper}>
            <div className={Styles.circle}>
              <span>281</span>
            </div>
            <span className={Styles.circle_span}>Comments</span>
          </div>
          <div className={Styles.circle_wrapper}>
            <div className={Styles.circle}>
              <span>4.75</span>
            </div>
            <span className={Styles.circle_span}> Stars in IMDB</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SlideCard;
