/* eslint-disable import/no-anonymous-default-export */
import clientPromise from "@/lib/mongodb";
const jwt = require('jsonwebtoken');

// Configure its options
let jwtOptions = {
  secretOrKey: '&0y7$noP#5rt99&GB%Pz7j2b1vkzaB0RKs%^N^0zOP89NT04mPuaM!&G8cbNZOtH',
};


export default async (req, res) => {
  try {
    const {username, password, password2} = req.body;
    const { method } = req;
    const client = await clientPromise;
    const db = client.db("shopping");

    switch (method) {
      case "POST":
        if (!username || !password || !password2) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if password matches with password1
        if (password != password2) {
            res.status(400).json({ "message": "Passwords do not match!"});
        }

        // check if username exists in db
        const user = await db
          .collection("users")
          .findOne({ username: username });

        console.log("db user:", user)
      
        if (user) {
          res.status(404).json({ "message": "User already exists!"});
        } 

        // check if password matches
        if (password != password2) {
            return res.status(400).json({ "message": "Passwords do not match!" });
        }

        // Create a new user
        const newUser = {
            username,
            password,
            createdAt: new Date(),
        };
  
        await db.collection("users").insertOne(newUser);

        // generate jwt
        let payload = { 
          username: newUser.username,
        };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({ "message": "Register successful", "token": token });

        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
  }
};
