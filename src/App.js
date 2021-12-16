import React,{useState, useEffect} from "react";
import axios from "axios";
import Header from "./Components/Header/Header";
import Form from "./Components/Form/Form";
import IncompleteTasks from "./Components/IncompleteTasks/IncompleteTasks";
import CompletedTasks from "./Components/CompletedTasks/CompletedTasks";

function App() {

  const [userId, setUserId] = useState(1);
  const [userList, setUserList] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(response => setUserList(response.data));
  }, []);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}&_limit=7`)
    .then(response => setUserTasks(response.data));
  }, [userId]);

  useEffect(() => {
    (editTask !== null) ? setNewTask(editTask.title) : setEditTask(null);
  }, [editTask]);

  function deleteTask(task) {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${task.id}`);
    setUserTasks(userTasks.filter(item => item.id !== task.id));
  }

  function changeStateTask(task) {
    task.completed = !task.completed;
    axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, task);
    setUserTasks(userTasks.map(item => item.id === task.id ? task : item));
  }

  function editTitleTask(task) {
    if (newTask.trim()) {
      task.title = newTask;
      axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, task);
      setUserTasks(userTasks.map(item => item.id === task.id ? task : item));
      setEditTask(null);
      setNewTask("");
    } else {
      setEditTask(null);
      setNewTask("");
      return;
    }
  }

  function createTask() {
    if (newTask.trim()) {
      const task = {title: newTask, completed: false};
      axios.post(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`, task)
      .then(response => setUserTasks([...userTasks, response.data]));
      setNewTask("");
    } else {
      setNewTask("");
      return;
    }
  }

  function handlerForm(event) {
    event.preventDefault();
    (editTask === null) ? createTask() : editTitleTask(editTask);
  }

  return (
    <div>
      <Header 
        userId = {userId} 
        setUserId = {setUserId} 
        userList = {userList}
      />
      <div className = "wrapper">
        <aside className = "sidebar">
          <div className = "menu"></div>
        </aside>
        <main className = "main">
          <div className = "incomplete-section">
            <div className = "container">
              <Form 
                newTask = {newTask} 
                setNewTask = {setNewTask} 
                editTask = {editTask} 
                handlerForm = {handlerForm}
              />
              <h3 className = "total-tasks">Total: {userTasks.length}</h3>
              <IncompleteTasks
                userTasks = {userTasks}
                deleteTask = {deleteTask}
                changeStateTask = {changeStateTask}
                setEditTask = {setEditTask}
              />
            </div>
          </div>
          <div className = "completed-section">
            <div className = "container">
              <CompletedTasks
                userTasks = {userTasks}
                deleteTask = {deleteTask}
                changeStateTask = {changeStateTask}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
