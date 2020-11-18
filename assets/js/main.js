
$(document).ready(function(){
    
// Main code goes here
var person1 = { // Object to store person 1 info
    name: 'Samuel',
    dob: '10/06/1988',
    funFacts: [],
    matchInfo: '',
    matchPercentage: ''
};

var person2 = { // Object to store person 2 info
    name: 'Anna',
    dob: '21/08/1990',
    funFacts: [],
    matchPercentage: ''
}

$('.datepicker').datepicker({format: 'dd/mm/yyyy'});

// Function to detect click from find button
$('#find-btn').on('click', function(){
    console.log('find button clicked');
    if (getInputFieldsInfo()){
        fetchMatchApi(person1, person2);
    fetchNumbersApi(person1, person2);
    displayNumbersInfo(person1, person2);
    }
    
});

// Function to get input fields info
function getInputFieldsInfo(){
    console.log('getting input fields...');
    if ($('#name1').val() && $('#name1').val() && $('#dob1').val() && $('#dob2').val()){
    person1.name = $('#name1').val();
    person2.name = $('#name2').val();
    person1.dob = $('#dob1').val();
    person2.dob = $('#dob2').val();
    console.log(person1, person2);
    // $('#form')[0].reset();
    return true
    } else {
        $('.validate').addClass('invalid')
        return false
    }
    
};

// function to fetch info from Match API
function fetchMatchApi(person1, person2){
    console.log('fetching Match info...');
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://love-calculator.p.rapidapi.com/getPercentage?fname=${person1.name}&sname=${person2.name}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "fcac5b61c1msh4ebb16d3bfa8330p11196fjsn97e7bb56efb3",
            "x-rapidapi-host": "love-calculator.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        person1.matchPercentage = person2.matchPercentage = response.percentage;
        person1.matchInfo = person2.matchInfo = response.result;
        displayMatchInfo(person1);
    });
};

// function to fetch info from Numbers API
function fetchNumbersApi(person1, person2){
    console.log('fetching Numbers info...');
    // Extract day, month and year from date string
    person1.day = person1.dob.slice(0, 2);
    person1.month = person1.dob.slice(3, 5);
    person1.year = person1.dob.slice(6);
    person2.day = person2.dob.slice(0, 2);
    person2.month = person2.dob.slice(3, 5);
    person2.year = person2.dob.slice(6);

    // Get facts for person1 based on their day/month date
    $.get(`http://numbersapi.com/${person1.month + '/' + person1.day}/date`, function(data) {
        person1.funFacts.push(data);
    });
    // Get facts for person2 based on their day/month date
    $.get(`http://numbersapi.com/${person2.month + '/' + person2.day}/date`, function(data) {
        person2.funFacts.push(data);
    });
    // Get facts for person1 & 2 based on their year date
    $.get(`http://numbersapi.com/${person1.year + ',' + person2.year}/year`, function(data) {
        var factArr = JSON.parse(data);
        person1.funFacts.push(factArr[person1.year]);
        person2.funFacts.push(factArr[person2.year]);
    });
    // Get date facts for person1 based on day number and month number
    $.get(`http://numbersapi.com/${person1.day + ',' + person1.month}/date`, function(data) {
        $.each(JSON.parse(data), function(key, fact){
            person1.funFacts.push(fact);
        });
    });
    // Get date facts for person2 based on day number and month number
    $.get(`http://numbersapi.com/${person2.day + ',' + person2.month}/date`, function(data) {
        $.each(JSON.parse(data), function(key, fact){
            person2.funFacts.push(fact);
        });
    });
    // Get math facts for person1 based on day number and month number
    $.get(`http://numbersapi.com/${person1.day + ',' + person1.month}/math`, function(data) {
        $.each(JSON.parse(data), function(key, fact){
            person1.funFacts.push(fact);
        });
    });
    // Get math facts for person2 based on day number and month number
    $.get(`http://numbersapi.com/${person2.day + ',' + person2.month}/math`, function(data) {
        $.each(JSON.parse(data), function(key, fact){
            person2.funFacts.push(fact);
        });
    });
    // Get trivia facts for person1 based on day number and month number
    $.get(`http://numbersapi.com/${person1.day + ',' + person1.month}/trivia`, function(data) {
        $.each(JSON.parse(data), function(key, fact){
            person1.funFacts.push(fact);
        });
    });
    // Get trivia facts for person1 based on day number and month number
    $.get(`http://numbersapi.com/${person2.day + ',' + person2.month}/trivia`, function(data) {
        $.each(JSON.parse(data), function(key, fact){
            person2.funFacts.push(fact);
        });
    });
    console.log(person1, person2); // Output to console person1 and 2 data for testing
};

// function to display match info from Love Calculator API
 function displayMatchInfo(person1){
    console.log(person1.matchInfo);
// get positiion for persion1 on page
var $percentage = $('#showPercentage');
var $match = $('#showMatchInfo');
$percentage.hide();
$match.hide();
$('.info').css('opacity','1');
$match.text(person1.matchInfo);
$percentage.text(person1.matchPercentage + "% match");
$match.fadeIn('fast');
$percentage.fadeIn('fast');
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

function getData ()}{

var matchpercentage = $(#findbtn).val

var matchPercentage = $.get("https://api.giphy.com/v1/stickers/random?api_key=OIa4cwisWepHDXy5xHvG6DjPQoG58jDP&tag=&rating=g");
matchPercentage.done(function(data)
{ console.log("success recieved data", data); });

var glf = data.data
for (i in glf){
    $('.inner').append("<img src='"+gif[i].images.original.url+"' style=height:100px; width:100px;'/>")
}