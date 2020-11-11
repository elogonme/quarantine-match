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

});