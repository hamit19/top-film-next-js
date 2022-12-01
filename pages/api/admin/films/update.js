import { updateFilm } from "../../../../server/controller/Film";

export default async function handle(req, res) {
  const data = await updateFilm(req.body.values);

  res.status(200).json(data);
}
