document.addEventListener('DOMContentLoaded', function() {
    const questionForm = document.getElementById('questionForm');
    const questionList = document.getElementById('questionList');

    // Load default questions if not already present
    if (!localStorage.getItem('questions')) {
        const defaultQuestions = [
            // Operating Systems Questions
            {
                question: "What is the main function of an operating system?",
                category: "Operating Systems",
                type: "multiple_choice",
                options: ["Manage hardware resources", "Run applications", "Provide security", "All of the above"],
                correctAnswer: "3"
            },
            {
                question: "Which of the following is a type of operating system?",
                category: "Operating Systems",
                type: "multiple_choice",
                options: ["Batch", "Time-sharing", "Distributed", "All of the above"],
                correctAnswer: "3"
            },
            {
                question: "What is a kernel in an operating system?",
                category: "Operating Systems",
                type: "multiple_choice",
                options: ["A type of software", "The core part of the OS", "A hardware component", "None of the above"],
                correctAnswer: "1"
            },
            {
                question: "Which of the following is an example of an open-source operating system?",
                category: "Operating Systems",
                type: "multiple_choice",
                options: ["Windows", "MacOS", "Linux", "None of the above"],
                correctAnswer: "2"
            },
            {
                question: "What is the purpose of a device driver?",
                category: "Operating Systems",
                type: "multiple_choice",
                options: ["To manage hardware devices", "To run applications", "To provide security", "None of the above"],
                correctAnswer: "0"
            },
            {
                question: "True or False: An operating system can manage multiple tasks at the same time.",
                category: "Operating Systems",
                type: "true_false",
                options: ["True", "False"],
                correctAnswer: "0"
            },
            {
                question: "What is virtual memory?",
                category: "Operating Systems",
                type: "multiple_choice",
                options: ["A type of physical memory", "A memory management technique", "A hardware component", "None of the above"],
                correctAnswer: "1"
            },
            {
                question: "Which of the following is a function of the file system in an operating system?",
                category: "Operating Systems",
                type: "multiple_choice",
                options: ["Manage files and directories", "Run applications", "Provide security", "None of the above"],
                correctAnswer: "0"
            },
            {
                question: "What is a process in an operating system?",
                category: "Operating Systems",
                type: "multiple_choice",
                options: ["A running instance of a program", "A hardware component", "A type of software", "None of the above"],
                correctAnswer: "0"
            },
            {
                question: "True or False: The operating system is responsible for managing the computer's memory.",
                category: "Operating Systems",
                type: "true_false",
                options: ["True", "False"],
                correctAnswer: "0"
            },
            // Computer Networks Questions
            {
                question: "What is the main purpose of a computer network?",
                category: "Computer Networks",
                type: "multiple_choice",
                options: ["To share resources", "To run applications", "To provide security", "None of the above"],
                correctAnswer: "0"
            },
            {
                question: "Which of the following is a type of network topology?",
                category: "Computer Networks",
                type: "multiple_choice",
                options: ["Star", "Ring", "Mesh", "All of the above"],
                correctAnswer: "3"
            },
            {
                question: "What is the function of a router in a network?",
                category: "Computer Networks",
                type: "multiple_choice",
                options: ["To connect different networks", "To manage hardware devices", "To run applications", "None of the above"],
                correctAnswer: "0"
            },
            {
                question: "Which of the following is a protocol used in computer networks?",
                category: "Computer Networks",
                type: "multiple_choice",
                options: ["HTTP", "FTP", "TCP/IP", "All of the above"],
                correctAnswer: "3"
            },
            {
                question: "What is an IP address?",
                category: "Computer Networks",
                type: "multiple_choice",
                options: ["A unique identifier for a device on a network", "A type of hardware", "A software component", "None of the above"],
                correctAnswer: "0"
            },
            {
                question: "True or False: A firewall is used to protect a network from unauthorized access.",
                category: "Computer Networks",
                type: "true_false",
                options: ["True", "False"],
                correctAnswer: "0"
            },
            {
                question: "What is the purpose of a switch in a network?",
                category: "Computer Networks",
                type: "multiple_choice",
                options: ["To connect devices within a network", "To manage hardware devices", "To run applications", "None of the above"],
                correctAnswer: "0"
            },
            {
                question: "Which of the following is a type of wireless network?",
                category: "Computer Networks",
                type: "multiple_choice",
                options: ["Wi-Fi", "Ethernet", "Fiber optic", "None of the above"],
                correctAnswer: "0"
            },
            {
                question: "What is the function of a DNS server?",
                category: "Computer Networks",
                type: "multiple_choice",
                options: ["To translate domain names to IP addresses", "To manage hardware devices", "To run applications", "None of the above"],
                correctAnswer: "0"
            },
            {
                question: "True or False: A VPN is used to create a secure connection over a public network.",
                category: "Computer Networks",
                type: "true_false",
                options: ["True", "False"],
                correctAnswer: "0"
            }
        ];
        localStorage.setItem('questions', JSON.stringify(defaultQuestions));
    }

    // Load questions from localStorage
    const questions = JSON.parse(localStorage.getItem('questions')) || [];

    function renderQuestions() {
        questionList.innerHTML = '';
        questions.forEach((question, index) => {
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';

            const questionText = document.createElement('h3');
            questionText.textContent = question.question;
            questionItem.appendChild(questionText);

            const questionCategory = document.createElement('p');
            questionCategory.textContent = `Category: ${question.category}`;
            questionItem.appendChild(questionCategory);

            const questionType = document.createElement('p');
            questionType.textContent = `Type: ${question.type}`;
            questionItem.appendChild(questionType);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                questions.splice(index, 1);
                localStorage.setItem('questions', JSON.stringify(questions));
                renderQuestions();
            });
            questionItem.appendChild(deleteButton);

            questionList.appendChild(questionItem);
        });
    }

    questionForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const question = document.getElementById('question').value;
        const category = document.getElementById('category').value;
        const type = document.getElementById('type').value;

        if (question && category && type) {
            const newQuestion = { question, category, type };
            questions.push(newQuestion);
            localStorage.setItem('questions', JSON.stringify(questions));
            renderQuestions();

            questionForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });

    renderQuestions();
});