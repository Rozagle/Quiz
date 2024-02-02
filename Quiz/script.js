const questions = [
{
    question :"what five basic senses do humans have?",
    answers: [
        {Text: "Smell, taste, sight, hearing and taste", correct:true},
        {Text: "love gustation", correct:false},
        {Text: "emotions", correct:false},
        {Text: " olfaction", correct:false}

    ]
},
{
    question :"What year was the United Nations established? ",
    answers: [
        {Text: "1934", correct:false},
        {Text: "1956", correct:false},
        {Text: "1945", correct:true},
        {Text: "1985", correct:false}

    ]
},
{ question :"How many faces does a Dodecahedron have?",
  answers: [
    {Text: "11", correct:false},
    {Text: "14", correct:false},
    {Text: "3", correct:false},
    {Text: " 12", correct:true}

]
},
{
    question :"what is the biggest annimal?",
    answers: [
        {Text: "Elephant", correct:true},
        {Text: "snake", correct:false},
        {Text: "hourse", correct:false},
        {Text: "donky", correct:false}

    ]
}

];

const questionElement = document.getElementById("question");
const answersButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score=0;

 
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + "."+ currentQuestion.question;

    //display question
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answersButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display= "none";
    while(answersButtons.firstChild){
        answersButtons.removeChild(answersButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectbutton = e.target;
    const isCoreect = selectbutton.dataset.correct=== "true";
    if(isCoreect){
        selectbutton.classList.add("correct");
        score++;
    }else{
        selectbutton.classList.add("incorrect");
    }

    Array.from(answersButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; //after click one time then we can not click any another button 
    });
    nextButton.style.display= "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display= "block";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})



startQuiz();