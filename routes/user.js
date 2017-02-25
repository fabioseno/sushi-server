/*global module, require*/
module.exports = function (router) {
    'use strict';
    
    var userController = require('../controllers/user'),
        userValidation = require('../middlewares/user'),
        auth           = require('../middlewares/session').isLogged;
    
    // List All
    router.get('/users', auth, userController.list);
    
    // Search
    router.post('/users/search', auth, userController.search);
    
    // Get
    router.get('/user/:id', auth, userController.get);
    
    // Add
    router.put('/users', auth, userValidation.required, userValidation.passwordRequired, userValidation.loginExists, userValidation.emailExists, userController.add);
    
    // Change Password
    router.post('/user/:id/changePassword', auth, userValidation.passwordRequired, userController.changePassword);
    
    // Save
    router.post('/user/:id', auth, userValidation.required, userValidation.loginExists, userValidation.emailExists, userController.update);
    
    // Delete
    router['delete']('/user/:id', auth, userController.remove);
    
    // Login
    router.post('/login', userValidation.loginRequired, userValidation.passwordRequired, userController.login);
    
};