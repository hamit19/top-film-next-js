import { createUser } from "../../../server/controller/User";

export default async function handler(req, res) {
  const { email, username, password } = req.body;

  const data = await createUser({ email, username, password });

  if (data.status === "usernameError" || data.status === "emailError")
    return res.status(400).json(data);

  res.status(200).json(data);
}
