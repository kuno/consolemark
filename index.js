var fs             = require('fs'),
    path           = require('path');

exports.render     = require('./lib/render.js').render;
exports.renderSync = require('./lib/render.js').renderSync;

exports.version    = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'))).version;

