const express = require("express");
const router = express.Router();
const { model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Logs = require("../database/db_models").userlogs;
const User = require("../database/db_models").users;
const authSessionLogin = require("../functions/auth").authSessionLogin;
const { removeFcmToken } = require("../firebase/fcmmap");

router.post("/add-new-user", async (req, res) => {
  const { userName, firstName, lastName, password } = req.body;
  const foundUser = await User.findOne({ userName: userName });
  if (foundUser) {
    res.json({ stat: false, err: false });
  } else {
    const newUser = new User({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: password,
      profilePicPath: "/profile_pics/def_profile.jpg",
    });
    try {
      await newUser.save();
      res.json({ stat: true, err: false });
    } catch (err) {
      console.log("Error occured in adding user");
      console.log(err);
      res.json({ stat: false, err: true });
    }
  }
});

router.post("/check-user-exist", async (req, res) => {
  const userName = req.body.userName;
  try {
    const usr = await User.findOne({ userName: userName });
    if (usr) {
      res.json({ stat: true, err: false });
    } else {
      res.json({ stat: false, err: false });
    }
  } catch (err) {
    res.json({ stat: false, err: true });
  }
});

const loginValidation = async (details) => {
  const { userName, password } = details;

  try {
    const usr = await User.findOne({ userName: userName });
    if (!usr) {
      return { stat: false, usr: false, err: false };
    } else if (usr.password == password) {
      return { stat: true, usr: true, err: false };
    } else {
      return { stat: false, usr: true, err: false };
    }
  } catch (err) {
    console.log("Error in loging user");
    console.log(err);
    return { stat: false, usr: false, err: true };
  }
};

router.post("/auth-user-login", async (req, res) => {
  const { userName, password } = req.body;

  res.cookie("userName", userName, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  let logID = req.cookies.logID || uuidv4();

  res.cookie("logID", logID, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  const response = await loginValidation({ userName, password });

  if (response.stat && response.usr && !response.err) {
    const userLog = await Logs.findOne({ userName: userName });

    if (!userLog) {
      const newUserLog = new Logs({
        userName: userName,
        clients: [
          {
            logId: logID,
            expiresAt: new Date(Date.now() + 259200000),
          },
        ],
      });

      await newUserLog.save();
    } else {
      const existingClient = userLog.clients.find(
        (client) => client.logId === logID
      );

      if (existingClient) {
        existingClient.expiresAt = new Date(Date.now() + 259200000);
      } else {
        userLog.clients.push({
          logId: logID,
          expiresAt: new Date(Date.now() + 259200000),
        });
      }
      await userLog.save();
    }
  }

  res.json({ ...response, userName: userName, logID: logID });
});

router.post("/auth-session-login", async (req, res) => {
  let userName = req.cookies.userName;
  let logID = req.cookies.logID;

  if (!userName || !logID) {
    userName = req.body.userName;
    logID = req.body.logID;
  }

  const result = await authSessionLogin(userName, logID);
  if (result.stat) {
    res.cookie("userName", userName, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.cookie("logID", logID, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
  }
  res.json(result);
});

router.post("/sign-out", async (req, res) => {
  const userName = req.body.userName;
  const logID = req.body.logID;
  const fcmToken = req.body.fcmToken;
  const logs = await Logs.findOne({
    userName: userName,
  });

  if (fcmToken) removeFcmToken(userName, fcmToken);
  logs.clients.find((log) => log.logId !== logID);
  logs
    .save()
    .then(() => {
      res.json({ stat: true });
    })
    .catch((err) => {
      console.log(err);
      res.json({ stat: true });
    });
});

module.exports = router;
