document.addEventListener('DOMContentLoaded', function() {
    const quizListElement = document.getElementById('quizList');

    // Load quizzes from localStorage
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    quizzes.forEach(quiz => {
        const quizItem = document.createElement('div');
        quizItem.classList.add('quiz-item');
        quizItem.innerHTML = `
            <h3>${quiz.title}</h3>
            <p>${quiz.description}</p>
            <a href="quiz-taking.html?quizId=${quiz.id}" class="btn">Take Quiz</a>
        `;
        quizListElement.appendChild(quizItem);
    });

    // Handling user logout
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        alert('Logged out successfully!');
        window.location.href = '../login.html';  // Redirect to login page
    });
});