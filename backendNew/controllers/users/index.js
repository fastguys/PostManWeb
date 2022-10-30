const User = require("../../models/user");
const Message = require("../../models/message");
const router = require("express").Router();

//users
router.post("/user", async (req, res) => {
  const newUser = new User(req.body.payload);
  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user_email = req.query.payload;
    const user = await User.find({ email: user_email["email"] });
    // console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/user/:id", async (req, res) => {
  console.log(req.query.payload);
  try {
    const user_email = req.query.payload;
    console.log(user_email);
    await User.deleteOne({ email: user_email["email"] });
    // console.log(user);
    res.send("User deleted");
  } catch (err) {
    res.send("User not deleted");
  }
});

router.put("/user/nickname/:id", async (req, res) => {
  try {
    const user_email = req.query.payload["email"];
    const user_nickname = req.body.payload["nickname"];
    const user = await User.findOneAndUpdate(
      { email: user_email },
      { nickname: user_nickname }
    );
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/user/bio/:id", async (req, res) => {
  try {
    const user_email = req.query.payload["email"];
    const user_bio = req.body.payload["bio"];
    const user = await User.findOneAndUpdate(
      { email: user_email },
      { bio: user_bio }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/user/visibility/:id", async (req, res) => {
  try {
    const user_email = req.query.payload["email"];
    const user_visibility = req.body.payload["visibility"];
    const user = await User.findOneAndUpdate({email: user_email}, {visibility:user_visibility});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
// messages
router.post("/message", async (req, res) => {
  console.log(req.body.payload);
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
