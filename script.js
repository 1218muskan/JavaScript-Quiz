var Home_page = document.querySelector(".first-page");
var Main_page = document.querySelector(".second-page");

var playerName = document.getElementById("name");
var welcome_text = document.querySelector("#wlcm-mssg > span");

var userChoice = document.querySelectorAll(".UserChoice input");
var start_quiz_btn = document.getElementById("startBtn");
var quiz_container = document.querySelector(".quiz-container");

var result = document.querySelector(".Result");
var submitBtn = document.getElementById("submitBtn");
var quizReset = document.getElementById("resetQuiz");
var PlayerScore = document.querySelector(".Score");

var time_span = document.getElementById("show-time");

// starting timer
const startingMinutes = 5;
let time = startingMinutes*60;



// MCQ type questions array
var MCQquestions = [
    {
        question: "Q1. There's a bowl with seven apples. You remove three. How many do you have?",
        Options: {
            "a": "4",
            "b": "2",
            "c": "3",
            "d": "I do not eat apples!"
        },
        answer: "c"
    },
    {
        question: "Q2. If three kids can eat three pizza in three minutes, how many minutes would it take 30 kids to eat 30 pizza? ",
        Options: {
            "a": "10",
            "b": "3",
            "c": "30",
            "d": "9"
        },
        answer: "b"
    },
    {
        question: "Q3. When i get multiplied by a numaber, the sum of figures in product is always me. what am i?",
        Options: {
            "a": "10",
            "b": "9",
            "c": "5",
            "d": "11"
        },
        answer: "b"
    },
    {
        question: "Q4. The answer is really big. ",
        Options: {
            "a": "THE ANSWER",
            "b": "Really big",
            "c": "An Elephant",
            "d": "Insufficient Data"
        },
        answer: "a"
    },
    {
        question: "Q5. During what month do people sleep the least? ",
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



function displayQuiz(){
    
    // console.log(userChoice)
    
    quiz_container.innerHTML = "";

    // if user selects mcq
    if(userChoice[0].checked){

        Home_page.style.display = "none";
        Main_page.style.display = "block";


        // for traversing through each ques
        MCQquestions.forEach((currentQues , QuesNo) => {
            
            // variable to store the list of possible answers
            const Answers = [];

            // for traversing through each optionf for that particular ques
            for(key in currentQues.Options){
                Answers.push(
                    `<input type="radio" name="question${QuesNo}" value="${key}">
                    <label>${key} : ${currentQues.Options[key]}</label><br>`
                );
            }

            // displaying result i.e quiz
            quiz_container.innerHTML += 
                `<div class="quiz">
                <div id="question">${currentQues.question}</div>
                <div id="options">${Answers.join("")}</div>
                </div>`
        });

        
    }

    else if(userChoice[1].checked){
        Home_page.style.display = "none";
        Main_page.style.display = "block";


        // for traversing through each ques
        OneWOrdques.forEach((currentQues) => {
            

        // displaying result i.e quiz
        quiz_container.innerHTML += 
            `<div class="quiz">
            <div id="question">${currentQues.question}</div>
            <div><input type="text" id="inputAnswer"></div>
            </div>`
        });
    }

    else{
        window.alert("Select any one option");
    }
}



function calResults_MCQ(){

    let answerContainers = quiz_container.querySelectorAll("#options");
    let score = 0;

    MCQquestions.forEach((currentQues, QuesNo) => {

    // getting user selected option
    const answerContainer = answerContainers[QuesNo];
    const selector = `input[name=question${QuesNo}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if (userAnswer === currentQues.answer) {
      score++;
    }

  });

  showScore(score);
}

function calResults_OW(){

    let score = 0;

    OneWOrdques.forEach((currentQues, QuesNo) => {

    // getting user selected option
    const userAnswer_arr = quiz_container.querySelectorAll("#inputAnswer");
    const userAnswer = userAnswer_arr[QuesNo].value;

    // if answer is correct
    if (userAnswer.toLowerCase() === currentQues.answer) {
      score++;
    }

  });

  showScore(score);
}


function showScore(score){
    if(score===5){
        PlayerScore.innerText = "Congratulations Genious!! You got all 5 of them correct....";
    }

    else if(score >=3){
        PlayerScore.innerText = `Wohoo! You got ${score} out of 5 correct...`;
    }

    else if(score ===2){
        PlayerScore.innerText = `Good Try! You got ${score} out of 5 correct..`;
    }

    else if(score===1){
        PlayerScore.innerText = `You got ${score} out of 5 correct. Better Luck next time`;
    }

    else{
        PlayerScore.innerText = `You got None out of 5 correct. Maybe you wanna try once again.`;
    }
}


function updateTime(restart_timer = false){

    if(restart_timer){
        time = 5*60;
    }

    const minutes = Math.floor(time/60);
    let seconds = time%60;

    if(seconds<10){
        seconds='0'+seconds;
    }

    time_span.innerText = minutes + " : " + seconds;

    if(minutes == 0 && seconds == 0){

        clearInterval(countdown_call);
        window.alert("Time's up")
        window.location.reload();

    }
    else{
        time--;
    }

} 




playerName.addEventListener("input" , function (event){
    welcome_text.innerText = playerName.value;
});

start_quiz_btn.addEventListener("click", function(){
    displayQuiz();
    countdown_call = setInterval(updateTime,1000);
});


submitBtn.addEventListener("click", function(){

    clearInterval(countdown_call);

    if(userChoice[0].checked){
        calResults_MCQ();
    }

    else{
        calResults_OW();
    }

    updateTime(true);
    countdown_call = setInterval(updateTime, 1000);
    
});

quizReset.addEventListener("click", () => {
    window.location.reload();
});