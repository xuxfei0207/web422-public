/* eslint-disable import/no-anonymous-default-export */
import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  try {
    const { name } = req.body;
    const { method } = req;
    const client = await clientPromise;
    const db = client.db("shopping");

    switch (method) {
      case "POST":
        // 1. check username and password (in db)
        // const users = await db
        //   .collection("users")
        //   .find({})
        //   .limit(10)
        //   .toArray();
        // res.json(users);

        // 2. generate jwt
        // 3. return jwt to fronend

        break;
      case "GET":
        const users = await db
          .collection("users")
          .find({})
          .limit(10)
          .toArray();
        res.json(users);
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
  }
};

// export default async (req, res) => {
//   try {
//     const client = await clientPromise;
//     const db = client.db("sample_mflix");
//     const movies = await db
//       .collection("movies")
//       .find({})
//       .sort({ metacritic: -1 })
//       .limit(10)
//       .toArray();
//     res.json(movies);
//   } catch (e) {
//     console.error(e);
//   }
// };
