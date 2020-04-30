// helper retrieved from
// https://github.com/NodeRedis/node-redis/blob/master/test/helper.js

'use strict';
var assert = require('assert');
var path = require('path');


function arrayHelper(results) {
    if (results instanceof Array) {
        assert.strictEqual(results.length, 1, 'The array length may only be one element');
        return results[0];
    }
    return results;
}

module.exports = {
    isNumber: function (expected, done) {
        return function (err, results) {
            assert.strictEqual(err, null, 'expected ' + expected + ', got error: ' + err);
            results = arrayHelper(results);
            assert.strictEqual(results, expected, expected + ' !== ' + results);
            assert.strictEqual(typeof results, 'number', 'expected a number, got ' + typeof results);
            if (done) done();
        };
    },
    isString: function (str, done) {
        str = '' + str; // Make sure it's a string
        return function (err, results) {
            assert.strictEqual(err, null, "expected string '" + str + "', got error: " + err);
            results = arrayHelper(results);
            if (Buffer.isBuffer(results)) { // If options are passed to return either strings or buffers...
                results = results.toString();
            }
            assert.strictEqual(results, str, str + ' does not match ' + results);
            if (done) done();
        };
    },
    isNull: function (done) {
        return function (err, results) {
            assert.strictEqual(err, null, 'expected null, got error: ' + err);
            results = arrayHelper(results);
            assert.strictEqual(results, null, results + ' is not null');
            if (done) done();
        };
    },
    isUndefined: function (done) {
        return function (err, results) {
            assert.strictEqual(err, null, 'expected null, got error: ' + err);
            results = arrayHelper(results);
            assert.strictEqual(results, undefined, results + ' is not undefined');
            if (done) done();
        };
    },
    isError: function (done) {
        return function (err, results) {
            assert(err instanceof Error, "err is not instance of 'Error', but an error is expected here.");
            if (done) done();
        };
    },
    isNotError: function (done) {
        return function (err, results) {
            assert.strictEqual(err, null, 'expected success, got an error: ' + err);
            if (done) done();
        };
    },
    isType: {
        number: function (done) {
            return function (err, results) {
                assert.strictEqual(err, null, 'expected any number, got error: ' + err);
                assert.strictEqual(typeof results, 'number', results + ' is not a number');
                if (done) done();
            };
        },
        string: function (done) {
            return function (err, results) {
                assert.strictEqual(err, null, 'expected any string, got error: ' + err);
                assert.strictEqual(typeof results, 'string', results + ' is not a string');
                if (done) done();
            };
        },
        positiveNumber: function (done) {
            return function (err, results) {
                assert.strictEqual(err, null, 'expected positive number, got error: ' + err);
                assert(results > 0, results + ' is not a positive number');
                if (done) done();
            };
        }
    }
};
