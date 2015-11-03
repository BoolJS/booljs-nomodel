'use strict';

var fs      = require('fs')
,   path    = require('path')
,   async   = require('async');

var API;
try {
    API = require('bool.js/api');
} catch (e) {
    API = require('booljs-api');
}

module.exports = new API.DatabaseLoader('booljs-nomodel', {
    /** @ignore */ openDatabase: function (config) {
        return q.resolve();
    },
    /** @ignore */ fetchModels: function (_instance, models) {
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
    },
    /** @ignore */ modelTemplate: function () {
        return fs.readFileSync(path.join(
            require.resolve('.'), '../templates/model.js'
        ));
    },
    /** @ignore */ modelConfiguration: function () {
        return false;
    }
});
