/*global require, module*/
var mongoose = require('mongoose'),
    sessionSchema = new mongoose.Schema({
        userId: {
            required: true,
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        expirationDate: {
            required: true,
            type: Date
        }
    });

sessionSchema.virtual('id').get(function () {
    'use strict';

    return this._id.toHexString();
});

module.exports = mongoose.model('Session', sessionSchema);