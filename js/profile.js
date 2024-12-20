document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');

    // Load user data from localStorage
    const email = localStorage.getItem('userEmail');
    const userData = JSON.parse(localStorage.getItem(email));

    if (userData) {
        document.getElementById('username').value = userData.username;
        document.getElementById('email').value = userData.email;
        document.getElementById('password').value = userData.password;
    }

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (username && email && password) {
            // Update user data in localStorage
            const updatedUserData = { username, email, password, role: userData.role };
            localStorage.setItem(email, JSON.stringify(updatedUserData));

            alert('Profile updated successfully!');
        } else {
            alert('Please fill in all fields');
        }
    });
});