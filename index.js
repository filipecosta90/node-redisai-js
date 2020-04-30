// ^v0.9 Commands
const redisaiCommands = ["ai.tensorset", "ai.tensorget", "ai.modelset", "ai.modelget", "ai.modeldel", "ai.modelrun", "ai._modelscan", "ai.scriptset", "ai.scriptget", "ai.scriptdel", "ai.scriptrun", "ai.dagrun", "ai.info", "ai.config"];

function addRedisAICommands(redis) {
    redisaiCommands.forEach(redis.addCommand);
}

module.exports = addRedisAICommands;