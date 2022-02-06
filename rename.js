const newName = document.getElementById("petName");
const enter = document.getElementById("submit");
const name = document.getElementById("petname");

function getName() {
  chrome.storage.sync.get(['petname'], function(value) {
    name.innerText = value.petname;
  });

}

function setName() {
  if(newName.value != "")
    chrome.storage.sync.set({petname: newName.value}, function() {
      console.log("name is " + newName.value);
    });
    getName();
    newName.value = "";

}

enter.addEventListener('click', function() {
  setName();
});

getName();
