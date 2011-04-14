var fs = require('fs'),
    path = require('path'),
    colors = require('colors');

var openTags = require('../include/meta.js').openTags;
var closeTags = require('../include/meta.js').closeTags;

function _hasTag(data) {
  var hasTag = false;
  openTags.forEach(function(t) {
      if (data.match(t)) {
        hasTag = true;
        break;
      }
  });

  return hasTag;
}

function _split(data) {
  var content = [], start = 0, end,
      color, string;

  openTags.forEach(function(ot) {
      if (data.match(ot)) {
        start = (data.match(ot)).index;
        content.push(0, start);
        ct = closeTags[openTags.indexOf(ot)];
        end = (data.match(ct)).index + ct.length;
        color = ot.substring(1, ot.length - 1);
        string = substring(start + op.length, end - ct.length);
        content.push({string:string, color:color});
        data = data.substring(start, end);
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
  var colorfuleContent = [];

  content.forEach(function(c) {
      if (c.string && c.color) {
        styles.forEach(function(s) {
            if (s === c.color) {
              colorfuleContent.push(c.string[s]);
            }
        });
      } else {
        colorfuleContent.push(c);
      }
  });

  return colorfuleContent;
}

var render = function(filePath) {
};

var renderSync = function(filePath, callback) {
  path.exits(filePath, function(exits) {
      if (!exits) {
        throw new Error('File not exits.');
      } else {
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {throw err;}
            callback(_parse(_split(data)));
        });
      }
  });
};

module.exports.render = render;
module.exports.renderSync = renderSync;
