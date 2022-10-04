import React from "react";
import FilmContent from "../../components/film/film-content/FilmContent";
import FilmDetails from "../../components/film/film-details/FilmDetails";
import FilmComment from "../../components/film/filmComment/FilmComment";

const FilmPage = ({ filmName }) => {
  return (
    <div style={{ padding: "1rem 0" }}>
      <FilmContent filmName={filmName} />
      <FilmDetails />
      <FilmComment />
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
