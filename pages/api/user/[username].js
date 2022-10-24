import { getUserData } from "../../../server/controller/User";

export default async function handle(req, res) {
  const { username } = req.query;

  const data = await getUserData({ username });

  data.type === "errorUser"
    ? res.status(404).json(data)
    : res.status(200).json(data);
}
