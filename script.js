const valueOne = document.getElementById("numOne");
const valueTwo = document.getElementById("numTwo");
const answerInput = document.getElementById("answer");
const startButton = document.getElementById("start-btn");
const submission = document.getElementById("arrow-key");
const timeEl = document.getElementById("timer");
const currentLevel = document.getElementById("level");
const questionUpdate = document.querySelector("question-number h2");
const pageTitle = document.title.toLowerCase();

let currentQuestion = 1;
let timeInterval = null;
let isGameActive = false;

function numberGenerator(level) {
    let n1, n2;

    if(operation === "addition" || operation === "substraction")
    {
        if(level === "1")
        {
            n1 = Math.floor(Math.random() * 10) + 1; // 1 to 10
            n1 = Math.floor(Math.random() * n1) + 1; // 1 to n1
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
}