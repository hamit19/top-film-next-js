import { withIronSessionApiRoute } from "iron-session/next";
import { updateUser } from "../../../server/controller/User";

async function handle(req, res) {
  const { username, newPassword, email, oldPassword } = req.body;

  const data = await updateUser({ username, newPassword, email, oldPassword });

  if (data.type === "userError") {
    res.status(400).json(data);
  }

  req.session.token = {
    token: data.token,
  };
  await req.session.save();

  res.status(200).json(data);
}

export default withIronSessionApiRoute(handle, {
  cookieName: "token",
  password: "cuGXeeGF6dKA3u5JKNQ9C8r2LF8U26XNBZVc",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
    path: "/",
  },
});
