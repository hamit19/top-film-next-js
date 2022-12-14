import Image from "next/image";
import Link from "next/Link";
import React from "react";
import Styles from "./SlideCard.module.css";

function SlideCard({ data }) {
  const { name, content, _id, poster, release_date } = data;

  return (
    <Link href={"/films/[slug]"} as={`/films/${_id}`}>
      <div className={Styles.film_card_grid}>
        <div className={Styles.responsive_wrapper}>
          <Image
            src="/assets/films/film7.jpg"
            alt="film1"
            width={400}
            height={500}
            style={{ borderRadius: "1rem", margin: "0" }}
            objectFit={"cover"}
            className={Styles.film_image}
          />
        </div>
      </div>
    </Link>
  );
}

export default SlideCard;
