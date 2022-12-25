import { getFilmsSliders } from "../../../server/controller/Film";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const data = await getFilmsSliders();

    res.status(200).json(data);
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
