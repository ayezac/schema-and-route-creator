const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const routes = require("./routes");
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});
app.use(...routes);

//Handler for error 404
app.use((req, res, next) => {
  res.status(404).send("Not found");
});

//Handler for error 500
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.send("Oops error");
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));
