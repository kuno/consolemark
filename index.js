var fs = require('fs'),
    path = require('path');

exports.render = require('./lib/render.js');

exports.version = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json')));

