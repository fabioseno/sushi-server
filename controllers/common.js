/*global require, module*/
var auth = function (req, res, next) {
    'use strict';

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

    next();
},

    ping = function (req, res) {
        'use strict';

        res.send('Server is up and running!');
    };

module.exports = {
    auth: auth,
    ping: ping
};