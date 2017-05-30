(function () {
  /**
   * @syncprocess 
   */
  var syncprocess = require('child_process').execSync;
  // require dns
  var dns = require('dns');
  //require object single static connection
  var Connection = require('../connection/connection');
  /**
   * Process
   * @description CREATE OBJECT PROCESS
   */
  var Process = (function () {
    function Process() {
      console.info('Process Init');
    }
    // this url represent url to test
    Process.prototype.url = 'www.google.com';
    // add dns attribute to control test url
    Process.prototype.dns = dns;
    /**
     * @execute syncprocess to command
     */
    Process.prototype.execute = function (command) {
      return syncprocess(command, {
        encoding: 'utf8'
      });
    };
    /**
     * @testConnection to set status from OBJECT Connection status 
     */
    Process.prototype.testConnection = function () {
      // force timeout in 1000ms
      this.dns.TIMEOUT = 1000;
      // resolve dns set status
      this.dns.resolve(this.url, function (error) {
        Connection.status = (error ? 'not_connected' : 'connected');
      });
    }

    return Process;

  })();

  module.exports = Process;

}).call(this);