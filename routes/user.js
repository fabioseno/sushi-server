/*global module, require*/
module.exports = function (router) {
    'use strict';
    
    var userController = require('../controllers/user'),
        userValidation = require('../middlewares/user');
    
    // List All
    router.get('/users', userController.list);
    
    // Search
    router.post('/users/search', userController.search);
    
    // Get
    router.get('/user/:id', userController.get);
    
    // Add
    router.put('/users', userValidation.required, userValidation.passwordRequired, userValidation.loginExists, userValidation.emailExists, userController.add);
    
    // Change Password
    router.post('/user/:id/changePassword', userValidation.passwordRequired, userController.changePassword);
    
    // Save
    router.post('/user/:id', userValidation.required, userValidation.loginExists, userValidation.emailExists, userController.update);
    
    // Delete
    router['delete']('/user/:id', userController.remove);
    
    // Login
    router.post('/login', userValidation.loginRequired, userValidation.passwordRequired, userController.login);
    
};