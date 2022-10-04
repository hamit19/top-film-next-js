import Image from "next/image";
import React from "react";
import { Card } from "react-bootstrap";
import FilmDetails from "../film-details/FilmDetails";
import Styles from "./FilmContent.module.css";
import { FaAward, FaDownload } from "react-icons/fa";

function FilmContent({ filmName }) {
  return (
    <div className={Styles.card_wrapper}>
      <h1 className={Styles.film_title}>House of the Dragon</h1>
      <div className={Styles.film_cover}>
        <div className={Styles.img_wrapper}>
          <span className={Styles.img_span}>WEB.DL 1080</span>
          <Image
            src="/assets/films/film7.jpg"
            alt="image of film"
            width="400px"
            height="600px"
            className={Styles.img_film}
          />
        </div>
        <div className={`${Styles.film_details} ${Styles.film_details_left}`}>
          <div className={Styles.film_detail}>
            <div className={`${Styles.circle} ${Styles.circle_imdb}`}>IMDB</div>
            <span>view in imdb</span>
          </div>
          <div className={Styles.film_detail}>
            <div className={Styles.circle}>
              <FaAward />
            </div>
            <span> Award list </span>
          </div>
          <div
            className={`${Styles.film_detail} ${Styles.film_details_download} `}
          >
            <div
              className={`${Styles.circle} ${Styles.circle_download_links} `}
            >
              <FaDownload />
            </div>
            <span>Download links</span>
          </div>
        </div>
        <div className={`${Styles.film_details} ${Styles.film_details_right}`}>
          <div className={Styles.film_detail}>
            <div className={`${Styles.circle} ${Styles.circle_score} `}>12</div>
            <span>Critics score</span>
          </div>
          <div className={Styles.film_detail}>
            <div className={Styles.circle}>6.7</div>
            <span>Score and rank</span>
          </div>
          <div className={Styles.film_detail}>
            <div className={Styles.circle}>12</div>
            <span>Critics score</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmContent;
