import Button from "react-bootstrap/Button";
import React from "react";
import Styles from "./PlanBox.module.css";

function PlanBox({
  title,
  price,
  time,
  subTitle,
  download,
  tvChannel,
  recommended,
}) {
  return (
    <div className={Styles.plan_box}>
      {recommended && (
        <div className={Styles.recommended_box}>
          <span>Recommended</span>
        </div>
      )}
      <div className={Styles.header_box}>
        <h4>{title}</h4>
        <h6>{subTitle}</h6>

        <h5>
          <span>{price}</span> <span className={Styles.time_span}>/{time}</span>
        </h5>
      </div>
      <ul className={Styles.plan_box_list}>
        <li>Unlimited Movies</li>
        <li>No Ads</li>
        <li>{download} Downloading Movies</li>
        <li>{tvChannel} TV Channel</li>
      </ul>
      <Button variant="outline-primary">Choose Plan</Button>
    </div>
  );
}

export default PlanBox;
