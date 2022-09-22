import React from "react";
import FilmContent from "../../components/film-content/FilmContent";
import FilmDetails from "../../components/film-details/FilmDetails";

const FilmPage = ({ filmName }) => {
  return (
    <div style={{ padding: "1rem" }}>
      <FilmContent filmName={filmName} />
    </div>
  );
};

export const getServerSideProps = (context) => {
  const filmName = context.params.slug;

  return {
    props: {
      filmName,
    },
  };
};

export default FilmPage;
