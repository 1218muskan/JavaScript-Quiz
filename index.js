var readlineSync = require("readline-sync");

// Score of User
var score = 0

// Quiz question-answer array
var Question = [
    {
        question: "There's a bowl with seven apples. You remove three. How many do you have?",
        Options: {
            "a": "4",
            "b": "2",
            "c": "3",
            "d": "I do not eat apples!"
        },
        answer: "c"
    },
    {
        question: "If three kids can eat three pizzas in three minutes, how many minutes would it take 30 kids to eat 30 pizzas? ",
        Options: {
            "a": "10",
            "b": "3",
            "c": "30",
            "d": "9"
        },
        answer: "b"
    },
    {
        question: "When i get multiplied by a numaber, the sum of figures in product is always me. what am i?",
        Options: {
            "a": "10",
            "b": "9",
            "c": "5",
            "d": "11"
        },
        answer: "b"
    },
    {
        question: "The answer is really big. ",
        Options: {
            "a": "THE ANSWER",
            "b": "Really big",
            "c": "An Elephant",
            "d": "Insufficient Data"
        },
        answer: "a"
    },
    {
        question: "During what month do people sleep the least? ",
        Options: {
            "a": "December",
            "b": "March",
            "c": "June",
            "d": "February"
        },
        answer: "d"
    }
];

var highScore = {
    name: "Muskan",
    score: 3
}


// greeting user
function welcome () {
    var userName = readlineSync.question("Enter your Name: ");
    console.log("\nWelcome " + userName);
    console.log("Ready to PLAY Tricky Trivia!")
    
    game(userName);
}

// main game function
function game(userName){

    for(var i=0; i<5; i++){

        var currentQues = Question[i];
        play(currentQues.question, currentQues.Options, currentQues.answer);
    }

    showScore(userName);
}


// play function
function play(question, options, answer){
    console.log("\n"+question);

    for(let key in options){
        console.log(key + ": " + options[key]);
    }

    var userAnswer = readlineSync.question("\nChoose any one option: ");

    if( userAnswer.toLowerCase() === answer){
        console.log("Correct answer!");
        score += 1;
    }

    else{
        console.log("Wrong answer!");
    }

    console.log("\n*--------------------------*")
    console.log("Your Current Score: ", score);
    console.log("*--------------------------*")
}


// function for displaying total score
function showScore(userName){
    console.log("\n\n You SCORED: ", score);

    if(highScore.score <= score){
        highScore.name = userName;
        highScore.score = score;
    }
  console.log("\nCheck out the high scores!");
  console.log(highScore.name, " : ", highScore.score + "\n");
}

welcome();