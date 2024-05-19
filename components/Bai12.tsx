import React, { useState, useEffect } from 'react';
interface Task {
    id: number;
    name: string;
    completed: boolean;
}
const Bai12: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTaskName.trim()) {
      setError('Tên công việc không được để trống');
      return;
    }
    if (tasks.some(task => task.name === newTaskName)) {
      setError('Tên công việc không được phép trùng');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      name: newTaskName,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskName('');
    setError('');
  };

  const startEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setEditTaskName(task.name);
    setIsEditing(true);
  };

  const confirmEditTask = () => {
    if (!editTaskName.trim()) {
      setError('Tên công việc không được để trống');
      return;
    }
    setTasks(tasks.map(task => task.id === editTaskId ? { ...task, name: editTaskName } : task));
    setIsEditing(false);
    setEditTaskId(null);
    setEditTaskName('');
    setError('');
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompleteTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;

  return (
    <div className="app">
      <h1>Danh sách công việc</h1>
      <input
        type="text"
        placeholder="Nhập tên công việc"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      <button onClick={addTask}>Thêm</button>
      {error && <p className="error">{error}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleteTask(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name}
            </span>
            <button onClick={() => startEditTask(task)}>Sửa</button>
            <button onClick={() => deleteTask(task.id)}>Xóa</button>
          </li>
        ))}
      </ul>
      <p>Công việc đã hoàn thành: {completedTasksCount} / {tasks.length}</p>

      {isEditing && (
        <div className="modal">
          <h2>Cập nhật công việc</h2>
          <input
            type="text"
            value={editTaskName}
            onChange={(e) => setEditTaskName(e.target.value)}
          />
          <button onClick={confirmEditTask}>Đồng ý</button>
          <button onClick={() => setIsEditing(false)}>Hủy</button>
        </div>
      )}
    </div>
  );
};

export default Bai12;