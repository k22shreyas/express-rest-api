var passport = require("passport");
var LocalStrategy = require("passport-local");
const Account = require("../models/account.model");
 
// basic config for login using passport's local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function (email, password, done) {
      console.log(email);
      console.log(password);
 
      // checking in accounts collection
      // email exists or not
      Account.findOne({ email: email })
        .then((account) => {
          console.log(account);
          // if the email found -- validate the password
          // account.validatePassword(password);
          if(!account.validatePassword(password)){
            return done(null, false, {
              message: "Password is wrong",
            })
          }
          return done(null, account);
          
        })
        .catch((err) => {
          // if email not found -- return the error message
          console.log(err);
          res.json({
            message:
              err.message ||
              `Incorrect email or password`,
          });
        });
    }
  )
);