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

const problems = [
    { title: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
    { title: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
    { title: "Binary Search", url: "https://leetcode.com/problems/binary-search/" },
    { title: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
    { title: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { title: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/" },
    { title: "Contains Duplicate", url: "https://leetcode.com/problems/contains-duplicate/" },
    { title: "Product of Array Except Self", url: "https://leetcode.com/problems/product-of-array-except-self/" },
    { title: "Binary Search", url: "https://leetcode.com/problems/binary-search/" },
    { title: "Search in Rotated Sorted Array", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
    { title: "Find Minimum in Rotated Sorted Array", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
    { title: "Search a 2D Matrix", url: "https://leetcode.com/problems/search-a-2d-matrix/" },
    { title: "Median of Two Sorted Arrays", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
  { title: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
  { title: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { title: "Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/" },
  { title: "Remove Nth Node From End of List", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
  { title: "Reorder List", url: "https://leetcode.com/problems/reorder-list/" },
  { title: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/" },
  { title: "Min Stack", url: "https://leetcode.com/problems/min-stack/" },
  { title: "Evaluate Reverse Polish Notation", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
  { title: "Daily Temperatures", url: "https://leetcode.com/problems/daily-temperatures/" },
  { title: "Car Fleet", url: "https://leetcode.com/problems/car-fleet/" },
  { title: "Implement Queue using Stacks", url: "https://leetcode.com/problems/implement-queue-using-stacks/" },
  { title: "Number of Recent Calls", url: "https://leetcode.com/problems/number-of-recent-calls/" },
  { title: "Design Circular Queue", url: "https://leetcode.com/problems/design-circular-queue/" },
  { title: "Sliding Window Maximum", url: "https://leetcode.com/problems/sliding-window-maximum/" },
  { title: "Rotting Oranges", url: "https://leetcode.com/problems/rotting-oranges/" },
  { title: "Valid Anagram", url: "https://leetcode.com/problems/valid-anagram/" },
  { title: "Group Anagrams", url: "https://leetcode.com/problems/group-anagrams/" },
  { title: "Top K Frequent Elements", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
  { title: "Subarray Sum Equals K", url: "https://leetcode.com/problems/subarray-sum-equals-k/" },
  { title: "Word Pattern", url: "https://leetcode.com/problems/word-pattern/" },
  { title: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { title: "Same Tree", url: "https://leetcode.com/problems/same-tree/" },
  { title: "Invert Binary Tree", url: "https://leetcode.com/problems/invert-binary-tree/" },
  { title: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { title: "Validate Binary Search Tree", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
  { title: "Number of Islands", url: "https://leetcode.com/problems/number-of-islands/" },
  { title: "Course Schedule", url: "https://leetcode.com/problems/course-schedule/" },
  { title: "Pacific Atlantic Water Flow", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
  { title: "Clone Graph", url: "https://leetcode.com/problems/clone-graph/" },
  { title: "Network Delay Time", url: "https://leetcode.com/problems/network-delay-time/" },
  { title: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
  { title: "House Robber", url: "https://leetcode.com/problems/house-robber/" },
  { title: "Longest Increasing Subsequence", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
  { title: "Coin Change", url: "https://leetcode.com/problems/coin-change/" },
  { title: "Maximum Product Subarray", url: "https://leetcode.com/problems/maximum-product-subarray/" },
  { title: "Subsets", url: "https://leetcode.com/problems/subsets/" },
  { title: "Combination Sum", url: "https://leetcode.com/problems/combination-sum/" },
  { title: "Permutations", url: "https://leetcode.com/problems/permutations/" },
  { title: "Word Search", url: "https://leetcode.com/problems/word-search/" },
  { title: "Sudoku Solver", url: "https://leetcode.com/problems/sudoku-solver/" },
  { title: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { title: "Longest Palindromic Substring", url: "https://leetcode.com/problems/longest-palindromic-substring/" }
];

// Endpoint to get the next problem
app.get("/next", (req, res) => {
    const randomIndex = Math.floor(Math.random() * problems.length);
    const problem = problems[randomIndex];
    res.json(problem);
});

// Endpoint to get a random problem from the database
app.get("/random", async (req, res) => {
    try {
        const collection = client.db("leetq").collection("leetcodeq");
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
        const collection = client.db("leetq").collection("leetcodeq");
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