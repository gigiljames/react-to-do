import collection from "./Collection";
import "./TaskCard.css";
import React, { useState } from "react";
import DeleteListButton from "./DeleteListButton";

function TaskCard(props) {
  const [renderTrigger, setRenderTrigger] = useState(0);

  function handleRemoveTask(e) {
    let task = e.target;
    let taskCard = task.closest(".task-card");
    let listId = taskCard.dataset?.id;
    let taskId = task.dataset?.id;
    collection.removeTask(listId, taskId);
    props.setRenderTrigger((prev) => prev + 1);
  }

  function handleStatusToggle(e) {
    let task = e.target;
    let taskCard = task.closest(".task-card");
    let listId = taskCard.dataset?.id;
    let taskId = task.dataset?.id;
    collection.toggleComplete(listId, taskId);
    setRenderTrigger((prev) => prev + 1);
  }

  let completedTaskList = props.list.taskList.filter(
    (task) => task.completed === true
  );
  let pendingTaskList = props.list.taskList.filter(
    (task) => task.completed !== true
  );
  let pendingTaskListElements = pendingTaskList.map((task) => (
    <div key={task.id} className="task-item" data-id={task.id}>
      <input
        className="check"
        type="checkbox"
        onClick={(e) => handleStatusToggle(e)}
        data-id={task.id}
      />
      <label>{task.task}</label>
      <button
        className="remove-task-button material-symbols-outlined"
        onClick={(e) => handleRemoveTask(e)}
        data-id={task.id}
      >
        close
      </button>
    </div>
  ));

  let completedTaskListElements = completedTaskList.map((task) => (
    <div key={task.id} className="completed-task-item">
      <input
        className="check"
        type="checkbox"
        checked
        onClick={handleStatusToggle}
        data-id={task.id}
      />
      <label>{task.task}</label>
      <button
        className="remove-task-button material-symbols-outlined"
        onClick={handleRemoveTask}
        data-id={task.id}
      >
        close
      </button>
    </div>
  ));

  return (
    <>
      <div className="task-card" key={props.list.id} data-id={props.list.id}>
        <DeleteListButton
          listId={props.list.id}
          setRenderTrigger={props.setRenderTrigger}
        />
        <h3 className="task-title">{props.list.title}</h3>
        {pendingTaskListElements}
        {completedTaskListElements.length > 0 ? (
          <div className="completed-task-container">
            {completedTaskListElements}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default TaskCard;
