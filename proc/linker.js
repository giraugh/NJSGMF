
/*
   Note to self and whomever it may concern:
      the variables loaded from here, core & game are seperate to those
      defined by the main.js & index.js variables
 */
console.log('Linking Node Modules...');

window.reqall = require('require-all');

window.props = require('./proc/props');

window.remote = require('electron').remote;

console.log('Linking Game Elements...');

require('./core');

require('./game');
