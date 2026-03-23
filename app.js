// কুইজ ডাটা
        const quizQuestions = [
            {
                question: "What is the capital of France?",
                answers: [
                    { text: "London", correct: false },
                    { text: "Berlin", correct: false },
                    { text: "Paris", correct: true },
                    { text: "Madrid", correct: false },
                ],
            },
            {
                question: "Which planet is known as the Red Planet?",
                answers: [
                    { text: "Venus", correct: false },
                    { text: "Mars", correct: true },
                    { text: "Jupiter", correct: false },
                    { text: "Saturn", correct: false },
                ],
            },
            {
                question: "What is the largest ocean on Earth?",
                answers: [
                    { text: "Atlantic Ocean", correct: false },
                    { text: "Indian Ocean", correct: false },
                    { text: "Arctic Ocean", correct: false },
                    { text: "Pacific Ocean", correct: true },
                ],
            },
            {
                question: "Which of these is NOT a programming language?",
                answers: [
                    { text: "Java", correct: false },
                    { text: "Python", correct: false },
                    { text: "Banana", correct: true },
                    { text: "JavaScript", correct: false },
                ],
            },
            {
                question: "What is the chemical symbol for gold?",
                answers: [
                    { text: "Go", correct: false },
                    { text: "Gd", correct: false },
                    { text: "Au", correct: true },
                    { text: "Ag", correct: false },
                ],
            },
        ];

        // এলিমেন্টগুলো সিলেক্ট করা
        const questionElement = document.getElementById("question-text");
        const answerButtonsElement = document.getElementById("answer-buttons");
        const currentNumSpan = document.getElementById("current-num");
        const totalNumSpan = document.getElementById("total-num");
        const scoreSpan = document.getElementById("score-val");
        const progressBar = document.getElementById("progress-bar");

        let currentQuestionIndex = 0;
        let score = 0;

        // কুইজ শুরু করার ফাংশন
        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            totalNumSpan.innerText = quizQuestions.length;
            showQuestion();
        }

        // প্রশ্ন দেখানোর ফাংশন
        function showQuestion() {
            resetState();
            let currentQuestion = quizQuestions[currentQuestionIndex];
            
            questionElement.innerText = currentQuestion.question;
            currentNumSpan.innerText = currentQuestionIndex + 1;
            scoreSpan.innerText = score;

            // প্রোগ্রেস বার আপডেট
            const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
            progressBar.style.width = progress + "%";

            // অপশন বাটন তৈরি
            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerText = answer.text;
                
                // বাটন স্টাইল (ব্লু থিম)
                button.className = "w-full py-2 px-4 border border-blue-500 rounded-[12px] text-gray-800 bg-blue-100 hover:bg-blue-600 hover:text-white transition-all text-start font-medium";
                
                button.addEventListener("click", () => selectAnswer(answer.correct));
                answerButtonsElement.appendChild(button);
            });
        }

        // পুরানো বাটন মুছে ফেলা
        function resetState() {
            while (answerButtonsElement.firstChild) {
                answerButtonsElement.removeChild(answerButtonsElement.firstChild);
            }
        }

        // উত্তর সিলেক্ট করলে যা হবে
        function selectAnswer(isCorrect) {
            if (isCorrect) score++;
            
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }

        // রেজাল্ট দেখানোর ফাংশন
        function showResults() {
            resetState();
            questionElement.innerText = "Quiz Finished!";
            progressBar.style.width = "100%";
            answerButtonsElement.innerHTML = `
                <p class="mb-4 text-gray-700 text-lg font-medium">Your final score: <strong class="text-blue-600">${score} / ${quizQuestions.length}</strong></p>
                <button onclick="window.location.href='question1.html'" class="w-[120px] py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition mx-auto block font-bold">
                    Go Home
                </button>
            `;
        }

        // কুইজ রান করা
        startQuiz();