
export default function Lists({ todoItems, handleDelete, handleMarkTodoComplete, clearCompleted, darkMode,
  dragEnter, dragEnd, dragStart }) {

  if (!todoItems) return null

  let fill = darkMode ? '#ffffff' : "#494C6B"
  const listElements = todoItems.map((todoItem, index) => {
    return (
      <div key={todoItem.id} draggable="true"

        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragEnd={dragEnd}

        className={darkMode ? "todo-list dark" : "todo-list"} >
        <button onClick={() => handleMarkTodoComplete(todoItem.id)}> <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><path fill="none" stroke={fill} strokeWidth="2" d="M1 4.304L3.696 7l6-6" /></svg>
        </button>
        <div className={todoItem.completed ? "completed" : ""}>{todoItem.content}</div>
        <button onClick={() => handleDelete(todoItem.id)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill={fill} fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>
        </button>
      </div>
    )
  })

  let counter = 0;

  todoItems.forEach(todoItem => {
    if (todoItem.completed === false) {
      counter++
    }
  });

  const counterElement = (
    <div className="counter-elements">
      <div>{counter} items left</div>
      {todoItems.length > 0 && <div onClick={clearCompleted}>Clear Completed</div>}
    </div>
  )
  return (

    <div className={darkMode ? 'todo-lists-wrapper dark' : 'todo-lists-wrapper'}>
      {listElements}
      {counterElement}
    </div>
  )
}
