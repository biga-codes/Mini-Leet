document.getElementById('fetchStats').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
  
    if (username) {
      chrome.runtime.sendMessage({ type: 'fetchStats', username: username });
    } else {
      document.getElementById('totalSolved').textContent = 'Please enter a username.';
    }
  });
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'userStats') {
      document.getElementById('totalSolved').textContent = `Total Problems Solved: ${message.totalSolved}`;
      document.getElementById('easySolved').textContent = `Easy: ${message.easySolved}`;
      document.getElementById('mediumSolved').textContent = `Medium: ${message.mediumSolved}`;
      document.getElementById('hardSolved').textContent = `Hard: ${message.hardSolved}`;
    }
  });
