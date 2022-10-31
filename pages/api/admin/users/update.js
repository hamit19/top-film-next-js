import { patchUser } from "../../../../server/controller/User";

export default async function handle(req, res) {
  const value = req.body;

  const data = await patchUser(value);

  data.status === "userError"
    ? res.status(400).json(data)
    : res.status(200).json(data);
}
