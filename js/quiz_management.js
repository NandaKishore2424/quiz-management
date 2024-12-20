document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quizForm');
    const quizList = document.getElementById('quizList');

    // Load quizzes from localStorage
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    function renderQuizzes() {
        quizList.innerHTML = '';
        quizzes.forEach((quiz, index) => {
            const quizItem = document.createElement('div');
            quizItem.className = 'quiz-item';

            const quizTitle = document.createElement('h3');
            quizTitle.textContent = quiz.title;
            quizItem.appendChild(quizTitle);

            const quizDescription = document.createElement('p');
            quizDescription.textContent = quiz.description;
            quizItem.appendChild(quizDescription);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                document.getElementById('quizTitle').value = quiz.title;
                document.getElementById('quizDescription').value = quiz.description;
                quizzes.splice(index, 1);
                localStorage.setItem('quizzes', JSON.stringify(quizzes));
                renderQuizzes();
            });
            quizItem.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                quizzes.splice(index, 1);
                localStorage.setItem('quizzes', JSON.stringify(quizzes));
                renderQuizzes();
            });
            quizItem.appendChild(deleteButton);

            const duplicateButton = document.createElement('button');
            duplicateButton.textContent = 'Duplicate';
            duplicateButton.addEventListener('click', () => {
                const duplicatedQuiz = { ...quiz, id: Date.now() }; // Ensure unique ID for duplicated quiz
                quizzes.push(duplicatedQuiz);
                localStorage.setItem('quizzes', JSON.stringify(quizzes));
                renderQuizzes();
            });
            quizItem.appendChild(duplicateButton);

            quizList.appendChild(quizItem);
        });
    }

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('quizTitle').value;
        const description = document.getElementById('quizDescription').value;

        if (title && description) {
            const newQuiz = { id: Date.now(), title, description }; // Ensure unique ID for new quiz
            quizzes.push(newQuiz);
            localStorage.setItem('quizzes', JSON.stringify(quizzes));
            renderQuizzes();

            quizForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });

    renderQuizzes();
});