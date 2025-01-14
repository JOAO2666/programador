const riddles = [
    {
        question: "Sou um conceito fundamental em programação. Quando você me usa, você não sabe exatamente o que vai acontecer, mas sabe que algo vai acontecer eventualmente. Em JavaScript moderno, você frequentemente me usa com .then(). O que sou eu?",
        answer: "promise",
        hint: "Async/Await é uma forma mais moderna de me utilizar."
    },
    {
        question: "Em programação, sou como um espelho mágico. Posso examinar a mim mesmo, modificar meu próprio comportamento e até criar novas versões de mim durante a execução. Em Python, type() e getattr() são exemplos do meu uso. O que sou eu?",
        answer: "reflection",
        hint: "Permite que um programa examine e modifique sua própria estrutura e comportamento em tempo de execução."
    },
    {
        question: "Sou um padrão de projeto que garante que apenas uma instância de uma classe exista. Meu construtor é privado e você só pode me acessar através de um método estático. O que sou eu?",
        answer: "singleton",
        hint: "Muito usado em conexões de banco de dados e configurações globais."
    },
    {
        question: "Quando você me usa, eu guardo um valor antigo para calcular um novo. Em programação funcional, sou fundamental para processar arrays. Em JavaScript, você me usa assim: array.reduce((acc, curr) => acc + curr, 0). O que sou eu?",
        answer: "accumulator",
        hint: "Sou o primeiro parâmetro em funções reduce()."
    },
    {
        question: "Sou uma estrutura de dados onde o último a entrar é o primeiro a sair. Em JavaScript, push() e pop() são minhas operações principais. Na recursão, sou crucial para rastrear chamadas de função. O que sou eu?",
        answer: "stack",
        hint: "Call stack é um exemplo famoso do meu uso."
    },
    {
        question: "Em programação funcional, sou uma função que retorna outra função. Posso 'lembrar' variáveis do escopo externo mesmo depois que ele não existe mais. O que sou eu?",
        answer: "closure",
        hint: "JavaScript developers me usam para encapsulamento de dados."
    },
    {
        question: "Sou um conceito em programação onde uma função chama a si mesma. Tenho sempre um caso base para evitar loops infinitos. O fatorial é um exemplo clássico do meu uso. O que sou eu?",
        answer: "recursion",
        hint: "Muito usado em estruturas de dados como árvores e grafos."
    },
    {
        question: "Em programação orientada a objetos, sou um princípio que permite que uma classe use atributos e métodos de outra classe. Em JavaScript, uso a palavra-chave 'extends'. O que sou eu?",
        answer: "inheritance",
        hint: "Fundamental para reuso de código em OOP."
    },
    {
        question: "Sou um tipo especial de função que pode ser pausada e resumida. Em JavaScript, uso a palavra-chave 'yield' para retornar valores. O que sou eu?",
        answer: "generator",
        hint: "Útil para criar sequências infinitas de forma eficiente."
    },
    {
        question: "Quando você precisa garantir que apenas um thread por vez acesse um recurso compartilhado, você me usa. Sou crucial para evitar condições de corrida. O que sou eu?",
        answer: "mutex",
        hint: "Mutual exclusion é meu nome completo."
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
