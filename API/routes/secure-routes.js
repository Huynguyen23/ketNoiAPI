const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get('/', function(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      console.log('user found in db from route');
      res.status(200).send({
        user
      });
    }
  })(req, res, next);
});

module.exports = router;