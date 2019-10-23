const mongoose = require('mongoose');
var express = require('express');
const jwt      = require('jsonwebtoken');
var router = express.Router();
const passport = require("passport");

router.post('/register', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
  res.json({ 
    message : 'Signup successful',
    user : req.user 
  });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('login', async (err, user, info) => {    
    try {
      if(err || !user){
        console.log(err, user)
        const error = new Error('An Error occured')
        return next(error);
        
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        const token = jwt.sign({ id : user.email },'top_secret');
        console.log(error)

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);

});
module.exports = router;
