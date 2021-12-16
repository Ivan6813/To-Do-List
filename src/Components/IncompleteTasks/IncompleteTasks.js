import React from "react";

function incompleteTasks({userTasks, deleteTask, changeStateTask, setEditTask}) {
  const incompleteList = userTasks.filter(item => item.completed === false);
  
  return (
    <section>
      <h2 className = "quantity">To do ({incompleteList.length})</h2>
      <ul className = "list">
        {incompleteList.map(item => {
          return  <li key = {item.id} className = "list-item">
                    <input onChange = {() => changeStateTask(item)}
                            type = "checkbox"
                            checked = {item.completed}
                            className = "input-checkbox"
                            id = {item.id}
                    />
                    <label htmlFor = {item.id}/>
                    <input type = "text" value = {item.title} className = "task" readOnly/>
                    <button onClick = {() => setEditTask(item)}
                            className = "btn bth-edit">
                    </button>
                    <button onClick={() => deleteTask(item)} 
                            className = "btn bth-delete">
                    </button>
                  </li>
        })}
      </ul>
    </section>
  );
}

export default incompleteTasks;