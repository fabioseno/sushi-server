/*global require, console*/
var emailController = require('../controllers/email'),
    config          = require('../config/server.conf.json');

setInterval(function () {
    'use strict';
    
    console.log('>> Sending emails...');
    emailController.sendEmails();
    
}, config.email.interval * 60 * 1000);