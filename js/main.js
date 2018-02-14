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

function addLifeIcon(i) {
  let lifeIcon = "fa fa-"+lifeIcons[i];
  let addLifeToHtml = "<li class='life-icon' data-item="+i+"><i class='"+lifeIcon+"'></i></li>";
  const lifeElement = createElementFromHTML(addLifeToHtml);
  lifeElementID.appendChild(lifeElement);
}

for(let i=0; i<lifeIcons.length; i++) {
  addLifeIcon(i);
}

function loseLife(i) {
  singleLife = lifeElementID.childern[i];
  lifeElementID.removeChild(lifeDataItem);
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
      if(numMistakes === 2) {
        life += 1;
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

/*onClick(event) {
  if numClicks is even {
    index = event.target.get("data-index")
    tile1 = "cat"
    set class as open
  } else {
    tile2 = "dog"
    set class as open
    if tile1==tile2 {
      set both class as match
      increase points
    } else {
      set both class as tile
      if numMistakes == 2 {
        decrease life
        numMistakes = 0
      } else {
        numMistakes += 1
      }
    }
    tile1 = tile2 = ""
  }
  numClicks += 1
}*/