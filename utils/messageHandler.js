/*global module*/
module.exports.wrapResponse = function (response, error, data, onError, onData, onNotData) {
    'use strict';
    
    var result = {},
        messages = [];

    if (data) {
        if (onData) {
            onData();
        } else {
            result = data;
        }
    } else {
        if (onNotData) {
            onNotData();
        }
    }
    
    if (error) {
        if (onError) {
            onError();
        } else {
            if (error instanceof Array) {
                messages = error;
            } else {
                messages.push(error);
            }

            result.$$messages = messages;

            response.status(500).send(result);
        }
    } else {
        response.send(result);
    }
    
};