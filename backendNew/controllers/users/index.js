const User = require("../../models/User");
const router = require("express").Router();

router.post("/user", async (req, res) => {
  const newUser = new User(req.body.payload);
  console.log(newUser);
  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user_email = req.body.payload;
    const user = await User.find({ email: user_email });
    res.status(200).json(user);
    return res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { router };
