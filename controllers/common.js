/*global require, module*/
module.exports.auth = function (req, res, next) {
    'use strict';

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

    next();
};

module.exports.ping = function (req, res) {
    'use strict';

    res.send('Server is up and running!');
};