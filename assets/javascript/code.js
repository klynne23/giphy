///////////////////////////////////////////////////////////////////////////////////////////

var topics = ["dog", "cat", "snake", "shark", "whale", "parrot", "bearded dragon"];

generateButtons();


// function to clear out buttons-view div and render a button for each element in topics
function generateButtons() {

  // empty the div
  $("#buttons-view").empty(); 

  // creates the buttons based on the topics array
  for (var i = 0; i < topics.length; i++) {
    var btn = $("<button>");
    btn.text(topics[i]);
    btn.addClass("topic");
    btn.attr("data-topicname", topics[i]);
    $("#buttons-view").append(btn);
  } // end for loop

}// end generateButtons function


// function for each time the submit button or enter is clicked
$("#add-topic").on("click", function (event) {

  //stop the form from trying to go to another webpage
  event.preventDefault();

  // grab the input from the form textbox
  var topic = $("#topic-input").val().trim();

  // check if topic is already in topics array
  if (topics.includes(topic)) {
    return;
  }
  // if user tries to add a button with no content
  if (topic === "") {
    return;
  }

  // push the input into the topics array
  topics.push(topic);

  // call the generate buttons function to display all buttons in the topic array
  generateButtons();

}); // end on.click function


$(document).on("click", ".topic", displayGifs);

function displayGifs() {
  var topic = $(this).attr("data-topicname");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=3P3PJnFok0eNJbxkeTLHcE9nJSuzPjzu&limit=10"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);

    // check that there was data returned by the query
    var results = response.data;
    if (results == "") {
      return alert("No GIFs were found :(");
    }

    // clear any gifs already in the gifs-view div
    $("#gifs-view").empty();

    for (var i = 0; i < response.data.length; i++) {
      // create a new <div> element for the gifs and ratings
      var gifDiv = $('<div>');
      gifDiv.addClass("gifDiv");

      // create a new <p> element for the rating
      var rating = $("<p>");
      rating.text("Rating: " + response.data[i].rating);
      gifDiv.append(rating);

      // create a new <img> element for the gifs
      var img = $('<img>');
      img.addClass("gifImage");
      img.attr("src", response.data[i].images.fixed_width.url);
      gifDiv.append(img);

      $("#gifs-view").append(gifDiv);
    } // end for loop
  }); // end .then function
} // end displayGifs function