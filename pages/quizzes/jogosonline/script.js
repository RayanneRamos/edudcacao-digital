const questions = [
  {
    question:
      "Quais são alguns benefícios dos jogos online, conforme mencionado no texto?",
    answers: [
      {
        text: "A. Causar isolamento social e prejudicar o aprendizado.",
        correct: false,
      },
      {
        text: "B. Estimular a criatividade, desenvolver habilidades sociais, permitir o aprendizado divertido e envolver trabalho em equipe.",
        correct: true,
      },
      {
        text: "C. Promover o sedentarismo e prejudicar a saúde física.",
        correct: false,
      },
      {
        text: "D. Reduzir a capacidade de resolução de problemas.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Quais são alguns cuidados necessários para jogar online com segurança, de acordo com o texto?",
    answers: [
      {
        text: "A. Ignorar classificações etárias e compartilhar informações pessoais com outros jogadores.",
        correct: false,
      },
      {
        text: "B. Evitar qualquer interação com outros jogadores e passar horas jogando sem pausas.",
        correct: false,
      },
      {
        text: "C. Manter as informações de login seguras, evitar compras in-game sem permissão, e tratar outros jogadores com respeito e empatia.",
        correct: true,
      },
      {
        text: "D. Compartilhar informações pessoais livremente para fazer amigos online.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Quais são alguns dos riscos dos jogos online mencionados no texto?",
    answers: [
      {
        text: "A. Jogos online não apresentam riscos, são completamente seguros para todas as idades.",
        correct: false,
      },
      {
        text: "B. Riscos incluem conteúdo inadequado, vício em jogos, exposição a estranhos, gastos in-game sem controle, privacidade e segurança comprometidas, cyberbullying, excesso de tempo de tela e desinformação.",
        correct: true,
      },
      {
        text: "C. Os jogos online são apenas para adultos e não oferecem riscos para crianças e adolescentes.",
        correct: false,
      },
      {
        text: "D. Os jogos online são completamente inofensivos e não têm riscos associados.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Como os pais podem proteger as crianças ao jogar online, de acordo com o texto?",
    answers: [
      {
        text: "A. Permitindo que as crianças joguem o tempo que quiserem sem monitoramento.",
        correct: false,
      },
      {
        text: "B. Incentivando o uso excessivo de jogos para manter as crianças ocupadas.",
        correct: false,
      },
      {
        text: "C. Não se envolvendo na vida digital de seus filhos.",
        correct: false,
      },
      {
        text: "D. Definindo limites de tempo, verificando classificações etárias, monitorando o comportamento online e ensinando sobre segurança online.",
        correct: true,
      },
    ],
  },
  {
    question:
      "O que os pais devem fazer se os filhos encontrarem problemas ou situações desconfortáveis enquanto jogam online?",
    answers: [
      {
        text: "A. Ignorar o problema e esperar que desapareça por conta própria.",
        correct: false,
      },
      {
        text: "B. Conversar com os filhos, oferecer suporte emocional e resolver o problema juntos.",
        correct: true,
      },
      {
        text: "C. Culpar os jogos online pelos problemas encontrados.",
        correct: false,
      },
      {
        text: "D. Não fazer nada, pois faz parte da experiência online.",
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
