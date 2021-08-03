const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

var app = express();
dotenv.config();

var connection = mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true },
    { useUnifiedTopology: true },
    { useFindAndModify: false }
  )
  .then(() => {
    console.log("Connection successful");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 80;

app.use("/api/admin", require("./routes/admin"));
app.use("/api/user", require("./routes/user"));
