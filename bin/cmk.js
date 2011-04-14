#! /usr/bin/env node

var util        = require('util'),
    consolemark = require('../index.js');

var argv = process.argv;

if (argv[2] === '-v') {  // version
  util.puts(consolemark.version);
} else if (argv[2] === '-h') {  // help
} else {  // a path to file
  consolemark.render(argv[2], function(err, colorful) {
      if (err) {throw err;}
      colorful.forEach(function(c) {
          util.print(c);
      });
  });
}
