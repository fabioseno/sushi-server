/*global require, process, console*/
var express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express(),
    port        = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// error handling
app.use(function (err, req, res, next) {
    'use strict';
    
    console.error(err.stack);
    res.status(500).send('Unexpected error!');
});

// ## DATABASE ##
require('./processes/database');

// ## E-mail job ##
require('./processes/email');

// ## ROUTES ##
require('./routes/')(app); // load our routes and pass in our app anpd fully configured passport

app.listen(port);
console.log('>> Sushi Server started listening on port ' + port);