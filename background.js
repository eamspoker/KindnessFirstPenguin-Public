chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({email: ""}, function() {
    console.log("email is unset");
  });

  chrome.storage.sync.set({mood: 0}, function() {
    console.log("mood is 0");
  });

  chrome.storage.sync.set({food: 3}, function() {
    console.log("food is 1");
  });

  chrome.storage.sync.set({petname: "Penguin"}, function() {
    console.log("name is Penguin");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
