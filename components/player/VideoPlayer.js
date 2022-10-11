import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import Styles from "./VideoPlayer.module.css";
import { Dropdown, Menu, Slider } from "antd";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsSpeedometer2, BsFullscreen } from "react-icons/bs";
import { FiVolume2, FiVolume1, FiVolumeX } from "react-icons/fi";
import screenfull from "screenfull";

const menu = (setPlaybackRate, setIsShowing) => {
  const items = [
    {
      label: "2×",
      key: "0",
    },
    {
      label: "1.5×",
      key: "1",
    },
    {
      label: "1.25×",
      key: "2",
    },
    {
      label: "1×",
      key: "3",
    },
    {
      label: "0.5×",
      key: "4",
    },
  ];

  return (
    <Menu
      onClick={(props) => {
        setPlaybackRate(
          parseFloat(props.domEvent.target.innerText.split("×")[0])
        );
        setIsShowing(false);
      }}
      items={items}
    />
  );
};

const volumeSlider = (volume, setVolume) => {
  return (
    <Menu mode="horizontal">
      <Slider
        onChange={(volume) => setVolume(volume)}
        vertical
        value={volume}
        className={Styles.volume_slider}
      />
    </Menu>
  );
};

function VideoPlayer({ videoUrl, height, customClass }) {
  const [URL, setURL] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShowing, setIsShowing] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(50);

  const refVideoPlayer = useRef();
  const refScreenFull = useRef();

  const onClickHandle = () => {
    setIsPlaying((previousProp) => !previousProp);
  };

  useEffect(() => {
    !URL && setURL(videoUrl);
  }, []);

  return (
    <div>
      {URL ? (
        <div ref={refScreenFull}>
          <div
            className={Styles.video_player}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <ReactPlayer
              ref={refVideoPlayer}
              className={customClass}
              url={URL}
              width="100%"
              height={height}
              playing={isPlaying}
              onProgress={(props) => {
                setProgress(props.played * 100);
              }}
              playbackRate={playbackRate}
              volume={volume < 5 ? 0 : volume / 100}
            />
          </div>
          <div
            className={`${Styles.controller_wrapper} ${
              isShowing && Styles.show
            }`}
          >
            {!isPlaying ? (
              <FaPlay
                onClick={onClickHandle}
                className={Styles.controller}
                size={24}
              />
            ) : (
              <FaPause
                onClick={onClickHandle}
                className={Styles.controller}
                size={24}
              />
            )}
            <Slider
              onChange={(value) => {
                setProgress(value);
                refVideoPlayer.current.seekTo(value / 100);
              }}
              value={progress}
              className={Styles.progress_bar}
              tooltip={{
                formatter: null,
              }}
            />

            <Dropdown
              overlay={menu(setPlaybackRate, setIsShowing)}
              trigger={["click"]}
            >
              <BsSpeedometer2
                onClick={() => setIsShowing(true)}
                className={Styles.controller}
                size={24}
              />
            </Dropdown>
            <Dropdown
              trigger={["click"]}
              overlay={volumeSlider(volume, setVolume)}
              onClick={() => setIsShowing(true)}
            >
              {volume > 50 ? (
                <FiVolume2 className={Styles.controller} size={24} />
              ) : volume <= 50 && volume >= 5 ? (
                <FiVolume1 className={Styles.controller} size={24} />
              ) : (
                volume <= 5 && (
                  <FiVolumeX className={Styles.controller} size={24} />
                )
              )}
            </Dropdown>
            <BsFullscreen
              onClick={() => {
                screenfull.toggle(refScreenFull.current);
              }}
              className={Styles.controller}
              size={18}
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default VideoPlayer;
