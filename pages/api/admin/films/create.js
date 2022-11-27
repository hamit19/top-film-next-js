import { createFilm } from "../../../../server/controller/Film";

export default async function handle(req, res) {
  const data = await createFilm(req.body);

  res.status(200).json(data.res);
}
