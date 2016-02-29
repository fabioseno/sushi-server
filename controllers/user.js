/*global require, module, User*/
var User           = require('../models/user'),
    pagination     = require('../utils/pagination'),
    messageHandler = require('../utils/messageHandler');

module.exports.list = function (req, res) {
    'use strict';

    pagination.paginate(User.find(), null, null, function (err, result) {
        messageHandler.wrapResponse(res, err, result);
    });
};

module.exports.search = function (req, res) {
    'use strict';

    var pagingOptions = req.body.pagingOptions,
        sortOptions = req.body.sortOptions,
        query = User.find(),
        regex;

    if (req.body.searchCriteria) {
        if (req.body.searchCriteria.name) {
            regex = new RegExp(req.body.searchCriteria.name, 'i');

            query = query.or([{ 'firstName': { $regex: regex }}, { 'lastName': { $regex: regex }}]);
        }
        
        if (req.body.searchCriteria.login) {
            regex = new RegExp(req.body.searchCriteria.login, 'i');
            
            query = query.where('login', { $regex: regex });
        }
    }

    pagination.paginate(query, pagingOptions, sortOptions, function (err, result) {
        messageHandler.wrapResponse(res, err, result);
    });
};

module.exports.get = function (req, res) {
    'use strict';

    User.findById(req.params.id, '-password', function (err, result) {
        messageHandler.wrapResponse(res, err, result);
    });
};

module.exports.add = function (req, res) {
    'use strict';
    
    // validations
    if (req.validations && req.validations.length > 0) {
        return messageHandler.wrapResponse(res, req.validations);
    }

    var model = new User(req.body),
        data;

    req.body.creationDate = new Date();

    model = new User(req.body);

    model.save(function (err, result) {
        messageHandler.wrapResponse(res, err, result);
    });
};

module.exports.update = function (req, res) {
    'use strict';
    
    // validations
    if (req.validations && req.validations.length > 0) {
        return messageHandler.wrapResponse(res, req.validations);
    }

    var data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        status: req.body.status
    };

    User.findByIdAndUpdate(req.params.id, data, function (err, result) {
        messageHandler.wrapResponse(res, err, result);
    });
};

module.exports.remove = function (req, res) {
    'use strict';

    User.findByIdAndRemove(req.params.id, function (err, result) {
        messageHandler.wrapResponse(res, err, result);
    });
};

module.exports.login = function (req, res) {
    'use strict';

    User.findOneAndUpdate({ login: req.body.login, password: req.body.password, status: 'A' }, { lastLogin: new Date() }, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }

        if (user) {
            // change for update here
//            Session.remove({ email: req.body.email }, function (err, sessions) {
//                var session = new Session({ email: req.body.email, date: new Date() });
//
//                session.save(function (err, session) {
//                    res.header('X-SessionID', session.id);
//                    return res.send(dataMessage.wrap(err, user));
//                });
//            });
            res.json(user);
        } else {
            res.status(401).send('Usuário ou senha inválidos!');
        }
    });
};

module.exports.changePassword = function (req, res) {
    'use strict';
    
    User.findByIdAndUpdate(req.params.id, { password: req.body.password }, function (err, result) {
        messageHandler.wrapResponse(res, err, result);
    });
};