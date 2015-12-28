/*global require, process, console*/
var express     = require('express'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser'),
    app         = express(),
    port        = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// ## DATABASE ##
var configDB = require('./config/db.config');

mongoose.connect(configDB.url);
var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function () {
    'use strict';

    console.log('>> Database connected...');
});

// ## ROUTES ##
require('./routes/')(app); // load our routes and pass in our app anpd fully configured passport

app.listen(port);
console.log('>> Sushi Server started listening on port ' + port);