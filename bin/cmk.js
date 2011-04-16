#! /usr/bin/env node

var path        = require('path'),
    util        = require('util'),
    consolemark = require('../index.js');

var argv = process.argv;

if (argv[2] === '-v' || argv[2] === '--version') {      // version
  util.puts(consolemark.version);
} else if (argv[2] === '-h' || argv[2] === '--help') {  // help
  var help = path.join(__dirname, '../doc/help.cmk');
  consolemark.render(help, function(err, colorful) {
      if (err) {throw err;}
      colorful.forEach(function(c) {
          util.print(c);
      });
  });
} else {  // a path to file
  consolemark.render(argv[2], function(err, colorful) {
      if (err) {throw err;}
      colorful.forEach(function(c) {
          util.print(c);
      });
  });
}
