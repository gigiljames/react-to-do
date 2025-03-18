import { v4 as uuidv4 } from "uuid";

class TaskList {
  constructor(title) {
    this.title = title;
    this.taskList = [];
    this.id = uuidv4();
  }

  addTask(task) {
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
  }
}

export default TaskList;
