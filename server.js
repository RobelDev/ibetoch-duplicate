const express = require("express");
const connectDB = require("./config/db");
const app = express();
const passport = require("passport");

//connect to mongo database
connectDB();

// initialize body parser mddleware
app.use(express.json({ extended: false }));

//initialize the passport auth
//app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("APP BETOCH");
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
//app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));
