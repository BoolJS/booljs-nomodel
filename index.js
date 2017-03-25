'use strict';

var fs      = require('fs')
,   path    = require('path')
,   async   = require('async');

var API = require('booljs.api');

module.exports = class BoolJSNoModel extends API.DatabaseLoader{
    constructor() {
        super('booljs.nomodel');
    }

    /** @ignore */
    openDatabase(config) {
        return q.resolve();
    }

    /** @ignore */
    fetchModels(_instance, models) {
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
    /** @ignore */
    modelTemplate() {
        return fs.readFileSync(path.join(
            require.resolve('.'), '../templates/model.js'
        ));
    }

    /** @ignore */
    modelConfiguration() {
        return false;
    }
};
