
$(document).ready(function(){
// Main code goes here
var person1 = { // Object to store person 1 info
    name: '',
    dob: '',
};

var person2 = { // Object to store person 2 info
    name: '',
    dob: '',
}

var matchInfo = { // Object to store match Info
    persentage: 0,
    matchText: '',
    numbersInfo: ''
}

// Function to detect link from find button
$('#find-btn').on('click', function(){
    console.log('find button clicked');
    getInputFieldsInfo();
    fetchMatchApi(person1, person2);
    fetchNumbersApi(person1, person2);
    displayMatchInfo(matchInfo);
    displayNumbersInfo(matchInfo);
});

// Function to get input fields info
function getInputFieldsInfo(){
    console.log('getting input fields...');
};

// function to fetch info from Match API
function fetchMatchApi(person1, person2){
    console.log('fetching Match info...');
};

// function to fetch info from Numbers API
function fetchNumbersApi(person1, person2){
    console.log('fetching Numbers info...');
};

// function to display match info from Love Calculator API
function displayMatchInfo(matchInfo){

};

// function to display match info from Love Calculator API
function displayNumbersInfo(matchInfo){

};

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
  
});
