/*global module, rqeuire*/
module.exports.paginate = function (model, filter, pagingOptions, sortOptions, callback) {
    'use strict';

    model.count(filter, function (err, total) {
        var currentPage,
            pageSize,
            totalPages,
            query = model.find(filter),
            result = {};

        query.find(filter);
  
        if (pagingOptions) {
            currentPage = pagingOptions.currentPage;
            pageSize = pagingOptions.pageSize;

            if (pageSize) {
                query.limit(pageSize);

                if (currentPage) {
                    query.skip((currentPage - 1) * pageSize);
                }

                totalPages = Math.ceil(total / pageSize);
            }
        }

        if (sortOptions) {
            query.sort(sortOptions.field);
        }

        result = {
            page: {
                totalItems: total,
                totalPages: totalPages,
                currentPage: currentPage
            }
        };

        callback(query, result);
    });
};