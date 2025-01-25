
document.getElementById("loginButton").addEventListener("click", authenticate);

document.getElementById("googleSignInButton").addEventListener("click", googleSignIn);

function authenticate() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "admin" && password === "password") {
        alert("Login successful!");
    } else {
        document.getElementById("error").style.display = "block";
    }
}
function googleSignIn() {
    const googleAuthUrl = "https://accounts.google.com/signin";
   
    window.open(googleAuthUrl, "_blank");
}
