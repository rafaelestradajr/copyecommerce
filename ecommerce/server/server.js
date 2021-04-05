const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const {readdirSync} = require("fs");

// import routes
//const authRoutes = require("./routes/auth");not necessary

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlPassword: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes middleware
//app.use("/api", authRoutes);not necessary
readdirSync("./routes").map((r) => 
app.use('/api',require('./routes/' + r)));

// route

// port

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
