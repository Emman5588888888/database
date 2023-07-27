require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const mongodb = require("./lib/db");
const app = express();

// console.log("Process env: ", process.env.NODE_ENV);
if (app.get("env") === "development") {
  console.log("Morgan is enabled.");
  app.use(morgan("tiny"));
}

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(helmet());

app.set("view engine", "pug");

app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

mongodb();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
