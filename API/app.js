// 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb+srv://huynguyen:Huynguyen1@cluster0-ks9ty.mongodb.net/userdb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
})
require('./auth/auth');


const userRouter = require('./routes/users');
const secureRoute = require('./routes/secure-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use('/me',secureRoute);
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

app.listen(5000, () => {
  console.log('Server started'+ 5000)
});
module.exports = app;
