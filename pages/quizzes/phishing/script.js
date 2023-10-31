const questions = [
  {
    question: "O que é phishing?",
    answers: [
      {
        text: "A. Uma forma de pagamento online segura.",
        correct: false,
      },
      {
        text: "B. Um tipo de fraude online em que cirminosos tentam obter informações pessoais enganando as pessoas.",
        correct: true,
      },
      {
        text: "C. Um software de proteção contra vírus.",
        correct: false,
      },
      {
        text: "D. Um jogo popular online.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Como os phishers geralmente tentam obter informações pessoais das vítimas?",
    answers: [
      {
        text: "A. Através de chamadas telefônicas.",
        correct: false,
      },
      {
        text: "B. Enviando mensagens em redes sociais pedindo informações pessoais.",
        correct: false,
      },
      {
        text: "C. Somente através de sites oficiais.",
        correct: false,
      },
      {
        text: "D. Enviando e-mails falsos ou criando sites falsos que se parecem com sites reais.",
        correct: true,
      },
    ],
  },
  {
    question: "O que você deve verificar ao receber um e-mail suspeito?",
    answers: [
      {
        text: "A. Verificar se contém muitos emojis.",
        correct: false,
      },
      {
        text: "B. Verificar o endereço de e-mail do remetente e não ficar em links suspeitos.",
        correct: true,
      },
      {
        text: "C. Ignorar o e-mail, pois é provavelmente spam.",
        correct: false,
      },
      {
        text: "D. Responder ao e-mail com suas informações para confirmar sua identidade.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Como verificar a autenticidade de um site antes de inserir informações pessoais?",
    answers: [
      {
        text: "A. Certificar-se de que o site possui um design atraente.",
        correct: false,
      },
      {
        text: "B. Verificar se o site começa com “https://” e possui um cadeado de segurança.",
        correct: true,
      },
      {
        text: "C. Não é necessário verificar a autenticidade de um site.",
        correct: false,
      },
      {
        text: "D. Confiar apenas na aparência do site.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Qual é a importância de manter o software atualizado para se proteger contra o phishing?",
    answers: [
      {
        text: "A. Não há relação entre software atualizado e proteção contra phishing.",
        correct: false,
      },
      {
        text: "B. Software atualizado geralmente corrige vulnerabilidades de segurança, ajudando a proteger contra ameaças online.",
        correct: true,
      },
      {
        text: "C. Atualizações de software só melhoram o desempenho do dispositivo, não a segurança.",
        correct: false,
      },
      {
        text: "D. Manter o software atualizado apenas torna o dispositivo mais lento.",
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
const quizContentDiv = document.getElementById("quiz-content");

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

  quizContentDiv.classList.remove("quiz-finish-container");
  quizContentDiv.classList.add("app-quiz");

  titleElement.innerHTML = "Quiz Phishing";
  titleElement.classList.remove("quiz-finish-title");

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

  quizContentDiv.classList.remove("app-quiz");
  quizContentDiv.classList.add("quiz-finish-container");

  titleElement.innerHTML = "Você finalizou o quiz!";
  titleElement.classList.add("quiz-finish-title");

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
