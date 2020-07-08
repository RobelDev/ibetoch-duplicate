// const passport = require("passport");
// const User = require("../model/User");
// const config = require("config");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// const passportGoogle2 = passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://yourdomain:3000/auth/google/callback",
//       passReqToCallback: true,
//     },
//     function (request, accessToken, refreshToken, profile, done) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//     }
//   )
// );

// module.exports = passportGoogle2;
