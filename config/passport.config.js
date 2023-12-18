const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Account = require("../models/account.model");
 
// basic config for login using passport local
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      Account.findOne({ email: email })
        .then((account) => {
          if (!account) {
            // Return if account not found in database
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          }
 
          // Return if password is wrong
          if (account && !account.validatePassword(password)) {
            return done(null, false, {
              message: "Password is wrong",
            });
          }
 
          // // If credentials are correct, return the account object
          return done(null, account);
        })
        .catch((err) => {
          if (err) {
            return done(err);
          }
        });
    }
  )
);