const GRAPHQL_URL = 'https://leetcode.com/graphql';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message === 'startRevision'){
        chrome.alarms.create('revisionReminder', {
            periodInMinutes: 15
        });
    }
    else if (message.type === 'fetchStats') {
    const username = message.username;

    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }
    `;
    const variables = { username };

    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.matchedUser) {
          // Extract the count of problems solved by difficulty
          const solvedProblems = data.data.matchedUser.submitStatsGlobal.acSubmissionNum;

          const easySolved = solvedProblems.find(difficulty => difficulty.difficulty === 'Easy')?.count || 0;
          const mediumSolved = solvedProblems.find(difficulty => difficulty.difficulty === 'Medium')?.count || 0;
          const hardSolved = solvedProblems.find(difficulty => difficulty.difficulty === 'Hard')?.count || 0;
          const totalSolved = easySolved + mediumSolved + hardSolved;

          // Send the fetched data to the popup
          chrome.runtime.sendMessage({
            type: 'userStats',
            easySolved,
            mediumSolved,
            hardSolved,
            totalSolved
          });
        } else {
          chrome.runtime.sendMessage({ type: 'userStats', easySolved: 'User not found' });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        chrome.runtime.sendMessage({ type: 'userStats', easySolved: 'Error fetching data' });
      });
      const queryRecentSubmissions = `
      query recentAcSubmissions($username: String!) {
        recentAcSubmissionList(username: $username) {
          id
          title
          titleSlug
        }
      }
    `;
    const variablesRecentSubmissions = { username };

    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: queryRecentSubmissions, variables: variablesRecentSubmissions }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.data && data.data.recentAcSubmissionList) {
        const submissions = data.data.recentAcSubmissionList;
        
        if (submissions.length > 0) {
          const mostRecent = submissions[0];
          chrome.runtime.sendMessage({
            type: 'recentSubmission',
            title: mostRecent.title,
            url: `https://leetcode.com/problems/${mostRecent.titleSlug}/`,
          });
        } else {
          chrome.runtime.sendMessage({
            type: 'recentSubmission',
            title: 'No recent submissions found',
          });
        }
      } else {
        chrome.runtime.sendMessage({
          type: 'recentSubmission',
          title: 'Error fetching recent submissions',
        });
      }
    })
    .catch(error => {
      console.error('Error fetching recent submissions:', error);
      chrome.runtime.sendMessage({
        type: 'recentSubmission',
        title: 'Error fetching data',
      });
    });
  }
  else if (message.type === "googleSignInButton") {
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
      if (chrome.runtime.lastError) {
        console.error("Login failed:", chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError.message || "Unknown error" });
        return;
      }

      fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => response.json())
      .then(userInfo => {
        console.log("User Info:", userInfo);
        sendResponse({ success: true, userInfo }); 
      })
      .catch(error => {
        console.error("Error fetching user info:", error);
        sendResponse({ success: false, error: error.message });
      });

      return true;  
    });

    return true; 
  }
});


chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'revisionReminder') {
        chrome.storage.sync.get(['revisionQueue'], (data) => {
            const queue = data.revisionQueue || [];
            if (queue.length> 0) {
                const randomIndex = Math.floor(Math.random() * queue.length);   
                const randomProblem = queue[randomIndex];
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icon.png',
                    title: 'Revision Reminder',
                    message: `Revise ${randomProblem.title}`,
                    buttons: [
                        { title: 'Open Problem' }
                    ]
                });

                chrome.notifications.onButtonClicked.addListener(() => {
                   
                        chrome.tabs.create({ url: randomProblem.url });
                });
               
            }

        });

    }

});
        

        