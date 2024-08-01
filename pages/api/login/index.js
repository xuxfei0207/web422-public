/* eslint-disable import/no-anonymous-default-export */
import clientPromise from "@/lib/mongodb";
const jwt = require('jsonwebtoken');

// Configure its options
let jwtOptions = {
  secretOrKey: '&0y7$noP#5rt99&GB%Pz7j2b1vkzaB0RKs%^N^0zOP89NT04mPuaM!&G8cbNZOtH',
};


export default async (req, res) => {
  try {
    const { username, password } = req.body;
    const { method } = req;
    const client = await clientPromise;
    const db = client.db("shopping");

    switch (method) {
      case "POST":
        // 1. check if username exists in db
        const user = await db
          .collection("users")
          .findOne({ username: username });
      
        if (!user) {
          res.status(404).end(`User not found`);
        } 
        // 2. check if password matches
        if (user.password != password) {
          res.status(400).end(`Username and password do not match!`);
        }

        // 3. Sign in user - generate JWT and return JWT to frontend
        let payload = { 
          _id: user._id,
          username: user.username,
        };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({ "message": "login successful", "token": token });

        break;
      case "GET":
        const users = await db
          .collection("users")
          .find({})
          .limit(10)
          .toArray();
        res.json(users);

        break;
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
