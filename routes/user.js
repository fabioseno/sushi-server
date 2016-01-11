/*global module, require*/
module.exports = function (router) {
    'use strict';
    
    var userController  = require('../controllers/user');
    
    router.get('/users', userController.list);
    
    router.post('/users/search', userController.search);
    
    router.get('/user/:id', userController.get);
    
    router.put('/users', userController.add);
    
    router.post('/user/:id/changePassword', userController.changePassword);
    
    router.post('/user/:id', userController.update);
    
    router['delete']('/user/:id', userController.remove);
    
    router.post('/login', userController.login);
    
    //router.post('/login', userController.login);
    
    
    
    
    //router.post('/logout', userController.logout);
    
};