import React from "react";
import "./Form.scss";

function Form({newTask, setNewTask, editTask, handlerForm}) {
  return (
    <form className = "form">
      <input type = "text"
             placeholder = "+ Add a task, press Enter to save"
             className = "input-form"
             value = {newTask}
             onChange = {(event) => setNewTask(event.target.value)}/>
      <button onClick = {handlerForm} className = "btn-add" type = "submit">
        {editTask === null ? "Add" : "Save"}
      </button>
    </form>
  );
}

export default Form;