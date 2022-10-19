import { authUser } from "../../../server/controller/User";
import { withIronSessionApiRoute } from "iron-session/next";

async function handle(req, res) {
  const { username, password } = req.body;

  const data = await authUser({ username, password });

  if (data.status === "incorrectData") {
    res.status(400).json(data);
  } else {
    req.session.token = {
      token: data.token,
    };

    await req.session.save();

    res.status(200).json(data);
  }
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
