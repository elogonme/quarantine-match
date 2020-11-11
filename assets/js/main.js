$(document).ready(function(){
// Main code goes here
var person1 = { // Object to store person 1 info
    name: '',
    dob: '',
    matchInfo: '',
    numbersInfo: ''
};

var person2 = { // Object to store person 2 info
    name: '',
    dob: '',
    matchInfo: '',
    numbersInfo: ''
}

// Function to detect link from find button
$('#find-btn').on('click', function(){
    console.log('find button clicked');
    getInputFieldsInfo();
    fetchMatchApi(person1, person2);
    fetchNumbersApi(person1, person2);
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




});