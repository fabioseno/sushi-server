/*global module*/
module.exports.wrapResponse = function (response, error, data) {
    'use strict';

    var result = {},
        messages = [];

    result.data = data;
    result.success = !error;

    if (error) {
        if (error instanceof Array) {
            messages = error;
        } else {
            messages.push(error);
        }

        result.$$messages = messages;

        if (response.statusCode === 200) {
            response.status(500);
        }
    }
    
    response.json(result);

};