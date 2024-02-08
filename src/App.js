import React from 'react'
import { useState, useRef, useEffect} from "react";
import './App.css';
import HeaderInput from './components/HeaderInput';
import Lists from './components/Lists';
import Footer from './components/Footer';

function App() {


  //for input element change 
  const [newTodoContent, setnewTodoContent] = useState("")

  //to hold arrays of items that we need 
  const [todoItems, setTodoItems] = useState([
    { content: '1st item', id: 1, completed: false },
    { content: '2nd item', id: 2, completed: false },
    { content: '3rd item', id: 3, completed: false },
    { content: '4th item', id: 4, completed: false },
    { content: '5th item', id: 5, completed: false }
  ]);

  const [activeItems, setActiveItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([])

  //to hold the state of darkmode
  const [darkMode, setDarkMode] = useState(true)
  const [activeButton, setActiveButton] = useState(1);

  useEffect((
    ()=>{
      const completedItems = []
      const activeItems = []
  
      todoItems.forEach((todoItem) => {
        if (todoItem.completed === true) {
          completedItems.push(todoItem)
        } else {
          activeItems.push(todoItem)
        }
      })
      setCompletedItems(completedItems);
      setActiveItems(activeItems)
    }
  ),[])

  console.log('active items are ' + activeItems + '')
  console.log('completed items are ' + completedItems)
  console.log('___________________________')
 

  const toggleDarkMode = () => {
    setDarkMode(darkMode => !darkMode)
  }

  const handleChange = (newTodoContent) => {
    setnewTodoContent(newTodoContent)
  }

  const handleAddTodo = () => {
    const todoItem = {}
    todoItem.content = newTodoContent
    todoItem.id = todoItems.length + 1
    todoItem.completed = false
    setTodoItems((prevState) => [...prevState, todoItem]);

    setActiveItems(todoItems)
    setnewTodoContent("")
  };
  const handleDelete = (id) => {
    setTodoItems(todoItems.filter((todoItem) => todoItem.id !== id));

    const updatedTodoItems = []

    todoItems.forEach((todoItem) => {
      if (todoItem.id === id) {
        updatedTodoItems.push(todoItem)
      }
    });
  }
  const handleMarkTodoComplete = (id) => {
    const updatedTodoItems = todoItems.map((todoItem) => {
      if (todoItem.id === id) {
        todoItem.completed = !todoItem.completed;
      }
      return todoItem;
    });
    setTodoItems(updatedTodoItems);

    const completedItems = []
    const activeItems = []

    todoItems.forEach((todoItem) => {
      if (todoItem.completed === true) {
        completedItems.push(todoItem)
      } else {
        activeItems.push(todoItem)
      }
    })
    setCompletedItems(completedItems);
    setActiveItems(activeItems)
  }

  const showCompleted = () => {
    setTodoItems(completedItems) 
    setActiveButton(3)
  }
  const showActive = () => {
    setTodoItems(activeItems) 
    setActiveButton(2)
  }
  const showAll = () => {
    setTodoItems([...activeItems, ...completedItems])
    setActiveButton(1)
  }
  const clearCompleted = () => {
    setTodoItems(todoItems.filter((todoItem) => todoItem.completed === false))
    setCompletedItems([])
  }

  // below is for drag and drop functionality 
  const draggedItem = useRef(null);
  const draggedOverItem = useRef(null);
 
  const dragStart = (e, position) =>{
    draggedItem.current = position;
  }
  const dragEnter=(e, position) =>{
    draggedOverItem.current = position; 
  }

  const dragEnd=() =>{
    const tempArray = [...todoItems]; 
    const draggedItemContent = tempArray[draggedItem.current]

    tempArray.splice(draggedItem, 1); 
    tempArray.splice(draggedOverItem, 0, draggedItemContent)

    draggedItem.current=null;
    draggedItemContent.current=null;
    setTodoItems(tempArray)
     
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <HeaderInput newTodoContent={newTodoContent}
        handleAddTodo={handleAddTodo}
        handleChange={handleChange}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode} />
      <Lists todoItems={todoItems}
        handleDelete={handleDelete}
        handleMarkTodoComplete={handleMarkTodoComplete}
        activeItems={activeItems}
        completedItems={completedItems}
        clearCompleted={clearCompleted}
        darkMode={darkMode}
        dragEnd={dragEnd}
        dragEnter={dragEnter}
        dragStart={dragStart}
      />
      <Footer showCompleted={showCompleted}
        showAll={showAll}
        showActive={showActive}
        darkMode={darkMode}
        activeButton={activeButton}
        todoItems={todoItems}
        clearCompleted={clearCompleted} />

    </div>
  );
}


export default App;

