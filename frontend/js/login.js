document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get form data
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Send login request to backend
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Login successful!');
      localStorage.setItem('token', result.token); // Save token to localStorage
      window.location.href = 'dashboard.html'; // Redirect to dashboard
    } else {
      alert(result.message || 'Invalid login credentials. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during login. Please try again later.');
  }
});
