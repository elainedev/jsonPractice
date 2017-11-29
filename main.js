// AJAX can get info from different URLs

/* XMLHttpRequest*/  // web-browser's built-in tool that allows us to establish a connection with the url we specify and send/receive data

var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function(){
  var ourRequest = new XMLHttpRequest();
  // open is a method expected by browser and accepts two args: 1) send (GET) or receive (POST) data, 2) URL to talk to
  ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json')

  // onload method determines what happens when data is loaded
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      // by default, browser interprets json as plain text instead of as an array, so need to use JSON.parse to parse the text into a JSON first
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
      console.log("We connected to the server, but it returned an error.")
    }
  }

  ourRequest.onerror = function() {
    console.log("Connection error");
  };
  ourRequest.send();  // sends AJAX request
  pageCounter++;
  if (pageCounter > 3){
    btn.classList.add("hide-me");
  }
});

function renderHTML(data) {
  var htmlString = "";

  for (var i = 0; i < data.length; i++){
    htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";

    for (var ii = 0; ii < data[i].foods.likes.length; ii++){
      if (ii == 0) {
        htmlString += data[i].foods.likes[ii];
      } else {
        htmlString += " and " + data[i].foods.likes[ii];
      }
    }

    htmlString += ' and dislikes ';

    for (var ii = 0; ii < data[i].foods.dislikes.length; ii++){
      if (ii == 0) {
        htmlString += data[i].foods.dislikes[ii];
      } else {
        htmlString += " and " + data[i].foods.dislikes[ii];
      }
    }
    htmlString += '.</p>';
  }

  animalContainer.insertAdjacentHTML('beforeend', htmlString);
}
