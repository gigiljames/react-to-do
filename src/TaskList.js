import { v4 as uuidv4 } from "uuid";
import collection from "./Collection";

class TaskList {
  constructor(title) {
    this.title = title;
    this.taskList = [];
    this.id = uuidv4();
  }

  addTask(task) {
    let temp = this.taskList;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].task === task.task) {
        return;
      }
    }
    this.taskList.push(task);
  }

  toggleComplete(id) {
    let temp = this.taskList;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        temp[i].toggleComplete();
      }
    }
  }

  removeTask(taskId) {
    this.taskList = this.taskList.filter((task) => task.id !== taskId);
    if (this.taskList.length === 0 && this.title === "") {
      collection.removeTaskList(this.id);
    }
  }
}

export default TaskList;
