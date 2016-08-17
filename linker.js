//Require the libraries and code
console.log('Linking Node Modules...')
window.reqall = require('require-all');
window.props = require('./props');
window.remote = require('electron').remote;
console.log('Linking Game Elements...');
require('./core');
require('./game');
