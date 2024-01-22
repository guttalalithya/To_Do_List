import React from "react";
import './Create.css'
import {v4 as uuidv4} from 'uuid';
import { saveTodoItemsToLocalStorage } from '../Service/Service';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function CreateTODO(props){
    const {ToDoItems,setToDoItems} = props;

    const handleSubmit = (e) =>{
        e.preventDefault();
        const items = [
            {
              id:uuidv4(),
              content:document.getElementById('task').value,
              completed:false,
              priority:false
            },
            ...ToDoItems,
          ]
        
          document.getElementById('task').value = '';
        setToDoItems(items);
        saveTodoItemsToLocalStorage('item',items)
    }

    return(
        <div className="creationcontainer">
            <form onSubmit={handleSubmit} className="creationform">
                <input type='text' id='task'  placeholder="add a todo..." required/>
                <button><FontAwesomeIcon icon={faPlus}/></button>
            </form>
        </div>
    )
}


export default CreateTODO;