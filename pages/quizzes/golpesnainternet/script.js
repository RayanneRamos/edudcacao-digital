const questions = [
  {
    question: "O que são golpes na internet? ",
    answers: [
      {
        text: "A. Tentativas de enganar as pessoas para obter dinheiro, informações pessoais ou outras coisas valiosas usando táticas astutas e persuasivas.",
        correct: true,
      },
      {
        text: "B. Novos jogos online populares.",
        correct: false,
      },
      {
        text: "C. Mensagens positivas compartilhadas por pessoas online.",
        correct: false,
      },
      {
        text: "D. Promoções legítimas oferecidas por empresas respeitáveis.",
        correct: false,
      },
    ],
  },
  {
    question: "Qual é um exemplo de golpe na internet mencionado no texto?",
    answers: [
      {
        text: "A. Ofertas de descontos em lojas online confiáveis.",
        correct: false,
      },
      {
        text: "B. Golpes de amizade, onde os golpistas fingem ser amigos online e pedem informações pessoais ou dinheiro.",
        correct: true,
      },
      {
        text: "C. Mensagens positivas compartilhadas em redes sociais.",
        correct: false,
      },
      {
        text: "D. E-mails solicitando informações pessoais de empresas legítimas.",
        correct: false,
      },
    ],
  },
  {
    question: "O que deve fazer se receber mensagens suspeitas online?",
    answers: [
      {
        text: "A. Ignorá-las, pois podem ser apenas brincadeiras inofensivas.",
        correct: false,
      },
      {
        text: "B. Responder imediatamente para descobrir mais informações sobre o remetente.",
        correct: false,
      },
      {
        text: "C. Conversar com pais ou responsáveis e não fornecer informações pessoais.",
        correct: true,
      },
      {
        text: "D. Compartilhar as mensagens com todos os amigos nas redes sociais.",
        correct: false,
      },
    ],
  },
  {
    question: "Como se proteger de golpes na internet?",
    answers: [
      {
        text: "A. Compartilhar senhas com amigos online para estabelecer confiança.",
        correct: false,
      },
      {
        text: "B. Acreditar em todas as ofertas online, especialmente se parecerem boas demais para ser verdade.",
        correct: false,
      },
      {
        text: "C. Verificar a autenticidade das mensagens ou sites antes de clicar em links ou fornecer informações pessoais.",
        correct: true,
      },
      {
        text: "D. Compartilhar informações pessoais sempre que solicitado, desde que o solicitante pareça confiável.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Qual é a importância de conversar com os pais ou responsáveis sobre mensagens suspeitas online?",
    answers: [
      {
        text: "A. Não é importante, pois os pais geralmente não entendem a internet.",
        correct: false,
      },
      {
        text: "B. Eles podem oferecer orientação e ajuda para identificar golpes  e proteger contra ameaças online.",
        correct: true,
      },
      {
        text: "C. Conversar com os pais apenas aumenta a preocupação e o medo.",
        correct: false,
      },
      {
        text: "D. Os pais não devem ser incomodados com assuntos online.",
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
