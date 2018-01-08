//bring in dependencies and set up environmental variables
require('dotenv').load();
const PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const methodOverride = require('express-method-override');
const bodyParser = require('body-parser');

//set up static files
app.use(express.static(path.join(__dirname, 'dist')));

//set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//set up cors
app.use(cors());

//set up morgan
app.use(morgan('dev'));

//bring in routes
const users = require('./routes/users');
app.use('/api/users', users)

//set up Angular catch all route
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

//port listening
app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
