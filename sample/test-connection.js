var Process = require('../process/process');

var Connection = require('../connection/connection');

console.log('Connection Status: ', Connection.status);
new Process().testConnection();
// wait to set status of connection
setTimeout(function () {
    console.log('Connection Status: ', Connection.status);
}, 2000);