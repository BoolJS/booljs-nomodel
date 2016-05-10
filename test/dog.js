/* global describe, before, it */ /* jshint -W030 */
'use strict';

describe('Dog', function () {
    var booljs      = require('bool.js')
    ,   chai        = require('chai')
    ,   asPromised  = require('chai-as-promised')
    ,   supertest   = require('supertest-as-promised')
    ,   app, Dog, dogDao, agent;

    chai.use(asPromised);
    var expect      = chai.expect;

    before(() => {
        return (
            booljs('com.example.api', [ require.resolve('..') ])
            .setBase('example')
            .setDatabaseLoader('booljs-nomodel')
            .run()
        ).then(function (api) {
            app = api.app;
            Dog = new app.models.Dog();
            dogDao = new app.dao.Dog();
            agent = supertest(api.server);
            return q.resolve();
        });
    });

    describe('Plugin', () => {

        it('Model template should retrieve the model file', () => {
            var Plugin = require('..');
            expect(new Plugin().modelTemplate()).to.exist;
        });
    });

    describe('Model', () => {
        it('retrieves an empty list', () => {
            return expect(Dog.list()).to.eventually.have.length(0);
        });
    });

    describe('DAO', () => {
        it('retrieves an empty list', () => {
            return expect(dogDao.list()).to.eventually.have.length(0);
        });
    });

    describe('Controller', () => {

        it('retrieves an empty list', () => {
            return agent.get('/dog').expect(200).then((response) => {
                expect(response.body.data).to.have.length(0);
            });
        });

    });

});
