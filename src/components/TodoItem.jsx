const TodoItem = ({task, toggleTask, deleteTask}) => {
  return (
    <li className={task.completed ? "completed" : ""}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        />
      <span>{task.title}</span>
      <button onClick={() => deleteTask(task.id)}>
        ×
      </button>
    </li>
  );
}

export default TodoItem;
