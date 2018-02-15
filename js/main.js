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

let starIcons = ["star", "star", "star"];

let allIcons = icons.concat(icons);
let star = 4;
let movesCount = 3;
let numMistakes = 0;
let numClicks = 0;
let score = 0;
let tileOne = "";
let tileTwo = "";
let tileOneClassList;
let tileOneID;
let tileTwoID;
let starElementID = document.getElementById("star");

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

function addStarIcon(i) {
  let starIcon = "fa fa-"+starIcons[i];
  let addStarToHtml = "<li class='star-icon' data-item="+i+"><i class='"+starIcon+"'></i></li>";
  const starElement = createElementFromHTML(addStarToHtml);
  starElementID.appendChild(starElement);
}

for(let i=0; i<starIcons.length; i++) {
  addStarIcon(i);
}

function respondToClick(event) {
  let tileClassList = event.target.classList;
  let tileItemNum = event.target.getAttribute('data-item');
  if(numClicks % 2 === 0) {
    tileOneClassList = tileClassList;
    tileOne = allIcons[tileItemNum];
    tileOneClassList.add('open');
  } else {
    tileTwo = allIcons[tileItemNum];
    tileClassList.add('open');
    if(tileOne === tileTwo) {
      tileOneClassList.add("match");
      tileClassList.add("match");
      score += 20;
    } else {
      setTimeout(function() {
        tileOneClassList.remove("open");
        tileClassList.remove("open");
      }, 500);
      if(numMistakes === 3) {
        star -= 1;
        starCount += 1;
        movesCount -= 1;
        moves.innerHTML = movesCount;
        starElementID.removeChild(starElementID.childNodes[star]);
        numMistakes = 0;
      } else {
        numMistakes += 1;      
      }
    }
    tileOne = "";
    tileTwo = "";
  }
  numClicks += 1;
}

function addIconsToCard(i) {
  let tileIcon = "fa fa-"+allIcons[i];
  let addTileToHtml = "<li class='tile' data-item="+i+"><i class='"+tileIcon+"'></i></li>";
  const cardId = document.getElementById("outer-card");
  const tileElement = createElementFromHTML(addTileToHtml);
  tileElement.addEventListener('click', respondToClick);
  cardId.appendChild(tileElement);
}

for(let i=0; i<allIcons.length; i++) {
  addIconsToCard(i);
}

function restart() {
  let openElements = document.querySelectorAll(".tile");
  [].forEach.call(openElements, function(el) {
    el.classList.remove("match");
    el.classList.remove("open");
  });
  moves.textContent = "3";
  if(!(starcount>=3)) {
    for(let i=starCount; i<3; i++) {
      addStarIcon(i);
    }
  }
  
  shuffleArray(allIcons);
}
document.getElementById("restart").addEventListener('click', restart);