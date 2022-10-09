// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const User = require("../../sever/");

export default function handler(req, res) {
  console.log(req.body);

  res.status(200).json("Data have returned!");
}
