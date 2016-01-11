/*global require, module, User*/
var Log         = require('../models/log'),
    pagination  = require('../utils/pagination');

module.exports.list = function (req, res) {
    'use strict';

    pagination.paginate(Log.find(), null, null, function (err, result) {
        if (err) {
            return res.send(err);
        }
        
        return res.send(result);
    });
};

module.exports.search = function (req, res) {
    'use strict';
    
    var pagingOptions = req.body.pagingOptions,
        sortOptions = req.body.sortOptions,
        query = Log.find();
    
    if (req.body.searchCriteria) {
        if (req.body.searchCriteria.moduleName) {
            query = query.where('moduleName', req.body.searchCriteria.moduleName);
        }

        if (req.body.searchCriteria.logType) {
            query = query.where('logType', req.body.searchCriteria.logType);
        }

        if (req.body.searchCriteria.userLogin) {
            query = query.where('userLogin', req.body.searchCriteria.userLogin);
        }

        if (req.body.searchCriteria.fromDate) {
            query = query.where('logDate').gte(req.body.searchCriteria.fromDate);
        }

        if (req.body.searchCriteria.toDate) {
            query = query.where('logDate').lte(req.body.searchCriteria.toDate);
        }
    }
    
    pagination.paginate(query, pagingOptions, sortOptions, function (err, result) {
        if (err) {
            return res.send(err);
        }
        
        return res.send(result);
    });
};

module.exports.add = function (req, res) {
    'use strict';

    var model = new Log(req.body);

    model.save(function (err, result) {
        if (err) {
            return res.send(err);
        }

        return res.send(result);
    });
};