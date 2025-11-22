"# Frontend Intern Task" 
📌 Basic Task Management App

A beautifully designed full-stack Task Management Application built using React + TailwindCSS and Node.js + Express + MongoDB.
Users can register, log in, create tasks, edit them, delete them, search tasks, and mark them as completed — all inside a modern dashboard UI.

🚀 Features
🔐 Authentication

User Registration

Secure Login (JWT)

Protected Dashboard

📋 Task Management

Create Tasks

Edit Tasks

Delete Tasks

Mark as Completed

Search & Filter Tasks

Status badges (Pending / Completed)

🎨 Frontend

Beautiful responsive UI

TailwindCSS styling

Framer-Motion animations

Dashboard with profile sidebar

🗄 Backend

REST API

JWT Auth

MongoDB (Mongoose)

CRUD operations

User-specific tasks

🧰 Tech Stack
Frontend

React (Vite)

TailwindCSS

Framer Motion

React Icons

Backend

Node.js

Express.js

MongoDB

Mongoose

JSON Web Tokens (JWT)

📂 Folder Structure
Basic_Task_Management_App/
│
├── client/               # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/               # Node backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── index.js
│   └── package.json
│
└── README.md

⚙️ Backend Setup (server/)
1. Install dependencies
cd server
npm install

2. Add .env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000

3. Run backend
npm run dev


Backend URL → http://localhost:5000

🎨 Frontend Setup (client/)
1. Install dependencies
cd client
npm install

2. Run frontend
npm run dev


Frontend URL → http://localhost:5173

🔗 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
Task Routes (Protected)
Method	Endpoint	Description
GET	/api/tasks	Get user tasks
POST	/api/tasks	Create task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
