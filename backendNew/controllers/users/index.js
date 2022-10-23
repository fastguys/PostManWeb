const { User } = require('./models/User');
const router = require('express').Router();

router.post("/user", async (req, res) => {
    const newUser = new User(req.body);
    try {
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = { router };