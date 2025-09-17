# Personal-Finance-Tracker

💰 Personal Finance Tracker

A full-stack web application that helps users track income and expenses, view past transactions, and manage their personal finances 
securely.This project was built to showcase real-world software engineering skills — from designing a backend API to creating a 
clean, responsive frontend and deploying it live for others to use.


🌟 Live Demo
- Frontend (GitHub Pages): https://parneet5.github.io/Personal-Finance-Tracker/
- Backend (Render API): coming soon

Try it out: Sign up, log in, and add expenses or income to see your data update in real time.


🖼 Project Overview
This project allows a user to:
- Create an account and log in securely using JWT-based authentication.
- Add, view, and delete transactions for expenses and income.
- Categorize transactions (e.g., Groceries, Rent, Salary).
- See their history in a clean, responsive dashboard.
- Store all data persistently using SQLite.


🛠 Tech Stack

Frontend: HTML, CSS, JavaScript (Vanilla JS)
Backend: Node.js, Express.js
Database: SQLite (with persistent storage on Render)
Security: JWT Authentication, bcrypt Password Hashing, Helmet, CORS
Deployment: GitHub Pages (Frontend), Render (Backend)
Version Control: Git & GitHub


✨ Key Features
Authentication:
- Secure signup and login with JWT tokens.
- Passwords stored safely using bcrypt hashing.

Transaction Management:
- Add, view, and delete transactions with type (income/expense), category, amount, and date.
- Transactions update instantly on the dashboard.

Responsive Design:
- Clean, modern UI built with custom CSS and an ocean-themed color palette.
- Works on both desktop and mobile screens.

Persistent Data:
- SQLite database hosted on Render with persistent disk storage.
- Data remains saved even after the backend restarts.

Logging:
- Backend logs all user actions (signup, login, add/delete transactions) for visibility and debugging.


🚀 Getting Started

1. Clone the repository:
   git clone https://github.com/your-username/Personal-Finance-Tracker.git
   cd Personal-Finance-Tracker

2. Backend Setup:
   cd server
   npm install

   Create a .env file inside the server folder:
   JWT_SECRET=your-random-secret-key
   PORT=8080
   DB_PATH=./data.sqlite

   Run the backend:
   node server.js

   Test at:
   http://localhost:8080/health

   Expected output:
   { "ok": true }

3. Frontend Setup:
   cd ../client
   Open signup.html in your browser or VS Code Live Server.

   In app.js, make sure API_BASE points to your local backend:
   const API_BASE = "http://localhost:8080/api";


📂 Folder Structure

Personal-Finance-Tracker/
│
├── server/              # Backend code
│   ├── server.js        # Entry point
│   ├── src/
│   │   ├── db.js        # SQLite database setup
│   │   ├── routes/
│   │   │   ├── auth.js          # Signup/Login routes
│   │   │   └── transactions.js  # Transaction CRUD routes
│   │   └── middleware/
│   │       └── auth.js          # JWT authentication middleware
│   └── package.json
│
└── client/              # Frontend code
    ├── signup.html
    ├── login.html
    ├── dashboard.html
    ├── styles.css
    └── app.js



🌐 Deployment
Frontend:
Hosted on GitHub Pages: https://parneet5.github.io/Personal-Finance-Tracker/

Backend:
Hosted on Render with SQLite persistent disk.


🧑‍💻 Why This Project Matters
As a software engineering student, this project demonstrates:
- Building a full-stack application from scratch.
- Secure coding practices with authentication and password hashing.
- Organizing a backend using routes and middleware.
- Using Git and GitHub for version control and collaboration.
- Deploying a complete application using professional-grade hosting tools.


🔗 Links
- Live Demo: https://parneet5.github.io/Personal-Finance-Tracker/
- GitHub Repository: https://github.com/parneet5/Personal-Finance-Tracker


📝 Future Enhancements
- Add monthly summaries and charts using Chart.js.
- Export transaction data as CSV or PDF.
- Add dark/light mode toggle.
- Allow users to set budgets and goals.


👩‍💻 Author
Parneet Kaur
Software Engineering Student, University of Alberta
GitHub: https://github.com/parneet5

