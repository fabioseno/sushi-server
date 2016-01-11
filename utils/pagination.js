/*global module*/
module.exports.paginate = function (query, pagingOptions, sortOptions, callback) {
    'use strict';

    query.count(function (err, total) {
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

            if (pageSize) {
                query.limit(pageSize);

                if (currentPage) {
                    query.skip((currentPage - 1) * pageSize);
                }

                totalPages = Math.ceil(total / pageSize);
                
                result.page.pageSize = pagingOptions.pageSize;
            }
        }

        if (sortOptions) {
            query.sort(sortOptions.field);
        }

        result.page.totalItems = total;
        
        if (totalPages) {
            result.page.totalPages = totalPages;
        }
        
        if (currentPage) {
            result.page.currentPage = currentPage;
        }
        
        query.exec(function (err, list) {
            result.list = list;
            callback(err, result);
        });
    });
};