const questions = [
  {
    question: "O que é cyberbullying?",
    answers: [
      {
        text: "A. A prática de brincadeira inofensivas na internet.",
        correct: false,
      },
      {
        text: "B. A prática de intimidação, humilhação, exposição vexatória e perseguição por meio de ambientes virtuais.",
        correct: true,
      },
      {
        text: "C. A prática de elogios e incentivos nas redes sociais.",
        correct: false,
      },
      { text: "D. A prática de ensinar boas maneiras online.", correct: false },
    ],
  },
  {
    question:
      "Quais são algumas ações consideradas cyberbullying, conforme mencionado no texto?",
    answers: [
      {
        text: "A. Apenas elogios à aparência física das pessoas.",
        correct: false,
      },
      {
        text: "B. Exposição de fotografias constrangedoras, divulgação de fotografias íntimas, críticas à aparência física, à opinião e ao comportamento social de indivíduos.",
        correct: true,
      },
      {
        text: "C. Compartilhamento de informações pessoais para fazer novos amigos online.",
        correct: false,
      },
      {
        text: "D. Ignorar completamente os outros jogadores em jogos online.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Quais são algumas consequências do cyberbullying mencionadas no texto?",
    answers: [
      {
        text: "A. Apenas sentimentos temporários de tristeza.",
        correct: false,
      },
      {
        text: "B. Isolamento social temporário.",
        correct: false,
      },
      {
        text: "C. Possíveis quadros de depressão, transtorno de ansiedade, síndrome do pânico e até mesmo suicídio em casos extremos.",
        correct: true,
      },
      {
        text: "D. Aumento da autoestima e melhora no desempenho escolar.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Quais atitudes são recomendadas para evitar ser vítimas de cyberbullying, de acordo com o texto?",
    answers: [
      {
        text: "A. Compartilhar fotos íntimas para mostrar confiança nas redes sociais.",
        correct: false,
      },
      {
        text: "B. Evitar bloquear pessoas que praticam cyberbullying para enfrentá-las.",
        correct: false,
      },
      {
        text: "C. Conversar com responsáveis ou adultos de confiança em caso de agressões, evitar exposição de intimidades na internet e bloquear pessoas que praticam cyberbullying.",
        correct: true,
      },
      {
        text: "D. Ignorar completamente as ações de cyberbullying e não procurar ajuda.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Qual a principal entre bullying e cyberbullying, de acordo com o texto?",
    answers: [
      {
        text: "A. Não há diferença, ambos significam a mesma coisa.",
        correct: false,
      },
      {
        text: "B. Bullying ocorre apenas no ambiente escolar, enquanto o cyberbullying acontece no ambiente virtual, ultrapassando fronteiras físicas.",
        correct: true,
      },
      {
        text: "C. Bullying é menos prejudicial do que o cyberbullying.",
        correct: false,
      },
      {
        text: "D. Bullying é apenas verbal, enquanto o cyberbullying é sempre físico.",
        correct: false,
      },
    ],
  },
];

const titleElement = document.getElementById("title");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const homeButton = document.getElementById("home-btn");
const medalImage = document.getElementById("medal");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próxima";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  medalImage.style.display = "none";
  homeButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(event) {
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    button.disabled = true;
  });

  nextButton.style.display = "block";
  homeButton.style.display = "none";
}

function showScore() {
  resetState();

  titleElement.innerHTML = "Você finalizou o quiz!";

  questionElement.classList.add("score");
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

  medalImage.style.display = "block";

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";

  homeButton.innerHTML = "Home";
  homeButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

homeButton.addEventListener("click", () => {
  window.location.href = "/";
});

startQuiz();
