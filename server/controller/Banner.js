const Banner = require("../model/Banner");
const { deleteMedia } = require("./Media");

const createBanner = async ({ film, banner, show }) => {
  const cratedBanner = await Banner.create({
    film,
    banner,
    show,
  });

  return cratedBanner;
};

const getBannersCount = async () => {
  const bannersCount = await Banner.countDocuments();

  return bannersCount;
};

const getBanners = async ({ page, pageSize }) => {
  const bannersCount = await getBannersCount();

  const pageInt = parseInt(page);

  const pageSizeInt = parseInt(pageSize);

  const banners = await Banner.find({})
    .limit(pageSizeInt)
    .skip(pageInt === 1 ? 0 : pageInt - 1 * pageSizeInt);

  return { banners, count: bannersCount };
};

const updateBanner = async ({ bannerId, banner, show, film }) => {
  const foundBanner = await Banner.findById(bannerId);

  let convertedBannerId = foundBanner.banner.toString();

  console.log(banner, "the new banner!");

  if (foundBanner) {
    if (banner && banner !== convertedBannerId) {
      const deletedMedia = await deleteMedia(foundBanner.banner);

      if (deletedMedia.status === 200) {
        const updatedBanner = await Banner.findByIdAndUpdate(
          bannerId,
          {
            banner,
            show,
            film,
          },
          { new: true }
        );

        const updatedBannerList = await getBanners({ page: 1, pageSize: 10 });

        return { status: 200, data: updatedBannerList, updatedBanner };
      }

      if (deletedMedia.status === 404)
        return { status: 404, message: "The banner Not found!" };

      if (deletedMedia.status === 500)
        return {
          status: 500,
          message:
            "Something went wrong while updating the image of banner! please try again ",
        };
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      foundBanner._id,
      {
        banner,
        show,
        film,
      },
      { new: true }
    );

    const updatedBannerList = await getBanners({ page: 1, pageSize: 10 });

    return { status: 200, data: updatedBannerList, updatedBanner };
  }

  return { status: 404, message: "The banner Not found!" };
};

const deleteBanner = async ({ id }) => {
  const foundBanner = await Banner.findById(id);

  if (foundBanner) {
    const deletedMedia = await deleteMedia(foundBanner.banner);

    if (deletedMedia.status === 200) {
      const deletedBanner = await Banner.findByIdAndDelete(foundBanner._id);

      const updatedBannerList = await getBanners({ page: 1, pageSize: 10 });

      return { status: 200, data: updatedBannerList, deletedBanner };
    }

    if (deletedMedia.status === 404)
      return { status: 404, message: "The banner not found!" };

    if (deletedMedia.status === 500)
      return {
        status: 500,
        message:
          "Something went wrong while deleting the banner! Please try again",
      };
  }

  return { status: 404, message: "Banner Not found!" };
};

module.exports = {
  createBanner,
  getBanners,
  getBannersCount,
  updateBanner,
  deleteBanner,
};
