document.getElementById("fetchStats").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    if (!username) {
      alert("Please enter a username.");
      return;
    }
    
    chrome.runtime.sendMessage({ type: 'fetchStats', username });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'userStats') {
      document.getElementById("easySolved").textContent = `Easy: ${message.easySolved}`;
      document.getElementById("mediumSolved").textContent = `Medium: ${message.mediumSolved}`;
      document.getElementById("hardSolved").textContent = `Hard: ${message.hardSolved}`;
      document.getElementById("totalSolved").textContent = `Total Solved: ${message.totalSolved}`;
    }
  
    if (message.type === 'recentSubmission') {
      const recentTitle = message.title;
      const recentUrl = message.url;
      const recentProblemTitle = document.getElementById("recentProblemTitle");
      const recentProblemUrl = document.getElementById("recentProblemUrl");
  
      if (recentTitle === 'No recent submissions found') {
        recentProblemTitle.textContent = recentTitle;
        recentProblemUrl.href = '';
      } else {
        recentProblemTitle.textContent = `Recently Solved: ${recentTitle}`;
        recentProblemUrl.href = recentUrl;
        recentProblemUrl.textContent = `View Problem`;
      }
    }
  });  