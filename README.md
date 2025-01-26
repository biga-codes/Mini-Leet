# Mini-Leet: Leetcode Revisor and Tracker

*Mini-Leet* is designed for individuals who struggle to stay consistent with their daily LeetCode challenges and coding practice. Whether you're a coding novice or a seasoned developer, Mini-Leet is designed to streamline your problem-solving journey and keep you on track to achieve your goals.

The LeetCode Revision Chrome extension is designed to help users improve their problem-solving skills by providing random LeetCode problems on a daily basis. This tool encourages users to stay engaged with daily coding challenges, promoting continuous learning and growth. In addition to presenting daily problems, the extension displays valuable insights about the user's LeetCode progress, such as the total number of problems solved and how many problems have been solved by difficulty (easy, medium, and hard). 

The extension also features Google Sign-In integration, allowing users to log in with their Google account for a personalized experience. Once signed in, the extension fetches and displays the user's LeetCode profile data, making it easy to track progress and set new goals. With a clean, simple interface, the extension offers an intuitive way to stay motivated, challenge yourself, and track your progress in solving coding problems on LeetCode.


## **Tech Stack**

- **Frontend:**
  - HTML, CSS, JavaScript
  - Google Sign-In Integration

- **Backend (via Chrome APIs):**
  - Chrome Extensions APIs (Storage, Runtime, Identity)
  - Google OAuth 2.0
  - MongoDB
  - Node.js

- **APIs:**
  - LeetCode GraphQL API (for fetching daily problems and user stats)
  - Google OAuth API (for user authentication)


## Team members

- [@BhadraR](https://www.github.com/Bhadra2005)
- [@GopikaJ](https://github.com/biga-codes)
- [@JeanRoger](https://github.com/Jean2004-aka)

How It Works:
Queue Management
The extension uses MongoDB to manage the queue of LeetCode problems. The queue is persistent, meaning that once a problem is added, it stays in the queue until the user marks it as "Concept Cleared".

Random Problem: Fetches a random LeetCode problem from an external API or a pre-defined list stored in MongoDB.
Revision Queue: Problems are added to the revision queue and revisited regularly.
Concept Cleared: When the user feels they've mastered a problem, they can mark it as cleared, which removes it from the queue.



## Screenshots

![Screenshot 2025-01-26 110335](https://github.com/user-attachments/assets/f39fb9e7-9982-4a75-8418-e1af91b79436)

![Screenshot 2025-01-26 110457](https://github.com/user-attachments/assets/267f039c-bf28-415a-b085-4535fb2aa1df)

![Screenshot 2025-01-26 110439](https://github.com/user-attachments/assets/a9546254-6a64-4241-b8ba-e5f8f84027e0)

![Screenshot 2025-01-26 110416](https://github.com/user-attachments/assets/46240847-dbf4-4f66-a844-035a8f5e6047)

The LeetCode Revision Chrome Extension is designed to help you practice LeetCode problems regularly and efficiently. The extension pulls random LeetCode problems, manages a revision queue, and helps you clear problems once you've mastered them. The extension uses MongoDB to persist the revision queue and user progress.

## The Concept Behind Our Idea
As third years studying for placements, we often find ourselves needing a convenient way to be able to track our progress on Leetcode and manage our revision efficiently. Having to further exhaust ourselves on top of already having to solve complex problems, becomes a difficult task when we're on both a time constraint and immense amounts of pressure. This Chrome exensions offers a solution for those placement-oriented students who wish to manage their time and ensure proper learning along with managing their daily tasks. 

This app seamlessly integrates with a person's LeetCode Account and allows for spaced repitition in learning, thereby cementing the concepts you've learnt into your memory for longer periods of time.

Spaced repetition is a learning technique that involves revisiting concepts at increasing intervals to enhance long-term retention. This extension implements the spaced repetition principle by:

Queuing problems for repeated revision: The extension automatically adds problems to a revision queue. Users are prompted to solve the same problems multiple times at regular intervals, ensuring they revisit concepts at optimal intervals.
Tracking mastery: As users mark a problem as “Concept Cleared,” they remove it from the queue, indicating that they no longer need to revisit the problem as frequently.

By revisiting the same problem multiple times, spaced repetition helps reinforce the problem-solving techniques and concepts learned, leading to better retention.


## Features

- Seamless LeetCode Integration: Log in directly to your LeetCode profile through Mini-Leet and access your progress effortlessly.  
- Personalized Progress Tracking: Monitor your completed problems, see what's pending, and celebrate your milestones.  
- Repetitive Revision: Flag challenging questions for revision and access them easily with direct links, ensuring continuous improvement.  
- Spaced Repetition Review Boards: Leverage scientifically proven techniques to maximize retention and recall. Mini-Leet schedules flagged problems for review at optimal intervals, keeping your problem-solving skills sharp.  
- Robust Data Management: Powered by MongoDB, your data is securely stored and efficiently managed for optimal performance.  


## How to run?

1. Clone the Repository:
   bash
   git clone https://github.com/biga-codes/Mini-Leet.git
   cd Mini-Leet
   
2. Install Dependencies:
   npm install mongodb
   node server.js
   
4. Configure Environment Variables:
   - Add your MongoDB connection string:
     
     MONGODB_URI=your_mongodb_connection_string
     
5. Start the Application:
  go to chrome for developers and test the application locally to access mini-leet.



## Usage

1. Log In:
   - Click on the "Log in with LeetCode" button to connect your account.  
2. Dashboard:
   - View your overall progress, including completed and pending problems.  
3. Mark for Revision:
   - After attempting a problem, mark it for revision if needed.  
4. Spaced Repetition Review Boards:
   - Access the "Revisions" section to see problems scheduled for review. Mini-Leet optimizes review timing to maximize learning and retention.  
5. Revisit Marked Problems:
   - Use direct links to revisit flagged questions on LeetCode.  


## Project Structure

- **authent.html & authent.js**: Handle user authentication with LeetCode.  
- **dashboard.html & dashboard.js**: Display user progress, review boards, and statistics.  
- **server.js**: Backend server handling API requests and database interactions.  
- **styles.css**: Main stylesheet for consistent styling across the app.  

## Link to video Demonstration
click on thumbnail to watch the video.

[![Watch the video](https://img.youtube.com/vi/xjawPvPf2HQ/0.jpg)](https://youtu.be/xjawPvPf2HQ)

## update:
our chrome extension is now published and up for revision on the chrome store! ![Screenshot 2025-01-26 230244](https://github.com/user-attachments/assets/a2966fb8-d274-4c1f-acb3-1a4e049f63b8)



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please open an issue on GitHub or reach out to the project maintainers.

---
