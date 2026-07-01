function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="border p-3 rounded flex justify-between items-center">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.status === "done"}
          onChange={() => onToggle(task)}
        />
        <span className={task.status === "done" ? "line-through text-gray-400" : ""}>
          {task.title}
        </span>
      </span>
      <button onClick={() => onDelete(task.id)} className="text-red-500 text-sm">
        Delete
      </button>
    </li>
  );
}

export default TaskItem;