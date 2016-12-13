/*global module, require*/
module.exports = function (router) {
    'use strict';
    
    var userController = require('../controllers/user'),
        userValidation = require('../middlewares/user'),
        session        = require('../middlewares/session');
    
    // List All
    router.get('/users', session.isLogged, userController.list);
    
    // Search
    router.post('/users/search', session.isLogged, userController.search);
    
    // Get
    router.get('/user/:id', session.isLogged, userController.get);
    
    // Add
    router.put('/users', session.isLogged, userValidation.required, userValidation.passwordRequired, userValidation.loginExists, userValidation.emailExists, userController.add);
    
    // Change Password
    router.post('/user/:id/changePassword', session.isLogged, userValidation.passwordRequired, userController.changePassword);
    
    // Save
    router.post('/user/:id', session.isLogged, userValidation.required, userValidation.loginExists, userValidation.emailExists, userController.update);
    
    // Delete
    router['delete']('/user/:id', session.isLogged, userController.remove);
    
    // Login
    router.post('/login', userValidation.loginRequired, userValidation.passwordRequired, userController.login);
    
};