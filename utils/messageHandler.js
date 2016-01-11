/*global module*/
module.exports.wrapResponse = function (response, error, result, onError, onData, onNotData) {
    'use strict';

    if (error) {
        if (onError) {
            onError();
        } else {
            response.status(500).send(error);
        }
    }
    
    if (result) {
        if (onData) {
            onData();
        } else {
            response.send(result);
        }
    } else {
        if (onNotData) {
            onNotData();
        } else {
            response.send(result);
        }
    }
    
};