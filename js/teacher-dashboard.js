document.addEventListener('DOMContentLoaded', function() {
    const quizListElement = document.getElementById('quizList');
    const quizManagementListElement = document.getElementById('quizManagementList');
    const questionListElement = document.getElementById('questionList');

    // Load quizzes from localStorage
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const questions = JSON.parse(localStorage.getItem('questions')) || [];

    // Render quizzes in "Your Quizzes" section
    quizzes.forEach(quiz => {
        const quizItem = document.createElement('div');
        quizItem.classList.add('quiz-item');
        quizItem.innerHTML = `
            <h3>${quiz.title}</h3>
            <p>${quiz.description}</p>
            <a href="quiz_management.html?quizId=${quiz.id}" class="btn">Manage Quiz</a>
        `;
        quizListElement.appendChild(quizItem);
    });

    // Render quizzes in "Quiz Management" section
    quizzes.forEach(quiz => {
        const quizItem = document.createElement('div');
        quizItem.classList.add('quiz-item');
        quizItem.innerHTML = `
            <h3>${quiz.title}</h3>
            <p>${quiz.description}</p>
            <a href="quiz_management.html?quizId=${quiz.id}" class="btn">Manage Quiz</a>
        `;
        quizManagementListElement.appendChild(quizItem);
    });

    // Render questions in "Question Bank" section
    questions.forEach(question => {
        const questionItem = document.createElement('div');
        questionItem.classList.add('question-item');
        questionItem.innerHTML = `
            <h3>${question.question}</h3>
            <p>Category: ${question.category}</p>
            <p>Type: ${question.type}</p>
        `;
        questionListElement.appendChild(questionItem);
    });

    // Handling user logout
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        alert('Logged out successfully!');
        window.location.href = '../login.html';  // Redirect to login page
    });
});