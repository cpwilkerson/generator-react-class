const request = require('supertest');
const server = require('./index');

describe('Server testing', () => {
  afterAll((done) => {
    server.close();
    done();
  });
  it('should return data on root route /', (done) => {
    request(server).
      get('/').
      expect('Content-Type', /html/).
      // expect('Content-Length', '882').
      expect(200).
      end((err) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
  it('should return time on /getTime', (done) => {
    request(server).
      get('/getTime').
      expect('Content-Type', /json/).
      expect(200, done);
  });
  it('should post person on /postPerson', (done) => {
    request(server).
      post('/postPerson').
      expect('Content-Type', /json/).
      expect(201, done);
  });
  it('should return star on *', (done) => {
    request(server).
      get('/blah').
      expect('Content-Type', /html/).
      expect(200).
      end((err) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});