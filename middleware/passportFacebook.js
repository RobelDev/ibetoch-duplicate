// const passport = require("passport");
// const User = require("../model/User");
// const config = require("config");
// const FacebookStrategy = require("passport-facebook").Strategy;

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// const passportFacebook = passport.use(
//   new FacebookStrategy(
//     {
//       clientID: config.get("FACEBOOK_CLIENT_ID"),
//       clientSecret: config.get("FACEBOOK_CLIENT_SECRET"),
//       callbackURL: "auth/facebook/callback",
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       User.findOrCreate({ facebookId: profile.id }, (err, user) => {
//         return cb(err, user);
//       });
//     }
//   )
// );

// module.exports = passportFacebook;
