# Mini-Leet: Elevate Your LeetCode Experience

Welcome to *Mini-Leet*, your ultimate companion for mastering LeetCode challenges! Whether you're a coding novice or a seasoned developer, Mini-Leet is designed to streamline your problem-solving journey and keep you on track to achieve your goals.

The LeetCode Revision Chrome extension is designed to help users improve their problem-solving skills by providing random LeetCode problems on a daily basis. This tool encourages users to stay engaged with daily coding challenges, promoting continuous learning and growth. In addition to presenting daily problems, the extension displays valuable insights about the user's LeetCode progress, such as the total number of problems solved and how many problems have been solved by difficulty (easy, medium, and hard). 

The extension also features Google Sign-In integration, allowing users to log in with their Google account for a personalized experience. Once signed in, the extension fetches and displays the user's LeetCode profile data, making it easy to track progress and set new goals. With a clean, simple interface, the extension offers an intuitive way to stay motivated, challenge yourself, and track your progress in solving coding problems on LeetCode.


## Team members

- [@BhadraR](https://www.github.com/Bhadra2005)
- [@GopikaJ](https://github.com/biga-codes)
- [@JeanRoger](https://github.com/Jean2004-aka)


## Screenshots


## Features

- *Seamless LeetCode Integration*: Log in directly to your LeetCode profile through Mini-Leet and access your progress effortlessly.  
- *Personalized Progress Tracking*: Monitor your completed problems, see what's pending, and celebrate your milestones.  
- *Repetitive Revision*: Flag challenging questions for revision and access them easily with direct links, ensuring continuous improvement.  
- *Spaced Repetition Review Boards*: Leverage scientifically proven techniques to maximize retention and recall. Mini-Leet schedules flagged problems for review at optimal intervals, keeping your problem-solving skills sharp.  
- *Robust Data Management*: Powered by MongoDB, your data is securely stored and efficiently managed for optimal performance.  

## How to run?

1. Clone the Repository:
   bash
   git clone https://github.com/biga-codes/Mini-Leet.git
   cd Mini-Leet
   
2. Install Dependencies:
   bash
   npm install
   
3. Configure Environment Variables:
   - Create a .env file in the root directory.
   - Add your MongoDB connection string:
     
     MONGODB_URI=your_mongodb_connection_string
     
4. Start the Application:
   bash
   npm start
   
5. Access Mini-Leet:
   - Open your browser and navigate to http://localhost:3000 to start using Mini-Leet.

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


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please open an issue on GitHub or reach out to the project maintainers.

---

Master LeetCode with *Mini-Leet* and experience coding like never before. Conquer challenges, strengthen your problem-solving skills, and unlock your potential today!
