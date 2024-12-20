document.addEventListener('DOMContentLoaded', function() {
    const leaderboardTable = document.getElementById('leaderboardTable').querySelector('tbody');

    // Load scores from localStorage
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Calculate total score and number of quizzes for each student
    const studentScores = scores.reduce((acc, score) => {
        if (!acc[score.username]) {
            acc[score.username] = { totalScore: 0, quizzesTaken: 0 };
        }
        acc[score.username].totalScore += score.score;
        acc[score.username].quizzesTaken += 1;
        return acc;
    }, {});

    // Convert the studentScores object to an array and sort by totalScore in descending order
    const sortedStudentScores = Object.entries(studentScores).map(([username, data]) => ({
        username,
        totalScore: data.totalScore,
        quizzesTaken: data.quizzesTaken
    })).sort((a, b) => b.totalScore - a.totalScore);

    // Populate leaderboard table
    sortedStudentScores.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.username}</td>
            <td>${student.totalScore}</td>
            <td>${student.quizzesTaken}</td>
        `;
        leaderboardTable.appendChild(row);
    });
});