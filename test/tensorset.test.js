'use strict';
var redis = require('redis');
var helper = require('./helper');
var node_redisai = require('../index');
node_redisai(redis);

describe('AI.TENSORSET tests', function () {
    var client;

    beforeEach(function (done) {
        client = redis.createClient();
        client.once('ready', function () {
            client.flushdb(done);
        });
    });

    it('positive ai_tensorset test', function (done) {
        client.ai_tensorset(["tensor1", "float", 1, 1], helper.isString('OK', done));
    });

    it('negative ai_tensorset test', function (done) {
        client.ai_tensorset(["tensor1", "wrong_format", 1, 1], helper.isError(done));
    });

    afterEach(function () {
        client.end(true);
    });

});
