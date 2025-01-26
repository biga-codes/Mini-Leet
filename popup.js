const backendUrl = "http://localhost:3000";

const problemDisplay = document.getElementById("problem-display");
const randomProblemButton = document.getElementById("random-problem");
const revisionQueueDiv = document.getElementById("revision-queue");
const conceptClearedButton = document.getElementById("concept-cleared");

// Function to fetch the next problem from the server
document.getElementById("next-question").addEventListener("click", async () => {
    try {
        const response = await fetch(`${backendUrl}/next`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const problem = await response.json();
        if (problem.message) {
            alert(problem.message);
            problemDisplay.innerHTML = "";
        } else {
            problemDisplay.innerHTML = `
                <div id="problem-title">${problem.title}</div>
                <a href="${problem.url}" target="_blank">Solve on LeetCode</a>
            `;
        }
    } catch (error) {
        console.error("Error fetching the next question:", error);
        alert("Failed to fetch the next question. Please try again later.");
    }
});

// Function to add a problem to the revision queue
function addToQueue(problem) {
    chrome.storage.sync.get(["revisionQueue"], (data) => {
        const queue = data.revisionQueue || [];
        queue.push(problem);
        chrome.storage.sync.set({ revisionQueue: queue }, () => {
            renderQueue();
        });
    });
}

// Function to render the revision queue
function renderQueue() {
    chrome.storage.sync.get(["revisionQueue"], (data) => {
        const queue = data.revisionQueue || [];
        revisionQueueDiv.innerHTML = queue
            .map(
                (problem, index) =>
                    `<div id="queue-item-${index}">
                        ${problem.title} - <a href="${problem.url}" target="_blank">Link</a>
                     </div>`
            )
            .join("");
    });
}

// Function to get a random problem and display it
randomProblemButton.addEventListener("click", () => {
    const currentProblemTitle = document.querySelector("#problem-title")?.innerText;
    const currentProblemLink = document.querySelector("#problem-display a")?.href;

    if (currentProblemTitle && currentProblemLink) {
        // If a problem is displayed, add it to the revision queue
        const problem = { title: currentProblemTitle, url: currentProblemLink };
        addToQueue(problem);

        // Clear the displayed problem after enqueueing
        clearProblemDisplay();
        alert("Problem added to the revision queue.");
    } else {
        alert("No problem is currently displayed. Please display a problem first.");
    }
});

// Function to dequeue the first problem (for "Concept Cleared")
function dequeueFirstProblem() {
    chrome.storage.sync.get(["revisionQueue"], (data) => {
        let queue = data.revisionQueue || [];

        if (queue.length === 0) {
            alert("The revision queue is empty.");
            return;
        }

        // Remove the first problem from the queue
        const removedProblem = queue.shift();

        // Update the queue and storage
        chrome.storage.sync.set({ revisionQueue: queue }, () => {
            alert(`Removed: ${removedProblem.title}`);
            renderQueue(); // Update the UI
        });
    });
}

// Function to display the first problem in the queue
function displayNextProblem(queue) {
    if (queue.length > 0) {
        const nextProblem = queue[0];
        problemDisplay.innerHTML = `
            <div id="problem-title">${nextProblem.title}</div>
            <a href="${nextProblem.url}" target="_blank">Solve on LeetCode</a>
        `;
    } else {
        clearProblemDisplay();
    }
}

// Function to clear the problem display
function clearProblemDisplay() {
    problemDisplay.innerHTML = `<div style="color: gray;">No problem is currently displayed.</div>`;
}

// Event listener for "Concept Cleared" button
conceptClearedButton.addEventListener("click", () => {
    dequeueFirstProblem();
});

// Initial render of the revision queue
renderQueue();
