const mongoose = require("mongoose");

function mongodb() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to mongoDB"))
    .catch((err) => console.error("Error connecting to mongoDB", err));
}

module.exports = mongodb;
