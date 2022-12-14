import React from "react";
import Styles from "./Footer.module.css";

import { BsTelegram, BsInstagram, BsLinkedin } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";

function Footer() {
  return (
    <div className={Styles.footer_wrapper}>
      <div className={Styles.content_box}>
        <h5>About Me</h5>
        <p>
          Hello, My name is Hamid Hassani, I have implemented this practical
          project to improve my skill in developing Font-end with Next js and
          show my skill in my field. You can checkout my more practical projects
          on this website
          <a
            href="https://hamid-hassani-dev.netlify.app "
            rel="noreferrer"
            target="_blank"
          >
            (Hamid-Hassani-dev)
          </a>
        </p>
      </div>

      <div className={Styles.content_box}>
        <h5>Contact Me</h5>
        <div className={Styles.grid_icon}>
          <a
            href="https://www.linkedin.com/in/hamid-hassani-a431b0244/"
            rel="noreferrer"
            target="_blank"
          >
            <BsLinkedin />
          </a>
          <a
            href="https://www.instagram.com/hamid.programmer.js/"
            rel="noreferrer"
            target="_blank"
          >
            <BsInstagram />
          </a>
          <a href="https://t.me//hamit2002" rel="noreferrer" target="_blank">
            <BsTelegram />
          </a>
          <a
            href="mailto:hamidhassaniofficial@gmail.com"
            rel="noreferrer"
            target="_blank"
          >
            <MdOutlineAlternateEmail />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
