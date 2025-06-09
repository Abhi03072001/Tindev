const express = require("express");
const connectdb = require("./config/database");
const app = express();
const User = require("./models/user");
const { ReturnDocument } = require("mongodb");
const { validateSignupData } = require("./utils/validator");
const bcrypt = require("bcrypt");

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, email, password: passwordHash });
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("Error creating user: " + error.message);
  }
});

app.get("/users", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const users = await User.findOne({ email: userEmail });
    if (users.length === 0) {
      return res.status(404).send("User not found");
    } else {
      res.json(users);
    }
  } catch (error) {
    // try {
    //     const users = await User.find({});
    //     res.json(users);
    // }
    res.status(500).send("Error fetching users: " + error.message);
  }
});

app.delete("/users", async (req, res) => {
  const userId = req.body.userId;

  try {
    const users = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting user: " + error.message);
  }
});

app.patch("/users", async (req, res) => {
  const userId = req.body.userId;
  const updateData = req.body;

  try {
    const ALLOWED_UPDATES = ["gender", "photoUrl", "about", "age"];

    const isAllowedUpdate = Object.keys(updateData).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    const user = await User.findByIdAndUpdate({ _id: userId }, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send("User updated successfully");
  } catch (error) {
    res.status(500).send("Error updating user: " + error.message);
  }
});

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
