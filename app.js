const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connection to databse
mongoose.connect(config.database);

//On connection to database
mongoose.connection.on('connected', ()=>{
  console.log('connected to database' +config.database);
});


// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

//Set static Folder(Angular files). Here we have created a folder with name Public to store
//all the Angular files.
app.use(express.static(path.join(__dirname,'public')));

//Body parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

//Index Route
app.get('/',(req,res)=>{
  res.send('Invalid end point');
});

app.listen(port, ()=>{
  console.log('server started on port'+ port);
});
