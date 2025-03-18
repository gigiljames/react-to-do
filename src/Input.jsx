import "./Input.css";
import React, { useState } from "react";
import collection from "./Collection";
import TaskList from "./TaskList";
import Task from "./Task";
import { ToastContainer, toast } from "react-toastify";

function Input(props) {
  const [newList, setNewList] = useState(false);

  function handleNewListClick() {
    setNewList(true);
  }

  function handleClose() {
    document.querySelector(".main-input-container .task-title").value = "";
    setNewList(false);
  }

  function handleSave() {
    let title = document.querySelector(
      ".main-input-container .task-title"
    ).value;
    if (!title) {
      toast.error("Title is required.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
      });
      return;
    }
    let inputs = document.querySelectorAll(".task-input-container .task-input");
    let taskList = new TaskList(title);
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value) {
        let tempTask = new Task(inputs[i].value);
        let noDuplicate = taskList.addTask(tempTask);
        if (!noDuplicate) {
          toast.warn("Duplicate tasks detected!!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: Bounce,
          });
          toast.success("Duplicate tasks removed.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: Bounce,
          });
        }
      }
    }
    if (taskList.taskList.length > 0) {
      collection.addTaskList(taskList);
    }
    handleClose();
    props.setRenderTrigger((prev) => prev + 1);
  }

  function handleRemoveTask(event) {
    let taskInputContainer = event.target.closest(".task-input-container");
    if (taskInputContainer) {
      taskInputContainer.remove();
    }
  }

  function handleNewTask() {
    let taskList = document.querySelector(".main-input-container .task-list");
    let taskInputContainer = document.createElement("div");
    taskInputContainer.className = "task-input-container";
    let newTask = document.createElement("input");
    newTask.type = "text";
    newTask.placeholder = "Enter task";
    newTask.className = "task-input";
    taskInputContainer.appendChild(newTask);
    let closeButton = document.createElement("button");
    closeButton.classList.add("close-task-button");
    closeButton.classList.add("material-symbols-outlined");
    closeButton.addEventListener("click", (e) => handleRemoveTask(e));
    closeButton.innerText = "close";
    taskInputContainer.appendChild(closeButton);
    taskList.appendChild(taskInputContainer);
  }

  const newListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        // transition={Bounce}
      />
      {!newList ? (
        <div className="main-input-container">
          <input
            className="main-input-box"
            type="text"
            placeholder="New list"
            onClick={handleNewListClick}
          />
        </div>
      ) : (
        <div className="main-input-container" style={newListStyle}>
          <input
            className="task-input task-title"
            type="text"
            placeholder="Title"
          />
          <h5 className="subheading">Task list</h5>
          <div className="task-list">
            <div className="task-input-container">
              <input
                className="task-input"
                type="text"
                placeholder="Enter task"
              />
              <button
                className="close-task-button material-symbols-outlined"
                onClick={(e) => handleRemoveTask(e)}
              >
                close
              </button>
            </div>
          </div>
          <button className="new-task-button" onClick={handleNewTask}>
            +
          </button>
          <div className="new-list-button-group">
            <button onClick={handleClose}>Close</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Input;
