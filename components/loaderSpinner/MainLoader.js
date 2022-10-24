import React from "react";
import { Triangle } from "react-loader-spinner";
import Styles from "./loaderSpinner.module.css";

function MainLoader() {
  return (
    <div className={Styles.main_wrapper}>
      <Triangle color={"#818cf8"} />
    </div>
  );
}

export default MainLoader;
