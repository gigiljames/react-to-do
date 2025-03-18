import collection from "./Collection";
import TaskCard from "./TaskCard.jsx";
import React, { useState } from "react";

function Display() {
  const [renderTrigger, setRenderTrigger] = useState(0);

  let tempList = collection.taskList.map((list, index) => (
    <TaskCard key={index} list={list} setRenderTrigger={setRenderTrigger} />
  ));

  return (
    <>
      <div className="display-container">{tempList}</div>
    </>
  );
}
export default Display;
