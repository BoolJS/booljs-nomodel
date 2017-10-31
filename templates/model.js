'use strict';

const NoModel = require('booljs.nomodel/model');
const objects = [];

module.exports = class {{name}}Model extends NoModel {
    constructor (app) {
        super();
        this.Error = app.Error;
        this.injector = app.utilities.ObjectInjector;
    }

    async list () {
        return objects;
    }

    async index (id) {
        for (let index in objects) {
            if (objects[index].id === id) {
                return index;
            }
        }

        return null;
    }

    async find (id) {
        let index = this.index(id);

        if (index === null) {
            throw new this.Error(
                404, '{{name}}_not_found',
                'The searched {{name}} wasn\'t in the list'
            );
        }

        return objects[index];
    }

    async update (id, object) {
        this.injector(this.find(id), object);
    }

    async delete (id) {
        let index = this.index(id);

        if (index === null) {
            throw new this.Error(
                404, '{{name}}_not_found',
                'The searched {{name}} wasn\'t in the list'
            );
        }

        objects.splice(index, 1);
    }
};
