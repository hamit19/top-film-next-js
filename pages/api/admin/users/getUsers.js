import { getUsers } from "../../../../server/controller/User";

export default async function handle(req, res) {
  const users = await getUsers(req.query);

  res.status(200).json(users);
}
