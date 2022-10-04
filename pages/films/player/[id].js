import React from "react";
import VideoPlayer from "../../../components/player/VideoPlayer";

function Player({ id }) {
  console.log(id);
  return (
    <div>
      <VideoPlayer />
    </div>
  );
}

export default Player;

export const getServerSideProps = (context) => {
  const id = context.params.id;

  return {
    props: {
      id,
      customize: true,
    },
  };
};
