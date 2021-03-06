//bring in dependencies and set up environmental variables
require('dotenv').load();
const PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const methodOverride = require('express-method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
const aws = require('aws-sdk');

//set up cors
app.use(cors());

//set up static files
app.use(express.static(path.join(__dirname, 'dist')));

//set up cookie-parser and body-parser
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//set up sessions
app.use(session({ secret: process.env.SECRET_KEY }));

//set up morgan
app.use(morgan('dev'));

//bring in routes
const auth = require('./routes/auth');
app.use('/auth', auth);
const users = require('./routes/users');
app.use('/api/users', users);
const dogs = require('./routes/dogs');
app.use('/api/dogs', dogs);

//set up Angular catch all route
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

//port listening
app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
