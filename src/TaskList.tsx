import React from "react";
import { Todo } from "./types/todo.type";

import styles from "./TaskList.module.scss";
import { injectedType } from "./HOC/connect";
import connect from "./HOC/connect";

interface TaskListProps extends injectedType {
  completed: boolean;
  taskList: Todo[];
  onDoneTask: (id: string, done: boolean) => void;
  onStartEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

function TaskList(props: TaskListProps) {
  const { taskList, completed, onDoneTask } = props;

  const handleChangeCheckbox =
    (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      onDoneTask(id, event.target.checked);
    };

  const handleStartEditTask =
    (id: string) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      props.onStartEditTask(id);
    };

  const handleDeleteTask =
    (id: string) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      props.onDeleteTask(id);

      console.log(id);
    };

  return (
    <div>
      <h1>{completed ? "Completed" : "Uncompleted"} </h1>

      <div>
        {taskList.map((task: Todo) => (
          <div className={styles.taskRow} key={task.id}>
            <input
              className={styles.taskCheckbox}
              onChange={handleChangeCheckbox(task.id)}
              checked={task.done}
              type="checkbox"
            />
            <p className={styles.taskName}>{task.name}</p>
            <div className={styles.taskActions}>
              <button
                className={styles.editButton}
                onClick={handleStartEditTask(task.id)}
              >
                🖊️
              </button>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteTask(task.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const injectedProps = {
  user: {
    name: "duoc",
  },
};
export default connect(injectedProps)(TaskList);
