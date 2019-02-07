//
const helpers = require('./../lib/helpers');
const assert = require('assert');
const logs = require('./../lib/logs');
const exampleDebuggingProblem = require('./../lib/exampleDebuggingProblem');
//
//
const unit = {};

unit['helpers.getANumber should return a number'] = done => {
    const val = helpers.getANumber();
    assert.equal(typeof(val), 'number');
    done();
};
//
unit['helpers.getANumber should return 1'] = done => {
    const val = helpers.getANumber();
    assert.equal(val, 1);
    done();
};
//
unit['helpers.getANumber should return 2'] = done => {
    const val = helpers.getANumber();
    assert.equal(val, 2);
    done();
};
//
unit['exampleDebuggingProblem init should not throw when called'] = done => {
    assert.doesNotThrow(() => {
        exampleDebuggingProblem.init();
        done()
    }, TypeError);
};
//
unit['logs.list should callback a false error and an array of log names'] = function(done){
    logs.list(true,function(err,logFileNames){
        assert.equal(err, false);
        assert.ok(logFileNames instanceof Array);
        assert.ok(logFileNames.length > 1);
        done();
    });
};
//
unit['logs.truncate should callback a false error and an array of log names'] = function(done){
    logs.list(true,function(err,logFileNames){
        assert.equal(err, false);
        assert.ok(logFileNames instanceof Array);
        assert.ok(logFileNames.length > 1);
        done();
    });
};
//
//
//
module.exports = unit;
