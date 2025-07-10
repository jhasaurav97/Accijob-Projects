document.addEventListener("DOMContentLoaded", () => {
  let quizData = null;

  fetch("quiz-data.json")
    .then((res) => {
      if (!res.ok) throw new Error("Quiz data failed to load");
      return res.json();
    })
    .then((data) => {
      if (!data.sections || data.sections.length === 0)
        throw new Error("No quiz sections found.");
      quizData = data;
      initializeSections();
    })
    .catch((error) => console.error("Error loading quiz data:", error));

  function initializeSections() {
    document.querySelectorAll(".section").forEach((section) => {
      section.addEventListener("click", () => {
        const index = parseInt(section.dataset.section);
        startQuiz(index);
      });
    });
  }

  function startQuiz(sectionIndex) {
    const section = quizData.sections[sectionIndex];
    if (!section?.questions?.length) return;

    const questions = shuffleArray([...section.questions]); // Shuffle once
    let currentIndex = 0;
    let score = 0;
    let answered = false;

    const quizContainer = document.getElementById("quiz-container");
    const questionContainer = document.getElementById("question-container");
    const scoreEl = document.getElementById("score");
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const nextBtn = document.getElementById("next-button");

    quizContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");

    renderQuestion();

    nextBtn.onclick = () => {
      if (!answered) return;
      currentIndex++;
      if (currentIndex >= questions.length) showResult();
      else renderQuestion();
    };

    function renderQuestion() {
      answered = false;
      const q = questions[currentIndex];
      scoreEl.textContent = `Score: ${score}`;
      questionEl.textContent = q.question;
      optionsEl.innerHTML = "";

      q.questionType === "mcq" ? renderMCQ(q) : renderInput(q);
    }

    function renderMCQ(question) {
      const shuffledOptions = shuffleArray([...question.options]);
      shuffledOptions.forEach((option) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.setAttribute("tabindex", "0");
        div.textContent = option;

        div.addEventListener("click", () =>
          handleAnswer(div, option, question.answer)
        );
        div.addEventListener("keydown", (e) => {
          if (e.key === "Enter") handleAnswer(div, option, question.answer);
        });

        optionsEl.appendChild(div);
      });
    }

    function renderInput(question) {
      const input = document.createElement("input");
      input.type = question.questionType === "number" ? "number" : "text";
      input.placeholder = "Type your answer";

      const btn = document.createElement("button");
      btn.textContent = "Submit Answer";
      btn.classList.add("submit-answer");

      btn.onclick = () => {
        if (answered) return;
        const userAns = input.value.trim();
        if (!userAns) return;
        answered = true;
        const isCorrect =
          userAns.toLowerCase() === question.answer.toString().toLowerCase();
        if (isCorrect) score++;
        showFeedback(isCorrect, question.answer);
        updateScore();
      };

      optionsEl.append(input, btn);
      input.focus();
    }

    function handleAnswer(element, selected, correct) {
      if (answered) return;
      answered = true;

      const isCorrect = selected === correct;
      if (isCorrect) {
        element.classList.add("correct");
        score++;
      } else {
        element.classList.add("wrong");
        document.querySelectorAll(".option").forEach((opt) => {
          if (opt.textContent === correct) opt.classList.add("correct");
        });
      }

      showFeedback(isCorrect, correct);
      updateScore();
    }

    function showFeedback(correct, answer) {
      const msg = document.createElement("div");
      msg.id = "feedback";
      msg.textContent = correct
        ? "✅ Correct!"
        : `❌ Wrong. Correct answer: ${answer}`;
      msg.style.color = correct ? "green" : "red";
      optionsEl.appendChild(msg);
    }

    function updateScore() {
      scoreEl.textContent = `Score: ${score}`;
    }

    function showResult() {
      const total = questions.length;
      const scoreOutOf10 = Math.round((score / total) * 10);
      questionContainer.innerHTML = `
        <h1>🎉 Quiz Completed!</h1>
        <p>Your Score: <strong>${score}</strong> / ${total}</p>
        <p>⭐ Final Rating: <strong>${scoreOutOf10}</strong> / 10</p>
        <button id="home-button">🏠 Go to Home</button>
      `;

      document.getElementById("home-button").addEventListener("click", () => {
        location.reload();
      });
    }
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
});
