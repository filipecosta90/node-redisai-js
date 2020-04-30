'use strict';
var redis = require('redis');
var node_redisai = require('../index');
var fs = require('fs');
node_redisai(redis);

var client = redis.createClient();
var model_blob = fs.readFileSync('./graph.pb');

client.ai_modelset(["mymodel", "TF", "CPU", "INPUTS", "a", "b", "OUTPUTS", "c", "BLOB", model_blob]);
client.ai_tensorset(["tA", "FLOAT", 2, "VALUES", 2, 3]);
client.ai_tensorset(["tB", "FLOAT", 2, "VALUES", 3, 5]);
client.ai_modelrun(["mymodel", "INPUTS", 'tA', 'tB', "OUTPUTS", 'tC']);
client.ai_tensorget(["tC", "VALUES"], function (err, res) {
    console.log(res);
});

// Output should be
// [ '6', '15' ]
client.quit();
