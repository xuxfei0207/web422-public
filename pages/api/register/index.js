/* eslint-disable import/no-anonymous-default-export */
import clientPromise from "@/lib/mongodb";
import { registerUser } from "@/lib/user-service";

export default async (req, res) => {
  try {
    const userData = req.body;
    const { method } = req;
    const client = await clientPromise;
    const db = client.db("shopping");

    switch (method) {
      case "POST":
        // 1. check username and password (in db)
        if (password != password2) {
          throw new Error("Passwords do not match");
        }
        // 2. register/create user
        registerUser(userData);
        // 2. generate jwt
        // 3. return jwt to fronend

        break;
      case "GET":
        const users = await db.collection("users").find({}).limit(10).toArray();
        res.json(users);
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
  }
};
