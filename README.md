#  Task Manager App

A full-stack Task Manager application that allows users to securely manage tasks across multiple stages. Users can register, log in, create tasks, update task details, move tasks between stages, and delete tasks through a clean and responsive interface.

##  Live Links

### Frontend

https://task-manager-ten-sooty.vercel.app/

### Backend

https://task-manager-1-2sln.onrender.com

### GitHub Repository

https://github.com/hardik07777/task-manager

---

#  Features

## Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes
* Persistent Login Sessions
* Logout Functionality

## Task Management

* Create Tasks
* Edit Tasks
* Delete Tasks
* Update Task Status
* Manage tasks across three stages:

  * Todo
  * In Progress
  * Done

## User Experience

* Responsive Design
* Loading States
* Error Handling
* Success Notifications
* Clean Dashboard UI
* Mobile-Friendly Layout

---

#  Tech Stack

## Client

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast

## Server

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Tokens (JWT)
* bcryptjs

## Deployment

* Client → Vercel
* Server → Render
* Database → MongoDB Atlas

---

#  Project Structure

```text
task-manager
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── context
│   │   └── types
│   │
│   └── public
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── utils
│
└── README.md
```

---

#  Authentication Flow

1. User registers with name, email, and password.
2. Password is hashed before being stored.
3. User logs in with credentials.
4. Server generates a JWT token.
5. Token is stored on the client.
6. Protected routes require a valid token.
7. Users can only access and manage their own tasks.

---

#  API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Tasks

### Get All Tasks

```http
GET /api/tasks
```

### Create Task

```http
POST /api/tasks
```

### Update Task

```http
PUT /api/tasks/:id
```

### Delete Task

```http
DELETE /api/tasks/:id
```

---

# ⚙️ Environment Variables

## Server (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Client (.env)

```env
VITE_API_URL=https://task-manager-1-2sln.onrender.com/api
```

---

#  Running Locally

## Clone Repository

```bash
git clone https://github.com/hardik07777/task-manager.git
cd task-manager
```

---

## Start Server

```bash
cd server

npm install

npm run dev
```

Server runs on:

```text
http://localhost:5000
```

---

## Start Client

```bash
cd client

npm install

npm run dev
```

Client runs on:

```text
http://localhost:5173
```

---

#  Technical Decisions

### JWT Authentication

JWT was chosen because it provides a lightweight and scalable authentication mechanism without requiring server-side session management.

### MongoDB + Mongoose

MongoDB offers flexible document storage and integrates seamlessly with Node.js applications through Mongoose.

### Separate Client and Server

The project follows a client-server architecture to ensure better maintainability, scalability, and deployment flexibility.

### TypeScript on Client

TypeScript improves code reliability, developer experience, and maintainability by providing static type checking.

---

# 📋 Assumptions

* Each task belongs to a single authenticated user.
* Users can only view and modify their own tasks.
* Tasks always belong to one of the three predefined stages:

  * Todo
  * In Progress
  * Done
* Authentication is required for all task operations.

---

#  Tradeoffs

* Drag-and-drop task management was not implemented to keep the solution focused on the assignment requirements.
* Task priorities, due dates, and labels were omitted to maintain simplicity.
* JWT tokens are stored client-side for ease of implementation.
* A minimal Kanban-style board was chosen over a more complex workflow management interface.

---

#  Future Improvements

* Drag-and-Drop Kanban Board
* Task Priorities
* Due Dates and Reminders
* Search and Filtering
* Dark Mode
* User Profiles
* Activity History
* Team Collaboration Features

---

#  Assignment Requirements Covered

### Authentication

* [x] Login Flow
* [x] Register Flow

### Tasks

* [x] Create Task
* [x] Update Task
* [x] Delete Task
* [x] Todo Stage
* [x] In Progress Stage
* [x] Done Stage

### UI

* [x] Responsive Design
* [x] Loading States
* [x] Error Handling
* [x] Clean User Interface

### Bonus Features

* [x] Custom Backend APIs
* [x] MongoDB Database Integration
* [x] JWT Authentication

---

Built as part of the Task Manager Internship Assignment.
