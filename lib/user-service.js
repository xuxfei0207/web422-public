const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: String,
});

let User;

module.exports.connect = function () {
  return new Promise(function (resolve, reject) {
    let db = mongoose.createConnection(mongoDBConnectionString, {
      useNewUrlParser: true,
    });

    db.on("error", (err) => {
      reject(err); // reject the promise with the provided error
    });

    db.once("open", () => {
      User = db.model("users", userSchema);
      resolve();
    });
  });
};

module.exports.registerUser = function (userData) {
  return new Promise(function (resolve, reject) {
    bcrypt
      .hash(userData.password, 10)
      .then((hash) => {
        // Hash the password using a Salt that was generated using 10 rounds
        userData.password = hash;

        let newUser = new User(userData);

        newUser
          .save()
          .then(() => {
            resolve("User " + userData.username + " successfully registered");
          })
          .catch((err) => {
            if (err.code == 11000) {
              reject("User Name already taken");
            } else {
              reject("There was an error creating the user: " + err);
            }
          });
      })
      .catch((err) => reject(err));
  });
};

module.exports.checkUser = function (userData) {
  return new Promise(function (resolve, reject) {
    User.find({ userName: userData.userName })
      .limit(1)
      .exec()
      .then((users) => {
        if (users.length == 0) {
          reject("Unable to find user " + userData.userName);
        } else {
          bcrypt.compare(userData.password, users[0].password).then((res) => {
            if (res === true) {
              resolve(users[0]);
            } else {
              reject("Incorrect password for user " + userData.userName);
            }
          });
        }
      })
      .catch((err) => {
        reject("Unable to find user " + userData.userName);
      });
  });
};
