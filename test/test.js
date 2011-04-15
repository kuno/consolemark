var util = require('util');
consolemark = require('../index.js');


// Asynchonous method
consolemark.render('../example/example.cmk', function(err, data) {
    if (err) {throw err;}
    if (typeof data === 'string') {
      util.puts(data);
    } else if (data.constructor === Array) {
      data.forEach(function(d) {
          util.print(d);
      });
    } else {
      util.puts(data);
    }
});

// Synchronous method
var colorful = consolemark.renderSync('../example/howto.cmk');

colorful.forEach(function(c) {
    util.print(c);
});
