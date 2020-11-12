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
$('.datepicker').datepicker({format: 'dd/mm/yyyy'});

// Function to detect link from find button
$('#find-btn').on('click', function(){
    console.log('find button clicked');
    if (getInputFieldsInfo()) {
        fetchMatchApi(person1, person2);
        fetchNumbersApi(person1, person2);
        displayMatchInfo(matchInfo);
        displayNumbersInfo(matchInfo);
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
    $('#form')[0].reset();
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
function displayMatchInfo(matchInfo){

};

// function to display match info from Love Calculator API
function displayNumbersInfo(matchInfo){

};

});