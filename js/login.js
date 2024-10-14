// Function to handle user registration
function registerUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Redirect or clear form as needed
    })
    .catch(error => console.error('Error:', error));
}

// Function to handle user login
function loginUser(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Redirect or handle login success
    })
    .catch(error => console.error('Error:', error));
}

// Add event listeners
document.querySelector('#register-form').addEventListener('submit', registerUser);
document.querySelector('#login-form').addEventListener('submit', loginUser);
