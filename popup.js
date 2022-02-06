const username = document.getElementById("username");
const food = document.getElementById("food");
const mood = document.getElementById("mood");
const feed = document.getElementById("feed");
const date = document.getElementById("date");
const sidebar = document.getElementById("sidebarMenu");
const petname = document.getElementById("petname");
let currMood = "neutral";

feed.addEventListener('click', function() {
  currMood = "eating";
  food.innerText = "Inventory: ... eating ...";
  setTimeout(function(){ updateFood(-1);}, 2000);
});



function getDate() {
  const d = new Date();
  date.innerText = (d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
}

function getName() {
  chrome.storage.sync.get(['petname'], function(value) {
    petname.innerText = value.petname;
  });

}

function getSignIn() {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    chrome.identity.getProfileUserInfo(
        function(info){
          chrome.storage.sync.set({email: info.email}, function() {
            console.log("email is " + info.email);
          });
          username.innerText = info.email;
        }
    );
});
}


function updateFood(toAdd) {
    chrome.storage.sync.get(['food'], function(value) {
      let newFood = 0;
      if(value.food > 0)
      {
        newFood = value.food + toAdd;
        updateMood(-1*toAdd);
      } else {
        updateMood(0);
      }
      chrome.storage.sync.set({food: newFood}, function() {
        console.log("food is " + value.food);
      });
      food.innerText = "Inventory: " + newFood + " food";

    });
}

function updateMood(toAdd) {
    chrome.storage.sync.get(['mood'], function(value) {
      let newMood = value.mood + toAdd;
      chrome.storage.sync.set({mood: newMood}, function() {
        console.log("mood is " + value.mood);
      });
      if(0 <= newMood && newMood < 3)
      {
        mood.innerText = "Mood: Neutral";
        currMood = "waving";
      } else if(newMood >= 3)
      {
        mood.innerText = "Mood: Happy";
        currMood = "happy";
      } else {
        mood.innerText = "Mood: Upset";
        currMood = "sad";
      }
    });
}

let spritedata;

let wavingAnimation = [];
let eatingAnimation = [];
let happyAnimation = [];
let cryingAnimation = [];

let waves = [];
let eats = [];
let happy = [];
let cry = [];
let isWaving = false;
let isEating = false;
let isHappy = false;
let isCrying = true;

function preload() {
  spritedata = loadJSON('images/newPenguin.json');
  wavingsheet = loadImage('images/waving.png');
  eatingsheet = loadImage('images/eat.png');
  happysheet = loadImage('images/happiness.png');
  cryingsheet = loadImage('images/cry.png');
  penguin = loadImage('images/staticPenguin.png');
  back = loadImage('images/background.png');

}

function setup() {
  createCanvas(500, 500);
  let frames = spritedata.frames;
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].position;
    let img = wavingsheet.get(pos.x, pos.y, pos.w, pos.h);
    wavingAnimation.push(img);
  }

    waves[0] = new Sprite(wavingAnimation, 0, 0, 0.1);

  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].position;
    let img = eatingsheet.get(pos.x, pos.y, pos.w, pos.h);
    eatingAnimation.push(img);
  }

    eats[0] = new Sprite(eatingAnimation, 0, 0, 0.1);

  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].position;
    let img = happysheet.get(pos.x, pos.y, pos.w, pos.h);
    happyAnimation.push(img);
  }

    happy[0] = new Sprite(happyAnimation, 0, 0, 0.1);

    for (let i = 0; i < frames.length; i++) {
      let pos = frames[i].position;
      let img = cryingsheet.get(pos.x, pos.y, pos.w, pos.h);
      cryingAnimation.push(img);
    }

      cry[0] = new Sprite(cryingAnimation, 0, 0, 0.1);
  }


function draw() {
  image(back, 0, 0);
  if (currMood == "waving") {
    for (let penguin1 of waves) {
      penguin1.show();
      penguin1.animate();
    }
  }
  else if (currMood == "eating") {
    for (let penguin2 of eats) {
      penguin2.show();
      penguin2.animate();
    }
  }
  else if (currMood == "happy") {
    for (let penguin3 of happy) {
      penguin3.show();
      penguin3.animate();
    }
  }
  else if (currMood == "sad") {
    for (let penguin4 of cry) {
      penguin4.show();
      penguin4.animate();
    }
  }
  else {
    image(penguin, 0,0);
  }
}

updateMood(0);
updateFood(0);
getSignIn();
getDate();
getName();
