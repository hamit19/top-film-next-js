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
    const foundFilm = await Film.findById(film_id);

    if (newVideo && !newPoster) {
      const oldVideo = await foundFilm.video;

      const deletedVideo = await deleteMedia(oldVideo);

      if (deletedVideo.status === 404) {
        return {
          status: 404,
          message: "The media that assigned the film have not been found!",
        };
      }

      if (deletedVideo.status === 500) {
        return {
          status: 500,
          message: "Something went wrong during the deletion of the media!",
        };
      }

      if (deletedVideo.status === 200) {
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
      const oldPoster = await foundFilm.poster;

      const deletedPoster = await deleteMedia(oldPoster);

      if (deletedPoster.status === 404) {
        return {
          status: 404,
          message: "The media that assigned the film have not been found!",
        };
      }

      if (deletedPoster.status === 500) {
        return {
          status: 500,
          message: "Something went wrong during the deletion of the media!",
        };
      }

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
      const oldVideo = await foundFilm.video;
      const oldPoster = await foundFilm.poster;

      const deletedPoster = await deleteMedia(oldPoster);
      const deletedVideo = await deleteMedia(oldVideo);

      if (deletedPoster.status === 404 || deletedVideo.status === 404) {
        return {
          status: 404,
          message: "The media that assigned the film have not been found!",
        };
      }

      if (deletedPoster.status === 500 || deletedVideo.status === 500) {
        return {
          status: 500,
          message: "Something went wrong during the deletion of the media!",
        };
      }

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

const deleteFilm = async (id) => {
  if (!id) return { status: 404, message: " Films id required! " };

  const foundFilm = await Film.findById(id);

  const deletedPoster = await deleteMedia(foundFilm.poster);
  const deletedVideo = await deleteMedia(foundFilm.video);

  if (deletedPoster.status === 200 && deletedVideo.status === 200) {
    const deletedFilm = await Film.findByIdAndDelete(id);

    const updatedFilmList = await Film.find({});
    const filmsCount = await getFilmsCount();

    return { data: updatedFilmList, filmsCount, deletedFilm, status: 200 };
  }

  if (deletedPoster.status === 404 || deletedVideo.status === 404) {
    return {
      status: 404,
      message: "The media that assigned the film have not been found!",
    };
  }

  if (deletedPoster.status === 500 || deletedVideo.status === 500) {
    return {
      status: 500,
      message: "Something went wrong during the deletion of the media!",
    };
  }
};

const getFilmsSliders = async () => {
  const mostPopularFilms = await Film.find({}).sort("-score").limit(10);

  const latestFilms = await Film.find({}).sort("-release_date").limit(10);

  const mostOldFilms = await Film.find({}).sort("release_date").limit(10);

  return {
    popular: mostPopularFilms,
    latest: latestFilms,
    oldest: mostOldFilms,
  };
};

const searchFilms = async ({ text }) => {
  const result = await Film.aggregate([
    { "$match": { "name": { "$regex": text, "$options": "i" } } },
    { "$project": { "name": 1, "_id": 1 } },
  ]).limit(15);

  return result;
};

module.exports = {
  createFilm,
  getFilms,
  updateFilm,
  deleteFilm,
  getFilmsSliders,
  searchFilms,
};
