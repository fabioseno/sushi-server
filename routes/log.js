/*global module, require*/
module.exports = function (router) {
    'use strict';
    
    var logController  = require('../controllers/log');
    
    router.get('/logs', logController.list);
    
    router.post('/logs/search', logController.search);
    
    router.post('/logs', logController.add);
    
};