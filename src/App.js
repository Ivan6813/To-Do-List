import React,{useState, useEffect} from "react";
import axios from "axios";
import Header from "./Components/Header/Header";

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

  return (
    <div>
      <Header 
        userId = {userId} 
        setUserId = {setUserId} 
        userList = {userList}
      />
    </div>
  );
}

export default App;
