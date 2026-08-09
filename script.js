const valueOne = document.getElementById("numOne");
const valueTwo = document.getElementById("numTwo");
const answerInput = document.getElementById("answer");
const startButton = document.getElementById("start-btn");
const submission = document.getElementById("arrow-key");
const timeEl = document.getElementById("timer");
const currentLevel = document.getElementById("level");
const questionUpdate = document.querySelector(".question-number h2");
const pageTitle = document.title.toLowerCase();

let currentQuestion = 1;
let timeInterval = null;
let isGameActive = false;
let secondsPassed = 0;
let correctAnswer = 0;
let score = 0;
let isFirstAttempt = true;



function getOperation() {
    if(pageTitle.includes("addition")) return "addition";
    if(pageTitle.includes("subtraction")) return "subtraction";
    if(pageTitle.includes("multiplication")) return "multiplication";
    if(pageTitle.includes("division")) return "division";
    return "addition";
}
const operation = getOperation();



function numberGenerator(level, operation) {
    let n1, n2;

    if(operation === "addition" || operation === "subtraction")
    {
        if(level === "1")
        {
            n1 = Math.floor(Math.random() * 10) + 1; // 1 to 10
            n2 = Math.floor(Math.random() * n1) + 1; // 1 to n1
        }
        else if(level === "2")
        {
            n1 = Math.floor(Math.random() * 99) + 10; // 10 to 100
            n2 = Math.floor(Math.random() * (n1 - 10 + 1)) + 10; // 10 to n1
        }
        else if(level === "3")
        {
            n1 = Math.round((Math.random() * 19 + 1) * 10) / 10; // 1.0 to 20.0
            n2 = Math.round((Math.random() *(n1 - 1) + 1) * 10) / 10; // 1.0 to n1
        }
    }
    else if(operation === "multiplication")
    {
        if(level === "1")
        {
            n1 = Math.floor(Math.random() * 10) + 1; // 1 to 10
            n2 = Math.floor(Math.random() * n1) + 1 // 1 to n1
        }
        else if(level === "2")
        {
            n1 = Math.floor(Math.random() * 19) + 2; // 2 to 20
            n2 = Math.floor(Math.random() * (n1 - 2 + 1)) + 2; // 2 to n1
        }
        else if(level === "3")
        {
            n1 = Math.round((10 + Math.random() * 40) * 10) / 10; // 10.0 to 50.0
            n2 = Math.round((Math.random() * Math.min(n1, 10)) * 10) / 10; // 0.0 up to 10.0 or n1
        }
    }
    else if(operation === "division")
    {
        if(level === "1")
        {
            const quotient = Math.floor(Math.random() * 9) + 2; // 2 to 10
            const divisor = Math.floor(Math.random() * 9) + 2; // 2 to 10
            n1 = quotient * divisor;
            n2 = divisor;
        }
        if(level === "2")
        {
            const quotient = Math.floor(Math.random() * 100) + 101; // 101 to 200
            const divisor = Math.floor(Math.random() * 11) + 2; // 2 to 12
            n1 = quotient * divisor;
            n2 = divisor;
        }
        if(level === "3")
        {
            n1 = Math.round((Math.random() * 99 + 101) * 10) / 10; // 101.0 to 200.0
            n2 = Math.floor(Math.random() * 11) + 2; // 2 to 12
        }
    }
    return [n1, n2];
}



function updateQuestion(level, operation) {
    const [n1, n2] = numberGenerator(level, operation);
    valueOne.textContent = n1;
    valueTwo.textContent = n2;
    questionUpdate.textContent = `Question ${currentQuestion}`;

    if(operation === "addition") {
        correctAnswer = n1 + n2;
    }
    else if(operation === "subtraction") {
        correctAnswer = n1 - n2;
    }
    else if(operation === "multiplication") {
        correctAnswer = n1 * n2;
    }
    else if(operation === "division") {
        correctAnswer = n1 / n2;
    }

    correctAnswer = Math.round(correctAnswer * 10) / 10; // Round to nearest tenth
    isFirstAttempt = true;

}

function startTimer() {
    secondsPassed = 0;
    timeEl.textContent = `Time: ${secondsPassed}s`;
    if(timeInterval) clearInterval(timeInterval);
    timeInterval = setInterval(() => {
        secondsPassed++;
        timeEl.textContent = `Time: ${secondsPassed}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timeInterval);
    timeInterval = null;
}

function checkAnswer() {

    if(!isGameActive) return;
    const userAnswer = parseFloat(answerInput.value);

    if(userAnswer === correctAnswer) 
    {
        if(isFirstAttempt) 
        {
            score++;
        }
        answerInput.value = "";

        if(currentQuestion < 10) 
        {
            currentQuestion++;
            updateQuestion(currentLevel.value, operation);
        }
        else 
        {
            stopTimer();
            isGameActive = false;
            submission.disabled = true;
            answerInput.disabled = true;
            startButton.textContent = "Restart";
            alert(`\nScore: ${score}/10. Time: ${secondsPassed}s`);
        }

    }
    else 
    {
        isFirstAttempt = false;
        alert("Incorrect answer. Try again!");
        answerInput.value = "";
        answerInput.focus();
    }
}

startButton.addEventListener("click", () => {
    isGameActive = true;
    currentQuestion = 1;
    score = 0;
    updateQuestion(currentLevel.value, operation);
    startTimer();
    submission.disabled = false;
    answerInput.disabled = false;
    answerInput.focus();
    startButton.textContent = "Start";
});

submission.addEventListener("click", checkAnswer);
answerInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        checkAnswer();
    }
});
