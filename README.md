# MiniLeet - Chrome Extension

## 📌 Project Overview
MiniLeet is a lightweight Chrome extension that helps users stay consistent with their coding practice by displaying their LeetCode statistics and reminding them to solve problems daily. It fetches user stats directly from LeetCode and provides insights into problems solved by difficulty level. Additionally, it displays the most recently solved problem along with its URL.

## ✨ Features
- Fetches and displays **LeetCode user statistics** (Total solved, Easy, Medium, Hard).
- Shows the **most recently solved problem** with a clickable link.
- Allows users to **enter their LeetCode username** and fetch real-time stats.
- **Daily reminder notifications** to encourage problem-solving consistency.
- Simple and user-friendly **popup UI** for quick access.

## 🛠️ Implementation Details
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: LeetCode GraphQL API for fetching user data
- **Storage**: Chrome Storage API to remember user preferences
- **Permissions**:
  - `activeTab`: Required for interacting with the currently open tab.
  - `storage`: Saves the user’s LeetCode username.
  - `notifications`: Enables daily reminders.
  
## 🚀 How to Use
1. Install the extension in Chrome (see installation steps below).
2. Click on the **MiniLeet icon** in the Chrome toolbar.
3. Enter your **LeetCode username** and click **Fetch Stats**.
4. View your **solved problems count** categorized by difficulty.
5. See your **most recent solved problem** and click the link to revisit it.
6. Get a **daily notification reminder** at a set time to solve a problem.

## 🏗️ How to Run the Project
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/MiniLeet.git
cd MiniLeet
```

### 2️⃣ Load the Extension in Chrome
1. Open **Google Chrome**.
2. Go to `chrome://extensions/`.
3. Enable **Developer Mode** (toggle in the top right corner).
4. Click **Load unpacked** and select the `MiniLeet` folder.
5. The extension should now be visible in your browser toolbar.

### 3️⃣ Test the Features
- Click the extension icon and enter a valid **LeetCode username**.
- Fetch your stats and view the latest solved problem.
- Wait for the **daily reminder notification** to ensure it works.

## 📌 Future Enhancements
- Add a **streak tracker** to keep users motivated.
- Support for **multiple users**.
- Customizable **reminder times**.

---

### 💡 Contributing
If you’d like to contribute, feel free to fork the repo and submit a PR!

### 📝 License
This project is licensed under the **MIT License**.

---
💻 Developed with ❤️ by **Full Stack Pancakes** 🍽️

