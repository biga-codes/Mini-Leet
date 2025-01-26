const backendUrl = "http://localhost:3000";

document.getElementById("next-question").addEventListener("click", async () => {
    try {
        const response = await fetch(`${backendUrl}/next`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const problem = await response.json();
        if (problem.message) {
            alert(problem.message);
            document.getElementById("problem-display").innerHTML = "";
        } else {
            document.getElementById("problem-display").innerHTML = `
                <div id="problem-title">${problem.title}</div>
                <a href="${problem.url}" target="_blank">Solve on LeetCode</a>
            `;
        }
    } catch (error) {
        console.error('Error fetching the next question:', error);
        alert('Failed to fetch the next question. Please try again later.');
    }
});

const problemDisplay = document.getElementById("problem-display");
const randomProblemButton = document.getElementById("random-problem");
//const nextQuestionButton = document.getElementById("next-question");
const revisionQueueDiv = document.getElementById("revision-queue");

// Function to get a random problem
function getRandomProblem(problems) {
    const randomIndex = Math.floor(Math.random() * problems.length);
    return problems[randomIndex];
}

// Add a problem to the revision queue
function addToQueue(problem) {
    chrome.storage.sync.get(["revisionQueue"], (data) => {
        const queue = data.revisionQueue || [];
        queue.push(problem);
        chrome.storage.sync.set({ revisionQueue: queue }, () => {
            renderQueue();
        });
    });
}

// Render the revision queue
function renderQueue() {
    chrome.storage.sync.get(["revisionQueue"], (data) => {
        const queue = data.revisionQueue || [];
        revisionQueueDiv.innerHTML = queue
            .map(
                (problem) =>
                    `<div>${problem.title} - <a href="${problem.url}" target="_blank">Link</a></div>`
            )
            .join("");
    });
}

// Event listener for "Get Random Problem" button
randomProblemButton.addEventListener("click", () => {
    const currentProblemTitle = document.querySelector("#problem-title")?.innerText;
    const currentProblemLink = document.querySelector("#problem-display a")?.href;

    // Check if there is a problem currently displayed
    if (currentProblemTitle && currentProblemLink) {
        // If a problem is displayed, add it to the revision queue
        const problem = { title: currentProblemTitle, url: currentProblemLink };
        addToQueue(problem);

        // Clear the displayed problem after enqueueing
        problemDisplay.innerHTML = `<div style="color: gray;">No problem is currently displayed.</div>`;
    } else {
        // If no problem is displayed, show a warning message
        alert("No problem is currently displayed. Please display a problem first.");
    }
});



// Event listener for "Next Question" button
nextQuestionButton.addEventListener("click", () => {
    fetch(chrome.runtime.getURL("problems.json"))
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load problems.json");
            }
            return response.json();
        })
        .then((problems) => {
            // Use a round-robin style for cycling through problems
            chrome.storage.sync.get(["currentProblemIndex"], (data) => {
                const currentIndex = data.currentProblemIndex || 0;

                // Ensure we have a valid index
                const nextProblem = problems[currentIndex];
                if (!nextProblem) {
                    alert("No more problems available.");
                    return;
                }

                // Display the next problem
                problemDisplay.innerHTML = `
                    <div id="problem-title">${nextProblem.title}</div>
                    <a href="${nextProblem.url}" target="_blank">Solve on LeetCode</a>
                `;

                // Update the index (cycle through problems)
                const newIndex = (currentIndex + 1) % problems.length;
                chrome.storage.sync.set({ currentProblemIndex: newIndex });
            });
        })
        .catch((error) => {
            console.error("Error fetching the next question:", error);
            alert("Failed to fetch the next question. Please try again later.");
        });
});

// Initial render of the queue
renderQueue();
// Get the "Concept Cleared" button element
const conceptClearedButton = document.getElementById("concept-cleared");

// Function to remove the first problem in the queue
function dequeueFirstProblem() {
    // Access the revision queue from storage
    chrome.storage.sync.get(["revisionQueue"], (data) => {
        let queue = data.revisionQueue || [];

        // Check if the queue is empty
        if (queue.length === 0) {
            alert("The revision queue is empty.");
            return;
        }

        // Dequeue the first problem (FIFO order)
        const removedProblem = queue.shift();

        // Update the storage with the new queue
        chrome.storage.sync.set({ revisionQueue: queue }, () => {
            renderQueue(); // Update the queue display
            displayNextProblem(queue); // Display the next problem, if any
            alert(`Removed: ${removedProblem.title}`);
        });
    });
}

// Function to display the next problem from the queue
function displayNextProblem(queue) {
    if (queue.length > 0) {
        const nextProblem = queue[0];
        problemDisplay.innerHTML = `
            <div id="problem-title">${nextProblem.title}</div>
            <a href="${nextProblem.url}" target="_blank">Solve on LeetCode</a>
        `;
    } else {
        clearProblemDisplay(); // Clear display if no problems are left
    }
}

// Function to clear the problem display
function clearProblemDisplay() {
    problemDisplay.innerHTML = `<div style="color: gray;">No problem is currently displayed.</div>`;
}

// Event listener for "Concept Cleared" button
conceptClearedButton.addEventListener("click", () => {
    dequeueFirstProblem(); // Dequeue the first problem and update the display
});