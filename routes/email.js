/*global module, require*/
module.exports = function (router) {
    'use strict';
    
    var emailController = require('../controllers/email'),
        auth            = require('../middlewares/session').isLogged;
    
    // Get pending emails
    router.get('/emails/pending', auth, emailController.listPendingEmails);
    
    // Create email
    router.post('/emails', auth, emailController.createEmail);
    
    // Send emails
    router.get('/emails/send', auth, emailController.sendEmails);
    
};