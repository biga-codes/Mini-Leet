const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = "mongodb+srv://gopikajitesh:PASSWORD@leetq.5m2fq.mongodb.net/?retryWrites=true&w=majority&appName=LEETQ"; // Replace with your MongoDB connection details

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

connectToMongoDB();


// Endpoint to get the next problem
app.get("/next", (req, res) => {
    const randomIndex = Math.floor(Math.random() * problems.length);
    const problem = problems[randomIndex];
    res.json(problem);
});

// Endpoint to get a random problem from the database
app.get("/random", async (req, res) => {
    try {
        const collection = client.db("leetcode").collection("problems");
        const count = await collection.countDocuments();
        if (count === 0) return res.send({ message: "No problems found." });

        const randomIndex = Math.floor(Math.random() * count);
        const problem = await collection.find().skip(randomIndex).limit(1).next();
        res.send(problem);
    } catch (error) {
        console.error("Error fetching random problem:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Endpoint to remove a problem from the database
app.post("/remove", async (req, res) => {
    try {
        const { title } = req.body;
        const collection = client.db("leetcode").collection("problems");
        await collection.deleteOne({ title });
        res.send({ message: "Problem removed from the database." });
    } catch (error) {
        console.error("Error removing problem from database:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});