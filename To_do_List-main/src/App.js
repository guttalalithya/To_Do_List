import React,{useState} from "react";
import './App.css'
import CreateTODO from "./components/Create";
import ToDoList from "./components/ToDoList"
import { getToDoItemsFromLocalStorage } from './Service/Service';

function App(){

  const [ToDoItems,setToDoItems] = useState(getToDoItemsFromLocalStorage('item') || []);

  const [completed,setcompleted] = useState(0)

    
  
  return(
    <div className="maincontainer">
      <div className="App">
        <div className="title">
          <h1>Todo App</h1>
          <p>Completed: {completed} / {ToDoItems.length} </p>
        </div>
        <CreateTODO ToDoItems={ToDoItems} setToDoItems={setToDoItems}/>
        <ToDoList ToDoItems={ToDoItems} setToDoItems={setToDoItems} completed={completed} setcompleted={setcompleted}/>
      </div>
    </div>
  )
}


export default App;