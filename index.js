const express = require('express')
const app = express()
const cors = require('cors')
const session = require("express-session");
const path = require("path");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const passport = require("./middleware/passport");
// const mgClient = require("./db/conn");

const mgClient = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

mgClient.connect(function (err) {
  console.log("MongoDB started!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.use(express.json());

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 27 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

const URL =
  process.env !== "production"
    ? "http://localhost:5000"
    : "https://bhasantarangam.herokuapp.com";

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: URL,
    session: true,
  }),
  function (req, res) {
    res.redirect(URL);
  }
);

app.get("/getuser", (req, res) => {
  res.send(req.user);
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

app.use(cors({ credentials: true }));

app.use(require("./routes/bsrouter"));

app.use(express.static(path.join(__dirname, "./client", "build")));



app.listen(process.env.PORT || 5000, (req, res)=>{
  console.log("Server is running at 5000")
})