const User = require("../../models/user");
const Message = require("../../models/message");
const Task = require("../../models/task");
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
router.get("/user/allUser", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user_email = req.query.payload;
    const user = await User.find({ email: user_email["email"] });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/user/phoneNumber/:id", async (req, res) => {
  try {
    const user_phone = req.query.payload;
    console.log(user_phone);
    const user = await User.find({ phoneNumber: user_phone["phone"] });
    console.log(user)
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
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/user/phoneNumber/:id", async (req, res) => {
  try {
    const user_email = req.query.payload["email"];
    const user_phoneNumber = req.body.payload["phoneNumber"];
    const user = await User.findOneAndUpdate(
      { email: user_email },
      { phoneNumber: user_phoneNumber }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/user/ImageUrl/:id", async (req, res) => {
  try {
    const user_email = req.query.payload["email"];
    const user_ImageUrl = req.body.payload["ImageUrl"];
    const user = await User.findOneAndUpdate(
      { email: user_email },
      { ImageUrl: user_ImageUrl }
    );
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
router.put("/user/email/:id", async (req, res) => {
  try {
    console.log(req.query.payload);
    const user_email = req.query.payload["email"];
    const user_newemail = req.body.payload["Newemail"];
    const user = await User.findOneAndUpdate(
      { email: user_email },
      { email: user_newemail }
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
    const user = await User.findOneAndUpdate(
      { email: user_email },
      { visibility: user_visibility }
    );
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
// tasks
// get APIs
router.get("/task/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const task = await Task.find({ _id: id });
    console.log(task);
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/task-list", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});
// post APIs
/*testing JSON body: 
{
    "payload": {
        "title": "task1",
        "description": "task1 description",
        "location": {"type": "Point", "coordinates": [100,100]},
        "isTaken": false,
        "taskId": "uuidv4",
        "senderInfo": {},
        "receiverInfo": {},
        "posterId": "posterId1",
        "takerId": "takerId1",
        "timeRemaining": "timeRemaining1",
        "status": "status1",
        "confirmCode": "1234"
    }
}*/
router.post("/task", async (req, res) => {
  try {
    console.log(req.body.payload);
    const newTask = new Task(req.body.payload);
    const task = await newTask.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});
// put APIs
router.put("/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, {
      $set: req.body.payload,
    });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { router };
