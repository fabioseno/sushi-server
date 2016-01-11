/*global require, module*/
var mongoose = require('mongoose'),
    userSchema = new mongoose.Schema({
        firstName: {
            required: true,
            type: String,
            trim: true
        },
        lastName: {
            required: true,
            type: String,
            trim: true
        },
        email: {
            required: true,
            type: String,
            trim: true
        },
        birthday: {
            required: true,
            type: Date
        },
        login: {
            required: true,
            type: String
        },
        password: {
            required: true,
            type: String
        },
        status: {
            required: true,
            type: String
        },
        creationDate: {
            required: true,
            type: Date
        },
        lastLogin: {
            type: Date
        },
        status: {
            required: true,
            type: String
        }
    });

module.exports = mongoose.model('User', userSchema);