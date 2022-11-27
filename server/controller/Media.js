const Media = require("../model/Media");
const fs = require("fs");
const path = require("path");

const createMedia = async (req, res, next) => {
  const medias = req.files;

  try {
    const response = await medias.reduce(
      async (memo, { fieldName, originalname, mimetype, filename, size }) => {
        const beforeResults = await memo;

        const obj = {
          alt: originalname,
          size,
          name: filename,
          media: {
            data: fs.readFileSync(
              path.resolve(__dirname, `../../uploads/${filename}`)
            ),
            contentType: mimetype,
          },
        };
        const createdMedia = await Media.create(obj);

        fs.unlinkSync(path.resolve(__dirname, `../../uploads/${filename}`));

        return [...beforeResults, createdMedia];
      },
      []
    );

    res.status(200).json(response);
  } catch (err) {
    // next(err);
  }
};

const deleteMedia = async (id) => {
  try {
    const deletedMedia = await Media.findByIdAndDelete(id.toString());

    return { data: deletedMedia, status: 200, message: "Media have deleted!" };
  } catch (err) {
    if (!id) return { status: 404, message: "Media not found" };
    if (err) return { status: 500, message: err.message };
  }
};

module.exports = {
  createMedia,
  deleteMedia,
};
