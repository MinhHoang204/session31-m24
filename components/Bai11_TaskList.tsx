import { Component } from 'react';
import Bai11_TaskItem from './Bai11_TaskItem';
import { Task } from './Bai11_Type';

interface TaskListProps {
  tasks: Task[];
  deleteTask: (taskName: string) => void;
  completeTask: (taskName: string) => void;
}

export default class Bai11_TaskList extends Component<TaskListProps> {
  render() {
    const { tasks, deleteTask, completeTask } = this.props;
    return (
      <div>
        Bai11_TaskList
        <ul>
          {tasks.map(task => (
            <Bai11_TaskItem
              key={task.name}
              task={task}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          ))}
        </ul>
      </div>
    );
  }
}
