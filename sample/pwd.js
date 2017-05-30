var Process = require('../process/process');

console.log(new Process().execute('pwd'));
console.log(new Process().execute('ls -la'));