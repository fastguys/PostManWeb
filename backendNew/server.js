const express = require("express");
const cors = require('cors');
const port = process.env.PORT || 3001;
const connectDB = require("./config/db");
const user = require("./controllers/users/index");

const app = express();
connectDB();
app.listen(port, () => console.log(`Server running on port ${port}`))

app.use(cors({
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use(express.json({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true
}));
app.use(express.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true
}));

app.use('/api', user)



