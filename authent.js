// Function to handle Google Sign-In
function googleSignIn() {
    console.log("Google Sign-In triggered");

    // Simulate Google Sign-In process
    setTimeout(function() {
        // After successful sign-in, redirect to the dashboard
        window.location.href = 'dashboard.html';
    }, 1000);  // Simulating delay
}

// Attach event listener to the Google Sign-In button
document.getElementById('google-signin-btn').addEventListener('click', googleSignIn);

// Function to handle Login form submission
document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate login validation (this should be replaced with actual validation logic)
    if (username === "admin" && password === "password123") {
        // Successful login
        console.log("Login successful");
        window.location.href = 'signin.html';  // Redirect to dashboard
    } else {
        // Invalid credentials
        console.log("Invalid username or password");
        document.getElementById('error').style.display = 'block';  // Show error message
          }
});

