let icons = [
  "birthday-cake",
  "paw",
  "magic",
  "codepen",
  "plane",
  "car",
  "camera-retro",
  "gift"
];

let allIcons = icons.concat(icons);

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

shuffleArray(allIcons);