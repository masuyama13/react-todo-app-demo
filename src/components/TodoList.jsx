import { useState, useEffect } from 'react'
import TodoItem from "./TodoItem";

const STORAGE_KEY = "todo.tasks.v1";

const TodoList = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState(() => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    addTask(title);
    setText("");
  };

  return (
    <>
      <h1>ToDo List</h1>
      <div className="todo-list">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Add a task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button>Add</button>
        </form>
        {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      )}
      </div>
    </>
  );
}

export default TodoList;
