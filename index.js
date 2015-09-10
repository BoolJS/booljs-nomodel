/* jshint node: true, laxcomma: true */
'use strict';

var async = require('async');

function wrapModel(_instance, model) {
    var Model = require(model);

    return function () {
        return new Model(_instance.getComponents());
    };
}

module.exports = {
    openDatabase: function (config) {
        return q.resolve();
    },
    fetchModels: function (_instance, models) {
        var fetch = q.nbind(async.forEachOfSeries, async);

        return fetch(models, function (path, model, next) {
            var _model = wrapModel(_instance, path);

            _instance.insertComponent(
                model, _model, _instance.getComponents().models
            );
            next();
        });
    }
};
