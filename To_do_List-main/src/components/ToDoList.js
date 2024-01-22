import React, { useEffect } from "react";
import './ToDoList.css'
import {saveTodoItemsToLocalStorage } from '../Service/Service';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regstar } from "@fortawesome/free-regular-svg-icons";


function ToDoList(props){
    const {ToDoItems,setToDoItems, completed, setcompleted} = props;

    
    const handleCompletion = (e) => {
        const id = e.target.name;
      
        // Create a new array with the modified completed property
        const newToDoItems = ToDoItems.map((item) => {
          if (item.id === id) {
            return {
              ...item, // Keep other properties of the item
              completed: !item.completed, // Toggle the completed property
            };
          }
          return item; // Return the item as it is
        });
      
        setToDoItems(newToDoItems); // Update the state with the new array
        saveTodoItemsToLocalStorage('item',newToDoItems)
      };
      

    const handleDelete = (id) =>{
        const newTodoItems = ToDoItems.filter(item => item.id !== id)
        setToDoItems(newTodoItems)
        saveTodoItemsToLocalStorage('item', newTodoItems)

        const completedCount = newTodoItems.filter(item => item.completed).length;
        setcompleted(completedCount);
    }

    const handleStar = (id) =>{
      const newToDoItems = ToDoItems.map((item) => {
        if (item.id === id) {
          return {
            ...item, // Keep other properties of the item
            priority: !item.priority, // Toggle the completed property
          };
        }
        return item; // Return the item as it is
      });
    
      setToDoItems(newToDoItems); // Update the state with the new array
      saveTodoItemsToLocalStorage('item',newToDoItems)
    }


    const handlechecked = (e) =>{
      if(e.target.checked){
        setcompleted(completed+1)
      }
      else{
        setcompleted(completed-1)
      }
    }

    useEffect(() => {
      const savedItems = localStorage.getItem('item');
      if (savedItems) {
        setToDoItems(JSON.parse(savedItems));
        const completedCount = JSON.parse(savedItems).filter(item => item.completed).length;
        setcompleted(completedCount);
      }
    }, [setToDoItems,setcompleted]);

    return(
        <div className="taskcontainer">
            {
              ToDoItems.length>0?
                ToDoItems.map((items)=>(
                    <div className="tasks" key={items.id}>
                        <div className="buttons">
                          <input type="checkbox" onClick={handleCompletion} name={items.id} className="completed" checked={items.completed} onChange={handlechecked}/>
                          <p id='taskname' style={{textDecoration:items.completed?'line-through':''}}>{String(items.content).length>30? String(items.content).slice(0,30)+'...':items.content}</p>
                        </div>
                        <div className="buttons2">
                          <button onClick={()=>{handleStar(items.id)}} className="star"><FontAwesomeIcon icon={items.priority?faStar:regstar}></FontAwesomeIcon></button>
                          <button className="delete" onClick={()=>{handleDelete(items.id)}} ><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                        </div>
                    </div>
                ))
              :
              <div className="emptytask">
                    <p>Add your first todo {':)'}</p>
              </div>
            }
        </div>
    )
}

export default ToDoList