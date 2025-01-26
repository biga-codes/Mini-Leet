document.getElementById("fetchStats").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    if (!username) {
      alert("Please enter a username.");
      return;
    }
  
    // Send a message to the background script to fetch stats
    chrome.runtime.sendMessage({ type: 'fetchStats', username });
  });
  
  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'userStats') {
      // Display user stats
      document.getElementById("easySolved").textContent = `Easy: ${message.easySolved}`;
      document.getElementById("mediumSolved").textContent = `Medium: ${message.mediumSolved}`;
      document.getElementById("hardSolved").textContent = `Hard: ${message.hardSolved}`;
      document.getElementById("totalSolved").textContent = `Total Solved: ${message.totalSolved}`;
    }
  
    if (message.type === 'recentSubmission') {
      // Display the most recent submission title and URL
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
