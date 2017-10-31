'use strict';

const NoModel = require('./model');
const { join } = require('path');
const { readFileSync } = require('fs');
const { DatabaseLoader } = require('booljs.api');

module.exports = class BoolJSNoModel extends DatabaseLoader {
    constructor () {
        super('booljs.nomodel');
    }

    /** @ignore */
    async openDatabase (config) {}

    modelClass () { return NoModel; }

    /** @ignore */
    async fetchModels (connection, Model, instance) {
        let modelClass = this.modelClass();
        return class extends modelClass {
            constructor (...params) {
                return new (Function.prototype.bind.apply(Model, [
                    null, instance.getComponents()
                ].concat(params)))();
            }
        };
    }

    /** @ignore */
    modelTemplate () {
        return readFileSync(
            join(require.resolve('.'), '../templates/model.js')
        );
    }

    /** @ignore */
    modelConfiguration () {
        return false;
    }
};
