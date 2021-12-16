import React from "react";
import "./CompletedTasks";

function CompletedTasks({userTasks, deleteTask, changeStateTask}) {
  const completedList = userTasks.filter(item => item.completed === true);
   
  return (
    <section>
      <h2 className = "quantity">Completed ({completedList.length})</h2>
      <ul className = "list">
        {completedList.map(item => {
          return <li key = {item.id} className = "list-item">
                    <input type = "checkbox" 
                          onChange = {() => changeStateTask(item)}
                          checked = {item.completed}
                          className = "input-checkbox"
                          id = {item.id}
                    />
                    <label htmlFor = {item.id}/>
                    <input type = "text" 
                          value = {item.title} 
                          className = "task completed-task"
                          readOnly
                    />
                    <button onClick = {() => deleteTask(item)} 
                            className = "btn bth-delete">
                    </button>
                  </li>
        })}
      </ul>
    </section>
    );
}

export default CompletedTasks;