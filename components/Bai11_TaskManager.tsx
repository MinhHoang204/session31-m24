import { useState, useEffect } from 'react'
import Bai11_TaskList from './Bai11_TaskList';
import Bai11_TaskForm from './Bai11_TaskForm';
import {Task} from './Bai11_Type'

export default function Bai11_TaskManager() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: Task) => {
        if (!task.name.trim()) {
            setError('Tên công việc không được để trống');
            return;
        }
        if (tasks.some(t => t.name === task.name)) {
            setError('Tên công việc không được phép trùng');
            return;
        }
        setTasks([...tasks, task]);
        setError('');
    };

    const deleteTask = (taskName: string) => {
        setTasks(tasks.filter(task => task.name !== taskName));
    };

    const completeTask = (taskName: string) => {
        setTasks(tasks.map(task => 
            task.name === taskName ? { ...task, completed: !task.completed } : task
        ));
    };
  return (
    <div>Bai11_TaskManager
        <h1>Danh sách công việc</h1>
          <Bai11_TaskForm addTask={addTask} error={error} />
          <Bai11_TaskList tasks={tasks} deleteTask={deleteTask} completeTask={completeTask} />
        <p>Công việc đã hoàn thành: {tasks.filter(task => task.completed).length} / {tasks.length}</p>
    </div>
  )
}
