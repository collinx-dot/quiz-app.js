const questions = [
    {
        question: 'who is the first man to live on earth',
        answers:[
            {text:'Adam', correct: true},
            {text:'Eve', correct: false},
            {text:'Jacob', correct: false},
            {text:'Mary', correct: false},
        ]
    }
]

let questionEl = document.getElementById('question');
let answerButon = document.getElementById('answer-button');
let NextButton = document.getElementById('next');

let currentQuestion = 0;
let score = 0;

function startQuiz(){
    currentQuestion = 0;
    score = 0;
    NextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let Question = questions[currentQuestion];
   let questionNumber = currentQuestion +1;
   questionEl.innerHTML = questionNumber + "." + Question.question;

   Question.answers.forEach(answer =>{
    const button = document.createElement('button');
    button.innerHTML = answer.text
    button.classList.add('btn');
    answerButon.appendChild(button)

    if(answer.correct){
        button.dataset.correct = answer.correct;
       }
    
       button.addEventListener('click', selectAnswer)
   })

}

function resetState(){
    NextButton.style.display = 'none'
    while(answerButon.firstChild){
        answerButon.remove(answerButon.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect')
    }

    Array.from(answerButon.children).forEach(button=>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true;
    })
    NextButton.style.display = 'block';
}

NextButton.addEventListener('click', ()=>{
    if(currentQuestion < questions.length){
        handleNextButton();
    }else{
        showQuestion();
    }
})

function handleNextButton(){
    currentQuestion++;
    if(currentQuestion < questions.length){
        showScore();
    }else{
        showQuestion();
    }
}
function showScore(){
    resetState();
    questionEl.innerHTML = `you scored ${score} out of ${questions.length}`;
    NextButon.innerHTML = 'play again';
    NextButton.style.display = 'block';
}

startQuiz();

