import { deleteFilm } from "../../../../server/controller/Film";

export default async function handle(req, res) {
  const { id } = req.query;

  const data = await deleteFilm(id);

  if (data.status === 200) return res.status(200).json(data);

  if (data.status === 404) return res.status(404).json(data);

  if (data.status === 500) return res.status(500).json(data);
}
