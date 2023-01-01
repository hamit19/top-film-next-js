import { createBanner } from "../../../../server/controller/Banner";
import { searchFilms } from "../../../../server/controller/Film";

export default async function handel(req, res) {
  if (req.method === "GET") {
    const search = req.query;

    const result = await searchFilms(search);

    res.status(200).json(result);

    return;
  }

  if (req.method === "POST") {
    const value = req.body;

    console.log(value, "this is the log of value in api router!");

    const data = await createBanner(value);

    res.status(200).json(data);

    return;
  }

  res.status(404).json({ message: "Path not Found!" });
}
