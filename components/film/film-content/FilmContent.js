import React from "react";
import { Card } from "react-bootstrap";
import FilmDetails from "../film-details/FilmDetails";
import Styles from "./FilmContent.module.css";

function FilmContent({ filmName }) {
  return (
    <div className={Styles.card_wrapper}>
      <Card className={Styles.card}>
        <Card.Img valiant="top" src="/assets/slider/slide1.jpg"></Card.Img>
        <div className={Styles.desc_wrapper}>
          <Card.Title className={Styles.card_title}>
            <h2>{filmName}</h2>
          </Card.Title>
          <Card.Subtitle className={Styles.sub_title}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
            error ut rem officiis cumque neque adipisci maxime eaque, debitis,
            fugit modi ab numquam dolorum, ipsam natus aliquam necessitatibus
            ex! Corrupti?
          </Card.Subtitle>
        </div>
        <FilmDetails />
      </Card>
    </div>
  );
}

export default FilmContent;
