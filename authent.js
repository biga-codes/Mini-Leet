document.addEventListener("DOMContentLoaded", function () {
    // Add click event listener to login button
    document.getElementById("loginButton").addEventListener("click", authenticate);

    const googleSignInButton = document.getElementById("googleSignInButton");

    if (googleSignInButton) {
        googleSignInButton.addEventListener("click", function() {
            // Redirect to the Google Sign-In page
            window.location.href = "https://accounts.google.com/signin";
        }); // Close the googleSignInButton event listener
    }

    function authenticate() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "password123") {
            console.log("Login successful");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            console.log("Invalid username or password");
            document.getElementById("error").style.display = "block"; // Show error message
        }
    }
});
