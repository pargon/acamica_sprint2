/* global describe it beforeEach */

const sinon = require('sinon');
const request = require('supertest');
const database = require('../src/model');
const { makeServer } = require('../src/server');

describe('Api users test', () => {
  beforeEach(() => {
    const ModeloFalso = {
      findAll() {
        return Promise.resolve([
          {
            id: 1,
          },
        ]);
      },
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
});
