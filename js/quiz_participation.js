document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quizForm');
    const quizQuestionsContainer = document.getElementById('quizQuestions');
    const timerElement = document.getElementById('time');

    // Get quiz ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('quizId');

    // Load quizzes from localStorage
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quiz = quizzes.find(q => q.id == quizId);

    if (quiz) {
        quiz.questions.forEach((question, qIndex) => {
            const questionItem = document.createElement('div');
            questionItem.className = 'question';

            const questionText = document.createElement('h3');
            questionText.textContent = question.question;
            questionItem.appendChild(questionText);

            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options';

            if (question.type === 'multiple_choice') {
                question.options.forEach((option, oIndex) => {
                    const optionLabel = document.createElement('label');
                    const optionInput = document.createElement('input');
                    optionInput.type = 'radio';
                    optionInput.name = `question${qIndex}`;
                    optionInput.value = oIndex;
                    optionLabel.appendChild(optionInput);
                    optionLabel.appendChild(document.createTextNode(option));
                    optionsContainer.appendChild(optionLabel);
                });
            } else if (question.type === 'true_false') {
                ['True', 'False'].forEach((option, oIndex) => {
                    const optionLabel = document.createElement('label');
                    const optionInput = document.createElement('input');
                    optionInput.type = 'radio';
                    optionInput.name = `question${qIndex}`;
                    optionInput.value = oIndex;
                    optionLabel.appendChild(optionInput);
                    optionLabel.appendChild(document.createTextNode(option));
                    optionsContainer.appendChild(optionLabel);
                });
            } else if (question.type === 'short_answer') {
                const answerInput = document.createElement('input');
                answerInput.type = 'text';
                answerInput.name = `question${qIndex}`;
                optionsContainer.appendChild(answerInput);
            }

            questionItem.appendChild(optionsContainer);
            quizQuestionsContainer.appendChild(questionItem);
        });
    }

    // Timer functionality
    let timeLeft = 600; // 10 minutes in seconds
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            alert('Time is up! Submitting the quiz.');
            quizForm.submit();
        }
    }, 1000);

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        clearInterval(timerInterval); // Stop the timer when the quiz is submitted

        let score = 0;

        quiz.questions.forEach((question, qIndex) => {
            const userAnswer = document.querySelector(`input[name="question${qIndex}"]:checked`)?.value || document.querySelector(`input[name="question${qIndex}"]`)?.value;
            if (question.type === 'multiple_choice' || question.type === 'true_false') {
                if (userAnswer == question.correctAnswer) {
                    score++;
                }
            } else if (question.type === 'short_answer') {
                if (userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()) {
                    score++;
                }
            }
        });

        // Save score to localStorage
        const username = localStorage.getItem('username'); // Retrieve the username from localStorage
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push({ username, score, quizId });
        localStorage.setItem('scores', JSON.stringify(scores));

        alert(`Your score is ${score} out of ${quiz.questions.length}`);
        window.location.href = 'dashboard.html';
    });
});