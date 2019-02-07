const http = require('http');
const assert = require('assert');
const app = require('./../index-strict.js');
const config = require('./../lib/config');
//
const api = {};
//
const helpers = {};
//
helpers.makeGetRequest = (path, callback) => {
    const requestDetails = {
        'protocol': 'http:',
        'hostname': 'localhost',
        'port': config.httpPort,
        'method': 'GET',
        'path': path,
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    const req = http.request( requestDetails, res => {
        callback(res);
    });
    req.end()
};
//
api['appi.init should start without throwing'] = done => {
    assert.doesNotThrow(() => {
        app.init( err => {
            done()
        }, TypeError)
    })
};  
//
api['/ping should GET respond with status code 200'] = done => {
    helpers.makeGetRequest('/ping', res => {
        assert.equal(res.statusCode, 200);
        done();
    })
}
//
api['/api/users should GET respond with status code 400'] = done => {
    helpers.makeGetRequest('/api/users', res => {
        assert.equal(res.statusCode, 400);
        done();
    })
}
//
api['random path should GET respond with status code 404'] = done => {
    helpers.makeGetRequest('/this/path/should/not/exist', res => {
        assert.equal(res.statusCode, 404);
        done();
    })
}

module.exports = api;