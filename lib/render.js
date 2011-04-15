var fs         = require('fs'),
    path       = require('path'),
    colors     = require('colors');

var sortMap    = require('./utils.js').sortMap,
    fillSpaces = require('./utils.js').fillSpaces;

var styles     = require('../include/meta.js').styles;
var openTags   = require('../include/meta.js').openTags;
var closeTags  = require('../include/meta.js').closeTags;


function _map(data) {
  var map = [], start = 0, end, ot, ct, style, i;

  for (i = 0; i < openTags.length; ++i) {
    ot = openTags[i];
    ct = closeTags[i];
    style = styles[i];
    while(data.match(ct) && data.match(ot)) {
      start = (data.match(ot)).index;
      end = (data.match(ct)).index + ct.length;
      map.push({start:start, end:end, style:style});
      data = data.replace(ot, fillSpaces(ot.length)).replace(ct, fillSpaces(ct.length));
    }
  }

  return sortMap(map);
}

function _parse(data) {
  var colorful = [], map = _map(data), 
      string, i, tail = 0, start, end;

  for (i = 0; i < map.length; i++) {   
    if (i === 0 && map[i] > 0) {       // first tag and NOT at begining
      colorful.push(data.slice(0, m[i].start - 1));
    } else if (i === map.length - 1) { // last tag
      if (map[i].start > tail) {  // if has plain text between this tag and previous one
        colorful.push(data.slice(tail, map[i].start));
      }

      string = data.slice(map[i].start + map[i].style.length + 2, map[i].end -  (map[i].style.length + 3));
      colorful.push(string[map[i].style]);

      if (map[i].end < data.length) {  // if has left plain text
        colorful.push(data.slice(map[i].end, data.length));        
      }
    } else {  // tags between first last one
      if (map[i].start > tail) {  // if has plain text between this tag and previous one
        colorful.push(data.slice(tail, map[i].start));
      }
      string = data.slice(map[i].start + map[i].style.length + 2, map[i].end -  (map[i].style.length + 3));
      colorful.push(string[map[i].style]);
    }

    tail = map[i].end;
  }

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
            callback(error, _parse(data));
        });
      }
  });
};

var renderSync = function(filePath) {
  var data;
  if (path.existsSync(filePath)) {
    data = fs.readFileSync(filePath, 'utf8');
    return _parse(data);
  } else {
    throw new Error('File not exists.');
  }
};

module.exports.render     = render;
module.exports.renderSync = renderSync;
