import { withIronSessionApiRoute } from "iron-session/next";

function handle(req, res) {
  res.send({ ...req.session.token });
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
