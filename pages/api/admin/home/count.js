import { getUsersCount } from "../../../../server/controller/User";

export default async function handle(req, res) {
  const userCount = await getUsersCount();

  //Todo : We also should get the count of the films!

  res.status(200).json(userCount);
}
