var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

require('dotenv').config();

var passwordHash = require('password-hash');
var cors = require('cors')

var index = require('./routes/index');

var app = express();

// mongoose setup *************************
//connect to mongoDB DB
var mongoose = require('mongoose');

var db_config = {
  development: 'mongodb://localhost/kumpulkumpul_dev',
  test: 'mongodb://localhost/kumpulkumpul_dev_test'
}

var app_env = app.settings.env
mongoose.connect(db_config[app_env], (err,res) => {
  console.log('Connected to Database: ' + db_config[app_env] );
});
// mongoose setup end *************************


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/', index);


app.listen(3000, function () {
  console.log('KumpulKumpul is listening on port 3000!')
})

module.exports = app;
