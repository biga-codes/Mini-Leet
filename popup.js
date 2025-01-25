const backendUrl = "http://localhost:3000"; 


document.getElementById("next-question").addEventListener("click", async () => {
    const response = await fetch(`${backendUrl}/next`);
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
});


document.getElementById("concept-cleared").addEventListener("click", async () => {
    const title = document.getElementById("problem-title").textContent;
    const problemUrl = document.querySelector("a").href;

    await fetch(`${backendUrl}/concept-cleared`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: problemUrl }),
    });
    alert(`"${title}" marked as Concept Cleared!`);
    document.getElementById("problem-display").innerHTML = ""; 
});
