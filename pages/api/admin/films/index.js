import { getFilms } from "../../../../server/controller/Film";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const data = await getFilms(req.query);
    res.status(200).json(data);
  }
}
