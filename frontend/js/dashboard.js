// Ensure user is authenticated
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must log in first!');
    window.location.href = 'login.html';
  } else {
    fetchUserInfo();
  }
});

// Fetch user info from the backend
const fetchUserInfo = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/dashboard', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById('userInfo').innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
      `;
    } else {
      throw new Error('Failed to fetch user info');
    }
  } catch (error) {
    console.error(error);
    alert('Error fetching user information.');
  }
};

// Logout functionality
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

// Handle other actions
document.getElementById('viewResults').addEventListener('click', () => {
  alert('View Results clicked! This will redirect to results.html (future feature).');
});

document.getElementById('takeTest').addEventListener('click', () => {
  alert('Take Test clicked! This will redirect to test.html (future feature).');
});
