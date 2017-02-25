/*global require, module, console*/
var Email          = require('../models/email'),
    messageHandler = require('../utils/messageHandler'),
    config         = require('../config/server.conf.json'),
    nodemailer     = require('nodemailer'),

    getPendingEmails = function (callback) {
        'use strict';

        Email.find({ status: { "$in": ['queued', 'error'] }, numberOfRetries: { $lte: config.email.retries}}, function (err, emails) {
            callback(err, emails);
        });
    },

    createEmail = function (req, res) {
        'use strict';

        var model = new Email(req.body);

        model.creationDate = new Date();
        model.status = 'queued';
        model.numberOfRetries = 0;

        model.save(function (err, result) {
            messageHandler.wrapResponse(res, err, result);
        });
    },

    listPendingEmails = function (req, res) {
        'use strict';

        getPendingEmails(function (err, result) {
            messageHandler.wrapResponse(res, err, result);
        });
    },

    sendEmails = function (req, res) {
        'use strict';

        var transporter = nodemailer.createTransport({
            service: config.email.transporterService,
            auth: {
                user: config.email.transporterUser,
                pass: config.email.transporterPassword
            }
        }),
            mailOptions,
            email,
            to,
            cc,
            bcc,
            i;

        // update email status
        if (res) {
            messageHandler.wrapResponse(res, undefined, 'Envio de e-mails solicitado com sucesso!');
        }

        getPendingEmails(function (err, emails) {
            for (i = 0; i < emails.length; i += 1) {
                email = emails[i];

                (function (emailToProcess) {
                    mailOptions = {
                        from: config.email.sender,
                        to: emailToProcess.to.join(),
                        cc: emailToProcess.cc.join(),
                        bcc: emailToProcess.bcc.join(),
                        subject: emailToProcess.subject
                    };

                    if (emailToProcess.bodyType === 'html') {
                        mailOptions.html = emailToProcess.body;
                    } else {
                        mailOptions.text = emailToProcess.body;
                    }

                    (function (options) {
                        emailToProcess.status = 'sending';
                        emailToProcess.save(function (error, currentEmail) {
                            if (error) {
                                console.log(error);
                            }

                            // send mail with defined transport object
                            transporter.sendMail(options, function (err, info) {
                                if (err) {
                                    currentEmail.status = 'error';
                                    currentEmail.lastRetryDate = new Date();
                                    currentEmail.numberOfRetries += 1;
                                    currentEmail.errorDescription = JSON.stringify(err);
                                } else {
                                    currentEmail.status = 'sent';
                                    currentEmail.sentDate = new Date();
                                    currentEmail.errorDescription = '';
                                }

                                currentEmail.save(function (error) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    
                                });
                            });
                        });
                    }(mailOptions));
                }(email));
            }
        });
    };

module.exports = {
    listPendingEmails: listPendingEmails,
    createEmail: createEmail,
    sendEmails: sendEmails
};