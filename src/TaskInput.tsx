import { debug, log } from "console";
import React, { useState } from "react";
import connect, { ExtraInfoType } from "./HOC/connect";
import styles from "./TaskInput.module.scss";
import { Todo } from "./types/todo.type";

interface TaskInputProps extends ExtraInfoType {
  onAddTask: (name: string) => void;
  onEditTask: (name: string) => void;
  onFinishEdit: () => void;
  currentEditedTask: Todo | null;
}

const injectedProps = {
  debug: debug,
  log: log,
};

function TaskInput(props: TaskInputProps & typeof injectedProps) {
  const [name, setName] = useState<string>("");

  const { currentEditedTask } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentEditedTask) {
      // set name to edit current task
      props.onEditTask(event.target.value);

      if (name) setName("");
    } else {
      // set name to add the task
      setName(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentEditedTask) {
      props.onFinishEdit();
    } else {
      props.onAddTask(name);
      setName("");
    }
  };

  return (
    <div>
      <h1>To do list typescript</h1>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.taskInput}
          placeholder="caption goes here"
          value={currentEditedTask ? currentEditedTask.name : name}
          onChange={handleChange}
        />
        <button>{currentEditedTask ? "✔️" : "➕"}</button>
      </form>
    </div>
  );
}

export default connect(injectedProps)(TaskInput);
