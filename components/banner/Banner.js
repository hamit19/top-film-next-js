import Image from "next/image";
import React from "react";
import Button from "react-bootstrap/Button";
import Styles from "./Banner.module.css";

function Banner({ title, content, id, image }) {
  return (
    <div className={Styles.banner_wrapper}>
      <Image
        src={image}
        objectFit="cover"
        alt=" Banners Image "
        layout="fill"
        className={Styles.banners_image}
      />
      <div className={Styles.banners_content_wrapper}>
        <h5>{title}</h5>
        <p>{content}</p>

        <Button variant="primary">Watch Now</Button>
      </div>
    </div>
  );
}

export default Banner;
