$(document).ready(function(){
// Main code goes here

var person1 = {}; // Object to store person 1 info
var person2 = {}; // Object to store person 2 info

$('.datepicker').datepicker({
    format: 'dd/mm/yyyy',
    defaultDate: new Date(1990,06,06),
    minDate: new Date(1900,1,1),
    yearRange: 70
});

initialize();

// Function to initialize first view of page and default variables
function initialize(){
    $('.fact-card').removeClass('scale-in'); // hide info cards
    $('.info').removeClass('scale-in'); // hide match info
    // Clear person1
    person1 = { 
        name: '',
        dob: '',
        funFacts: [],
        matchInfo: '',
        matchPercentage: ''
    };
    // Clear person2
    person2 = { 
        name: '',
        dob: '',
        funFacts: [],
        matchPercentage: ''
    }
}

// Function to detect click from enter key and execute code
$(window).on("keypress", function(event) {
    if (event.which === 13) {
      event.preventDefault();
      initialize();
      checkInputFields();      
    };
  });

// Function to detect click from find button and execute code
$('#find-btn').on('click', function(){
    initialize();
    checkInputFields();
});

// ----------------- View history ---------
// event listener to get button clck 

// function to check if any input field is empty if not then execute code
function checkInputFields(){
    if (getInputFieldsInfo()){
        fetchMatchApi(person1, person2);
        fetchNumbersApi(person1, person2);

    };
};

// Function to get input fields info and assign info to person1 and person2 properties
function getInputFieldsInfo(){
    if ($('#name1').val() && $('#name2').val() && $('#dob1').val() && $('#dob2').val()){
    person1.name = $('#name1').val();
    person2.name = $('#name2').val();
    person1.dob = $('#dob1').val();
    person2.dob = $('#dob2').val();
    $('#form')[0].reset();
    return true
    } else {
        // assign invalid class to get error messages of form displayed
        $('.validate').addClass('invalid')
        return false
    }
};

// function to fetch info from Match API
function fetchMatchApi(person1, person2){
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
        displayMatchInfo(person1);  // Display recieved match info on page
        // ----- Fetch gif to display ------------
        //  getGif(person1.percentage);
    });
};

// function to fetch info from Numbers API
function fetchNumbersApi(person1, person2){
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
        displayNumbersInfo(person1, 1);
        displayNumbersInfo(person2, 2);
    });
};

// function to display match info from Love Calculator API
 function displayMatchInfo(person1){
    var $percentage = $('#showPercentage');
    var $match = $('#showMatchInfo');
    $match.text(person1.matchInfo);
    $percentage.text(person1.matchPercentage + "% match");
    $('.info').addClass('scale-in');
};

// function to display match info from Love Calculator API
function displayNumbersInfo(person, cardNo){
    // first clear any old info from page
    $(`#p${cardNo}-facts`).empty();
    // create elelment with text to display on page
    $(`#person${cardNo}-title`).html('Date facts for ' + '<strong>' + person.name + '</strong>' + ' - ' + person.dob);
    for (var i = 0; i < person.funFacts.length; i++){
        var $fact = $('<li>');
        $fact.text(person.funFacts[i]);
        $(`#p${cardNo}-facts`).append($fact);
    }
    $('.fact-card').addClass('scale-in'); // animate card to appear - using materialize animation
};

});
