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
  console.log("googleSignIn function called!"); // Test if function runs
  const redirectUri = chrome.identity.getRedirectURL();
  console.log("Generated Redirect URI:", redirectUri);

  chrome.identity.launchWebAuthFlow(
    {
      url: `https://accounts.google.com/o/oauth2/auth?client_id=457305893962-1l57ilbcaoamivo4dlpksheb8kemhfnb.apps.googleusercontent.com&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid%20email%20profile`,
      interactive: true
    },
    function (redirectUrl) {
      if (chrome.runtime.lastError) {
        console.error("Auth error:", chrome.runtime.lastError);
        return;
      }

      if (!redirectUrl) {
        console.error("No redirect URL returned.");
        return;
      }

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
          .then(res => res.json())
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

