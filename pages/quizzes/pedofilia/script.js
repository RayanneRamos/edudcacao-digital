const questions = [
  {
    question: "O que é pedofilia?",
    answers: [
      {
        text: "A. Um crime de abuso sexual cometido por adultos contra crianças.",
        correct: false,
      },
      {
        text: "B. Uma orientação sexual caracterizada pela atração de adultos por crianças pré-púberes.",
        correct: true,
      },
      {
        text: "C. Uma forma de brincadeira inofensiva entre adultos e crianças.",
        correct: false,
      },
      {
        text: "D. Um comportamento aceitável em algumas culturas.",
        correct: false,
      },
    ],
  },
  {
    question: "Qual é a diferença entre pedofilia e abuso sexual de crianças?",
    answers: [
      {
        text: "A. Pedofilia é uma orientação sexual, enquanto o abuso sexual de crianças é crime.",
        correct: true,
      },
      {
        text: "B. Pedofilia e abuso sexual de crianças são termos intercambiáveis e significam a mesma coisa.",
        correct: false,
      },
      {
        text: "C. Pedofilia é uma condição médica, enquanto o abuso sexual de crianças é um comportamento socialmente aceitável em algumas situações.",
        correct: false,
      },
      {
        text: "D. Não há diferença entre pedofilia e abuso sexual de crianças.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Quais são os direitos destacados no texto que as crianças devem lembrar?",
    answers: [
      {
        text: "A. Direito à intimidar os outros se sentirem ameaçadas.",
        correct: false,
      },
      {
        text: "B. Direito de manter segredos dos pais ou responsáveis.",
        correct: false,
      },
      {
        text: "C. Direito à segurança, à privacidade e ao direito de dizer “não”.",
        correct: true,
      },
      {
        text: "D. Direito de não falar com adultos sobre experiências desconfortáveis para evitar preocupá-los.",
        correct: false,
      },
    ],
  },
  {
    question:
      "O que as crianças devem fazer se sentirem desconfortáveis ou ameaças?",
    answers: [
      {
        text: "A. Manter o silêncio e esperar que a situação melhore.",
        correct: false,
      },
      {
        text: "B. Falar com um adulto de confiança imediatamente.",
        correct: true,
      },
      {
        text: "C. Ignorar o sentimento de desconforto e continuar a interagir com a pessoa.",
        correct: false,
      },
      {
        text: "D. Lidar com a situação sozinhas sem buscar ajuda.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Quais são algumas dicas mencionadas no texto para se proteger contra abuso e situações desconfortáveis?",
    answers: [
      {
        text: "A. Compartilhar todas as informações pessoais online para criar amizades virtuais.",
        correct: false,
      },
      {
        text: "B. Evitar ficar sozinho com adultos que fazem a criança se sentir desconfortável e não compartilhar informações pessoais online.",
        correct: true,
      },
      {
        text: "C. Ignorar os próprios instintos e confiar em qualquer pessoa que apareça online.",
        correct: false,
      },
      {
        text: "D. Não conversar com os pais sobre experiências desconfortáveis para evitar preocupá-los.",
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

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
}

function showScore() {
  resetState();

  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
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

startQuiz();
