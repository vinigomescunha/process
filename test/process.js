'use strict';

var Process = require('../process/process');
var Connection = require('../connection/connection');

var expect = require("chai").expect;
var process = new Process();
var execution;

describe('Test: Process!', function () {
  it('should test run correctly', function (done) {
    execution = process.execute("echo '1'");
    expect(execution.trim()).equal('1');
    // Useful for async tests.
    done();
  });

  it('should test alias return', function (done) {
    //set alias
    execution = process.execute("export test1='hello';echo $test1");
    expect(execution.trim()).equal('hello');
    // Useful for async tests.
    done();
  });

  it('should pwd return', function (done) {
    //set alias
    execution = process.execute("echo $PWD");
    expect(execution.trim()).not.to.be.undefined;
    // Useful for async tests.
    done();
  });

  it('should try Connection success', function (done) {
    // mocha set delay
    this.timeout = 2000;
    // set initial status to test
    Connection.status = null;
    // set static url to test
    process.url = 'www.google.com';
    process.dns = {
      TIMEOUT: 1000,
      resolve: function (url, callback) {
        console.log('Mocking url:', url);
        // mock callback to return true - is connected
        callback(true);
      }
    };
    execution = process.testConnection();
    setTimeout(function () {
      expect(execution.trim()).not.to.be.null;
    }, 2000);
    // Useful for async tests.
    done();
  });

  it('should try Connection error', function (done) {
    // mocha set delay
    this.timeout = 2000;
    // set initial status to test
    Connection.status = null;
    // set static url to test
    process.url = '';
    process.dns = {
      TIMEOUT: 1000, // set timeout initial
      resolve: function (url, callback) {
        console.log('Mocking url:', url);
        // mock callback to return true - is connected false
        callback(false);
      }
    };
    execution = process.testConnection();
    setTimeout(function () {
      expect(execution.trim()).not.to.be.null;
    }, 2000);
    // Useful for async tests.
    done();
  });

});