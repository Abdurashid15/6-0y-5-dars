import { useState } from 'react';
import './App.css'
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [editedText, setEditedText] = useState('');

  function addTodo() {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo('');
    }
  }

  function deleteTodo(todoId) {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  function editTodo(todoId) {
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    setEditedText(todoToEdit.text);
    setTodoToEdit(todoId);
  }

  function saveTodoEdit() {
    setTodos(
      todos.map((todo) =>
        todo.id === todoToEdit ? { ...todo, text: editedText } : todo
      )
    );
    setTodoToEdit(null);
    setEditedText('');
  }

  function deleteAllTodos() {
    setTodos([]);
  }

  function handleMouseEnter(todoId) {
    setShowDeleteButton(true);
    setTodoToDelete(todoId);
  }

  function handleMouseLeave() {
    setShowDeleteButton(false);
    setTodoToDelete(null);
  }

  return (
    <div className='container'>
      <h1>Todo App </h1>
      <div className="add-input">
        <input
        className='add-todo'
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add your new todo"
        />
        <button onClick={addTodo}><svg className="w-[60px] h-[60px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
        </svg>

        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onMouseEnter={() => handleMouseEnter(todo.id)}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative' }}
          >
            {todoToEdit === todo.id ? (
              <div>
                <input
                className='edit-input'
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button className='cheked' onClick={saveTodoEdit}><svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                </svg>
                </button>
              </div>
            ) : (
              todo.text
            )}
            <button className='edit'
              onClick={() => editTodo(todo.id)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
              }}
            >
              <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
              </svg>

            </button>
           ` {showDeleteButton && todoToDelete === todo.id && (
              <button className='delete'
                onClick={() => deleteTodo(todo.id)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '40px',
                  transform: 'translateY(-50%)',
                }}
              >
                <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                </svg>

              </button>
            )}`
          </li>
        ))}
      </ul>
      <button className='clear' onClick={deleteAllTodos}>Clear All</button>
    </div>
  );
}
export default TodoList;