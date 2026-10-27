
const questions = [
    {
        topic: "❤️ Heart Health",
        question: "Which habit supports a healthy heart?",
        options: ["Smoking", "Regular physical activity", "Skipping sleep", "Sitting all day"],
        correct: 1
    },
    {
        topic: "🩸 Diabetes",
        question: "Which organ produces insulin?",
        options: ["Liver", "Lungs", "Pancreas", "Heart"],
        correct: 2
    },
    {
        topic: "🫁 Respiratory Health",
        question: "Which of these can trigger asthma symptoms?",
        options: ["Dust and pollen", "Drinking water", "Reading", "Gentle stretching"],
        correct: 0
    },
    {
        topic: "🧠 Mental Well-being",
        question: "What can help you manage everyday stress?",
        options: ["Ignoring every feeling", "Never taking breaks", "Slow breathing and relaxation", "Skipping meals"],
        correct: 2
    },
    {
        topic: "🦴 Bone & Joint Health",
        question: "Which nutrient helps keep bones strong?",
        options: ["Vitamin C only", "Calcium", "Sugar", "Caffeine"],
        correct: 1
    },
    {
        topic: "🛡️ Infections",
        question: "What is one effective way to reduce the spread of infections?",
        options: ["Sharing towels", "Avoiding handwashing", "Washing hands regularly", "Touching your face often"],
        correct: 2
    },
    {
        topic: "❤️ Heart Health",
        question: "Which food choice can support heart health?",
        options: ["More fruits and vegetables", "Only salty snacks", "Sugary drinks all day", "Avoiding all fibre"],
        correct: 0
    },
    {
        topic: "🩸 Diabetes",
        question: "Which can be a possible symptom of diabetes?",
        options: ["Unusual thirst and frequent urination", "Stronger eyesight", "Faster hair growth", "Always feeling cold hands"],
        correct: 0
    },
    {
        topic: "🫁 Respiratory Health",
        question: "What should someone with asthma do about their prescribed inhaler?",
        options: ["Stop it whenever they feel better", "Use it only as directed by their clinician", "Share it with friends", "Change the dose themselves"],
        correct: 1
    },
    {
        topic: "🧠 Mental Well-being",
        question: "What is a healthy step when emotional struggles persist?",
        options: ["Keep it secret forever", "Blame yourself", "Talk to someone you trust or a professional", "Ignore your needs"],
        correct: 2
    },
    {
        topic: "🦴 Bone & Joint Health",
        question: "Which activity can help support bone strength?",
        options: ["Weight-bearing activity suited to your ability", "Never moving", "Skipping all meals", "Avoiding daylight completely"],
        correct: 0
    },
    {
        topic: "🛡️ Infections",
        question: "Do antibiotics work against viruses such as those that cause colds?",
        options: ["Yes, always", "Only at night", "No, antibiotics treat bacterial infections, not viruses", "Yes, if taken without advice"],
        correct: 2
    }
];

let currentQuestion = 0;
let answers = [];
let completed = false;

const form = document.getElementById("wellness-quiz");
const questionTitle = document.getElementById("question");
const optionsContainer = document.getElementById("answer-options");
const questionCount = document.getElementById("question-count");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const nextButton = document.getElementById("next-button");
const errorMessage = document.getElementById("quiz-error");
const quizTag = document.querySelector(".quiz-tag");

function showQuestion() {
    const question = questions[currentQuestion];

    quizTag.textContent = question.topic.toUpperCase();
    questionTitle.textContent = question.question;
    questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

    const progress = Math.round((currentQuestion / questions.length) * 100);
    progressPercent.textContent = `${progress}%`;
    progressFill.style.width = `${progress}%`;

    optionsContainer.innerHTML = "";

    question.options.forEach((label, index) => {
        const option = document.createElement("label");
        option.className = "answer-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = index;
        input.required = true;
        input.checked = answers[currentQuestion] === index;

        const text = document.createElement("span");
        text.textContent = label;

        option.append(input, text);
        optionsContainer.appendChild(option);
    });

    errorMessage.textContent = "";
    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "See My Results ♡"
            : "Next Question →";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (completed) {
        currentQuestion = 0;
        answers = [];
        completed = false;
        showQuestion();
        return;
    }

    const selected = form.querySelector('input[name="answer"]:checked');

    if (!selected) {
        errorMessage.textContent = "Please choose an answer first 💗";
        return;
    }

    answers[currentQuestion] = Number(selected.value);

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    completed = true;

    const score = answers.reduce(
        (total, answer, index) =>
            total + (answer === questions[index].correct ? 1 : 0),
        0
    );

    let heading;
    let message;

    if (score >= 10) {
        heading = "Amazing work! 🌷";
        message = "You have a strong grasp of these health basics. Keep learning and caring for yourself!";
    } else if (score >= 7) {
        heading = "You're doing well! 💗";
        message = "You know quite a bit already. Review the answers below to strengthen your knowledge.";
    } else {
        heading = "Every day is a chance to learn 🪻";
        message = "No pressure! Explore the Wellvia health topics and try the quiz again when you're ready.";
    }

    quizTag.textContent = "YOUR WELLVIA HEALTH QUIZ";
    questionTitle.textContent = heading;

    optionsContainer.innerHTML = `
        <div class="result-box">
            <p class="score">${score} / ${questions.length}</p>
            <h3>${message}</h3>
            <p class="result-intro">Here's how you answered:</p>
            <div id="answer-review"></div>
        </div>
        <p class="health-disclaimer">
            This quiz is for general education only and does not diagnose
            or replace advice from a qualified healthcare professional.
        </p>
    `;

    const review = document.getElementById("answer-review");

    questions.forEach((question, index) => {
        const correct = answers[index] === question.correct;
        const item = document.createElement("div");
        item.className = "review-item";

        const title = document.createElement("strong");
        title.textContent = `${correct ? "✓" : "✗"} ${question.topic}`;

        const prompt = document.createElement("p");
        prompt.textContent = question.question;

        const answer = document.createElement("p");
        answer.textContent = `Correct answer: ${question.options[question.correct]}`;

        item.append(title, prompt, answer);
        review.appendChild(item);
    });

    questionCount.textContent = "Quiz completed!";
    progressPercent.textContent = "100%";
    progressFill.style.width = "100%";
    errorMessage.textContent = "";
    nextButton.textContent = "Try Again ↻";
}

showQuestion();
