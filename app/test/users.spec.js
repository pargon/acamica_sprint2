/* global describe it before */

const sinon = require('sinon');
const request = require('supertest');
const database = require('../src/model');

const { makeServer } = require('../src/server');

describe('Api test Get users', () => {
  before(() => {
    const vFindOne = sinon.stub();
    vFindOne.onCall(0).returns(null);
    vFindOne.onCall(1).returns(null);
    vFindOne.onCall(2).returns({
      id: 1,
      userid: 'userfalso1',
      nombre: 'nombrefalso1',
    });

    const ModeloFalso = {
      findAll() {
        return Promise.resolve([
          {
            id: 1,
          },
        ]);
      },
      findOne: vFindOne,
      create: sinon.mock().atLeast(1).returns(null),
    };
    sinon.stub(database, 'getModel').returns(ModeloFalso);
    /*
    sinon.stub(database, 'getModel').callsFake((modelName) => {
      if (modelName === 'UserModel') {
        return ModeloFalso;
      }
      return null;
    });
    */
  });

  it('return list of users', (done) => {
    const server = makeServer();

    request(server)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '10')
      .expect(200)
      .end(done);
  });

  it('return new user', (done) => {
    const server = makeServer();
    request(server)
      .post('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(
        {
          id: 1,
          userid: 'userfalso1',
          nombre: 'nombrefalso1',
        },
        done,
      );
  });
});
