import Task from "./Task";
import TaskList from "./TaskList";

class Collection {
  constructor() {
    if (!Collection.instance) {
      this.taskList = [];
      Collection.instance = this;
    }
    return Collection.instance;
  }

  addTaskList(list) {
    this.taskList.push(list);
  }

  removeTaskList(listId) {
    this.taskList = this.taskList.filter((list) => list.id !== listId);
  }

  removeTask(listId, taskId) {
    let temp = this.taskList;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === listId) {
        temp[i].removeTask(taskId);
      }
    }
  }

  toggleComplete(listId, taskId) {
    let temp = this.taskList;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === listId) {
        temp[i].toggleComplete(taskId);
      }
    }
  }
}

const collection = new Collection();

//HARDCODED TASKS
let tempTaskList = new TaskList("Sample List 1");
tempTaskList.addTask(new Task("Go to school"));
let task = new Task("Go to college");
task.completed = true;
tempTaskList.addTask(task);
collection.addTaskList(tempTaskList);

export default collection;
