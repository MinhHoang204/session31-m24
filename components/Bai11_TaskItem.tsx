import React, { useState } from 'react';
import Modal from 'react-modal';
import { Task } from './Bai11_Type';

interface TaskItemProps {
  task: Task;
  deleteTask: (taskName: string) => void;
  completeTask: (taskName: string) => void;
}

const Bai11_TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, completeTask }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <li>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => completeTask(task.name)} 
      />
      {task.name}
      <button onClick={openModal}>🗑️</button>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Xác nhận</h2>
        <p>Bạn có xác nhận xóa công việc <b>{task.name}</b> không?</p>
        <button onClick={closeModal}>Hủy</button>
        <button onClick={() => { deleteTask(task.name); closeModal(); }}>Đồng ý</button>
      </Modal>
    </li>
  );
};

export default Bai11_TaskItem;
