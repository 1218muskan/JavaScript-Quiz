var readlineSync = require("readline-sync");

// Score of User
var score = 0

// MCQ type questions array
var MCQquestions = [
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


// one-word type questions array
var OneWOrdques = [
    {
        question: "Q1. What is full of holes but still holds water?",
        answer: "sponge"
    },
    {
        question: "Q2. I have branches, but no fruit, trunk or leaves. What am I? ",
        answer: "bank"
    },
    {
        question: "Q3. David’s parents have three sons: Snap, Crackle, and what’s the name of the third son?",
        answer: "david"
    },
    {
        question: "Q4. I am an odd number. Take away a letter and I become even. What number am I? ",
        answer: "seven"
    },
    {
        question: "Q5. What can travel all around the world without leaving its corner? ",
        answer: "stamp"
    }
];


var highScore = [
    {
        game: "MCQ",
        name: "Muskan",
        score: 4
    },
    {
        game: "One-Word",
        name: "Muskan",
        score: 3
    }
];


// greeting user
function welcome () {
    var userName = readlineSync.question("Enter your Name: ");
    console.log("\nWelcome " + userName);
    console.log("\nReady to PLAY Tricky Trivia! \nWe have 2 choices for you....")
    console.log("\n1. MCQ \n2. One-Word")
    var userChoice = readlineSync.question("\nWhat do you wanna play (1 or 2)? ")
    
    game(userName, userChoice);
}

// main game function
function game(userName, choice){

    if(choice == "1"){
        for(var i=0; i<5; i++){

            var currentQues = MCQquestions[i];
            play(currentQues.question, currentQues.answer, currentQues.Options);
        }
    }

    else{
        for(var i=0; i<5; i++){

            var currentQues = OneWOrdques[i];
            play(currentQues.question, currentQues.answer);
        } 
    }
    

    showScore(userName, choice);
}


// play function
function play(question, answer, options){
    console.log("\n"+question);

    if(options != undefined){

        for(let key in options){
            console.log(key + ": " + options[key]);
        }

        var userAnswer = readlineSync.question("\nChoose any one option: ");
    }

    else{
        var userAnswer = readlineSync.question("Your Answer? ");
        console.log();

    }

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
function showScore(userName, choice){
    
    if(highScore[choice-1].score <= score){

        console.log("\n\n Congartulations! You SCORED: ", score);
        highScore[choice-1].name = userName;
        highScore[choice-1].score = score;
    }

    else{
        console.log("\n\n You SCORED: ", score);
    }
  console.log("\nCheck out the high scores!");
  console.log(highScore[choice-1].name, " : ", highScore[choice-1].score + "\n");
}

welcome();