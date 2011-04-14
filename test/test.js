var util = require('util');
consolemark = require('consolemark');

consolemark.render('./test.cmk', function(err, data) {
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

