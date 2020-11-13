var htmlElement = "#numbers-display";

/*

    This function generates a random number, adds it to a string, 
    then displays the string in an html element, then turns off the display after a delay,
    then deletes the number from the string.
    
*/

function displayNumber() {
  var randomNumber = Math.floor(Math.random()*10);
  var displayNumber = "";
  displayNumber+=randomNumber;
  $("#numbers-display").html(displayNumber);
  displayNumber.substr(1);
};

//This function empties the html contents of an element.
function dump(element) {
  $(element).empty();
};