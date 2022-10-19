import { withIronSessionApiRoute } from "iron-session/next";

function handle(req, res) {
  req.session.destroy();
  res.send({ loggedOut: true });
}

export default withIronSessionApiRoute(handle, {
  cookieName: "token",
  password: "cuGXeeGF6dKA3u5JKNQ9C8r2LF8U26XNBZVc",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
