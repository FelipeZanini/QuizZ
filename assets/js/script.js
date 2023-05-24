// Get all elements on html document
let quizBox = document.getElementById('quiz-box');
let questionCounter = document.getElementById('question-counter');
let question = document.getElementById('question');
let answers = document.getElementsByClassName('answers');
let nextQuestion = document.getElementById('next-question');
let gameOverText = document.getElementById('statics-pages-text');
let LogoLandPage = document.getElementById('land-page-figure');
let startButton = document.getElementById('start-button');

// Questions to be displayed on the quiz 
const questions = [
    {
        question: 'What was the first animal in space?',
        answers: [
            { text: 'Dog', correct: true },
            { text: 'Bird', correct: false },
            { text: 'Chimpanzee', correct: false },
            { text: 'Rat', correct: false },
        ]
    },

    {
        question: 'Where did writing come from?',
        answers: [

            { text: 'Ancient Greece', correct: false },
            { text: 'Roman Empire', correct: false },
            { text: 'Aztec Empire', correct: false },
            { text: 'Mesopotamia', correct: true },
        ]
    },

    {
        question: 'What was the largest empires in history?',
        answers: [

            { text: 'Mongol Empire', correct: false },
            { text: 'British Empire', correct: true },
            { text: 'Russian Empire', correct: false },
            { text: 'Spanish Empire', correct: false },
        ]
    },


    {
        question: 'What is the most common element in universe?',
        answers: [

            { text: 'Hydrogen', correct: true },
            { text: 'Carbon', correct: false },
            { text: 'Helium', correct: false },
            { text: 'Uranium', correct: false },
        ]
    },

    {
        question: 'What is the smallest bone in human body?',
        answers: [

            { text: 'The femur', correct: false },
            { text: 'The stapes', correct: true },
            { text: 'The metacarpal', correct: false },
            { text: 'The trapezoid', correct: false },
        ]
    }
]

// Global variables, such as score and counter
let score, counter;

// Wait for the DOM to finish loading to display the land page
document.addEventListener("DOMContentLoaded", function () {

    gameOverText.innerHTML = `<strong>Test Your Knowledge! <i class="far fa-lightbulb"></i></strong> `;
})

/**
 * Is called when the user fires the start or restart button,
 * hiding the land page or game over page to the user,
 * calling the 'startquiz' to properly start the quiz */
function setUpQuiz() {
    for (let i = 0; i < 2; i++) {
        quizBox.children[i].classList.remove('hide');
    }
    gameOverText.classList.add('hide');
    startButton.classList.add('hide')
    LogoLandPage.classList.add('hide');;
    startQuiz()
}

/**
 * The quiz start function,
 * is called when the user wants to start or restart the quiz
 */
function startQuiz() {
    score = 0;
    counter = 0;
    displayQuestion(counter);
}

/**
 * Display question and answers to the user,
 * also set the right answers to the respectively question
 */
function displayQuestion(counter) {

    // Function to randomize questions
    randomizeQuestions()
    questionCounter.innerHTML = `${1 + counter}`;
    question.innerText = questions[counter].question;
    for (let i = 0; i < answers.length; i++) {
        answers[i].innerText = questions[counter].answers[i].text;
        if (questions[counter].answers[i].correct) {
            answers[i].setAttribute("datatype", "right");
        }
    }
}
/**
 * Called to shuffle questions,
 * reorganizing the main arrays of objects
 */
function randomizeQuestions() {
    let randomIndex;
    let randomQuestions = [];
   
    for(let i = questions.length; i > randomQuestions.length; i-- ){
        randomIndex = Math.floor(Math.random() * questions.length);
        if(questions[randomIndex] != randomQuestions[randomIndex]){
            randomQuestions.push(questions[randomIndex]);
            console.log(randomQuestions[randomIndex]);
            console.log(randomQuestions[randomIndex]);
        }
    } 
}

/**
 * Get the clicked answer from the user,
 * giving a visual feedback if the user clicked on the right or wrong one,
 * stoping any intereraction with the answers after that 
 */
function checkAnswer(answer) {

    if (answer.getAttribute("datatype", "right")) {
        answer.classList.add("right");
        score++;
    } else {
        answer.classList.add("wrong");
    }
    // Called to stop any user interaction with the answers, and show the right answers
    stopUserInteraction();

    counter++;
    // Show the next question button to the user
    nextQuestion.classList.remove('hide');
}
/**
 * This function is made to show the user the right answer if he/she failed, 
 * then stoping any pointer events (interactions) from the user
 */
function stopUserInteraction() {
    for (let i = 0; i < answers.length; i++) {
        answers[i].style.pointerEvents = 'none';
        if (answers[i].getAttribute("datatype", "right")) {
            answers[i].classList.add("right");
        }
    }
}
/**
 * This function is called when the user fires the next button, 
 * setting the answers to default, removing class and data type,
 * calling the gameOver function to check if the quiz is finished, if not it calls the displayQuestion
 */
function nextPage() {
    // Hide the next question button
    nextQuestion.classList.add('hide');

    for (let i = 0; i < answers.length; i++) {
        answers[i].classList.remove("wrong", "right");
        answers[i].removeAttribute("datatype", "right");
        answers[i].style.pointerEvents = 'auto';
    }
    gameOver();
    displayQuestion(counter);
}

/**
 * Is called every time the user wants to proceed to next question,
 * if the game is over, is displayed the game over page,
 * showing the score and the restart button to the user
 */
function gameOver() {
    if (counter == questions.length) {
        for (let i = 0; i < 2; i++) {
            quizBox.children[i].classList.add('hide');
        }
        startButton.classList.remove('hide');
        gameOverText.classList.remove('hide');
        LogoLandPage.classList.remove('hide');
        startButton.innerHTML = "Restart";
        gameOverText.innerHTML = `<strong>Congratulation!</strong><br>Your Score is: ${score}`;
    }
}

