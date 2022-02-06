var email = "";
var score = 0;
// Get text from typed text
const getTypedText = () => {
    var msg = "";
    // document.addEventListener("keyup", function(event) {
    //   if(event.keyCode === 13)
    //   {
    //     console.log(msg);
    //   }
    // }
    document.addEventListener("keyup", function(event) {
      chrome.storage.sync.get(['email'], function(value) {
        email = value.email;
      });
      if(event.keyCode === 13)
      {
        console.log(msg);
        console.log(email);

        const data = {
          "email" : email,
          "text" : msg };

        fetch('https://tartanhacks-340416.uc.r.appspot.com/', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // GET THIRD ELEMENT FOR "Score"
          score = data.score;
          console.log(score);
          chrome.storage.sync.get(['food'], function(value) {
            let newFood = value.food;
            if (score > 0 && score <= 0.5){
              newFood += 1;
            }
            else if (score > 0.5){
              newFood += 2;
            }
            chrome.storage.sync.set({food: newFood}, function() {
              console.log("food is " + newFood);
            });
          });
          chrome.storage.sync.get(['mood'], function(value) {
            let newMood = value.mood;
            if (score < -0.5){
              newMood -= 4;
              if(newMood < 0)
              {
                alert("Your harsh words have made your penguin sad...");
              }

            }
            else if (score < 0 && score >= -0.5){
              newMood -= 2;

              if(newMood < 0)
              {
                alert("Your harsh words have made your penguin sad...");
              }
            }


            chrome.storage.sync.set({mood: newMood}, function() {
              console.log("mood is " + newMood);
            });
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        //sendReceiveInfo();
      }
      var tex = document.getElementsByTagName('textarea');
      for(var i = 0; i < tex.length; i++)
      {
        if(tex.item(i) != null && tex.item(i).value != "")
        {
          msg = tex.item(i).value;
          break;
        }
    }

    });


    return msg;
};

getTypedText();
