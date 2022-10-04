import { Avatar } from "antd";
import React from "react";
import VideoPlayer from "../../../components/player/VideoPlayer";
import Styles from "./FilmDetails.module.css";

// import demoVideo from "/assets/videos/film.mp4";

function FilmDetails() {
  return (
    <>
      <div className={Styles.main_wrapper}>
        <div className={Styles.details_wrapper}>
          <div className={Styles.info_wrapper}>
            <p>Genre: this is a testing text </p>
          </div>
          <div className={Styles.info_wrapper}>
            <p>Ages: this is a testing text </p>
          </div>
          <div className={Styles.info_wrapper}>
            <p>Director: this is a testing text </p>
          </div>
          <div className={Styles.info_wrapper}>
            <p>Writer: this is a testing text </p>
          </div>
          <div className={Styles.info_wrapper}>
            <p>Production of: this is a testing text </p>
          </div>
          <div className={Styles.info_wrapper}>
            <p>Release date: this is a testing text </p>
          </div>
          <div className={Styles.info_wrapper}>
            <p>Time: this is a testing text </p>
          </div>
          <div className={Styles.info_wrapper}>
            <p>Condition: this is a testing text </p>
          </div>
        </div>
        <div className={Styles.synopsis_wrapper}>
          <p>
            <span className={Styles.synopsis_span}>Synopsis: </span>Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Saepe culpa error
            ipsum, provident ex odio inventore consectetur, rerum delectus
            repellendus labore alias repellat fugiat voluptate officiis iure,
            sit cum dolore...
          </p>
        </div>

        <div className={Styles.agents_details_container}>
          <div className={Styles.title_wrapper}>
            <h2 className={Styles.title}>Agents and actors</h2>
            <span></span>
          </div>
          <div className={Styles.agents_details_wrapper}>
            <div className={Styles.agents_info_wrapper}>
              <Avatar
                src={
                  "https://i0.wp.com/gaycarboys.com/wp-content/uploads/2020/06/Austin_L_Young_Top_Gay_Twink_Performer.jpg?w=300&ssl=1"
                }
              />
              <p>
                Actors name <span>his name in the film</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.trailer_section}>
        <div className={Styles.trailer_wrapper}>
          <div className={Styles.trailer_title}>
            <h5>Trailer</h5>
            <span></span>
          </div>
          <div className={Styles.trailer_player}>
            <VideoPlayer
              customClass={Styles.react_player}
              height={"100%"}
              videoUrl="/assets/videos/film.mp4"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FilmDetails;
