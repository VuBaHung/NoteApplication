require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");

app.use(express.json());
app.use(cors());
//Router
app.use("/user", userRouter);
app.use("/note/api", noteRouter);
//Listen server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// Connect to Mongoose DB
const URI = process.env.MONGOBD_URL;

try {
  mongoose.connect(URI, {
    autoIndex: false,
  });
  console.log("connect to Mongo successful!!!");
} catch (error) {
  console.log("Connect error!");
}
