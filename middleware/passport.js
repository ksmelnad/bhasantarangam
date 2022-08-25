const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config({ path: "../" });
const mgClient = require("../db/conn");

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      (async function () {
        let db_connect = await mgClient.db("bhasantarangam");
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

module.exports = passport;
