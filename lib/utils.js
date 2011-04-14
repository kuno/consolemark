function sortMap(map) {

  　　if (map.length <= 1) { return map; }

  　　var pivotIndex = Math.floor(map.length / 2);

  　　var pivot = map.splice(pivotIndex, 1)[0];

  　　var left = [];

  　　var right = [];

  　　for (var i = 0; i < map.length; i++){

    　　　　if (map[i].start < pivot.start) {

      　　　　　　left.push(map[i]);

      　　　　} else {

      　　　　　　right.push(map[i]);

      　　　　}

    　　}

  　　return sortMap(left).concat([pivot], sortMap(right));

}

function fillSpaces(number) {
  var spaces = '', i;
  for (i = 0; i < number; ++i) {
    spaces += ' ';
  }

  return spaces;
}

exports.sortMap = sortMap;
exports.fillSpaces = fillSpaces;
