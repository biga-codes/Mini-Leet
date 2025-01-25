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