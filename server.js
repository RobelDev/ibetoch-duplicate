const express = require("express");
const connectDB = require("./config/db");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
//const GridFsStorage = require("multer-gridfs-storage");
//var methodOverride = require("method-override");
//connect to mongo database
connectDB();

//const storage = new GridFsStorage({ db: connectDB() });

//middlewares
app.use(morgan("dev"));
// initialize body parser mddleware
app.use(express.json({ extended: false }));

//app.use(methodOverride("_method"));
//initialize the passport auth
app.use(cors());
//app.use(passport.initialize());
//app.use(passport.session());

// app.get("/", (req, res) => {
//   res.send("APP BETOCH");
// });

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/property", require("./routes/api/property"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));
