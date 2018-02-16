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

let star = 3;
let movesCount = 3;
let numMistakes = 0;
let numClicks = 0; 
let score = 0;

let tileOne = "";
let tileTwo = "";

let tileOneClassList;
let tileOneID;
let tileTwoID;

let moves = document.getElementById("moves");
let starElementID = document.getElementById("star");
let modal = document.getElementsByClassName("modal")[0];
let modalContent = document.getElementsByClassName("modal-content")[0];
let closeModal = document.getElementsByClassName("close")[0];
let modalMessage = document.getElementsByClassName("message")[0];
let modalScore = document.getElementsByClassName("score")[0];
let modalTime = document.getElementsByClassName("time")[0];
let modalMoveCount = document.getElementsByClassName("move-count")[0];

let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

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
      if(numMistakes === 1) {
        star -= 1;
        movesCount -= 1;
        moves.innerHTML = movesCount;
        starElementID.removeChild(starElementID.childNodes[star]);
        numMistakes = 0;
        score -= 10;
        if(star === 0 || movesCount === 0) {
          modal.style.display="block";
          modalMessage.textContent = "You lost. :(";
          modalScore.textContent = "Score: " + score;
          modalTime.textContent = "Time: "+minutesLabel.innerHTML+":"+secondsLabel.innerHTML;
        }
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
  moves.innerHTML = "3";
  shuffleArray(allIcons);
  modal.style.display="none";
  totalSeconds = 0;
  let openElements = document.querySelectorAll(".tile");
  [].forEach.call(openElements, function(el) {
    el.classList.remove("match");
    el.classList.remove("open");
  });
  if(star !== 3) {
    for(let i=star; i<3; i++) {
      addStarIcon(i);
    }
  }
}
document.getElementById("restart").addEventListener('click', restart);

closeModal.addEventListener('click', function(){
  modal.style.display = "none";
  restart();
})


