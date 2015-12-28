/*global require, module, User*/
var Log         = require('../models/log'),
    pagination  = require('../utils/pagination');

module.exports.list = function (req, res) {
    'use strict';

    Log.find(function (err, logs) {
        res.send(logs);
    });
};

module.exports.search = function (req, res) {
    'use strict';
    
    var filter = {},
        pagingOptions = req.body.pagingOptions,
        sortOptions = req.body.sortOptions;

    if (req.body.searchCriteria.moduleName) {
        filter.moduleName = req.body.searchCriteria.moduleName;
    }

    if (req.body.searchCriteria.logType) {
        filter.logType = req.body.searchCriteria.logType;
    }

    if (req.body.searchCriteria.userLogin) {
        filter.userLogin = req.body.searchCriteria.userLogin;
    }

    if (req.body.searchCriteria.fromDate || req.body.searchCriteria.toDate) {
        filter.logDate = {};

        if (req.body.searchCriteria.fromDate) {
            filter.logDate.$gte = new Date(req.body.searchCriteria.fromDate);
        }

        if (req.body.searchCriteria.toDate) {
            filter.logDate.$lte = new Date(req.body.searchCriteria.toDate);
        }
    }
    
    pagination.paginate(Log, filter, pagingOptions, sortOptions, function (query, result) {
        query.exec(function (err, list) {
            if (err) {
                return res.json(err);
            }

            result.list = list;
            return res.json(result);
        });
    });
};

module.exports.add = function (req, res) {
    'use strict';

    var model = new Log(req.body);

    model.save(function (err, result) {
        if (err) {
            return res.json(err);
        }

        return res.json(result);
    });
};