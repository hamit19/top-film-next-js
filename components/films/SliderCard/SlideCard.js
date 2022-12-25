import Image from "next/image";
import Link from "next/Link";
import React from "react";
import Styles from "./SlideCard.module.css";

function SlideCard({ data }) {
  const { id, poster } = data;

  return (
    <Link href={"/films/[slug]"} as={`/films/${id}`}>
      <div className={Styles.film_card_grid}>
        <div className={Styles.responsive_wrapper}>
          <Image
            src={`data:${poster.media.contentType};base64, ${new Buffer.from(
              poster.media.data.data
            ).toString("base64")}`}
            alt={poster.alt}
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
