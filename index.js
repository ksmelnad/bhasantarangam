const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const passport = require("passport");
require("./passportauth");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "https://bhasantarangam.herokuapp.com", credentials: true }));

app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://bhasantarangam.herokuapp.com/login",
    successRedirect: "https://bhasantarangam.herokuapp.com",
  })
);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.firstname}`);
});

app.get("/getuser", (req, res) => {
  res.send(req.user);
  console.log("Get user", req.user);
});

app.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(200, "/");
    });
  }
});

app.use(require("./routes/bsrouter"));

app.use(express.static(path.join(__dirname, "./client", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

// app.get("/", (req, res) => {
//   res.send('Hi, server is running <a href="/auth/google">Login </a>');
// });

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("Server is running at 5000");
  
});
