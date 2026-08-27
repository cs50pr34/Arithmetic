const valueOne = document.getElementById("numOne");
const valueTwo = document.getElementById("numTwo");
const answerInput = document.getElementById("answer");
const startButton = document.getElementById("start-btn");
const submission = document.getElementById("arrow-key");
const timeEl = document.getElementById("timer");
const currentLevel = document.getElementById("level");
const questionUpdate = document.querySelector(".question-number h2");
const pageTitle = document.title.toLowerCase();
const scoreBoard = document.getElementById("scoreBoard");
const accuracyText = document.getElementById("accuracy");
const timingData = document.getElementById("timing");
const errorInfo = document.getElementById("errorInfo");
const errorMessage = document.getElementById("errorMessage");
const reportBar = document.getElementById("reportBar");
const reportBtn = document.getElementById("reportBtn");
const gamesList = document.getElementById("gamesList");
const avgTime = document.getElementById("avgTime");
const bestTime = document.getElementById("bestTime");


let currentQuestion = 1;
let timeInterval = null;
let isGameActive = false;
let secondsPassed = 0;
let correctAnswer = 0;
let score = 0;
let isFirstAttempt = true;
let gamesCompleted = [];


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
    const answerGiven = answerInput.value.trim();
    const userAnswer = parseFloat(answerGiven);

    if(!isGameActive) return;

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
            accuracyText.textContent = `Accuracy: ${score}/10`;
            timingData.textContent = `Time Taken: ${secondsPassed}s`;
            scoreBoard.classList.add("active");
            updateReport(secondsPassed, score);
        }

    }
    else 
    {
        isFirstAttempt = false;
        const isWholeNumber = (correctAnswer % 1 === 0);
        const userUsedDecimal = answerGiven.includes(".");
        const userDecimals = userUsedDecimal ? answerGiven.split(".")[1].length : 0;
        if(isWholeNumber && userUsedDecimal)
        {
            errorMessage.textContent = "Please answer with a whole number.";
        }
        else if(!isWholeNumber && userDecimals > 1)
        {
            errorMessage.textContent = "Please round to the nearest tenth.";
        }
        else if(!isWholeNumber && !userUsedDecimal) {
            errorMessage.textContent = "Please provide a proper answer rounded to the nearest tenth.";
        }
        else
        {
            errorMessage.textContent = "Keep trying until you get it right!";
        }
        errorInfo.classList.add("active");
        answerInput.value = "";
    }
}

function updateReport(timeTaken, accuracy) {
    gamesCompleted.unshift({ time: timeTaken, score: accuracy});
    if(gamesCompleted.length > 5) {
        gamesCompleted.pop();
    }

    let historyItems = "";
    gamesCompleted.forEach((game, index) => {
        let label = `${index} Rounds ago`;
        if(index === 0) {
            label = "Current Round";
        }
        if(index === 1) {
            label = "Last Round";
        }
        historyItems += `
            <div class="report-data">
                <h3>${label}</h3>
                <p>Time: ${game.time}s</p>
                <p>Score: ${game.score}/10</p>
            </div>
            `;
    });
    gamesList.innerHTML = historyItems;
    let totalSeconds = 0;
    let shortestTime = gamesCompleted[0].time;
    gamesCompleted.forEach(game => {
        totalSeconds += game.time;
        if(game.time < shortestTime) {
            shortestTime = game.time;
        }
    });
    let averageTime = (totalSeconds / gamesCompleted.length).toFixed(1);
    console.log(`Average Time: ${averageTime}s, Shortest Time: ${shortestTime}s`);
    avgTime.textContent = `Average Time: ${averageTime}s`;
    bestTime.textContent = `Shortest Time: ${shortestTime}s`;
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

scoreBoard.addEventListener("click",() => {
    scoreBoard.classList.remove("active");
});

errorInfo.addEventListener("click",() => {
    errorInfo.classList.remove("active");
    answerInput.focus();
});

answerInput.addEventListener("input", (e) => {
    e.target.value = e.target.value
    .replace(/[^0-9.]/g, '') //Removes non-numeric characters except decimal points
    .replace(/(\..*?)\..*/g, '$1'); //Allows only one decimal point
});

reportBtn.addEventListener("click", () => {
    reportBar.classList.toggle("open");
});