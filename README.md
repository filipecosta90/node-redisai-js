[![license](https://img.shields.io/github/license/RedisAI/redisai-js.svg)](https://github.com/RedisAI/redisai-js)
[![CircleCI](https://circleci.com/gh/RedisAI/redisai-js/tree/master.svg?style=svg)](https://circleci.com/gh/RedisAI/redisai-js/tree/master)
[![npm version](https://badge.fury.io/js/redisai-js.svg)](https://badge.fury.io/js/redisai-js)

# A high performance Node.js RedisAI client, on top of [node_redis](https://github.com/NodeRedis/node_redis)
[![Forum](https://img.shields.io/badge/Forum-RedisAI-blue)](https://forum.redislabs.com/c/modules/redisai)
[![Gitter](https://badges.gitter.im/RedisLabs/RedisAI.svg)](https://gitter.im/RedisLabs/RedisAI?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

This package allows [node_redis](https://github.com/NodeRedis/node_redis) (2.8+) to interface with the [RedisAI module](http://redisai.io/).

To use this module, you will need Redis 4.0 or higher and the RedisAI module installed.

## Usage

The RedisAI commands will be mapped to javascript-friendly names (`ai.tensorset` becomes `client.ai_tensorset`).

```js
var
   redis    = require('redis'),
   redisai  = require('redisai-js');

redisai(redis);
```


## Example 



## Running Models
Once a RedisAI Model key has been set with `AI.MODELSET` it can be run with any Tensor keys from the database as its input. The model's output, after it was executed, is stored in RedisAI Tensors as well.
Here is a quick example!

The inputs for the example are the tensors stored under the 'tA' and 'tB' keys. Once the model's run had finished, a new RedisAI Tensor key called 'tC' is created and stores the model's output.

```javascript
var redis = require('redis');
var redisai = require('redisai-js');
var fs = require('fs')
redisai(redis);

var client = redis.createClient();
var model_blob = fs.readFileSync('./examples/graph.pb');

client.ai_modelset(["mymodel", "TF", "CPU", "INPUTS", "a", "b", "OUTPUTS", "c", "BLOB", model_blob]);
client.ai_tensorset(["tA", "FLOAT", 2, "VALUES", 2, 3]);
client.ai_tensorset(["tB", "FLOAT", 2, "VALUES", 3, 5]);
client.ai_modelrun(["mymodel", "INPUTS", 'tA', 'tB', "OUTPUTS", 'tC']);
client.ai_tensorget(["tC", "VALUES"], function (err, res) {
    console.log(res)
});

// Output should be
// [ '6', '15' ]
client.quit();
```


