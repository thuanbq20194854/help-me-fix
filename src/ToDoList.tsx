import { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { Todo } from "./types/todo.type";

import styles from "./ToDoList.module.scss";
// import { start } from "repl";

type HandleNewTodos = (tasks: Todo[]) => Todo[];

const syncReactToLocalStorage = (handleNewTodos: HandleNewTodos) => {
  const todosString = localStorage.getItem("todos");
  const todosObj: Todo[] = JSON.parse(todosString || "[]");
  const newTodoObj = handleNewTodos(todosObj);
  localStorage.setItem("todos", JSON.stringify(newTodoObj));
};

function ToDoList() {
  const [taskList, setTaskList] = useState<Todo[]>([]);

  const [currentEditedTask, setCurrentEditedTask] = useState<Todo | null>(null);

  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    const todosObj = JSON.parse(todosString || "[]");
    setTaskList(todosObj);
  }, []);

  const handleAddTask = (name: string) => {
    const newTask: Todo = {
      id: new Date().toISOString(),
      name,
      done: false,
    };

    setTaskList((prev) => [...prev, newTask]);
    syncReactToLocalStorage((todos: Todo[]) => [...todos, newTask]);
  };

  const handleDoneTask = (id: string, done: boolean) => {
    setTaskList((prev) => {
      const newTaskList = [...prev];
      newTaskList.forEach((task) => {
        if (id === task.id) {
          task.done = done;
        }
      });

      return newTaskList;
    });
  };

  const startEditTask = (id: string) => {
    const expectedTask = taskList.find((task) => task.id === id);

    if (expectedTask) {
      setCurrentEditedTask(expectedTask);
    }
  };

  const editTask = (name: string) => {
    if (currentEditedTask) {
      setCurrentEditedTask({
        ...currentEditedTask,
        name,
      });
    }
  };

  const finishEdit = () => {
    // setTaskList((prevList) => {
    //   return prevList.map((task) => {
    //     if (task.id === currentEditedTask?.id) {
    //       return {
    //         ...currentEditedTask,
    //       };
    //     } else {
    //       return task;
    //     }
    //   });
    // });

    const handler = (todos: Todo[]) => {
      return todos.map((task) => {
        if (task.id === currentEditedTask?.id) {
          return {
            ...currentEditedTask,
          };
        } else {
          return task;
        }
      });
    };
    setTaskList(handler);
    setCurrentEditedTask(null);
    syncReactToLocalStorage(handler);
  };

  const deleteTask = (id: string) => {
    const handler = (taskList: Todo[]) => {
      const deletedTaskIndex = taskList.findIndex((task) => task.id === id);
      if (deletedTaskIndex !== -1) {
        console.log(deletedTaskIndex);
        const newTaskList = [...taskList];
        newTaskList.splice(deletedTaskIndex, 1);
        return newTaskList;
      }

      return taskList;
    };

    if (currentEditedTask) {
      setCurrentEditedTask(null);
    }

    setTaskList(handler);
    syncReactToLocalStorage(handler);
  };

  console.log(currentEditedTask);

  const doneList = taskList.filter((task) => task.done === true);
  const undoneList = taskList.filter((task) => task.done === false);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <TaskInput
            onAddTask={handleAddTask}
            currentEditedTask={currentEditedTask}
            onEditTask={editTask}
            onFinishEdit={finishEdit}
          />
          <TaskList
            onDoneTask={handleDoneTask}
            completed={false}
            taskList={undoneList}
            onStartEditTask={startEditTask}
            onDeleteTask={deleteTask}
          />
          <TaskList
            onDoneTask={handleDoneTask}
            completed={true}
            taskList={doneList}
            onStartEditTask={startEditTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </>
  );
}

export default ToDoList;
