/*global module, require*/
var config  = require('../config/server.conf.json');

module.exports.paginate = function (query, pagingOptions, sortOptions, callback) {
    'use strict';

    query.count(function (err, totalItems) {
        var currentPage,
            pageSize,
            totalPages,
            result = {
                page: {}
            };

        query.find();

        if (pagingOptions) {
            currentPage = pagingOptions.currentPage;
            pageSize = pagingOptions.pageSize;
        }

        // default values
        if (!currentPage) { currentPage = 1; }
        if (!pageSize) { pageSize = config.paging.pageSize; }

        // number of pages
        query.limit(pageSize);

        if (currentPage) {
            query.skip((currentPage - 1) * pageSize);
        }

        totalPages = Math.ceil(totalItems / pageSize);

        // sorting
        if (sortOptions) {
            query.sort(sortOptions.field);
        }

        result.page.totalItems = totalItems;
        result.page.pageSize = pageSize;
        result.page.totalPages = totalPages;
        result.page.currentPage = currentPage;
        
        query.exec(function (err, list) {
            result.list = list;
            callback(err, result);
        });
    });
};