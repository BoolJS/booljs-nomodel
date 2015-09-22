'use strict';

var async   = require('async')
,   API     = require('bool.js/api');

module.exports = new API.DatabaseLoader('booljs-nomodel', {
    openDatabase: function (config) {
        return q.resolve();
    },
    fetchModels: function (_instance, models) {
        var fetch = q.nbind(async.forEachOfSeries, async);

        return fetch(models, function (path, model, next) {
            var Model = require(path);

            var _model = function () {
                return new Model(_instance.getComponents());
            };
            _instance.insertComponent(
                model, _model, _instance.getComponents().models
            );

            next();
        });
    }
});
