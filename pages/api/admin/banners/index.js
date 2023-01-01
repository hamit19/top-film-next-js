import { getBanners } from "../../../../server/controller/Banner";

export default async function handle(req, res) {
  const data = await getBanners(req.query);

  res.status(200).json(data);
}
