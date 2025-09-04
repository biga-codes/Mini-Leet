// Normal username/password login
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

document.getElementById("googleSignInButton").addEventListener("click", googleSignIn);

function googleSignIn() {
    const clientId = "457305893962-jm894hugvgld8fqg3gpi3v2vhrhp0opr.apps.googleusercontent.com"; 
    const redirectUri = chrome.identity.getRedirectURL();
    const scope = "openid email profile";
    const authUrl = `https://accounts.google.com/o/oauth2/auth
        ?client_id=${encodeURIComponent(clientId)}
        &response_type=token
        &redirect_uri=${encodeURIComponent(redirectUri)}
        &scope=${encodeURIComponent(scope)}`;

    chrome.identity.launchWebAuthFlow(
        {
            url: authUrl,
            interactive: true
        },
        function (redirectUrl) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                alert("Google Sign-In failed.");
                return;
            }
            const params = new URLSearchParams(redirectUrl.split("#")[1]);
            const accessToken = params.get("access_token");

            if (accessToken) {
            
                fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })
                .then(response => response.json())
                .then(user => {
                    console.log("Google User:", user);
                    alert(`Welcome, ${user.name}!`);
                    window.location.href = "dashboard.html"; 
                })
                .catch(err => console.error("Failed to fetch user info:", err));
            }
        }
    );
}


