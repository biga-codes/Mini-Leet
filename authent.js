// Traditional login
document.getElementById("loginButton").addEventListener("click", authenticate);

function authenticate() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "password") {
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").style.display = "block";
    }
}

// Google Sign-In login
document.getElementById("googleSignInButton").addEventListener("click", googleSignIn);

function googleSignIn() {
    chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, user_info => {
        if (user_info.email) {
            console.log("Google User Email:", user_info.email);
            alert(`Welcome, ${user_info.email}!`);
            window.location.href = "dashboard.html";
        } else {
            console.error("User not signed in or permission denied.");
        }
    });
}
