const passport = require("passport");
const client = require("./db/conn");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      (async function () {
        let db_connect = await client.db("bhasantarangam");
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
      // console.log("Profile", profile);
      cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("User in serializer", user.id);
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let g;
  client
    .db("bhasantarangam")
    .collection("users")
    .findOne(
      {
        googleId: id,
      },
      function (err, doc) {
        if (err) throw err;
        g = doc;
        console.log("User after deser", doc);
        return done(null, doc);
      }
    );
});
