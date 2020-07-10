const express = require("express");
const connectDB = require("./config/db");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const compression = require("compression");
//connect to mongo database
connectDB();

//const storage = new GridFsStorage({ db: connectDB() });

//middlewares
app.use(morgan("dev"));
// initialize body parser mddleware
app.use(express.json());

// app.use(compression());

//app.use(methodOverride("_method"));
//initialize the passport auth
app.use(cors());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/property", require("./routes/api/property"));

//
if (process.env.NODE_ENV === "production") {
  if (req.header["x-forwarded-proto"] !== "https") {
    return res.redirect(["https://", req.get("Host"), req.url].join(""));
  }
  // set static foler
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));
