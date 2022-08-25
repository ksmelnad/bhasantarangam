const express = require('express')
const app = express()
const cors = require('cors')
const session = require("express-session");
const path = require("path");
const passport = require("passport");
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

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

passport.serializeUser((user, done) => {
  gId = user.id;
  return done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  let db_connect = mgClient.db("bhasantarangam");
  db_connect.collection("users").findOne(
    {
      googleId: userId,
    },
    function (err, doc) {
      if (err) throw err;
      console.log(doc);
      return done(null, doc);
    }
  );
});

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      (function () {
        let db_connect = mgClient.db("bhasantarangam");
        db_connect.collection("users").updateOne(
          { googleId: profile.id },
          {
            $setOnInsert: {
              googleId: profile.id,
              username: profile.displayName,
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              image: profile.photos[0].value,
            },
          },
          { upsert: true }
        );
      })();
      cb(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  function (req, res) {
    res.redirect("/");
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

app.use(cors());

app.use(require("./routes/bsrouter"));

app.use(express.static(path.join(__dirname, "./client", "build")));

app.listen(process.env.PORT || 5000, (req, res)=>{
  console.log("Server is running at 5000")
})