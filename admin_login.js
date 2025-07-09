document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    // Simple hardcoded credentials for demonstration
    if (username === 'admin' && password === 'admin123') {
        loginMessage.className = 'alert alert-success mt-3';
        loginMessage.textContent = 'Login successful! Redirecting...';
        setTimeout(() => {
            window.location.href = 'admin_panel.html'; // Redirect to admin panel
        }, 1000);
    } else {
        loginMessage.className = 'alert alert-danger mt-3';
        loginMessage.textContent = 'Invalid username or password.';
    }
    loginMessage.classList.remove('d-none');
});