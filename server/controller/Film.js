const Film = require("../model/Film");
const { deleteMedia } = require("./Media");

const createFilm = async ({
  IMDBLink,
  ageClassification,
  condition,
  content,
  director,
  film,
  genre,
  name,
  poster,
  productionOf,
  quality,
  releaseDate,
  time,
  writer,
  IMDBScore,
  actors,
}) => {
  const TheFilm = await {
    name,
    imdb_link: IMDBLink,
    imdb_score: IMDBScore,
    age: ageClassification,
    condition,
    content,
    director,
    writer,
    video: film,
    genre,
    poster,
    product_of: productionOf,
    best_quality: quality,
    release_date: releaseDate,
    time,
    actors,
  };

  const createdFilm = await Film.create({ ...TheFilm });

  return createdFilm;
};

const getFilmsCount = async () => {
  const count = await Film.countDocuments();

  return { count };
};

const getFilms = async (params) => {
  const page = parseInt(params.page);

  const pageSize = parseInt(params.pageSize);

  const count = await getFilmsCount();

  const films = await Film.find({})
    .limit(pageSize)
    .skip(page === 1 ? 0 : (page - 1) * pageSize);

  return { data: films, count };
};

const updateFilm = async (params) => {
  const {
    film_id,
    name,
    condition,
    content,
    imdb_score,
    imdb_link,
    poster,
    video,
  } = await params;

  const newPoster = await poster;
  const newVideo = await video;

  if (film_id) {
    const foundedFilm = await Film.findById(film_id);

    if (newVideo && !newPoster) {
      const oldVideo = await foundedFilm.video;

      const deletedVideoStatus = await deleteMedia(oldVideo);

      if (deletedVideoStatus.status === 200) {
        const updatedFilm = await Film.findByIdAndUpdate(
          film_id,
          {
            video: newVideo,
            name,
            condition,
            content,
            imdb_score,
            imdb_link,
          },
          { new: true }
        );
        return updatedFilm;
      }
    }

    if (newPoster && !newVideo) {
      const oldPoster = await foundedFilm.poster;

      const deletedPoster = await deleteMedia(oldPoster);

      if (deletedPoster.status === 200) {
        const updatedFilm = await Film.findByIdAndUpdate(film_id, {
          poster: newPoster,
          name,
          condition,
          content,
          imdb_score,
          imdb_link,
        });

        return updatedFilm;
      }
    }

    if (newPoster && newVideo) {
      const oldVideo = await foundedFilm.video;
      const oldPoster = await foundedFilm.poster;

      const deletedPoster = await deleteMedia(oldPoster);
      const deletedVideo = await deleteMedia(oldVideo);

      if (deletedPoster.status === 200 && deletedVideo.status === 200) {
        const updatedFilm = await Film.findByIdAndUpdate(
          film_id,
          {
            video: newVideo,
            poster: newPoster,
            name,
            condition,
            content,
            imdb_score,
            imdb_link,
          },
          { new: true }
        );

        return updatedFilm;
      }
    }

    if (!poster && !video) {
      const updatedFilm = await Film.findByIdAndUpdate(
        film_id,
        {
          name,
          condition,
          content,
          imdb_score,
          imdb_link,
        },
        { new: true }
      );

      return updatedFilm;
    }
  }

  if (!film_id) {
    return { status: 404, message: "The film Id is required!" };
  }
};

module.exports = {
  createFilm,
  getFilms,
  updateFilm,
};
