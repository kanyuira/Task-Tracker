# Task Tracker 🚀

A full-stack task management web app built with Node.js/Express (backend) and React/Vite (frontend).

## Features

- Add, view, update, and delete tasks
- Mark tasks as complete with a checkbox
- Filter tasks by status — All, Todo, Done
- Delete confirmation to prevent accidental removal
- Smooth animations powered by Framer Motion
- Colorful, playful UI with Tailwind CSS
- Data persisted to a JSON file

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express |
| Frontend | React, Vite, Tailwind CSS |
| Animations | Framer Motion |
| Storage | JSON file |
| Version Control | Git, GitHub |

## Project Structure

```
task-tracker/
├── controllers/
│   └── taskController.js   # handles API logic
├── routes/
│   └── tasks.js            # defines API endpoints
├── data/
│   └── tasks.json          # file-based storage
├── server.js               # Express server entry point
├── package.json
└── task-tracker-client/    # React frontend
    ├── src/
    │   ├── App.jsx         # main app component
    │   ├── TaskItem.jsx    # individual task card
    │   ├── index.css       # Tailwind import
    │   └── main.jsx
    ├── index.html
    └── vite.config.js
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YourUsername/task-tracker.git
cd task-tracker
```

### 2. Start the Backend API

```bash
npm install
node server.js
```

API runs at `http://localhost:3000`

### 3. Start the Frontend

```bash
cd task-tracker-client
npm install
npm run dev
```

App runs at `http://localhost:5173`

> **Note:** The backend must be running before starting the frontend.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a new task |
| GET | /api/tasks/:id | Get a single task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

### Example Request

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy milk", "priority": "high"}'
```

### Example Response

```json
{
  "id": "abc-123",
  "title": "Buy milk",
  "description": "",
  "status": "todo",
  "priority": "high",
  "dueDate": null
}
```

## How to Use

1. **Add a task** — type in the input box and click **+ Add**
2. **Complete a task** — click the checkbox next to a task
3. **Delete a task** — click **Delete**, then confirm with **Yes**
4. **Filter tasks** — use the ✨ All, 📝 Todo, 🎉 Done buttons

## What I Learned

- Building a REST API with Node.js and Express
- File-based data persistence with the Node.js `fs` module`
- React hooks — `useState`, `useEffect`
- Fetching data from an API in React
- Component-based architecture (`App.jsx`, `TaskItem.jsx`)
- Styling with Tailwind CSS utility classes
- Animations with Framer Motion
- Version control with Git and GitHub
- Full-stack project structure and workflow

## Author

Kanyuira
