var fs        = require('fs'),
    path      = require('path'),
    colors    = require('colors');

var styles    = require('../include/meta.js').styles;
var openTags  = require('../include/meta.js').openTags;
var closeTags = require('../include/meta.js').closeTags;

function _hasTag(data) {
  openTags.forEach(function(t) {
      if (data.match(t)) {
        return true;
      }
  });

  return false;
}

function _split(data) {
  var content = [], start = 0, end,
      color, string, ct;

  openTags.forEach(function(ot) {
      if (data.match(ot)) {
        start = (data.match(ot)).index;
        content.push(data.substring(0, start));
        ct = closeTags[openTags.indexOf(ot)];
        end = (data.match(ct)).index + ct.length;
        color = ot.substring(1, ot.length - 1);
        string = data.substring(start + ot.length, end - ct.length);
        content.push({string:string, color:color});
        data = data.substring(end, data.length);
      }
  });

  if (_hasTag(data)) {
    _split(data);
  } else {
    content.push(data);
  }

  return content;
}

function _parse(content) {
  var colorful = [];

  content.forEach(function(c) {
      if (c.string && c.color) {
        styles.forEach(function(s) {
            if (s === c.color) {
              colorful.push(c.string[s]);
            }
        });
      } else {
        if (c) {
          colorful.push(c);
        }
      }
  });

  return colorful;
}


var render = function(filePath, callback) {
  var error;
  path.exists(filePath, function(exists) {
      if (!exists) {
        throw new Error('File not exists.');
      } else {
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {callback(err, null);}
            callback(error, _parse(_split(data)));
        });
      }
  });
};

var renderSync = function(filePath) {
  var data;
  if (path.exitsSync(filePath)) {
    data = fs.readFileSync(filePath, 'utf8');
    return _parse(_split(data));
  } else {
    throw new Error('File not exists.');
  }
};

module.exports.render     = render;
module.exports.renderSync = renderSync;
