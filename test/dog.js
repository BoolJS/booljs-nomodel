'use strict';

const Bool = require('booljs');

const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;

const supertest = require('supertest-as-promised');

describe('Dog', function () {
    let app, Dog, dogDao, agent;

    before(async () => {
        let api = new Bool('com.example.api', [ require.resolve('..') ])
            .setBase('example')
            .setDatabaseLoader('booljs.nomodel')
            .run();

        app = api.app;
        Dog = new app.models.Dog();
        dogDao = new app.dao.Dog();
        agent = supertest(api.server);
    });

    describe('Plugin', () => {
        it('Model template should retrieve the model file', () => {
            var Plugin = require('..');
            return expect(new Plugin().modelTemplate()).to.exist;
        });
    });

    describe('Model', () => it('retrieves an empty list', () => {
        return expect(Dog.list()).to.eventually.have.length(0);
    }));

    describe('DAO', () => it('retrieves an empty list', () => {
        return expect(dogDao.list()).to.eventually.have.length(0);
    }));

    describe('Controller', () => it('retrieves an empty list', () => {
        return agent.get('/dog').expect(200).then((response) => {
            expect(response.body.data).to.have.length(0);
        });
    }));
});
