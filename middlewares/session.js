/*global require, module*/
var SessionController = require('../controllers/session'),
    messageHandler    = require('../utils/messageHandler'),
    mongoose          = require('mongoose');

module.exports.isLogged = function (req, res, next) {
    'use strict';

    SessionController.hasValidSession(mongoose.Types.ObjectId(req.get('X-SessionID')), mongoose.Types.ObjectId(req.get('X-UserID')), function (err, session) {
        if (err) {
            return res.send(err);
        }

        if (session) {
            next();
        } else {
            res.status(401);
            messageHandler.wrapResponse(res, 'Usuário sem permissão ou sessão expirada!');
        }
    });
};