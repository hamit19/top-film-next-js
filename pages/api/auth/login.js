import { authUser } from "../../../server/controller/User";

export default async function handle(req, res) {
  const { username, password } = req.body;

  const data = await authUser({ username, password });

  return data.status === "incorrectData"
    ? res.status(400).json(data)
    : res.status(200).json(data);
}
