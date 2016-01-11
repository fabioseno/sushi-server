/*global require, module*/
module.exports = function (app) {
    'use strict';

    require('./common')(app);
    require('./log')(app);
    require('./user')(app);
    
};