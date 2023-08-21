const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define registration schema
const registrationSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Registration endpoint
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const registration = new Registration({
    username,
    email,
    password,
  });

  try {
    await registration.save();
    res.redirect("/success.html");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving registration");
  }
});

// Success page
app.get("/success.html", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});

// Set up view engine and static files
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); // assuming the pug files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("static"));

// Route handlers
app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.get("/classinfo", (req, res) => {
  res.render("classinfo");
});

app.get("/join", (req, res) => {
  res.render("login");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/login", (req, res) => {
  res.render("login"); // Assuming "login.pug" is the name of your Pug file in the "views" directory
});

// login check
app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await Registration.findOne({ username: username }); // Use "Registration" instead of "Register"
    console.log(user);

    if (user && user.password === password) {
      res.status(201).render("classinfo");
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
