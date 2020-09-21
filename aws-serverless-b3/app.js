const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./variables.env" });

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://dbadmin:97991712Fe@cluster0.s0cjc.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

const usersRouter = require("./route.users");

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log("listening");
});

module.exports = app;
