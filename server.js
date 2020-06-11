const express = require("express");
const connectDB = require("./config/db");
const app = express();

//connect to mongo database
connectDB();

app.get("/", (req, res) => {
  res.send("APP BETOCH");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));
