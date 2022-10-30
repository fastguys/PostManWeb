const User = require("../../models/user");
const Message = require("../../models/message");
const router = require("express").Router();

router.post("/user", async (req, res) => {
  const newUser = new User(req.body.payload);
  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user_email = req.query.payload;
    const user = await User.find({ email: user_email["email"] });
    // console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/message", async (req, res) => {
  msg = req.body.payload["msg"];
  console.log(msg);
  try {
    const newMassage = new Message(req.body.payload);
    const message = await newMassage.save();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { router };
