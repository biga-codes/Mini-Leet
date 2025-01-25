const express = require("express");
const redis = require("redis");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Redis
const client = redis.createClient();
client.connect().catch(console.error); 
client.on("connect", () => console.log("Connected to Redis"));
client.on("error", (err) => console.error("Redis error:", err));

// Predefined list of LeetCode problems
const problems = [
    { title: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
    { title: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
    { title: "Binary Search", url: "https://leetcode.com/problems/binary-search/" },
];

// Add a problem to the queue
app.post("/add", async (req, res) => {
    const { title, url } = req.body;
    await client.lPush("revisionQueue", JSON.stringify({ title, url }));
    res.send("Problem added to the queue.");
});

// Get a random problem from the queue
app.get("/random", async (req, res) => {
    const length = await client.lLen("revisionQueue");
    if (length === 0) return res.send({ message: "Queue is empty." });

    const randomIndex = Math.floor(Math.random() * length);
    const problem = JSON.parse(await client.lIndex("revisionQueue", randomIndex));
    res.send(problem);
});

// Remove a problem from the queue
app.post("/remove", async (req, res) => {
    const { title } = req.body;
    const queue = await client.lRange("revisionQueue", 0, -1);
    const updatedQueue = queue.filter((item) => JSON.parse(item).title !== title);
    await client.del("revisionQueue"); // Clear the queue
    for (const item of updatedQueue) {
        await client.lPush("revisionQueue", item); // Rebuild the queue
    }
    res.send("Problem removed from the queue.");
});

// Fetch a predefined random problem
app.get("/problem", (req, res) => {
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    res.send(randomProblem);
});

// Fetch the next question (FIFO)
app.get("/next", async (req, res) => {
    const problem = await client.lPop("revisionQueue");
    if (!problem) {
        res.send({ message: "Queue is empty." });
    } else {
        res.send(JSON.parse(problem));
    }
});

// Remove a specific question when "Concept Cleared"
app.post("/concept-cleared", async (req, res) => {
    const { url } = req.body;
    const queue = await client.lRange("revisionQueue", 0, -1);
    const updatedQueue = queue.filter((item) => JSON.parse(item).url !== url);
    await client.del("revisionQueue"); // Clear the queue
    for (const item of updatedQueue) {
        await client.lPush("revisionQueue", item); // Rebuild the queue
    }
    res.send({ message: "Problem removed from the queue." });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
