import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";

const FILTERS = [
  { key: "all", label: "All", emoji: "✨" },
  { key: "todo", label: "Todo", emoji: "📝" },
  { key: "done", label: "Done", emoji: "🎉" },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  function fetchTasks() {
    setLoading(true);
    fetch("http://localhost:3000/api/tasks")
      .then((res) => {
        if (!res.ok) throw new Error("failed to fetch tasks");
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setFormError("Give your task a name first!");
      return;
    }
    setFormError("");

    fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then(() => {
        setTitle("");
        fetchTasks();
      })
      .catch((err) => console.error("Error creating task:", err));
  }

  function handleDelete(id) {
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchTasks())
      .catch((err) => console.error("Error deleting task:", err));
  }

  function toggleStatus(task) {
    const newStatus = task.status === "todo" ? "done" : "todo";

    fetch(`http://localhost:3000/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(() => fetchTasks())
      .catch((err) => console.error("Error updating task:", err));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <div className="min-h-screen bg-blue-300 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-violet-700 tracking-tight">
            TASK TRACKER <span className="inline-block animate-bounce">🚀</span>
          </h1>
          <p className="text-violet-black mt-1 font-medium">
            {tasks.length === 0
              ? "Let's get something done today"
              : `${doneCount} of ${tasks.length} tasks done`}
          </p>
        </div>

        {/* Add Task Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg shadow-violet-200/50 p-4 mb-3 flex gap-2 border-4 border-black-200"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs doing? "
            className="border-2 border-black-500 focus:border-fuchsia-400 outline-none p-rounded-x4 flex-1 font-medium placeholder:text-black-300 transition-colors"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-fuchsia-500 to-violet-500 hover:from-fuchsia-600 hover:to-violet-600 active:scale-95 text-white font-bold px-5 py-3 rounded-xl shadow-md transition-all"
          >
            + Add
          </button>
        </form>

        {formError && (
          <p className="text-rose-500 text-sm font-semibold mb-4 ml-2">
            {formError}
          </p>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-6 justify-center">
          {FILTERS.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                filter === key
                  ? "bg-violet-600 text-white shadow-md scale-105"
                  : "bg-white text-black-500 hover:bg-white-50 border-2 border-black-300"
              }`}
            >
              {emoji} {label}
            </button>
          ))}
        </div>

        {loading && (
          <p className="text-center text-black-400 font-medium">
            Loading your tasks...
          </p>
        )}
        {error && (
          <p className="text-center text-rose-500 font-semibold bg-rose-50 rounded-xl p-3 border-2 border-rose-300">
            {error}
          </p>
        )}

        {/* Task List */}
        <ul className="grid grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleStatus}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </ul>

        {!loading && filteredTasks.length === 0 && (
          <div className="text-center mt-10 bg-white/60 rounded-2xl p-8 border-2 border-dashed border-violet-200">
            <p className="text-5xl mb-2">🌤️</p>
            <p className="text-violet-400 font-bold">
              {filter === "done"
                ? "Nothing finished yet — go get one done!"
                : filter === "todo"
                ? "No todos here. You're all caught up!"
                : "No tasks here yet. Add your first one above!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
