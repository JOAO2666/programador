const riddles = [
    {
        question: "O que tem cidades, mas não tem casas; tem montanhas, mas não tem árvores; tem água, mas não tem peixes; tem estradas, mas não tem carros?",
        answer: "mapa",
        hint: "Você usa isso para se localizar."
    },
    {
        question: "Quanto mais você tira, maior eu fico. O que sou eu?",
        answer: "buraco",
        hint: "Pense em algo que cresce quando você remove material dele."
    },
    {
        question: "O que é, o que é: tem dentes mas não morde?",
        answer: "pente",
        hint: "Você usa isso todo dia para arrumar seu cabelo."
    },
    {
        question: "O que é que está no meio do começo, no começo do meio, e no final do fim?",
        answer: "e",
        hint: "É uma letra que aparece em todas essas palavras."
    },
    {
        question: "Tenho milhões de olhos, mas vivo na escuridão. Tenho milhares de ouvidos, mas só tenho silêncio. Tenho milhares de pernas, mas não posso andar. O que sou?",
        answer: "oceano",
        hint: "É vasto e profundo, cheio de mistérios."
    }
];

let currentLevel = 0;
let gameStarted = false;

const riddleText = document.getElementById('riddle-text');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const startBtn = document.getElementById('start-btn');
const hintBtn = document.getElementById('hint-btn');
const hintText = document.getElementById('hint-text');
const progress = document.getElementById('progress');

answerInput.style.display = 'none';
submitBtn.style.display = 'none';
hintBtn.style.display = 'none';

function startGame() {
    gameStarted = true;
    currentLevel = 0;
    startBtn.style.display = 'none';
    answerInput.style.display = 'block';
    submitBtn.style.display = 'block';
    hintBtn.style.display = 'block';
    loadRiddle();
}

function loadRiddle() {
    if (currentLevel >= riddles.length) {
        gameComplete();
        return;
    }
    
    progress.textContent = `Nível ${currentLevel + 1}/${riddles.length}`;
    riddleText.textContent = riddles[currentLevel].question;
    answerInput.value = '';
    hintText.textContent = '';
}

function checkAnswer() {
    const userAnswer = answerInput.value.toLowerCase().trim();
    const correctAnswer = riddles[currentLevel].answer;

    if (userAnswer === correctAnswer) {
        currentLevel++;
        if (currentLevel >= riddles.length) {
            gameComplete();
        } else {
            showMessage('Correto! Próximo nível...', 'success');
            setTimeout(loadRiddle, 1500);
        }
    } else {
        showMessage('Resposta incorreta. Tente novamente!', 'error');
    }
}

function showHint() {
    hintText.textContent = riddles[currentLevel].hint;
}

function gameComplete() {
    riddleText.textContent = 'Parabéns! Você completou todos os enigmas!';
    answerInput.style.display = 'none';
    submitBtn.style.display = 'none';
    hintBtn.style.display = 'none';
    startBtn.style.display = 'block';
    startBtn.textContent = 'Jogar Novamente';
}

function showMessage(message, type) {
    const originalText = riddleText.textContent;
    riddleText.textContent = message;
    riddleText.style.color = type === 'success' ? '#4ecca3' : '#e84545';
    
    setTimeout(() => {
        riddleText.style.color = '#fff';
        if (currentLevel < riddles.length) {
            riddleText.textContent = originalText;
        }
    }, 1500);
}

startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', checkAnswer);
hintBtn.addEventListener('click', showHint);

answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});
