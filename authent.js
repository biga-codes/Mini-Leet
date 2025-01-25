// Add event listener for login button
document.getElementById("loginButton").addEventListener("click", authenticate);

// Add event listener for Google Sign-In button
document.getElementById("googleSignInButton").addEventListener("click", googleSignIn);

// Authentication function
function authenticate() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Dummy authentication logic
    if (username === "admin" && password === "password") {
        alert("Login successful!");
    } else {
        document.getElementById("error").style.display = "block";
    }
}

// Google Sign-In function that redirects to Google Sign-In page
function googleSignIn() {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20profile%20email&response_type=token&redirect_uri=http://your-redirect-uri.com&client_id=YOUR_GOOGLE_CLIENT_ID";
    
    // Open Google Sign-In in a new window or tab
    window.open(googleAuthUrl, "_blank");
}
