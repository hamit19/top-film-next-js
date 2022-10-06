// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const films = [
    { nam: "Game of Thrones", createdDate: "2017" },
    { nam: "House of The Dragon", createdDate: "2022" },
  ];

  res.status(200).json(films);
}
