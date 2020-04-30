'use strict';
var redis = require('redis');
var helper = require('./helper');
var redisai = require('../index');
redisai(redis)

describe('AI.TENSORGET tests', function () {
    var client;

    beforeEach(function (done) {
        client = redis.createClient();
        client.once('ready', function () {
            client.flushdb(done);
        });
    });

    it('negative ai_tensorget test', function (done) {
        client.ai_tensorget(["tensor1", "meta"], helper.isError(done));
        ;
    });

    afterEach(function () {
        client.end(true);
    });

});
