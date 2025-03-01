const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers:[
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraff", correct: false},
        ]
    },

    {
        question: "Which is the smallest country in the world?",
        answers:[
            {text: "Vatican", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]
    },

    {
        question: "Which is the largest desert in the world?",
        answers:[
            {text: "Sahara", correct: false},
            {text: "Gobi", correct: false},
            {text: "Antarctica", correct: true},
            {text: "kalahari", correct: false},
        ]
    },

    {
        question: "Which is the smallest continent in the world?",
        answers:[
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },
]

const questionEl = document.getElementById('question');
const answerButon = document.getElementById('answer-buttons');
const nextButon = document.getElementById('next-btn');

let currentQuestion = 0;
let score = 0;

function startQuiz(){
    currentQuestion = 0;
    score = 0;
    nextButon.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let Question = questions[currentQuestion];
    let questionNumber = currentQuestion + 1;
    questionEl.innerHTML = questionNumber + ". " + Question.question;

    Question.answers.forEach(answer =>{
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButon.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer)
    });
}

function resetState(){
    nextButon.style.display = 'none';
    while(answerButon.firstChild){
        answerButon.removeChild(answerButon.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButon.children).forEach(button=>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    
    nextButon.style.display = 'block';
}

function showScore(){
    resetState();
    questionEl.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButon.innerHTML = 'Play Again';
    nextButon.style.display = 'block'
}

function handleNextButton(){
    currentQuestion++;
    
    if(currentQuestion < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButon.addEventListener('click', ()=>{
    if(currentQuestion < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz()