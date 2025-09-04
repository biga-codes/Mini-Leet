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
  const clientId = "457305893962-s1nalddrntubfr9rmc289n4fg7j73iu6.apps.googleusercontent.com"; 
  const redirectUri = chrome.identity.getRedirectURL(); // extension redirect
  const scope = "openid email profile";

  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${encodeURIComponent(clientId)}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

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

      if (!redirectUrl) {
        console.error("No redirect URL returned.");
        return;
      }

      // Ensure fragment exists before splitting
      const fragment = redirectUrl.split("#")[1];
      if (!fragment) {
        console.error("No access token found in redirect URL:", redirectUrl);
        return;
      }

      const params = new URLSearchParams(fragment);
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
      } else {
        console.error("Access token missing in response.");
      }
    }
  ); // ✅ closed correctly here
}
