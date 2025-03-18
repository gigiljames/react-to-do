import Input from "./Input";
import Display from "./Display";
import React, { useState } from "react";

function ToDoList() {
  const [renderTrigger, setRenderTrigger] = useState(0);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>To-Do List</h1>
      <div className="main-content">
        <Input setRenderTrigger={setRenderTrigger} />
        <Display />
      </div>
    </>
  );
}

export default ToDoList;
