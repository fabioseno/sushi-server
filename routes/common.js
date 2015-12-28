/*global require, module*/
var commonController = require('../controllers/common');

module.exports = function (app) {
    'use strict';

    // CORS
    app.all('*', commonController.auth);
    
    app.get('/', commonController.ping);
    
};