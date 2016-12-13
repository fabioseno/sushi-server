/*global require, module*/
var Session  = require('../models/session'),
    config   = require('../config/server.conf.json'),

    getExpirationDate = function () {
        'use strict';

        var newExpirationDate = new Date();

        return newExpirationDate.setMinutes(newExpirationDate.getMinutes() + config.authentication.timeout);
    },

    updateSession = function (userId, callback) {
        'use strict';

        Session.remove({ userId: userId }, function (err, sessions) {
            var session = new Session({ userId: userId, expirationDate: getExpirationDate() });

            session.save(callback);
        });
    },

    hasValidSession = function (sessionId, userId, callback) {
        'use strict';

        Session.findOneAndUpdate({
            _id: sessionId,
            userId: userId,
            expirationDate: { $gte: new Date() }
        }, {
            expirationDate: getExpirationDate()
        }, callback);
    };

module.exports = {
    getExpirationDate: getExpirationDate,
    updateSession: updateSession,
    hasValidSession: hasValidSession
};