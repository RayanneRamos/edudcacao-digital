const questions = [
  {
    question:
      "Quais são os riscos associados à publicação de informações privadas online para crianças e adolescentes?",
    answers: [
      {
        text: "A. Aumento da popularidade online.",
        correct: false,
      },
      {
        text: "B. Riscos de segurança, cyberbullying, impacto na reputação e violência offline.",
        correct: true,
      },
      {
        text: "C. Maior privacidade nas redes sociais.",
        correct: false,
      },
      {
        text: "D. Melhor oportunidade de emprego no futuro.",
        correct: false,
      },
    ],
  },
  {
    question:
      "O que pode acontecer se informações pessoais como nome completo e endereço forem compartilhados publicamente?",
    answers: [
      {
        text: "A. Não há riscos associados a compartilhar essas informações publicamente.",
        correct: false,
      },
      {
        text: "B. Pode resultar em phising, fraude ou assédio por criminosos cibernéticos.",
        correct: true,
      },
      {
        text: "C. Aumento da popularidade online.",
        correct: false,
      },
      {
        text: "D. Melhor controle sobre as configurações de privacidade.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Qual é uma das maneiras de proteger a privacidade online, conforme mencionado no texto?",
    answers: [
      {
        text: "A. Compartilhar senhas com amigos de confiança.",
        correct: false,
      },
      {
        text: "B. Ignorar configurações de privacidade em redes sociais.",
        correct: false,
      },
      {
        text: "C. Usar senhas fortes e não compartilhá-las, exceto com pais ou responsáveis.",
        correct: true,
      },
      {
        text: "D. Manter todas as informações pessoais públicas para ganhar popularidade.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Como os pais e responsáveis podem ajudar a proteger seus filhos online?",
    answers: [
      {
        text: "A. Não se envolvendo nas atividades online de seus filhos.",
        correct: false,
      },
      {
        text: "B. Fornecendo a orientação sobre os perigos da divulgação de informações privadas e incentivando o pensamento crítico.",
        correct: true,
      },
      {
        text: "C. Ignorando a comunicação aberta sobre as experiências online de seus filhos.",
        correct: false,
      },
      {
        text: "D. Compartilhando todas as informações pessoais dos filhos online.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Qual a importância do pensamento crítico ao compartilhar informações online?",
    answers: [
      {
        text: "A. Não é importante pensar criticamente ao compartilhar informações online.",
        correct: false,
      },
      {
        text: "B. Ajudar a discernir entre informações pessoais e públicas e considerar as implicações antes de compartilhar algo. ",
        correct: true,
      },
      {
        text: "C. Pode aumentar a popularidade online sem riscos.",
        correct: false,
      },
      {
        text: "D. Pode levar a uma maior vulnerabilidade online.",
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

  titleElement.innerHTML = "Quiz Publicação de Informações Privadas";
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
