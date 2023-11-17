const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');


const adminRoutes = require('./routes/adminRoutes/index.js');
const userRoutes = require('./routes/userRoutes/index.js');

require('dotenv').config();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true
  })
)

app.use((req,res,next) => {

  console.log(req.method, req.url);
   console.log(res.statusCode);
   console.log(req.body);
   next();
})


app.use('/admin',adminRoutes);
app.use('/',userRoutes);

app.listen(port, () => {
   console.log('server is running:',port)
});




