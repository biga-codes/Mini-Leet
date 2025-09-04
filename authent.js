// Check if user is already signed in when popup loads
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});

// Traditional login (keep your existing logic)
document.getElementById("loginButton").addEventListener("click", authenticate);

function authenticate() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username === "admin" && password === "password") {
        alert("Login successful!");
        // Store traditional login info
        chrome.storage.local.set({ 
            userType: 'traditional',
            userData: {
                name: 'Admin User',
                email: 'admin@example.com'
            }
        });
        showDashboard({
            displayName: 'Admin User',
            email: 'admin@example.com',
            photoURL: null
        });
    } else {
        document.getElementById("error").style.display = "block";
    }
}

// Google Sign-In with Chrome Identity API
document.getElementById("googleSignInButton").addEventListener("click", googleSignIn);

function googleSignIn() {
    // Show loading state
    const button = document.getElementById("googleSignInButton");
    const originalText = button.textContent;
    button.textContent = "Signing in...";
    button.disabled = true;
    
    // Get OAuth token
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
        if (chrome.runtime.lastError) {
            console.error('Auth error:', chrome.runtime.lastError);
            showError('Sign-in failed: ' + chrome.runtime.lastError.message);
            resetButton();
            return;
        }
        
        if (token) {
            // Fetch user profile information
            fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(userInfo => {
                console.log('User info:', userInfo);
                
                // Store user data and token
                chrome.storage.local.set({ 
                    userType: 'google',
                    userData: userInfo,
                    authToken: token
                });
                
                // Show dashboard with user info
                showDashboard(userInfo);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
                showError('Failed to get user information');
                resetButton();
            });
        } else {
            showError('Failed to get authentication token');
            resetButton();
        }
    });
    
    function resetButton() {
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Check authentication status on load
function checkAuthStatus() {
    chrome.storage.local.get(['userType', 'userData', 'authToken'], function(result) {
        if (result.userType && result.userData) {
            if (result.userType === 'google') {
                // Verify Google token is still valid
                verifyGoogleToken(result.authToken, result.userData);
            } else {
                // Traditional login
                showDashboard(result.userData);
            }
        } else {
            showLogin();
        }
    });
}

function verifyGoogleToken(token, userData) {
    if (!token) {
        showLogin();
        return;
    }
    
    // Check if token is still valid
    fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + token)
        .then(response => {
            if (response.ok) {
                showDashboard(userData);
            } else {
                // Token expired, clear storage and show login
                chrome.storage.local.clear();
                showLogin();
            }
        })
        .catch(error => {
            console.error('Token verification failed:', error);
            showLogin();
        });
}

// Logout function
function logout() {
    chrome.storage.local.get(['userType', 'authToken'], function(result) {
        if (result.userType === 'google' && result.authToken) {
            // Revoke Google token
            chrome.identity.removeCachedAuthToken({ token: result.authToken }, function() {
                console.log('Google token revoked');
            });
        }
        
        // Clear all stored data
        chrome.storage.local.clear();
        showLogin();
    });
}

// UI Helper Functions
function showLogin() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('dashboardContainer').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    
    // Clear form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function showDashboard(userInfo) {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('dashboardContainer').style.display = 'block';
    
    // Update user info display
    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = `
        <div class="user-details">
            ${userInfo.picture ? `<img src="${userInfo.picture}" alt="Profile" class="user-avatar">` : ''}
            <div>
                <strong>${userInfo.name || userInfo.displayName || 'Unknown User'}</strong><br>
                <small>${userInfo.email || 'No email'}</small>
            </div>
        </div>
        ${userInfo.id ? `<p><strong>User ID:</strong> ${userInfo.id}</p>` : ''}
    `;
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Add logout event listener
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logoutButton').addEventListener('click', logout);
});
