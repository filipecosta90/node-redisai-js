'use strict';
var redis = require('redis');
var helper = require('./helper');
var redisai = require('../index');
var assert = require('assert');
var fs = require('fs')

redisai(redis)

var model_blob = fs.readFileSync('./test/test_data/graph.pb');

describe('AI.MODELRUN tests', function () {
    var client;

    beforeEach(function (done) {
        client = redis.createClient();
        client.once('ready', function () {
            client.flushdb(done);
        });
    });

    it('positive ai_modelset test', function (done) {
        client.ai_modelset(["mymodel", "TF", "CPU", "INPUTS", "a", "b", "OUTPUTS", "c", "BLOB", model_blob], helper.isString('OK'));
        client.ai_tensorset(["tA", "FLOAT", 2, "VALUES", 2, 3], helper.isString('OK'));
        client.ai_tensorset(["tB", "FLOAT", 2, "VALUES", 3, 5], helper.isString('OK'));
        client.ai_modelrun(["mymodel", "INPUTS", 'tA', 'tB', "OUTPUTS", 'tC'], helper.isString('OK'));
        client.ai_tensorget(["tC", "VALUES"], function (err, res) {
            assert.deepEqual(res, [6, 15]);
            return done(err);
        });
    });

    afterEach(function () {
        client.end(true);
    });

});
