document.getElementById('registrationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Collect form data
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Send data to the backend
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (response.ok) {
      alert('Registration successful!');
      window.location.href = 'login.html'; // Redirect to login page
    } else {
      const result = await response.json();
      alert(result.message || 'Registration failed.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});
