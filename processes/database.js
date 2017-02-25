/*global require, console*/
var mongoose = require('mongoose'),
    configDB = require('../config/db.config');
    
mongoose.connect(configDB.url);
var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function () {
    'use strict';

    console.log('>> Database connected...');
});