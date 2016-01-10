var express = require('express');
var path = require('path');
var app = express();
var jade = require('jade');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var db = require('./config/db.js');

app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');
app.engine('jade', jade.__express);

app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(path.join(__dirname, 'public')));

require('./app/routes')(app);

module.exports = app;