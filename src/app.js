const express = require("express");
const connectdb = require("./config/database");
const app = express();

const { ReturnDocument } = require("mongodb");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies


const authRouter = require("./routes/auth");
const requestsRouter = require("./routes/requests");  
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", requestsRouter);   
app.use("/", profileRouter);
app.use("/", userRouter);



connectdb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
