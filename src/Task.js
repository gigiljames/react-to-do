import { v4 as uuidv4 } from "uuid";

class Task {
  constructor(task) {
    this.task = task;
    this.completed = false;
    this.id = uuidv4();
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

export default Task;
