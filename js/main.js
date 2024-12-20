document.addEventListener('DOMContentLoaded', function() {
    // Load default quizzes if not already present
    if (!localStorage.getItem('quizzes')) {
        const defaultQuizzes = [
            {
                id: 1,
                title: "Animal Quiz",
                description: "A quiz about animals",
                questions: [
                    {
                        question: "What is the largest land animal?",
                        options: ["Elephant", "Giraffe", "Lion", "Tiger"],
                        correctAnswer: "0",
                        type: "multiple_choice"
                    },
                    {
                        question: "True or False: A dolphin is a mammal.",
                        options: ["True", "False"],
                        correctAnswer: "0",
                        type: "true_false"
                    }
                ]
            },
            {
                id: 2,
                title: "Car Quiz",
                description: "A quiz about cars",
                questions: [
                    {
                        question: "Which company manufactures the Mustang?",
                        options: ["Ford", "Chevrolet", "Dodge", "Tesla"],
                        correctAnswer: "0",
                        type: "multiple_choice"
                    },
                    {
                        question: "True or False: The Bugatti Veyron is an electric car.",
                        options: ["True", "False"],
                        correctAnswer: "1",
                        type: "true_false"
                    }
                ]
            }
        ];
        localStorage.setItem('quizzes', JSON.stringify(defaultQuizzes));
    }
});

// Handle sign-up form submission
document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (username && email && password && role) {
        // Save the user data in localStorage
        const userData = { username, email, password, role };
        localStorage.setItem(email, JSON.stringify(userData));
        localStorage.setItem('username', username); // Store the username separately for easy access

        alert('Sign up successful! Redirecting to login...');
        window.location.href = 'login.html';
    } else {
        alert('Please fill in all fields');
    }
});

// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        // Retrieve user data from localStorage
        const userData = JSON.parse(localStorage.getItem(email));

        if (userData && userData.password === password) {
            // If password matches, save the role to localStorage
            localStorage.setItem('userRole', userData.role);
            localStorage.setItem('username', userData.username); // Store the username separately for easy access
            alert('Login successful!');

            if (userData.role === 'teacher') {
                window.location.href = 'teacher/dashboard.html'; // Redirect to teacher dashboard
            } else if (userData.role === 'student') {
                window.location.href = 'student/dashboard.html'; // Redirect to student dashboard
            }
        } else {
            alert('Invalid credentials or role not recognized');
        }
    } else {
        alert('Please enter your credentials');
    }
});