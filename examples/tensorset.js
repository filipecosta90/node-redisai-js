'use strict';
var redis = require('redis');
var redisai = require('../index');
redisai(redis)

var client = redis.createClient();
client.ai_tensorset(['tensor1', 'float', 1]);
client.ai_tensorget(['tensor1', 'meta'], function (err, res) {
    console.log(res)
});
// Output should be
// [ 'dtype', 'FLOAT', 'shape', [ 1 ] ]
client.quit();
