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

let lifeIcons = ["heart", "heart", "heart"];

let allIcons = icons.concat(icons);
let life = 0;
let numMistakes = 0;
let numClicks = 0;
let score = 0;
let tileOne = "";
let tileTwo = "";
let tileOneClassList;
let tileOneID;
let tileTwoID;
let lifeElementID = document.getElementById("life");

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

shuffleArray(allIcons);

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function addIconsToCard(i) {
  let tileIcon = "fa fa-"+allIcons[i];
  let addTileToHtml = "<li class='tile' data-item="+i+"><i class='"+tileIcon+"'></i></li>";
  const cardId = document.getElementById("outer-card");
  cardId.appendChild(createElementFromHTML(addTileToHtml));
}

for(let i=0; i<allIcons.length; i++) {
  addIconsToCard(i);
}