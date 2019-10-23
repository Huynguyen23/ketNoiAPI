//routes/auth.js
const express = require("express");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// /* POST login. */
// router.post("/login", function(req, res, next) {
//   passport.authenticate("local", { session: false }, (err, user, info) => {
//     if (err || !user) {
//       return res.status(400).json({
//         message: "Something is not right",
//         user: user
//       });
//     }
//     req.login(user, { session: false }, err => {
//       if (err) {
//         res.send(err);
//       }
//       // generate a signed son web token with the contents of user object and return it in the response
//       const token = jwt.sign(user, "your_jwt_secret");
//       return res.json({ user, token });
//     });
//   })(req, res);
// });
passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        //Save the information provided by the user to the the database
        const user = await UserModel.create({ email, password });
        //Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//Create a passport middleware to handle User login
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      console.log(email, passport)
      try {
        //Find the user associated with the email provided by the user
        const user = await UserModel.findOne({ email });
        if (!user) {
          //If the user isn't found in the database, return a message
          return done(null, false, { message: "User not found" });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }
        //Send the user information to the next middleware
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// router.post("/register", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     //const token = await user.generateAuthToken()
//     res.status(201).send({ user, token });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

//This verifies that the token sent by the user is valid
// passport.use(new JWTstrategy({
//   secretOrKey : 'top_secret',
//   jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
// }, async (token, done) => {
//   try {
//     return done(null, token.user);
//   } catch (error) {
//     done(error);
//   }
// }));
const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'top_secret',
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      UserModel.findUserById(jwt_payload.id).then(user => {
        console.log('alo alo')

        console.log(jwt_payload.id)
        if (user) {
          console.log('user found in db in passport');
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      console.log("queoooooo",err)
      done(err);
    }
  }),
);
