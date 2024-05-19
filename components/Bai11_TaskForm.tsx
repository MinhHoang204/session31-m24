import React, { useState } from 'react';
import { Task } from './Bai11_Type';

interface TaskFormProps {
  addTask: (task: Task) => void;
  error: string;
}

const Bai11_TaskForm: React.FC<TaskFormProps> = ({ addTask, error }) => {
  const [taskName, setTaskName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({ name: taskName, completed: false });
    setTaskName('');
  };

  return (
    <div>
      Bai11.TaskForm
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
          placeholder="Nhập tên công việc" 
        />
        <button type="submit">Thêm</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Bai11_TaskForm;